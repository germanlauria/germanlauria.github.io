# -*- coding: utf-8 -*-
"""
GENERADOR DE VOCES para la historia "In this city…"
---------------------------------------------------
Crea un audio .mp3 por cada frase de las historias usando las voces neuronales de Microsoft
(las mismas que trae Microsoft Edge en "Leer en voz alta"), mediante el paquete edge-tts.
Necesita internet solo mientras genera. Después el juego los reproduce en cualquier navegador.

Uso: doble clic en herramientas\\generar-voces.bat  (instala edge-tts y ejecuta este archivo).
     O a mano:  py -m pip install edge-tts   y   py herramientas\\generar-voces.py

Qué hace:
  1. Lee data/juego-historia.js (las historias y config.voz.neural).
  2. Arma la lista de frases: cada escena, la frase completa después de responder, las opciones
     de los caminos y la frase de prueba.
  3. Genera solo los audios que faltan (si cambiás un texto, se genera de nuevo esa frase sola).
     Si cambiás la voz, el tono o la velocidad, se generan todos de nuevo.
  4. Escribe data/historia-audios.js, que le dice al juego qué audio corresponde a cada frase.
  5. Borra los audios viejos que ya no se usan.

Opciones:  --lista     solo muestra las frases, sin generar nada.
           --muestras  graba la misma frase con muchas voces distintas en herramientas/muestras/
                       y crea herramientas/muestras/muestras.html para escucharlas y elegir una.

VOCES DE ELEVENLABS (Adam, Antoni, Brian…): en data/juego-historia.js poné  motor: "elevenlabs"  en config.voz.neural.
  Necesitan una cuenta gratis en elevenlabs.io y una clave de API (ver herramientas/LEEME-voces.txt).
  La clave va en el archivo herramientas/clave-elevenlabs.txt (una sola línea). No la compartas con nadie.
  Plan gratis: 10.000 caracteres por mes, uso no comercial y hay que mencionar a ElevenLabs.
"""
import asyncio, hashlib, json, os, re, sys, urllib.request, urllib.error

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATOS = os.path.join(RAIZ, "data", "juego-historia.js")
SALIDA = os.path.join(RAIZ, "data", "historia-audios.js")
CARPETA = "audio/historia"                      # ruta relativa a index.html
CARPETA_ABS = os.path.join(RAIZ, *CARPETA.split("/"))


# Voces de ElevenLabs que suelen usarse para narrar (nombre → id). También se puede poner un id directamente.
ELEVEN = {
    "Adam": "pNInz6obpgDQGcFmaJgB",      # hombre, grave, narración (la más usada en TikTok)
    "Antoni": "ErXwobaYiN019PkySvjV",    # hombre joven, narración
    "Brian": "nPczCjzI2devNBz1zQrb",     # hombre, grave, narración
    "Bill": "pqHfZKP75CvOlQylNhV4",      # hombre mayor, narración
    "Daniel": "onwK4e9ZLuTAKqWW03F9",    # hombre, británico, serio
    "Arnold": "VR6AewLTigWG4xSOukaG",    # hombre, voz firme
}
CLAVE = os.path.join(RAIZ, "herramientas", "clave-elevenlabs.txt")


def clave_eleven():
    k = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    if not k and os.path.exists(CLAVE):
        k = open(CLAVE, encoding="utf-8").read().strip()
    return k


def preparar_eleven(texto, modelo, E):
    """Agrega pausas exactas para ElevenLabs. Multilingual v2 acepta <break time="0.7s" />; v3 no, pero maneja bien "…"."""
    if "v3" in modelo:
        return texto
    pz = E.get("pausas") or {}
    sus, ora = pz.get("suspensivos", 0.7), pz.get("oracion", 0.0)
    t = re.sub(r'…(?=\s+\S)', '…<break time="%.1fs" />' % sus, texto) if sus else texto
    if ora:
        t = re.sub(r'(?<=[.!?])(["”’]?)\s+(?=[A-Z"“])', r'\1 <break time="%.1fs" /> ' % ora, t)
    return t


