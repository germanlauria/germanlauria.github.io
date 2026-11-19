/* ============================================================================
   JUEGO: UPTIME · datos y configuración
   ----------------------------------------------------------------------------
   Podés editar este archivo a mano (con el Bloc de notas o VS Code) y recargar la página.
     nombre / descripcion   lo que se ve en el menú "Juegos" (es = español, en = inglés)
     orden                  posición en el menú (1 = primero)
     activo                 true = aparece en el menú · false = queda oculto
     config                 números y opciones del juego (cada uno tiene su explicación)
     textos                 todos los textos que se ven en el juego, en español y en inglés

   Respetá las comillas "...", los dos puntos y las comas al final de cada línea.
   Si algo deja de funcionar, revisá que no falte o sobre una coma.
   ============================================================================ */
window.JUEGOS = window.JUEGOS || {};
window.JUEGOS.uptime = {
  modulo: "Game",
  orden: 1,
  activo: true,
  icono: "🐞",
  nombre: { es: "UPTIME", en: "UPTIME" },
  descripcion: {
    es: "Caen bugs con palabras: escribí la traducción antes de que lleguen al servidor. Español → Inglés, Inglés → Español o Mixto.",
    en: "Bugs fall carrying words: type the translation before they reach the server. Spanish → English, English → Spanish or Mixed."
  },

  config: {
    minPalabras: 6,           // palabras mínimas en la categoría elegida para poder jugar
    danio: 15,                // % de UPTIME que se pierde cuando un bug llega al servidor
    cura: 20,                 // % de UPTIME que recupera el bug verde
    probEspecial: 0.12,       // probabilidad de que salga un bug especial (desde la ola 2)
    probCura: 0.6,            // de los especiales, cuántos son verdes (el resto son dorados)
    velocidadBase: 42,        // velocidad de caída en la ola 1 (píxeles por segundo)
    velocidadPorOla: 8,       // cuánto más rápido caen en cada ola
    velocidadMax: 140,        // velocidad máxima
    aparicion: 2.9,           // segundos entre bugs al empezar (modo Traducción)
    aparicionAudio: 3.6,      // segundos entre bugs al empezar (modo Audio)
    aparicionPorOla: 0.2,     // cuántos segundos menos entre bugs en cada ola
    aparicionMin: 1,          // tiempo mínimo entre bugs
    maxBugs: 8,               // máximo de bugs en pantalla al mismo tiempo
    bugsPorOla: 8,            // bugs a eliminar para pasar de ola
    puntosBase: 10,           // puntos por bug
    puntosPorLetra: 2,        // puntos extra por cada letra de la respuesta
    comboCada: 5,             // aciertos seguidos para subir el multiplicador
    multMax: 5,               // multiplicador máximo (x5)
    costoPista: 5             // puntos que cuesta la pista (Tab)
  },

  textos: {
    es: {
      sub: "Cada bug trae una palabra en español. Escribí su término en inglés antes de que llegue al servidor.",
      how1: "Se detecta solo al terminar de escribir: no hace falta Enter.",
      how2: "Tab = pista (−5 pts) · Esc = pausa · clic en un bug = repetir audio.",
      how3: "Bug verde: cura el servidor. Bug dorado: limpia la pantalla. Los términos que fallás aparecen más seguido.",
      mode: "Modo",
      mTr: "Traducción",
      mAu: "Audio",
      allc: "Todas las categorías",
      start: "Iniciar",
      score: "PUNTOS",
      wave: "OLA",
      combo: "COMBO",
      best: "MEJOR",
      up: "UPTIME",
      paused: "PAUSA",
      resume: "Continuar",
      quit: "Salir",
      down: "SERVIDOR CAÍDO",
      report: "Informe de incidente",
      acc: "PRECISIÓN",
      max: "MEJOR RACHA",
      missed: "Términos que se te escaparon",
      none: "¡Ninguno! Servidor impecable.",
      again: "Jugar de nuevo",
      nb: "¡Nuevo récord!",
      ph: "escribí el término en inglés…",
      keys: "Tab: pista · Esc: pausa",
      few: "Esa categoría tiene muy pocos términos.",
      heal: "+20% UPTIME",
      nuke: "LIMPIEZA TOTAL",
      dir: "Dirección",
      dEs: "Español → Inglés",
      dEn: "Inglés → Español",
      dMix: "Mixto",
      subEn: "Cada bug trae un término en inglés. Escribí su traducción al español antes de que llegue al servidor.",
      subMix: "Los bugs mezclan palabras en español y en inglés. Escribí cada una en el otro idioma antes de que llegue al servidor.",
      phEn: "escribí la traducción en español…",
      phMix: "escribí la traducción…",
      tagEs: "ES→EN",
      tagEn: "EN→ES",
      accN: "Los acentos y la ñ son opcionales. Si hay varias traducciones (ej. \"gabinete / chasis\"), vale cualquiera.",
      back: "← Juegos"
    },
    en: {
      sub: "Each bug carries a Spanish word. Type its English term before it reaches the server.",
      how1: "It is detected as you finish typing: no Enter needed.",
      how2: "Tab = hint (−5 pts) · Esc = pause · click a bug = replay audio.",
      how3: "Green bug: heals the server. Gold bug: clears the screen. Terms you miss show up more often.",
      mode: "Mode",
      mTr: "Translation",
      mAu: "Audio",
      allc: "All categories",
      start: "Start",
      score: "SCORE",
      wave: "WAVE",
      combo: "COMBO",
      best: "BEST",
      up: "UPTIME",
      paused: "PAUSED",
      resume: "Resume",
      quit: "Quit",
      down: "SERVER DOWN",
      report: "Incident report",
      acc: "ACCURACY",
      max: "BEST STREAK",
      missed: "Terms that got past you",
      none: "None! Flawless uptime.",
      again: "Play again",
      nb: "New high score!",
      ph: "type the English term…",
      keys: "Tab: hint · Esc: pause",
      few: "That category has too few terms.",
      heal: "+20% UPTIME",
      nuke: "KERNEL FLUSH",
      dir: "Direction",
      dEs: "Spanish → English",
      dEn: "English → Spanish",
      dMix: "Mixed",
      subEn: "Each bug carries an English term. Type its Spanish translation before it reaches the server.",
      subMix: "Bugs mix Spanish and English words. Type each one in the other language before it reaches the server.",
      phEn: "type the Spanish translation…",
      phMix: "type the translation…",
      tagEs: "ES→EN",
      tagEn: "EN→ES",
      accN: "Accents and ñ are optional. If there are several translations (e.g. \"gabinete / chasis\"), any of them counts.",
      back: "← Games"
    }
  }
};
