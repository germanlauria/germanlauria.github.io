/* ============================================================================
   JUEGO: EL ROSCO · datos y configuración
   ----------------------------------------------------------------------------
   Podés editar este archivo a mano (con el Bloc de notas o VS Code) y recargar la página.
     nombre / descripcion   lo que se ve en el menú "Juegos" (es = español, en = inglés)
     orden                  posición en el menú (1 = primero)
     activo                 true = aparece en el menú · false = queda oculto
     config                 números y opciones del juego (cada uno tiene su explicación)
     textos                 todos los textos que se ven en el juego, en español y en inglés
     musicaNotas            la música del juego, nota por nota (números MIDI: 60 = do central,
                            +1 = medio tono más agudo, +12 = una octava; 0 = silencio)

   Respetá las comillas "...", los dos puntos y las comas al final de cada línea.
   Si algo deja de funcionar, revisá que no falte o sobre una coma.
   ============================================================================ */
window.JUEGOS = window.JUEGOS || {};
window.JUEGOS.rosco = {
  modulo: "Rosco",
  orden: 2,
  activo: true,
  icono: "img/juegos/rosco.svg",    // ícono del menú: una imagen (img/juegos/…) o un emoji
  nombre: { es: "El Rosco", en: "The Rosco" },
  descripcion: {
    es: "Una palabra por cada letra del abecedario: adiviná cuál es a partir de su definición antes de que se acabe el tiempo.",
    en: "One word for each letter of the alphabet: guess it from its definition before time runs out."
  },

  config: {
    letras: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",  // letras del rosco (si una no tiene palabras, se saltea)
    tiempos: [150, 200, 250],      // opciones de tiempo (segundos) en la pantalla de inicio
    tiempoPorDefecto: 200,         // la opción que viene elegida
    minLetras: 10,                 // letras mínimas para poder armar el rosco
    msCorrecto: 650,               // milisegundos que se muestra el "¡Correcto!" (el reloj se frena)
    msError: 1900,                 // milisegundos que se muestra la respuesta correcta al fallar
    segundosAlarma: 10,            // en los últimos N segundos suena un tic por segundo
    segundosMusicaRapida: 20,      // en los últimos N segundos la música se acelera
    musica: true,                  // música encendida al abrir el juego
    efectos: true,                 // efectos de sonido encendidos al abrir el juego
    volumenMusica: 0.55,           // de 0 (mudo) a 1
    tempo: 120,                    // velocidad normal de la música (pulsos por minuto)
    tempoRapido: 150               // velocidad en los últimos segundos
  },

  musicaNotas: {
    bajo:    [45, 45, 57, 45, 43, 43, 55, 43, 41, 41, 53, 41, 40, 40, 52, 44],
    melodia: [69, 0, 72, 0, 76, 0, 72, 74, 0, 72, 0, 71, 69, 0, 68, 0]
  },

  textos: {
    es: {
      title: "EL ROSCO",
      sub: "Una palabra del glosario por cada letra. Leé la definición y adiviná cuál es antes de que se acabe el tiempo.",
      how1: "En cada letra aparece una definición: escribí la palabra que EMPIEZA con esa letra (o que la CONTIENE, si así lo indica).",
      how2: "Enter = responder · Enter sin escribir nada o el botón = ¡Pasapalabra! (la letra vuelve al final de la ronda).",
      how3: "Si te equivocás, la letra queda en rojo y se muestra la respuesta. El reloj sigue corriendo: cuando llega a 0, se termina.",
      how4: "Los acentos son opcionales. 🔊 lee la definición en voz alta · Esc = pausa · ♫ música · ♪ efectos.",
      dir: "Dirección",
      dEs: "Español → Inglés",
      dEn: "Inglés → Español",
      dMix: "Mixto",
      dEsH: "Definición en español → respondés en inglés.",
      dEnH: "Definición en inglés → respondés en español.",
      dMixH: "Cada letra puede venir en cualquiera de los dos idiomas.",
      time: "Tiempo",
      start: "¡Empezar!",
      best: "MEJOR",
      starts: "EMPIEZA CON",
      contains: "CONTIENE LA",
      ansEn: "Respondé en inglés",
      ansEs: "Respondé en español",
      ph: "escribí la respuesta…",
      send: "Responder",
      pass: "¡Pasapalabra!",
      was: "Era:",
      ok: "¡Correcto!",
      paused: "PAUSA",
      resume: "Continuar",
      quit: "Salir",
      hits: "ACIERTOS",
      errs: "ERRORES",
      left: "SIN RESPONDER",
      full: "¡ROSCO COMPLETO!",
      timeUp: "¡SE ACABÓ EL TIEMPO!",
      done: "FIN DEL ROSCO",
      review: "Para repasar",
      none: "¡Nada para repasar! Rosco perfecto.",
      again: "Jugar de nuevo",
      nb: "¡Nuevo récord!",
      few: "No hay suficientes palabras con definición para armar el rosco.",
      back: "← Juegos"
    },
    en: {
      title: "THE ROSCO",
      sub: "One glossary word for each letter. Read the definition and guess the word before time runs out.",
      how1: "Each letter shows a definition: type the word that STARTS with that letter (or that CONTAINS it, when it says so).",
      how2: "Enter = answer · Enter with nothing typed or the button = Pass! (the letter goes to the end of the round).",
      how3: "If you are wrong, the letter turns red and the answer is shown. The clock keeps running: when it hits 0, the game ends.",
      how4: "Accents are optional. 🔊 reads the definition aloud · Esc = pause · ♫ music · ♪ sound effects.",
      dir: "Direction",
      dEs: "Spanish → English",
      dEn: "English → Spanish",
      dMix: "Mixed",
      dEsH: "Definition in Spanish → answer in English.",
      dEnH: "Definition in English → answer in Spanish.",
      dMixH: "Each letter can come in either language.",
      time: "Time",
      start: "Start!",
      best: "BEST",
      starts: "STARTS WITH",
      contains: "CONTAINS",
      ansEn: "Answer in English",
      ansEs: "Answer in Spanish",
      ph: "type your answer…",
      send: "Answer",
      pass: "Pass!",
      was: "It was:",
      ok: "Correct!",
      paused: "PAUSED",
      resume: "Resume",
      quit: "Quit",
      hits: "CORRECT",
      errs: "WRONG",
      left: "UNANSWERED",
      full: "PERFECT ROSCO!",
      timeUp: "TIME IS UP!",
      done: "END OF THE ROSCO",
      review: "To review",
      none: "Nothing to review! Perfect rosco.",
      again: "Play again",
      nb: "New high score!",
      few: "There are not enough words with definitions to build the rosco.",
      back: "← Games"
    }
  }
};