def eleven_tts(texto, ruta, voz, modelo="eleven_multilingual_v2", estabilidad=0.5, velocidad=1.0, estilo=0.0, E=None):
    E = E or {}
    vid = ELEVEN.get(voz, voz)
    cuerpo = {"text": preparar_eleven(texto, modelo, E), "model_id": modelo,
              "voice_settings": {"stability": estabilidad, "similarity_boost": 0.75, "style": estilo, "use_speaker_boost": True}}
    if velocidad and abs(float(velocidad) - 1) > 0.001:
        cuerpo["voice_settings"]["speed"] = float(velocidad)
    req = urllib.request.Request(
        "https://api.elevenlabs.io/v1/text-to-speech/%s?output_format=mp3_44100_128" % vid,
        data=json.dumps(cuerpo).encode("utf-8"), method="POST",
        headers={"xi-api-key": clave_eleven(), "Content-Type": "application/json", "Accept": "audio/mpeg"})
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            datos = r.read()
    except urllib.error.HTTPError as e:
        det = e.read().decode("utf-8", "replace")[:300]
        if e.code == 401 and "model" not in det.lower():
            raise RuntimeError("la clave de ElevenLabs no es válida (revisá herramientas/clave-elevenlabs.txt) · " + det)
        if e.code in (402, 429) or "quota" in det.lower():
            raise RuntimeError("se terminaron los caracteres gratis del mes o hay demasiados pedidos · " + det)
        if "v3" in modelo and e.code in (400, 401, 403, 422):
            print("   (el modelo %s no está disponible en tu plan: uso eleven_multilingual_v2)" % modelo)
            return eleven_tts(texto, ruta, voz, "eleven_multilingual_v2", estabilidad, velocidad, estilo, E)
        raise RuntimeError("ElevenLabs respondió %s · %s" % (e.code, det))
    with open(ruta, "wb") as fh:
        fh.write(datos)


async def sintetizar(texto, ruta, P):
    """Graba una frase con el motor elegido. P = config.voz.neural"""
    if P.get("motor") == "elevenlabs":
        E = P.get("elevenlabs") or {}
        await asyncio.to_thread(eleven_tts, texto, ruta, E.get("voz", "Brian"), E.get("modelo", "eleven_multilingual_v2"),
                                E.get("estabilidad", 0.35), E.get("velocidad", 1.0), E.get("estilo", 0.3), E)
    else:
        import edge_tts
        await edge_tts.Communicate(texto, P.get("voz", "en-US-JennyNeural"), rate=P.get("velocidad", "+0%"),
                                   pitch=P.get("tono", "+0Hz")).save(ruta)


def firma(P):
    """Lo que identifica la voz: si cambia, se regraban todas las frases."""
    if P.get("motor") == "elevenlabs":
        E = P.get("elevenlabs") or {}
        return "eleven|%s|%s|%s|%s|%s|%s" % (E.get("voz", "Brian"), E.get("modelo", "eleven_multilingual_v2"), E.get("estabilidad", 0.35),
                                             E.get("velocidad", 1.0), E.get("estilo", 0.3), json.dumps(E.get("pausas") or {}, sort_keys=True))
    return "%s|%s|%s" % (P.get("voz", "en-US-JennyNeural"), P.get("velocidad", "+0%"), P.get("tono", "+0Hz"))


def nombre_voz(P):
    if P.get("motor") == "elevenlabs":
        return "ElevenLabs " + str((P.get("elevenlabs") or {}).get("voz", "Brian"))
    return P.get("voz", "en-US-JennyNeural")


def js_a_json(src):
    """Convierte el objeto de JavaScript del archivo de datos a JSON (saca comentarios, pone comillas a las claves)."""
    i, n, out = 0, len(src), []
    while i < n:
        c = src[i]
        if c == '"' or c == "'":
            q, j = c, i + 1
            buf = []
            while j < n and src[j] != q:
                if src[j] == "\\":
                    buf.append(src[j:j + 2]); j += 2; continue
                buf.append(src[j]); j += 1
            s = "".join(buf)
            if q == "'":
                s = s.replace("\\'", "'").replace('"', '\\"')
            out.append('"' + s + '"'); i = j + 1; continue
        if src.startswith("/*", i):
            j = src.find("*/", i + 2); i = n if j < 0 else j + 2; continue
        if src.startswith("//", i):
            j = src.find("\n", i); i = n if j < 0 else j; continue
        if c.isalpha() or c in "_$":
            m = re.match(r"[A-Za-z_$][\w$]*", src[i:])
            word = m.group(0); k = i + len(word)
            while k < n and src[k] in " \t\r\n":
                k += 1
            if k < n and src[k] == ":" and word not in ("true", "false", "null"):
                out.append('"' + word + '"')
            else:
                out.append(word)
            i += len(word); continue
        out.append(c); i += 1
    txt = "".join(out)
    return re.sub(r",(\s*[}\]])", r"\1", txt)


