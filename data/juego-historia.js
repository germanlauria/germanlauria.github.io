/* ============================================================================
   JUEGO: HISTORIAS "IN THIS CITY…" · datos, configuración e historias
   ----------------------------------------------------------------------------
   Podés editar este archivo a mano (con el Bloc de notas o VS Code) y recargar la página.
     nombre / descripcion   lo que se ve en el menú "Juegos" (es = español, en = inglés)
     orden                  posición en el menú (1 = primero)
     activo                 true = aparece en el menú · false = queda oculto
     config                 números y opciones del juego (cada uno tiene su explicación)
     musicaNotas            música de fondo: lista de acordes (números MIDI: 60 = do central, +12 = una octava)
     textos                 los textos de la interfaz, en español y en inglés
     historias              LAS HISTORIAS. Podés cambiar las que están o agregar nuevas.

   CÓMO SE ARMA UNA HISTORIA
   Cada historia tiene: id (único, sin espacios), titulo, subtitulo{es,en}, inicio (id de la primera escena)
   y escenas. Cada escena tiene un id (el nombre antes de los dos puntos) y:
     texto       lo que se lee y se escucha, EN INGLÉS. Frases cortas, como en los videos.
                   {palabra}  = palabra del glosario resaltada (al pasar el mouse muestra la traducción)
                   ___        = hueco que hay que completar (solo en escenas con pregunta)
     es          la traducción al español (son los subtítulos)
     personajes  quién aparece en pantalla y con qué emoción (ver PERSONAJES más abajo)
     habla       qué personaje está hablando (mueve la boca)
     fondo       cómo se ve la ciudad: "noche" · "alerta" (rojo) · "apagon" (luces apagadas) ·
                 "verde" · "sotano" · "amanecer"   (si no ponés nada, sigue el de la escena anterior)
     ir          id de la escena que sigue (en escenas sin pregunta)

   Y puede tener UNA de estas cosas:
     elegir:   { opciones: ["correcta", "otra", "otra"], correcta: "correcta", siBien: "id", siMal: "id" }
     escribir: { respuestas: ["firewall"], pista: "cortafuegos", siBien: "id", siMal: "id" }
                 (respuestas: todas las formas que se aceptan; los acentos y mayúsculas no importan)
     camino:   [ { texto: "opción en inglés", es: "traducción", ir: "id" }, ... ]   (no hay correcta: elegís el rumbo)
     condicion:{ erroresMax: 2, siCumple: "id", siNo: "id" }   (salta según cuántos errores llevás)
     final:    { id: "luces", titulo: { es: "...", en: "..." } }   (termina la historia)

   siMal es opcional: si no está, al equivocarte se muestra la respuesta y se sigue por siBien.
   Respetá las comillas "...", los dos puntos y las comas. Si algo deja de funcionar, revisá las comas.
   ============================================================================ */