def leer_datos():
    src = open(DATOS, encoding="utf-8").read()
    m = re.search(r"window\.JUEGOS\.historia\s*=\s*", src)
    if not m:
        sys.exit("No encontré 'window.JUEGOS.historia' en " + DATOS)
    cuerpo = src[m.end():].strip()
    cuerpo = cuerpo[:cuerpo.rfind("}") + 1]
    try:
        return json.loads(js_a_json(cuerpo))
    except json.JSONDecodeError as e:
        sys.exit("El archivo data/juego-historia.js tiene un error de formato (%s).\n"
                 "Revisá las comas y las comillas." % e.msg)


# Estas funciones hacen exactamente lo mismo que el juego (js/historia.js) para que las frases coincidan.
def limpiar(s, hueco):
    s = re.sub(r"[{}]", "", str(s))
    return re.sub(r"_{3,}", " " + hueco + " ", s)


def clave(s):
    return re.sub(r"\s+", " ", s).strip()


def frases(D):
    C = D.get("config", {})
    hueco = C.get("textoHueco", "blank")
    L = []
    for h in D.get("historias", []):
        for sid, e in h.get("escenas", {}).items():
            if e.get("texto"):
                t = limpiar(e["texto"], hueco)
                L.append(t)
                q = e.get("elegir") or e.get("escribir")
                if q:
                    w = q.get("correcta") if e.get("elegir") else (q.get("respuestas") or [""])[0]
                    if w:
                        L.append(t.replace(" " + hueco + " ", " " + w + " ", 1))
            for o in e.get("camino") or []:
                if o.get("texto"):
                    L.append(limpiar(o["texto"], hueco))
    prueba = (C.get("voz") or {}).get("frasePrueba")
    if prueba:
        L.append(limpiar(prueba, hueco))
    vistos, res = set(), []
    for f in map(clave, L):
        if f and f not in vistos:
            vistos.add(f); res.append(f)
    return res


def partes(f, P):
    """Divide una frase en oraciones (después de . ! ? …) para grabarlas por separado y dejar pausas reales
    entre ellas. Devuelve [(texto, pausa_ms_después), ...]. Las comas las respeta la voz sola."""
    pz = P.get("pausas") or {}
    # ElevenLabs graba la frase entera (las pausas van adentro, con <break>): así no se corta la entonación
    if pz.get("separar") is False or P.get("motor") == "elevenlabs":
        return [(f, 0)]
    trozos = [t for t in re.split(r'(?<=[.!?…])["”’]?\s+(?=\S)', f) if t.strip()]
    # re.split se come la comilla de cierre: la recupero
    res, pos = [], 0
    for t in trozos:
        k = f.find(t, pos)
        fin = k + len(t)
        while fin < len(f) and f[fin] in '"”’':
            fin += 1
        res.append(f[k:fin].strip()); pos = fin
    out = []
    for n, t in enumerate(res):
        if n == len(res) - 1:
            out.append((t, 0)); continue
        u = t.rstrip('"”’')[-1:]
        out.append((t, int(pz.get("suspensivos", 750) if u == "…" else pz.get("oracion", 380))))
    return out


async def grabar(texto, P, fir, cont):
    nombre = hashlib.md5((fir + "|" + texto).encode("utf-8")).hexdigest()[:12] + ".mp3"
    ruta = os.path.join(CARPETA_ABS, nombre)
    if os.path.exists(ruta) and os.path.getsize(ruta) > 0:
        return nombre
    print("   · %s" % texto)
    for intento in range(3):
        try:
            await sintetizar(texto, ruta, P)
            cont["hechos"] += 1
            return nombre
        except Exception as ex:
            if os.path.exists(ruta):
                os.remove(ruta)
            if "clave" in str(ex) or "caracteres gratis" in str(ex):
                print("   ! " + str(ex)); cont["errores"] += 1; cont["cortar"] = True
                return None
            if intento == 2:
                cont["errores"] += 1
                print("   ! no se pudo generar (%s)" % ex)
                return None
            await asyncio.sleep(2)


async def generar(lista, P):
    os.makedirs(CARPETA_ABS, exist_ok=True)
    fir = firma(P)
    mapa, usados, cont = {}, set(), {"hechos": 0, "errores": 0, "cortar": False}
    for i, f in enumerate(lista, 1):
        print("[%d/%d] %s" % (i, len(lista), f))
        P_ = partes(f, P)
        archivos = []
        for texto, pausa in P_:
            if cont["cortar"]:
                break
            a = await grabar(texto, P, fir, cont)
            if not a:
                archivos = None; break
            archivos.append((a, pausa)); usados.add(a)
        if archivos:
            if len(archivos) == 1:
                mapa[f] = CARPETA + "/" + archivos[0][0]
            else:
                mapa[f] = {"partes": [[CARPETA + "/" + a, pz] for a, pz in archivos]}
    for x in os.listdir(CARPETA_ABS):
        if re.fullmatch(r"[0-9a-f]{12}\.mp3", x) and x not in usados:
            os.remove(os.path.join(CARPETA_ABS, x))
    return mapa, cont["hechos"], cont["errores"]


def escribir_manifiesto(mapa, voz):
    js = ("/* ARCHIVO GENERADO por herramientas/generar-voces.py — no hace falta editarlo a mano.\r\n"
          "   Dice qué audio (voz neuronal) corresponde a cada frase de la historia.\r\n"
          "   Si lo borrás, el juego vuelve a usar las voces del navegador. */\r\n"
          "window.HISTORIA_AUDIOS = " + json.dumps({"voz": voz, "lineas": mapa}, ensure_ascii=False, indent=2).replace("\n", "\r\n") + ";\r\n")
    with open(SALIDA, "w", encoding="utf-8", newline="") as fh:
        fh.write(js)


# (motor, voz, descripción, ajustes)
MUESTRAS = [
    ("elevenlabs", "Brian", "ElevenLabs · Brian, expresivo (la configurada)", {"estabilidad": 0.35, "estilo": 0.3}),
    ("elevenlabs", "Brian", "ElevenLabs · Brian, más dramático", {"estabilidad": 0.25, "estilo": 0.55}),
    ("elevenlabs", "Brian", "ElevenLabs · Brian, parejo y misterioso", {"estabilidad": 0.6, "estilo": 0.1}),
    ("elevenlabs", "Brian", "ElevenLabs · Brian con el modelo v3 (si tu plan lo tiene)", {"modelo": "eleven_v3", "estabilidad": 0.5}),
    ("elevenlabs", "Adam", "ElevenLabs · Adam, expresivo", {"estabilidad": 0.35, "estilo": 0.3}),
    ("elevenlabs", "Antoni", "ElevenLabs · Antoni, expresivo", {"estabilidad": 0.35, "estilo": 0.3}),
    ("elevenlabs", "Bill", "ElevenLabs · Bill, expresivo", {"estabilidad": 0.35, "estilo": 0.3}),
    ("edge", "en-US-BrianNeural", "Edge · Brian (la de antes)", {}),
    ("edge", "en-US-BrianMultilingualNeural", "Edge · Brian Multilingual", {}),
]


def config_de(motor, voz, aj):
    """Devuelve lo que hay que poner en config.voz.neural para usar esa voz."""
    if motor == "elevenlabs":
        e = {"voz": voz}
        e.update(aj)
        return {"motor": "elevenlabs", "elevenlabs": e}
    d = {"motor": "edge", "voz": voz, "velocidad": aj.get("velocidad", "+0%"), "tono": aj.get("tono", "+0Hz")}
    return d