window.JUEGOS = window.JUEGOS || {};
window.JUEGOS.historia = {
  modulo: "Historia",
  orden: 3,
  activo: true,
  icono: "img/juegos/historia.svg",    // ícono del menú: una imagen (img/juegos/…) o un emoji
  nombre: { es: "In this city…", en: "In this city…" },
  descripcion: {
    es: "Historias interactivas al estilo de los videos \"In this city…\": escuchá la narración en inglés y elegí o escribí la palabra correcta para seguir. Tus respuestas cambian el final.",
    en: "Interactive stories in the style of the \"In this city…\" videos: listen to the narration and pick or type the right word to go on. Your answers change the ending."
  },

  config: {
    msPorPalabra: 300,             // milisegundos entre palabra y palabra al aparecer el texto
    velocidades: { lenta: 1.5, normal: 1, rapida: 0.65 },  // multiplican msPorPalabra (más grande = más lento)
    velocidadPorDefecto: "normal", // la opción que viene elegida: "lenta", "normal" o "rapida"
    narrar: true,                  // la voz lee cada escena en inglés (se puede apagar en el juego)
    velocidadVoz: 0.9,             // velocidad de la voz (1 = normal; con "lenta" se usa 0.7)
    subtitulos: true,              // mostrar la traducción al español debajo del texto
    textoHueco: "blank",           // lo que dice la voz cuando llega a un hueco ___
    barajarOpciones: true,         // mezclar el orden de las opciones en cada pregunta
    segundosAutoAvance: 0,         // 0 = hay que hacer clic para seguir · N = sigue sola a los N segundos
    musica: true,                  // música de fondo encendida al abrir el juego
    efectos: true,                 // efectos de sonido encendidos al abrir el juego
    volumenMusica: 0.35,           // de 0 (mudo) a 1
    musicaArchivo: "audio/musica-historia.mp3", // canción de fondo (se repite en loop). Si el archivo no está, suena la música generada
    volumenArchivo: 0.4,           // volumen de esa canción, de 0 a 1 (más bajo si tapa la voz)
    bajarMusicaAlHablar: 0.45,     // mientras habla la voz, la canción baja a este porcentaje (1 = no baja)
    segundosPorAcorde: 4,          // cuánto dura cada acorde de la música
    voz: {
      // voces que se buscan primero, en este orden (alcanza con una parte del nombre).
      // Las "Natural" de Microsoft Edge (Jenny, Aria) son las más parecidas a la voz de TikTok.
      preferidas: ["Jenny", "Aria", "Michelle", "Google US English", "Samantha", "Zira"],
      tono: 1.1,                   // 1 = normal · más alto = voz más aguda (TikTok suena un poco aguda)
      velocidad: 1.0,              // 1 = normal (con la velocidad "Lenta" se multiplica por 0.75)
      frasePrueba: "In this city, nobody sleeps. Not even the servers.",
      // VOCES GRABADAS (suenan mucho mejor, en cualquier navegador). Se crean con herramientas\generar-voces.bat
      // Voces que quedan bien: "en-US-JennyNeural", "en-US-AriaNeural", "en-US-AvaNeural", "en-US-EmmaNeural",
      // "en-US-AnaNeural" (voz de nena), "en-US-GuyNeural" y "en-US-AndrewNeural" (voces de hombre).
      // Si cambiás algo de acá, volvé a ejecutar generar-voces.bat.
      // EFECTO al reproducir las voces grabadas (no hace falta regrabar si lo cambiás):
      // los videos de "In this town…" aceleran la voz sin conservar el tono, así suena más rápida y un poco más aguda.
      // Medido en el video del usuario: ~22% más rápido y más agudo que Brian normal.
      efecto: {
        velocidad: 1.22,           // 1 = normal · 1.22 = como el video · 1.1 = un poco más rápido
        mantenerTono: false        // false = al acelerar se vuelve más aguda (como en el video) · true = solo más rápida
      },
      // Para elegir de oído: herramientas\probar-voces.bat
      neural: {
        motor: "elevenlabs",       // "edge" = voces de Microsoft (gratis, sin cuenta) · "elevenlabs" = Adam, Antoni, Brian… (cuenta gratis + clave)
        voz: "en-US-BrianNeural",  // voz de Edge (elegida por el usuario). Más expresiva: "en-US-BrianMultilingualNeural"
        velocidad: "+0%",          // Edge: "+10%" más rápido · "-10%" más lento
        tono: "+0Hz",              // Edge: "+20Hz" más aguda · "-10Hz" más grave
        // pausas: cada oración se graba aparte y entre ellas queda un silencio real (en milisegundos)
        pausas: {
          separar: true,           // false = graba la frase entera de una vez (sin pausas extra)
          oracion: 380,            // después de un punto, signo de pregunta o de exclamación
          suspensivos: 750         // después de "…" (pausa dramática, como en los videos)
        },
        elevenlabs: {
          voz: "Adam",             // elegida por el usuario (muestra "Adam, expresivo"). Otras: "Brian", "Antoni", "Bill", "Daniel", "Arnold" (o el id de otra voz)
          velocidad: 1.0,          // 0.9 = un poco más lento · 1 = normal (el efecto de abajo también acelera)
          estabilidad: 0.35,       // 0 a 1: más bajo = el tono varía más (más natural/expresivo) · más alto = más parejo
          estilo: 0.3,             // 0 a 1: cuánto "actúa" la voz (más alto = más dramático)
          modelo: "eleven_multilingual_v2", // "eleven_v3" = más expresivo pero sin pausas exactas (si tu plan no lo tiene, usa v2)
          pausas: {                // pausas exactas dentro de la frase, en segundos (solo con eleven_multilingual_v2)
            suspensivos: 0.7,      // después de "…"
            oracion: 0.3           // entre oración y oración (0 = la que haga la voz sola)
          }
        }
      }
    },
    vocesPorPersonaje: false       // true = cada personaje habla con su propio tono (ver "personajes")
  },

  /* PERSONAJES 2D (dibujados con código, con animaciones)
     piel, pelo, ropa, pantalon, ojos: colores ("#rrggbb")
     peinado:    "corto" · "rodete" · "largo" · "pelado" · "gorra" · "capucha"
     extras:     lista con "lentes", "auriculares", "headset", "corbata", "buzo", "barba", "bigote"
     voz:        tono propio (solo se usa si vocesPorPersonaje es true)
     En cada escena:  personajes: ["yo", "mara:feliz"]   (id del personaje y, opcional, su emoción)
                      habla: "mara"   (ese personaje mueve la boca y su nombre aparece arriba del texto)
     Emociones: normal · feliz · triste · sorpresa · enojado · miedo · pensando
     Si una escena no tiene "personajes", quedan los de la escena anterior. personajes: [] = no hay nadie. */
  personajes: {
    yo:       { nombre: "You",   piel: "#f1c7a3", pelo: "#3b2a1e", peinado: "corto",   ropa: "#2f6feb", extras: ["buzo", "auriculares"], voz: { tono: 1.1 } },
    mara:     { nombre: "Mara",  piel: "#c98e62", pelo: "#1b1b1b", peinado: "rodete",  ropa: "#2ea043", extras: ["headset"], voz: { tono: 1.3 } },
    leo:      { nombre: "Leo",   piel: "#e6b48f", pelo: "#c9c9c9", peinado: "pelado",  ropa: "#6b5440", extras: ["lentes", "barba"], voz: { tono: 0.75 } },
    jefe:     { nombre: "Boss",  piel: "#f0c9a8", pelo: "#5a5a5a", peinado: "corto",   ropa: "#30363d", extras: ["corbata", "lentes"], voz: { tono: 0.85 } },
    guardia:  { nombre: "Guard", piel: "#a8714f", pelo: "#2b2b2b", peinado: "gorra",   ropa: "#1f3a5f", extras: ["bigote"], voz: { tono: 0.9 } },
    atacante: { nombre: "???",   piel: "#2a2a35", pelo: "#111111", peinado: "capucha", ropa: "#15151c", ojos: "#ff3b3b", extras: [], voz: { tono: 0.5 } }
  },

  musicaNotas: {
    acordes: [[45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 62], [40, 47, 52, 55]]
  },

  textos: {
    es: {
      title: "IN THIS CITY…",
      sub: "Historias cortas narradas en inglés. Para seguir, completá con la palabra correcta del glosario.",
      how1: "El texto aparece palabra por palabra y la voz lo lee en inglés. Abajo tenés los subtítulos en español.",
      how2: "Cuando aparece un hueco ___, elegí la palabra (o escribila) para que la historia siga.",
      how3: "En algunas escenas no hay respuesta correcta: vos elegís el camino. Cada historia tiene varios finales.",
      how4: "Clic, Enter o Espacio = seguir · 1, 2, 3 = elegir opción · Esc = pausa · CC subtítulos · 🗣 voz · ♫ música.",
      pick: "Historia",
      speed: "Velocidad",
      slow: "Lenta",
      normal: "Normal",
      fast: "Rápida",
      subs: "Subtítulos",
      voice: "Voz",
      voiceAuto: "Automática",
      test: "▶ Probar",
      voiceTip: "Las voces del navegador suenan robóticas. Para voces naturales en cualquier navegador, ejecutá herramientas\\generar-voces.bat una vez (ver herramientas\\LEEME-voces.txt).",
      voiceRec: "Voces grabadas",
      voiceRecTip: "Usando voces grabadas (%v) · %n frases.",
      on: "Sí",
      off: "No",
      start: "¡Empezar!",
      back: "← Juegos",
      cont: "clic o Enter para seguir ▸",
      choose: "Elegí la palabra correcta",
      type: "Escribí la palabra en inglés",
      path: "Vos decidís",
      hint: "Pista",
      letter: "Primera letra",
      ph: "escribí en inglés…",
      send: "Responder",
      ok: "¡Correcto!",
      was: "Era:",
      paused: "PAUSA",
      resume: "Continuar",
      quit: "Salir",
      hits: "ACIERTOS",
      errs: "ERRORES",
      endings: "FINALES",
      ending: "FINAL",
      newEnding: "¡Final nuevo!",
      review: "Para repasar",
      none: "¡Nada para repasar! Historia perfecta.",
      again: "Jugar de nuevo",
      others: "Otras historias",
      found: "finales descubiertos",
      broken: "La historia tiene un error: no existe la escena"
    },
    en: {
      title: "IN THIS CITY…",
      sub: "Short stories narrated in English. To go on, fill in the right glossary word.",
      how1: "The text appears word by word and the voice reads it in English. Spanish subtitles are shown below.",
      how2: "When a blank ___ appears, pick the word (or type it) so the story can go on.",
      how3: "Some scenes have no right answer: you choose the path. Each story has several endings.",
      how4: "Click, Enter or Space = continue · 1, 2, 3 = pick an option · Esc = pause · CC subtitles · 🗣 voice · ♫ music.",
      pick: "Story",
      speed: "Speed",
      slow: "Slow",
      normal: "Normal",
      fast: "Fast",
      subs: "Subtitles",
      voice: "Voice",
      voiceAuto: "Automatic",
      test: "▶ Test",
      voiceTip: "Browser voices sound robotic. For natural voices in any browser, run herramientas\\generar-voces.bat once (see herramientas\\LEEME-voces.txt).",
      voiceRec: "Recorded voices",
      voiceRecTip: "Using recorded voices (%v) · %n lines.",
      on: "On",
      off: "Off",
      start: "Start!",
      back: "← Games",
      cont: "click or Enter to continue ▸",
      choose: "Pick the right word",
      type: "Type the word in English",
      path: "You decide",
      hint: "Hint",
      letter: "First letter",
      ph: "type in English…",
      send: "Answer",
      ok: "Correct!",
      was: "It was:",
      paused: "PAUSED",
      resume: "Resume",
      quit: "Quit",
      hits: "CORRECT",
      errs: "WRONG",
      endings: "ENDINGS",
      ending: "ENDING",
      newEnding: "New ending!",
      review: "To review",
      none: "Nothing to review! Perfect story.",
      again: "Play again",
      others: "Other stories",
      found: "endings found",
      broken: "The story has an error: this scene does not exist"
    }
  },

  /* ==========================================================================
     HISTORIAS
     ========================================================================== */
  historias: [

    /* ------------------------------------------------------------------------
       1) IN THIS CITY…  (seguridad y redes) · 3 finales
       ------------------------------------------------------------------------ */
    {
      id: "city",
      titulo: "In this city…",
      subtitulo: { es: "Un ataque deja a oscuras la ciudad. Seguridad y redes.", en: "An attack leaves the city in the dark. Security and networks." },
      inicio: "s1",
      escenas: {
        s1: { personajes: [], fondo: "noche", texto: "In this city, the lights stay on only while the code is running.",
              es: "En esta ciudad, las luces siguen encendidas solo mientras el código está corriendo.", ir: "s2" },
        s2: { texto: "Every building is a {server}. Every street is part of the {network}.",
              es: "Cada edificio es un servidor. Cada calle es parte de la red.", ir: "s3" },
        s3: { personajes: ["yo"], texto: "And you… you are the new junior {developer}.",
              es: "Y vos… sos el nuevo desarrollador junior.", ir: "s4" },
        s4: { personajes: ["yo:sorpresa"], fondo: "apagon", texto: "Tonight, at 3 a.m., your phone rings. The whole east side just went dark.",
              es: "Esta noche, a las 3 de la mañana, te suena el teléfono. Todo el lado este se acaba de quedar a oscuras.", ir: "s5" },
        s5: { personajes: ["atacante", "yo:miedo"], fondo: "alerta", texto: "Thousands of fake requests are hitting the same server at once. It's a ___.",
              es: "Miles de solicitudes falsas están golpeando el mismo servidor a la vez. Es un ___.",
              elegir: { opciones: ["DDoS attack", "cookie", "compiler"], correcta: "DDoS attack", siBien: "s6", siMal: "s5x" } },
        s5x: { personajes: ["atacante:feliz", "yo:triste"], texto: "You hesitate. The attack spreads to another district. Think again.",
               es: "Dudás. El ataque se extiende a otro barrio. Pensalo de nuevo.", ir: "s5" },
        s6: { personajes: ["yo:miedo"], texto: "You open the {terminal}. Your hands are shaking.",
              es: "Abrís la terminal. Te tiemblan las manos.", ir: "s7" },
        s7: { personajes: ["mara", "yo:pensando", "leo"], texto: "Two people call you at the same time. Who do you answer?",
              es: "Dos personas te llaman al mismo tiempo. ¿A quién le contestás?",
              camino: [
                { texto: "Mara, the network engineer", es: "Mara, la ingeniera de redes", ir: "n1" },
                { texto: "Leo, the old hacker", es: "Leo, el viejo hacker", ir: "h1" }
              ] },

        /* --- camino de Mara (redes) --- */
        n1: { personajes: ["yo", "mara"], habla: "mara", fondo: "noche", texto: "Mara says: \"We need a wall between the city and the attackers.\"",
              es: "Mara dice: \"Necesitamos un muro entre la ciudad y los atacantes.\"", ir: "n2" },
        n2: { personajes: ["yo:miedo", "mara:enojado"], habla: "mara", fondo: "alerta", texto: "\"Turn on the ___, now!\"",
              es: "\"¡Activá el ___, ya!\"",
              escribir: { respuestas: ["firewall"], pista: "cortafuegos", siBien: "n3", siMal: "n2x" } },
        n2x: { personajes: ["yo:triste", "mara:enojado"], habla: "mara", texto: "Nothing happens. The traffic keeps coming. Mara screams: \"The {firewall}!\"",
               es: "No pasa nada. El tráfico sigue llegando. Mara grita: \"¡El firewall!\"", ir: "n3" },
        n3: { personajes: ["yo:feliz", "mara:feliz"], fondo: "verde", texto: "The {firewall} rises like a glowing wall around the city.",
              es: "El firewall se levanta como un muro brillante alrededor de la ciudad.", ir: "n4" },
        n4: { personajes: ["yo:pensando", "mara:triste"], fondo: "noche", texto: "But the servers are still slow. Too many people share the same connection. You need more ___.",
              es: "Pero los servidores siguen lentos. Demasiada gente comparte la misma conexión. Necesitás más ___.",
              elegir: { opciones: ["bandwidth", "whitespace", "syntax"], correcta: "bandwidth", siBien: "n5", siMal: "n4x" } },
        n4x: { personajes: ["yo:miedo", "mara:sorpresa"], fondo: "apagon", texto: "The city freezes for ten seconds. Everyone notices.",
               es: "La ciudad se congela diez segundos. Todos se dan cuenta.", ir: "n5" },
        n5: { personajes: ["yo:feliz", "mara:feliz"], habla: "mara", fondo: "verde", texto: "Slowly, the east side comes back online. Mara smiles: \"Not bad, rookie.\"",
              es: "De a poco, el lado este vuelve a estar en línea. Mara sonríe: \"Nada mal, novato.\"", ir: "c1" },

        /* --- camino de Leo (seguridad) --- */
        h1: { personajes: ["yo", "leo"], fondo: "sotano", texto: "Leo lives in a basement full of old {workstation}s.",
              es: "Leo vive en un sótano lleno de estaciones de trabajo viejas.", ir: "h2" },
        h2: { personajes: ["yo:sorpresa", "leo:pensando"], habla: "leo", texto: "He whispers: \"The attack came through an email. Someone clicked a fake link.\"",
              es: "Susurra: \"El ataque entró por un mail. Alguien hizo clic en un link falso.\"", ir: "h3" },
        h3: { personajes: ["yo:pensando", "leo"], habla: "leo", texto: "\"That's ___. The oldest trick in the book.\"",
              es: "\"Eso es ___. El truco más viejo del mundo.\"",
              elegir: { opciones: ["phishing", "refactor", "hosting"], correcta: "phishing", siBien: "h4", siMal: "h3x" } },
        h3x: { personajes: ["yo:triste", "leo:feliz"], habla: "leo", texto: "Leo laughs. \"No, kid. It was {phishing}. Learn the words, or this city eats you.\"",
               es: "Leo se ríe. \"No, pibe. Era phishing. Aprendé las palabras o esta ciudad te come.\"", ir: "h4" },
        h4: { personajes: ["yo:miedo", "leo:enojado"], habla: "leo", texto: "\"They stole a {password}. They are already inside.\"",
              es: "\"Robaron una contraseña. Ya están adentro.\"", ir: "h5" },
        h5: { personajes: ["yo:pensando", "leo"], texto: "Leo looks at you and offers you a choice.",
              es: "Leo te mira y te ofrece una elección.",
              camino: [
                { texto: "Follow the rules: report it to the security team", es: "Seguir las reglas: avisarle al equipo de seguridad", ir: "c1" },
                { texto: "Hack them back", es: "Hackearlos de vuelta", ir: "x1" }
              ] },
        x1: { personajes: ["yo:enojado"], fondo: "alerta", texto: "You write a quick script to attack the attackers.",
              es: "Escribís un script rápido para atacar a los atacantes.", ir: "x2" },
        x2: { personajes: ["yo:sorpresa"], texto: "But your script has a ___. It deletes your own {database}.",
              es: "Pero tu script tiene un ___. Borra tu propia base de datos.",
              elegir: { opciones: ["bug", "patch", "benchmark"], correcta: "bug", siBien: "x3" } },
        x3: { personajes: ["yo:triste"], fondo: "apagon", texto: "Every light in the city goes out. In this city, revenge always crashes.",
              es: "Se apagan todas las luces de la ciudad. En esta ciudad, la venganza siempre termina en caída.",
              final: { id: "crash", titulo: { es: "SYSTEM CRASH", en: "SYSTEM CRASH" } } },

        /* --- los dos caminos se juntan --- */
        c1: { personajes: ["yo", "jefe:pensando"], fondo: "noche", texto: "Back at the office, your boss reads the logs in silence.",
              es: "De vuelta en la oficina, tu jefe lee los registros en silencio.", ir: "c2" },
        c2: { personajes: ["yo", "jefe"], habla: "jefe", texto: "\"From now on, everyone needs a password and a code on their phone.\" That's called ___.",
              es: "\"De ahora en más, todos necesitan una contraseña y un código en el celular.\" Eso se llama ___.",
              elegir: { opciones: ["two-factor authentication", "garbage collection", "lazy loading"], correcta: "two-factor authentication", siBien: "c3", siMal: "c2x" } },
        c2x: { personajes: ["yo:triste", "jefe:enojado"], habla: "jefe", texto: "Your boss frowns. \"{Two-factor authentication}. Write that down.\"",
               es: "Tu jefe frunce el ceño. \"Autenticación de dos factores. Anotalo.\"", ir: "c3" },
        c3: { personajes: ["yo:pensando", "jefe:enojado"], habla: "jefe", texto: "\"Someone left a door open. Find the weak point in our code.\"",
              es: "\"Alguien dejó una puerta abierta. Encontrá el punto débil en nuestro código.\"", ir: "c4" },
        c4: { personajes: ["yo:pensando"], texto: "You search line by line until you find the ___.",
              es: "Buscás línea por línea hasta que encontrás la ___.",
              escribir: { respuestas: ["vulnerability"], pista: "vulnerabilidad", siBien: "c5" } },
        c5: { personajes: ["yo:sorpresa"], texto: "One line of old code, forgotten for years.",
              es: "Una línea de código viejo, olvidada durante años.", ir: "c6" },
        c6: { personajes: ["yo:pensando"], texto: "You write a small update to fix it. A security ___.",
              es: "Escribís una pequeña actualización para arreglarlo. Un ___ de seguridad.",
              escribir: { respuestas: ["patch"], pista: "parche", siBien: "c7" } },
        c7: { personajes: ["yo:feliz"], fondo: "amanecer", texto: "You {deploy} the fix at 6 a.m. The sun rises over the city.",
              es: "Desplegás el arreglo a las 6 de la mañana. El sol sale sobre la ciudad.", ir: "c8" },
        c8: { condicion: { erroresMax: 2, siCumple: "fin1", siNo: "fin2" } },
        fin1: { personajes: ["yo:feliz", "jefe:feliz"], texto: "In this city, nobody knows your name. But tonight, you kept the lights on.",
                es: "En esta ciudad, nadie sabe tu nombre. Pero esta noche, mantuviste las luces encendidas.",
                final: { id: "luces", titulo: { es: "LUCES ENCENDIDAS", en: "LIGHTS ON" } } },
        fin2: { personajes: ["yo:pensando", "atacante"], fondo: "noche", texto: "The city is back… but the attackers will return. In this city, you never stop learning.",
                es: "La ciudad volvió… pero los atacantes van a volver. En esta ciudad, nunca dejás de aprender.",
                final: { id: "continuara", titulo: { es: "CONTINUARÁ…", en: "TO BE CONTINUED…" } } }
      }
    },

    /* ------------------------------------------------------------------------
       2) IN THIS TOWN…  (bases de datos y phrasal verbs) · 2 finales
       ------------------------------------------------------------------------ */
    {
      id: "town",
      titulo: "In this town…",
      subtitulo: { es: "Un pueblo que se olvidó de todo. Bases de datos y phrasal verbs.", en: "A town that forgot everything. Databases and phrasal verbs." },
      inicio: "t1",
      escenas: {
        t1: { personajes: [], fondo: "noche", texto: "In this town, nobody remembers anything.",
              es: "En este pueblo, nadie se acuerda de nada.", ir: "t2" },
        t2: { texto: "Everything is stored in one giant {database}, under the old library.",
              es: "Todo está guardado en una base de datos gigante, debajo de la vieja biblioteca.", ir: "t3" },
        t3: { personajes: ["yo:sorpresa"], fondo: "apagon", texto: "One morning, you {log in}… and every {record} is gone.",
              es: "Una mañana, iniciás sesión… y no queda ni un registro.", ir: "t4" },
        t4: { personajes: ["yo:pensando", "guardia"], texto: "Luckily, the night guard always remembers to ___ the data.",
              es: "Por suerte, el guardia nocturno siempre se acuerda de ___ los datos.",
              elegir: { opciones: ["back up", "shut down", "log out"], correcta: "back up", siBien: "t5", siMal: "t4x" } },
        t4x: { personajes: ["yo:triste", "guardia"], habla: "guardia", texto: "No… He doesn't turn it off. He makes a copy. He backs it up, every single night.",
               es: "No… No lo apaga. Hace una copia. La respalda, todas las noches.", ir: "t5" },
        t5: { personajes: ["yo", "guardia"], fondo: "sotano", texto: "You find the copy. But to get the data back, you must speak the language of databases.",
              es: "Encontrás la copia. Pero para recuperar los datos, tenés que hablar el idioma de las bases de datos.", ir: "t6" },
        t6: { personajes: ["yo:pensando", "guardia"], texto: "That language is ___.",
              es: "Ese idioma es ___.",
              elegir: { opciones: ["SQL", "CSS", "PHP"], correcta: "SQL", siBien: "t7", siMal: "t6x" } },
        t6x: { personajes: ["yo:triste", "guardia:feliz"], habla: "guardia", texto: "\"{SQL},\" says the guard. \"Structured Query Language.\"",
               es: "\"SQL\", dice el guardia. \"Lenguaje de consulta estructurado.\"", ir: "t7" },
        t7: { personajes: ["yo:feliz", "guardia"], texto: "You write your first {query}. The screen fills with names.",
              es: "Escribís tu primera consulta. La pantalla se llena de nombres.", ir: "t8" },
        t8: { personajes: ["yo:pensando"], texto: "Every record needs a unique ID. That ID is the ___.",
              es: "Cada registro necesita un ID único. Ese ID es la ___.",
              escribir: { respuestas: ["primary key"], pista: "clave primaria", siBien: "t9" } },
        t9: { personajes: ["yo:sorpresa", "guardia:pensando"], fondo: "verde", texto: "The data is back. But some records belong to people who never lived here.",
              es: "Los datos volvieron. Pero algunos registros son de gente que nunca vivió acá.",
              camino: [
                { texto: "Investigate", es: "Investigar", ir: "t10" },
                { texto: "Ignore it and go home", es: "Ignorarlo e irte a tu casa", ir: "fin2" }
              ] },
        t10: { personajes: ["yo:enojado", "atacante"], fondo: "alerta", texto: "A hidden program was copying data from websites in other towns, automatically. That's ___.",
               es: "Un programa oculto estaba copiando datos de sitios web de otros pueblos, automáticamente. Eso es ___.",
               elegir: { opciones: ["web scraping", "web page", "routing"], correcta: "web scraping", siBien: "t11", siMal: "t10x" } },
        t10x: { personajes: ["yo:miedo", "atacante:feliz"], texto: "It was {web scraping}. Silent. Automatic. Everywhere.",
                es: "Era web scraping. Silencioso. Automático. En todas partes.", ir: "t11" },
        t11: { personajes: ["yo:enojado", "atacante:miedo"], texto: "You find the computer behind the program, and you ___ the whole system.",
               es: "Encontrás la computadora que está detrás del programa y ___ todo el sistema.",
               elegir: { opciones: ["shut down", "set up", "boot up"], correcta: "shut down", siBien: "fin1" } },
        fin1: { personajes: ["yo:feliz", "guardia:feliz"], fondo: "amanecer", texto: "In this town, nobody remembers anything. But now, at least, the data is safe.",
                es: "En este pueblo, nadie se acuerda de nada. Pero ahora, por lo menos, los datos están a salvo.",
                final: { id: "seguro", titulo: { es: "DATOS A SALVO", en: "SAFE DATA" } } },
        fin2: { personajes: ["yo:triste"], fondo: "noche", texto: "You go home. In this town, nobody remembers anything… not even you.",
                es: "Te vas a tu casa. En este pueblo, nadie se acuerda de nada… ni siquiera vos.",
                final: { id: "olvido", titulo: { es: "OLVIDADO", en: "FORGOTTEN" } } }
      }
    }

  ]
};