async def muestras(frase):
    car = os.path.join(RAIZ, "herramientas", "muestras")
    os.makedirs(car, exist_ok=True)
    hay_clave = bool(clave_eleven())
    try:
        import edge_tts  # noqa: F401
        hay_edge = True
    except ImportError:
        hay_edge = False
    if not hay_clave:
        print("(No hay clave de ElevenLabs en herramientas\\clave-elevenlabs.txt: se graban solo las voces de Edge.)\n")
    filas, n = [], 0
    for motor, voz, desc, aj in MUESTRAS:
        n += 1
        if (motor == "elevenlabs" and not hay_clave) or (motor == "edge" and not hay_edge):
            filas.append((motor, voz, desc, aj, None)); continue
        arch = "%02d-%s.mp3" % (n, re.sub(r"[^A-Za-z0-9]+", "-", voz))
        print("[%d/%d] %s" % (n, len(MUESTRAS), desc))
        try:
            await sintetizar(frase, os.path.join(car, arch), config_de(motor, voz, aj))
            filas.append((motor, voz, desc, aj, arch))
        except Exception as ex:
            print("   ! no se pudo (%s)" % ex)
            filas.append((motor, voz, desc, aj, None))
    html = ['<!DOCTYPE html><html lang="es"><meta charset="utf-8"><title>Muestras de voces</title>',
            '<style>body{font:15px system-ui,sans-serif;background:#0d1117;color:#e6edf3;max-width:860px;margin:30px auto;padding:0 16px}'
            'h1{font-size:22px}.v{display:grid;grid-template-columns:40px 1fr auto;align-items:center;gap:12px;padding:10px 12px;border:1px solid #30363d;border-radius:8px;margin:8px 0}'
            '.n{font:700 18px Consolas,monospace;color:#58a6ff;text-align:center}.d b{display:block}.d small{color:#8b949e}.off{opacity:.45}</style>',
            '<h1>Muestras de voces</h1><p>Frase: <i>%s</i></p>' % frase,
            '<p>Escuchalas y decile a Claude el <b>número</b> de la que más te guste.</p>']
    for k, (motor, voz, desc, aj, arch) in enumerate(filas, 1):
        cfg = json.dumps(config_de(motor, voz, aj), ensure_ascii=False)
        if arch:
            html.append('<div class="v"><span class="n">%d</span><span class="d"><b>%s</b><small>%s</small></span><audio controls preload="none" src="%s"></audio></div>' % (k, desc, cfg, arch))
        else:
            html.append('<div class="v off"><span class="n">%d</span><span class="d"><b>%s</b><small>%s</small></span><span>%s</span></div>' % (
                k, desc, cfg, "falta la clave de ElevenLabs" if motor == "elevenlabs" else "no se pudo grabar"))
    with open(os.path.join(car, "muestras.html"), "w", encoding="utf-8", newline="") as fh:
        fh.write("\r\n".join(html) + "\r\n")
    print("\nListo. Se abre herramientas\\muestras\\muestras.html para escucharlas.")
    try:
        os.startfile(os.path.join(car, "muestras.html"))
    except Exception:
        pass


def main():
    D = leer_datos()
    N = ((D.get("config") or {}).get("voz") or {}).get("neural") or {}
    lista = frases(D)
    if "--lista" in sys.argv:
        for f in lista:
            print(f)
        print("\n%d frases" % len(lista)); return
    if "--muestras" in sys.argv:
        asyncio.run(muestras("In this town, nobody remembers anything… Everything is stored in one giant database. And tonight, it's gone.")); return
    if N.get("motor") == "elevenlabs":
        if not clave_eleven():
            sys.exit("Para usar ElevenLabs falta la clave: guardala en herramientas\\clave-elevenlabs.txt (ver LEEME-voces.txt).")
    else:
        try:
            import edge_tts  # noqa: F401
        except ImportError:
            sys.exit("Falta el paquete edge-tts. Ejecutá:  py -m pip install edge-tts")
    print("Voz: %s · %d frases\n" % (nombre_voz(N), len(lista)))
    mapa, hechos, errores = asyncio.run(generar(lista, N))
    escribir_manifiesto(mapa, nombre_voz(N))
    print("\nListo: %d audios nuevos, %d en total%s." % (hechos, len(mapa), (", %d con error (volvé a ejecutarlo)" % errores) if errores else ""))
    print("Recargá la página del glosario para escuchar las voces nuevas.")


if __name__ == "__main__":
    main()
