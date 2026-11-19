/* ============================================================================
   GLOSARIO TÉCNICO · BASE DE DATOS
   ----------------------------------------------------------------------------
   Podés editar este archivo a mano. Cada término es un bloque { ... } con:

     term       palabra o expresión en inglés
     pron       pronunciación escrita (sílaba tónica en MAYÚSCULA)
     es         traducción al español
     type       noun | verb | adjective | adverb | phrasal verb | abbreviation | expression
     category   hardware | ports | memory | langs | dev | web | data | networks | security | phrasal
     def        definición en inglés (la usa el juego del Rosco)
     defEs      definición en español (la usa el juego del Rosco)
     example    frase de ejemplo en inglés
     exampleEs  ejemplo traducido al español (opcional: puede quedar "")
     note       aclaración (opcional: puede quedar "")

   Para agregar un término: copiá un bloque entero, pegalo y cambiá los textos.
   Respetá las comillas "..." y la coma al final de cada línea (menos la última).
   Cada vez que guardás un cambio desde la página, este archivo se reordena solo:
   agrupado por categoría y en orden alfabético.
   ============================================================================ */
window.GLOSARIO = {
  version: 1,
  words: [

    // ══════════════════════════════════════════════════════════════════════
    //  HARDWARE  (category: "hardware")  ·  13 términos
    // ══════════════════════════════════════════════════════════════════════

    {
      term:      "cooling fan",
      pron:      "CU-lin FAN",
      es:        "ventilador de refrigeración",
      type:      "noun",
      category:  "hardware",
      def:       "A spinning part that blows air to keep computer components from overheating.",
      defEs:     "Pieza que gira y mueve aire para evitar que los componentes de la computadora se recalienten.",
      example:   "The cooling fan keeps the CPU from overheating.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "CPU",
      pron:      "si-pi-IU",
      es:        "unidad central de procesamiento",
      type:      "abbreviation",
      category:  "hardware",
      def:       "The main chip that executes instructions and does most of the calculations in a computer.",
      defEs:     "Chip principal que ejecuta las instrucciones y hace la mayoría de los cálculos de la computadora.",
      example:   "The CPU controls the other connected units.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "embedded device",
      pron:      "em-BE-ded di-VAIS",
      es:        "dispositivo embebido",
      type:      "noun",
      category:  "hardware",
      def:       "A small computer built inside another machine to do one specific job.",
      defEs:     "Pequeña computadora integrada dentro de otra máquina para cumplir una sola tarea específica.",
      example:   "Java also runs on embedded devices.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "firmware",
      pron:      "FERM-uer",
      es:        "firmware",
      type:      "noun",
      category:  "hardware",
      def:       "Permanent low-level software stored in a device's chip that controls its hardware.",
      defEs:     "Software de bajo nivel guardado de forma permanente en un chip, que controla el hardware de un aparato.",
      example:   "Update the firmware to fix the bug.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "GPU",
      pron:      "yi-pi-IU",
      es:        "unidad de procesamiento gráfico",
      type:      "abbreviation",
      category:  "hardware",
      def:       "A chip specialized in creating images, video and 3D graphics very quickly.",
      defEs:     "Chip especializado en generar imágenes, video y gráficos 3D muy rápidamente.",
      example:   "A GPU accelerates graphics and AI tasks.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "heat sink",
      pron:      "JIT SINK",
      es:        "disipador de calor",
      type:      "noun",
      category:  "hardware",
      def:       "A metal piece with fins that absorbs and spreads heat away from a chip.",
      defEs:     "Pieza metálica con aletas que absorbe el calor de un chip y lo dispersa.",
      example:   "A heat sink absorbs heat from the processor.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "network",
      pron:      "NET-uerk",
      es:        "red",
      type:      "noun",
      category:  "hardware",
      def:       "A group of computers and devices connected so they can share data.",
      defEs:     "Grupo de computadoras y dispositivos conectados entre sí para compartir información.",
      example:   "Our team keeps the network running smoothly.",
      exampleEs: "Nuestro equipo mantiene la red funcionando sin problemas.",
      note:      ""
    },

    {
      term:      "peripheral",
      pron:      "pe-RI-fe-ral",
      es:        "periférico",
      type:      "noun",
      category:  "hardware",
      def:       "An external device connected to a computer, like a mouse, keyboard or printer.",
      defEs:     "Dispositivo externo que se conecta a la computadora, como un mouse, un teclado o una impresora.",
      example:   "A mouse is a peripheral.",
      exampleEs: "Un mouse es un periférico.",
      note:      ""
    },

    {
      term:      "power supply unit",
      pron:      "PAU-er su-PLAI IU-nit",
      es:        "fuente de alimentación",
      type:      "noun",
      category:  "hardware",
      def:       "The component that converts electricity from the wall into the power the computer needs.",
      defEs:     "Componente que transforma la electricidad del enchufe en la energía que necesita la computadora.",
      example:   "The power supply unit feeds every component.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "processor",
      pron:      "PRA-se-ser",
      es:        "procesador",
      type:      "noun",
      category:  "hardware",
      def:       "The chip that reads and carries out the instructions of programs.",
      defEs:     "Chip que lee y ejecuta las instrucciones de los programas.",
      example:   "A faster processor improves performance.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "server",
      pron:      "SER-ver",
      es:        "servidor",
      type:      "noun",
      category:  "hardware",
      def:       "A powerful computer that provides data or services to other computers over a network.",
      defEs:     "Computadora potente que ofrece datos o servicios a otras computadoras a través de una red.",
      example:   "The network administrator checks the server logs every morning.",
      exampleEs: "El administrador de red revisa los registros del servidor cada mañana.",
      note:      ""
    },

    {
      term:      "smart card",
      pron:      "SMART CARD",
      es:        "tarjeta inteligente",
      type:      "noun",
      category:  "hardware",
      def:       "A plastic card with a built-in chip used for identification or payments.",
      defEs:     "Tarjeta de plástico con un chip incorporado que se usa para identificarse o pagar.",
      example:   "A smart card stores secure data on a chip.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "workstation",
      pron:      "UERK-stei-shen",
      es:        "estación de trabajo",
      type:      "noun",
      category:  "hardware",
      def:       "A high-performance computer used by one person for technical or professional work.",
      defEs:     "Computadora de alto rendimiento que usa una persona para trabajo técnico o profesional.",
      example:   "Each developer has a powerful workstation.",
      exampleEs: "",
      note:      ""
    },


    // ══════════════════════════════════════════════════════════════════════
    //  PLACA MADRE Y PUERTOS  (category: "ports")  ·  14 términos
    // ══════════════════════════════════════════════════════════════════════

    {
      term:      "BIOS",
      pron:      "BAI-os",
      es:        "BIOS",
      type:      "abbreviation",
      category:  "ports",
      def:       "Basic software that starts the computer and checks the hardware before the operating system loads.",
      defEs:     "Software básico que inicia la computadora y revisa el hardware antes de cargar el sistema operativo.",
      example:   "You can update the BIOS from the manufacturer's site.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "bus",
      pron:      "BAS",
      es:        "bus (canal de datos)",
      type:      "noun",
      category:  "ports",
      def:       "A set of electrical lines that carries data between the parts of a computer.",
      defEs:     "Conjunto de líneas eléctricas que transporta datos entre las partes de la computadora.",
      example:   "Data travels between components on the bus.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "chassis",
      pron:      "SHA-si",
      es:        "gabinete / chasis",
      type:      "noun",
      category:  "ports",
      def:       "The metal or plastic box that holds and protects all the computer's components.",
      defEs:     "Caja de metal o plástico que contiene y protege todos los componentes de la computadora.",
      example:   "The motherboard rests inside the chassis.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "chipset",
      pron:      "CHIP-set",
      es:        "conjunto de chips",
      type:      "noun",
      category:  "ports",
      def:       "A group of chips on the motherboard that manages communication between the processor and other parts.",
      defEs:     "Grupo de chips de la placa principal que maneja la comunicación entre el procesador y las demás partes.",
      example:   "Each chipset works with a specific processor.",
      exampleEs: "Cada chipset funciona con un procesador específico.",
      note:      ""
    },

    {
      term:      "clock speed",
      pron:      "CLOK SPID",
      es:        "velocidad de reloj",
      type:      "noun",
      category:  "ports",
      def:       "How many cycles per second a processor can perform, measured in gigahertz.",
      defEs:     "Cantidad de ciclos por segundo que puede realizar un procesador, medida en gigahercios.",
      example:   "Clock speed is measured in GHz.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "Ethernet connector",
      pron:      "I-zer-net co-NEK-ter",
      es:        "conector Ethernet",
      type:      "noun",
      category:  "ports",
      def:       "The port where you plug in a network cable for a wired connection.",
      defEs:     "Puerto donde se enchufa el cable de red para tener conexión cableada.",
      example:   "The Ethernet connector provides wired internet.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "expansion slot",
      pron:      "ex-PAN-shen SLOT",
      es:        "ranura de expansión",
      type:      "noun",
      category:  "ports",
      def:       "An opening on the motherboard where you can add extra cards, like a video or sound card.",
      defEs:     "Ranura de la placa principal donde se pueden agregar tarjetas extra, como una de video o de sonido.",
      example:   "Add a sound card in an expansion slot.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "form factor",
      pron:      "FORM FAK-ter",
      es:        "factor de forma",
      type:      "noun",
      category:  "ports",
      def:       "The standard size and shape of a component, like ATX or Mini-ITX for motherboards.",
      defEs:     "Tamaño y forma estándar de un componente, como ATX o Mini-ITX para placas principales.",
      example:   "ATX is the largest form factor.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "graphics card",
      pron:      "GRA-fiks CARD",
      es:        "placa de video",
      type:      "noun",
      category:  "ports",
      def:       "An expansion card with its own processor and memory that produces the image on the screen.",
      defEs:     "Tarjeta de expansión con procesador y memoria propios que genera la imagen en la pantalla.",
      example:   "A better graphics card improves games.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "motherboard",
      pron:      "MA-der-bord",
      es:        "placa madre",
      type:      "noun",
      category:  "ports",
      def:       "The main circuit board that connects all the components of a computer.",
      defEs:     "Placa de circuitos principal que conecta todos los componentes de la computadora.",
      example:   "All components plug into the motherboard.",
      exampleEs: "Todos los componentes se conectan a la placa madre.",
      note:      ""
    },

    {
      term:      "PCI slot",
      pron:      "pi-si-AI SLOT",
      es:        "ranura PCI",
      type:      "noun",
      category:  "ports",
      def:       "A standard type of opening on the motherboard for adding expansion cards.",
      defEs:     "Tipo estándar de ranura en la placa principal para agregar tarjetas de expansión.",
      example:   "Install the network card in a PCI slot.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "rear ports",
      pron:      "RIR ports",
      es:        "puertos traseros",
      type:      "noun",
      category:  "ports",
      def:       "The connectors on the back of the computer for cables like USB, video and network.",
      defEs:     "Conectores de la parte de atrás de la computadora para cables USB, de video y de red.",
      example:   "Rear ports connect peripherals to the computer.",
      exampleEs: "Los puertos traseros conectan periféricos a la computadora.",
      note:      ""
    },

    {
      term:      "SATA socket",
      pron:      "SEI-ta SO-ket",
      es:        "conector SATA",
      type:      "noun",
      category:  "ports",
      def:       "A connector used to attach hard drives and solid state drives to the motherboard.",
      defEs:     "Conector que se usa para enchufar discos duros y de estado sólido a la placa principal.",
      example:   "Connect the drive to the SATA socket.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "socket",
      pron:      "SO-ket",
      es:        "zócalo / conector",
      type:      "noun",
      category:  "ports",
      def:       "The place on the motherboard where the processor is installed.",
      defEs:     "Lugar de la placa principal donde se instala el procesador.",
      example:   "The processor plugs into the CPU socket.",
      exampleEs: "El procesador se conecta al zócalo de la CPU.",
      note:      ""
    },


    // ══════════════════════════════════════════════════════════════════════
    //  MEMORIA Y ALMACENAMIENTO  (category: "memory")  ·  11 términos
    // ══════════════════════════════════════════════════════════════════════

    {
      term:      "bus speed",
      pron:      "BAS SPID",
      es:        "velocidad del bus",
      type:      "noun",
      category:  "memory",
      def:       "How fast data travels between components through the data lines of the computer.",
      defEs:     "Rapidez con la que viajan los datos entre los componentes por las líneas internas de la computadora.",
      example:   "The memory must match the bus speed.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "cache memory",
      pron:      "KASH ME-mo-ri",
      es:        "memoria caché",
      type:      "noun",
      category:  "memory",
      def:       "A very small and very fast memory that keeps the data the processor uses most often.",
      defEs:     "Memoria muy pequeña y muy rápida que guarda los datos que el procesador usa con más frecuencia.",
      example:   "Cache memory speeds up data access.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "DIMM",
      pron:      "DIM",
      es:        "módulo de memoria de doble línea",
      type:      "abbreviation",
      category:  "memory",
      def:       "A type of RAM module with separate electrical contacts on each side.",
      defEs:     "Tipo de módulo de RAM con contactos eléctricos independientes en cada lado.",
      example:   "Check whether your computer uses SIMMs or DIMMs.",
      exampleEs: "Verificá si tu computadora usa SIMM o DIMM.",
      note:      "Dual In-line Memory Module"
    },

    {
      term:      "hard disk drive",
      pron:      "JARD DISK DRAIV",
      es:        "disco rígido",
      type:      "noun",
      category:  "memory",
      def:       "A storage device that saves data on spinning magnetic platters.",
      defEs:     "Dispositivo de almacenamiento que guarda datos en platos magnéticos que giran.",
      example:   "The hard disk drive is almost full.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "memory stick",
      pron:      "ME-mo-ri STIK",
      es:        "pendrive",
      type:      "noun",
      category:  "memory",
      def:       "A small portable device that connects by USB to store and carry files.",
      defEs:     "Pequeño dispositivo portátil que se conecta por USB para guardar y llevar archivos.",
      example:   "A memory stick is a device we use to store data.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "optical drive",
      pron:      "OP-ti-cal DRAIV",
      es:        "unidad óptica",
      type:      "noun",
      category:  "memory",
      def:       "A device that reads or writes CDs, DVDs or Blu-ray discs using a laser.",
      defEs:     "Dispositivo que lee o graba CD, DVD o Blu-ray usando un láser.",
      example:   "The optical drive reads CDs.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "RAM",
      pron:      "RAM",
      es:        "memoria RAM",
      type:      "abbreviation",
      category:  "memory",
      def:       "Temporary memory that stores the data and programs in use; it is erased when the computer turns off.",
      defEs:     "Memoria temporal que guarda los datos y programas en uso; se borra al apagar la computadora.",
      example:   "You can add more RAM later.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "ROM",
      pron:      "ROM",
      es:        "memoria de solo lectura",
      type:      "abbreviation",
      category:  "memory",
      def:       "Memory that keeps its content permanently and normally can only be read, not changed.",
      defEs:     "Memoria que conserva su contenido de forma permanente y normalmente solo se puede leer, no modificar.",
      example:   "ROM keeps its data without power.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "SIMM",
      pron:      "SIM",
      es:        "módulo de memoria de una línea",
      type:      "abbreviation",
      category:  "memory",
      def:       "An older type of RAM module with the same contacts on both sides.",
      defEs:     "Tipo antiguo de módulo de RAM con los mismos contactos en ambos lados.",
      example:   "A SIMM is an older type of memory module.",
      exampleEs: "Un SIMM es un tipo de módulo de memoria más antiguo.",
      note:      "Single In-line Memory Module"
    },

    {
      term:      "solid state drive",
      pron:      "SO-lid STEIT DRAIV",
      es:        "unidad de estado sólido",
      type:      "noun",
      category:  "memory",
      def:       "A fast storage device with no moving parts that saves data on flash chips.",
      defEs:     "Dispositivo de almacenamiento rápido, sin partes móviles, que guarda datos en chips flash.",
      example:   "An SSD is faster than a hard disk.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "virtual memory",
      pron:      "VER-chual ME-mo-ri",
      es:        "memoria virtual",
      type:      "noun",
      category:  "memory",
      def:       "Space on the disk that the system uses as if it were extra RAM.",
      defEs:     "Espacio del disco que el sistema usa como si fuera RAM adicional.",
      example:   "Virtual memory uses part of the hard drive.",
      exampleEs: "",
      note:      ""
    },


    // ══════════════════════════════════════════════════════════════════════
    //  LENGUAJES DE PROGRAMACIÓN  (category: "langs")  ·  50 términos
    // ══════════════════════════════════════════════════════════════════════

    {
      term:      "applet",
      pron:      "A-plet",
      es:        "applet (programa Java)",
      type:      "noun",
      category:  "langs",
      def:       "A small program, usually written in Java, that runs inside another application like a browser.",
      defEs:     "Programa pequeño, normalmente escrito en Java, que se ejecuta dentro de otra aplicación como un navegador.",
      example:   "An applet runs inside a web page.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "argument",
      pron:      "AR-giu-ment",
      es:        "argumento",
      type:      "noun",
      category:  "langs",
      def:       "A value that you pass to a function when you call it.",
      defEs:     "Valor que se le pasa a una función al llamarla.",
      example:   "Pass the file name as an argument.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "array",
      pron:      "a-REI",
      es:        "arreglo (array)",
      type:      "noun",
      category:  "langs",
      def:       "A data structure that stores several values of the same type in order, accessed by index.",
      defEs:     "Estructura de datos que guarda varios valores del mismo tipo en orden, a los que se accede por índice.",
      example:   "An array stores multiple values.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "boolean",
      pron:      "BU-li-an",
      es:        "booleano",
      type:      "noun",
      category:  "langs",
      def:       "A data type that can only be true or false.",
      defEs:     "Tipo de dato que solo puede ser verdadero o falso.",
      example:   "A boolean is either true or false.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "bytecode",
      pron:      "BAIT-coud",
      es:        "código de bytes",
      type:      "noun",
      category:  "langs",
      def:       "Intermediate code produced by compiling, which a virtual machine then executes.",
      defEs:     "Código intermedio que se obtiene al compilar y que luego ejecuta una máquina virtual.",
      example:   "The compiler converts source code into bytecode.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "C#",
      pron:      "SI sharp",
      es:        "C# (lenguaje de programación)",
      type:      "noun",
      category:  "langs",
      def:       "An object-oriented language created by Microsoft, used for Windows apps and games with Unity.",
      defEs:     "Lenguaje orientado a objetos creado por Microsoft, usado en aplicaciones de Windows y juegos con Unity.",
      example:   "C# is a Microsoft .NET language.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "C++",
      pron:      "SI plas plas",
      es:        "C++ (lenguaje de programación)",
      type:      "noun",
      category:  "langs",
      def:       "A fast compiled language that extends C with object-oriented features.",
      defEs:     "Lenguaje compilado y rápido que amplía C con características de orientación a objetos.",
      example:   "C++ is the fastest performing language.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "class",
      pron:      "CLAS",
      es:        "clase",
      type:      "noun",
      category:  "langs",
      def:       "A template that defines the attributes and methods that its objects will have.",
      defEs:     "Molde que define los atributos y métodos que van a tener sus objetos.",
      example:   "A class defines the structure of an object.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "compile",
      pron:      "com-PAIL",
      es:        "compilar",
      type:      "verb",
      category:  "langs",
      def:       "To translate source code into a language the machine can execute.",
      defEs:     "Traducir el código fuente a un lenguaje que la máquina puede ejecutar.",
      example:   "Java code is compiled into bytecode.",
      exampleEs: "El código Java se compila a bytecode.",
      note:      ""
    },

    {
      term:      "compiler",
      pron:      "com-PAI-ler",
      es:        "compilador",
      type:      "noun",
      category:  "langs",
      def:       "A program that translates all the source code into machine code before it runs.",
      defEs:     "Programa que traduce todo el código fuente a código máquina antes de ejecutarlo.",
      example:   "The compiler found three errors.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "cross-platform",
      pron:      "CROS-PLAT-form",
      es:        "multiplataforma",
      type:      "adjective",
      category:  "langs",
      def:       "Able to run on different operating systems, like Windows, macOS and Linux.",
      defEs:     "Que puede funcionar en distintos sistemas operativos, como Windows, macOS y Linux.",
      example:   "PHP is cross-platform.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "dynamic typing",
      pron:      "dai-NA-mic TAI-pin",
      es:        "tipado dinámico",
      type:      "noun",
      category:  "langs",
      def:       "When the type of a variable is decided while the program is running, not before.",
      defEs:     "Cuando el tipo de una variable se decide mientras el programa se ejecuta, y no antes.",
      example:   "Dynamic typing means you don't declare types.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "encapsulation",
      pron:      "en-cap-su-LEI-shen",
      es:        "encapsulamiento",
      type:      "noun",
      category:  "langs",
      def:       "Hiding the internal data of an object so it can only be accessed through its methods.",
      defEs:     "Ocultar los datos internos de un objeto para que solo se pueda acceder a ellos mediante sus métodos.",
      example:   "Encapsulation hides internal data.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "exception handling",
      pron:      "ek-SEP-shen JAN-dlin",
      es:        "manejo de excepciones",
      type:      "noun",
      category:  "langs",
      def:       "Catching and managing errors while a program runs so it does not crash.",
      defEs:     "Atrapar y manejar los errores durante la ejecución para que el programa no se cierre.",
      example:   "PHP supports exception handling.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "framework",
      pron:      "FREIM-uerk",
      es:        "marco de trabajo",
      type:      "noun",
      category:  "langs",
      def:       "A set of ready-made tools and rules that gives structure to build applications.",
      defEs:     "Conjunto de herramientas y reglas ya hechas que da una estructura para construir aplicaciones.",
      example:   "Django is a Python web framework.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "function",
      pron:      "FANK-shen",
      es:        "función",
      type:      "noun",
      category:  "langs",
      def:       "A named block of code that does a task and can be called many times.",
      defEs:     "Bloque de código con nombre que realiza una tarea y se puede llamar muchas veces.",
      example:   "The function returns a value.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "garbage collection",
      pron:      "GAR-bij co-LEK-shen",
      es:        "recolección de basura",
      type:      "noun",
      category:  "langs",
      def:       "Automatic process that frees memory that the program is no longer using.",
      defEs:     "Proceso automático que libera la memoria que el programa ya no usa.",
      example:   "Garbage collection frees unused memory.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "high-level language",
      pron:      "JAI-LE-vl LAN-guech",
      es:        "lenguaje de alto nivel",
      type:      "noun",
      category:  "langs",
      def:       "A programming language close to human language and far from the hardware.",
      defEs:     "Lenguaje de programación parecido al lenguaje humano y alejado del hardware.",
      example:   "Python is a high-level language.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "indentation",
      pron:      "in-den-TEI-shen",
      es:        "sangría",
      type:      "noun",
      category:  "langs",
      def:       "Spaces at the start of a line that show the structure of the code.",
      defEs:     "Espacios al comienzo de una línea que muestran la estructura del código.",
      example:   "Python uses indentation instead of braces.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "inheritance",
      pron:      "in-JE-ri-tens",
      es:        "herencia",
      type:      "noun",
      category:  "langs",
      def:       "When a class receives the attributes and methods of another class.",
      defEs:     "Cuando una clase recibe los atributos y métodos de otra clase.",
      example:   "Inheritance lets a class reuse code.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "integer",
      pron:      "IN-ti-yer",
      es:        "número entero",
      type:      "noun",
      category:  "langs",
      def:       "A whole number without decimals, positive or negative.",
      defEs:     "Número sin decimales, positivo o negativo.",
      example:   "An integer has no decimal part.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "interpreted",
      pron:      "in-TER-pre-ted",
      es:        "interpretado",
      type:      "adjective",
      category:  "langs",
      def:       "Describes code that is translated and executed line by line while it runs.",
      defEs:     "Se dice del código que se traduce y ejecuta línea por línea mientras corre.",
      example:   "Python is an interpreted language.",
      exampleEs: "Python es un lenguaje interpretado.",
      note:      "Pronunciación de -ed: /id/ después de t/d"
    },

    {
      term:      "interpreter",
      pron:      "in-TER-pre-ter",
      es:        "intérprete",
      type:      "noun",
      category:  "langs",
      def:       "A program that reads and executes code line by line, without creating an executable file first.",
      defEs:     "Programa que lee y ejecuta el código línea por línea, sin crear antes un archivo ejecutable.",
      example:   "The interpreter runs the program line by line.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "Java",
      pron:      "JA-va",
      es:        "Java (lenguaje de programación)",
      type:      "noun",
      category:  "langs",
      def:       "An object-oriented language that runs on a virtual machine: \"write once, run anywhere\".",
      defEs:     "Lenguaje orientado a objetos que corre en una máquina virtual: \"se escribe una vez y corre en cualquier lado\".",
      example:   "Java was developed by Sun Microsystems.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "JavaScript",
      pron:      "JA-va-script",
      es:        "JavaScript (lenguaje de programación)",
      type:      "noun",
      category:  "langs",
      def:       "The programming language that makes web pages interactive in the browser.",
      defEs:     "Lenguaje de programación que hace interactivas las páginas web en el navegador.",
      example:   "JavaScript runs in the browser.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "library",
      pron:      "LAI-bre-ri",
      es:        "librería / biblioteca",
      type:      "noun",
      category:  "langs",
      def:       "A collection of ready-made code that you can reuse in your programs.",
      defEs:     "Colección de código ya hecho que se puede reutilizar en los programas.",
      example:   "Python has a rich standard library.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "loop",
      pron:      "LUP",
      es:        "bucle",
      type:      "noun",
      category:  "langs",
      def:       "A structure that repeats a block of code while a condition is true.",
      defEs:     "Estructura que repite un bloque de código mientras se cumple una condición.",
      example:   "A for loop repeats the same block.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "low-level language",
      pron:      "LOU-LE-vl LAN-guech",
      es:        "lenguaje de bajo nivel",
      type:      "noun",
      category:  "langs",
      def:       "A programming language close to the hardware, like assembly.",
      defEs:     "Lenguaje de programación cercano al hardware, como el ensamblador.",
      example:   "C++ is used for low-level tasks.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "machine code",
      pron:      "ma-SHIN COUD",
      es:        "código máquina",
      type:      "noun",
      category:  "langs",
      def:       "Instructions in binary (ones and zeros) that the processor executes directly.",
      defEs:     "Instrucciones en binario (unos y ceros) que el procesador ejecuta directamente.",
      example:   "The compiler produces machine code.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "method",
      pron:      "ME-thed",
      es:        "método",
      type:      "noun",
      category:  "langs",
      def:       "A function that belongs to a class or an object.",
      defEs:     "Función que pertenece a una clase o a un objeto.",
      example:   "Call the method to get the result.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "multi-threaded",
      pron:      "MAL-ti-THRE-ded",
      es:        "multihilo",
      type:      "adjective",
      category:  "langs",
      def:       "Able to run several tasks at the same time inside one program.",
      defEs:     "Que puede ejecutar varias tareas al mismo tiempo dentro de un mismo programa.",
      example:   "Java is a multi-threaded language.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "object",
      pron:      "OB-yect",
      es:        "objeto",
      type:      "noun",
      category:  "langs",
      def:       "An instance of a class, with its own data and behavior.",
      defEs:     "Instancia de una clase, con sus propios datos y comportamiento.",
      example:   "An object contains data and code.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "object-oriented",
      pron:      "OB-yect O-ri-en-ted",
      es:        "orientado a objetos",
      type:      "adjective",
      category:  "langs",
      def:       "A way of programming based on classes and objects.",
      defEs:     "Forma de programar basada en clases y objetos.",
      example:   "Java is an object-oriented language.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "open source",
      pron:      "O-pen SORS",
      es:        "código abierto",
      type:      "adjective",
      category:  "langs",
      def:       "Software whose code anyone can see, use, change and share.",
      defEs:     "Software cuyo código cualquiera puede ver, usar, modificar y compartir.",
      example:   "PHP is open source and free to use.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "paradigm",
      pron:      "PA-ra-daim",
      es:        "paradigma",
      type:      "noun",
      category:  "langs",
      def:       "A style or model of programming, like object-oriented or functional.",
      defEs:     "Estilo o modelo de programación, como el orientado a objetos o el funcional.",
      example:   "OOP is a programming paradigm.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "parameter",
      pron:      "pa-RA-mi-ter",
      es:        "parámetro",
      type:      "noun",
      category:  "langs",
      def:       "A variable in a function definition that receives a value when the function is called.",
      defEs:     "Variable en la definición de una función que recibe un valor cuando se la llama.",
      example:   "The function takes two parameters.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "PHP",
      pron:      "pi-eich-PI",
      es:        "PHP (lenguaje de programación)",
      type:      "noun",
      category:  "langs",
      def:       "A server-side scripting language very used to create dynamic websites.",
      defEs:     "Lenguaje de scripting del lado del servidor muy usado para crear sitios web dinámicos.",
      example:   "PHP is a server-side scripting language.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "platform-independent",
      pron:      "PLAT-form in-di-PEN-dent",
      es:        "independiente de la plataforma",
      type:      "adjective",
      category:  "langs",
      def:       "Able to work the same way on any system or hardware.",
      defEs:     "Que funciona igual en cualquier sistema o hardware.",
      example:   "Java is platform-independent.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "plug-in",
      pron:      "PLAG-in",
      es:        "complemento",
      type:      "noun",
      category:  "langs",
      def:       "A small add-on that gives new features to a program.",
      defEs:     "Pequeño agregado que le da nuevas funciones a un programa.",
      example:   "A plug-in adds new features to a browser.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "programming language",
      pron:      "PRO-gra-min LAN-guech",
      es:        "lenguaje de programación",
      type:      "noun",
      category:  "langs",
      def:       "A formal language with rules used to write instructions for a computer.",
      defEs:     "Lenguaje formal con reglas que se usa para escribir instrucciones para una computadora.",
      example:   "Python is a popular programming language.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "Python",
      pron:      "PAI-zon",
      es:        "Python (lenguaje de programación)",
      type:      "noun",
      category:  "langs",
      def:       "A popular, easy-to-read language that uses indentation to organize code.",
      defEs:     "Lenguaje popular y fácil de leer que usa la sangría para organizar el código.",
      example:   "Python is a good language for beginners.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "runtime",
      pron:      "RAN-taim",
      es:        "tiempo de ejecución",
      type:      "noun",
      category:  "langs",
      def:       "The period when a program is running, or the environment that runs it.",
      defEs:     "Período en que un programa está corriendo, o el entorno que lo ejecuta.",
      example:   "Node is a runtime for JavaScript.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "scalable",
      pron:      "SKEI-la-bl",
      es:        "escalable",
      type:      "adjective",
      category:  "langs",
      def:       "Able to grow and handle more users or data without losing performance.",
      defEs:     "Que puede crecer y soportar más usuarios o datos sin perder rendimiento.",
      example:   "Django apps are scalable and secure.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "scripting language",
      pron:      "SCRIP-tin LAN-guech",
      es:        "lenguaje de scripting",
      type:      "noun",
      category:  "langs",
      def:       "A language used to write short programs that automate tasks, usually interpreted.",
      defEs:     "Lenguaje que se usa para escribir programas cortos que automatizan tareas, normalmente interpretado.",
      example:   "PHP is a server-side scripting language.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "source code",
      pron:      "SORS COUD",
      es:        "código fuente",
      type:      "noun",
      category:  "langs",
      def:       "The instructions of a program as the programmer wrote them, in readable text.",
      defEs:     "Las instrucciones de un programa tal como las escribió el programador, en texto legible.",
      example:   "The source code is written in C++.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "string",
      pron:      "STRING",
      es:        "cadena de texto",
      type:      "noun",
      category:  "langs",
      def:       "A sequence of characters, like a word or a sentence.",
      defEs:     "Secuencia de caracteres, como una palabra o una oración.",
      example:   "A string is a sequence of characters.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "syntax",
      pron:      "SIN-tax",
      es:        "sintaxis",
      type:      "noun",
      category:  "langs",
      def:       "The rules about how code must be written in a language.",
      defEs:     "Reglas sobre cómo se debe escribir el código en un lenguaje.",
      example:   "Python has a simple syntax.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "thread",
      pron:      "THRED",
      es:        "hilo de ejecución",
      type:      "noun",
      category:  "langs",
      def:       "The smallest sequence of instructions that a processor can run independently.",
      defEs:     "La secuencia más pequeña de instrucciones que un procesador puede ejecutar de forma independiente.",
      example:   "Each thread runs independently.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "variable",
      pron:      "VE-ri-a-bl",
      es:        "variable",
      type:      "noun",
      category:  "langs",
      def:       "A named space in memory that stores a value that can change.",
      defEs:     "Espacio con nombre en la memoria que guarda un valor que puede cambiar.",
      example:   "Declare a variable before you use it.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "whitespace",
      pron:      "UAIT-speis",
      es:        "espacio en blanco",
      type:      "noun",
      category:  "langs",
      def:       "Spaces, tabs and line breaks in the code.",
      defEs:     "Espacios, tabulaciones y saltos de línea en el código.",
      example:   "Python treats whitespace as part of the syntax.",
      exampleEs: "",
      note:      ""
    },


    // ══════════════════════════════════════════════════════════════════════
    //  DESARROLLO DE SOFTWARE  (category: "dev")  ·  48 términos
    // ══════════════════════════════════════════════════════════════════════

    {
      term:      "API",
      pron:      "ei-pi-AI",
      es:        "interfaz de programación de aplicaciones",
      type:      "abbreviation",
      category:  "dev",
      def:       "A set of rules that lets different programs communicate with each other.",
      defEs:     "Conjunto de reglas que permite que distintos programas se comuniquen entre sí.",
      example:   "The API lets two programs talk to each other.",
      exampleEs: "La API permite que dos programas se comuniquen.",
      note:      "Application Programming Interface"
    },

    {
      term:      "append",
      pron:      "a-PEND",
      es:        "agregar al final",
      type:      "verb",
      category:  "dev",
      def:       "To add something at the end of a list, file or text.",
      defEs:     "Añadir algo después del último elemento de una lista, un archivo o un texto.",
      example:   "Append the item to the list.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "autocomplete",
      pron:      "o-to-com-PLIT",
      es:        "autocompletar",
      type:      "verb",
      category:  "dev",
      def:       "A feature that suggests and finishes words or code while you type.",
      defEs:     "Función que sugiere y termina palabras o código mientras escribís.",
      example:   "The IDE autocompletes method names.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "benchmark",
      pron:      "BENCH-mark",
      es:        "punto de referencia",
      type:      "noun",
      category:  "dev",
      def:       "A standard test used to measure and compare performance.",
      defEs:     "Prueba estándar que se usa para medir y comparar el rendimiento.",
      example:   "The benchmark finished in about two seconds.",
      exampleEs: "El benchmark terminó en unos dos segundos.",
      note:      ""
    },

    {
      term:      "boilerplate",
      pron:      "BOI-ler-pleit",
      es:        "código repetitivo (boilerplate)",
      type:      "noun",
      category:  "dev",
      def:       "Standard code that repeats in many places with little or no change.",
      defEs:     "Código estándar que se repite en muchos lugares con poco o ningún cambio.",
      example:   "PyBind11 reduces boilerplate code.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "bracket",
      pron:      "BRA-ket",
      es:        "corchete [ ]",
      type:      "noun",
      category:  "dev",
      def:       "The square symbols [ ] used, for example, to access array elements.",
      defEs:     "Los símbolos cuadrados [ ] que se usan, por ejemplo, para acceder a elementos de un arreglo.",
      example:   "Close every bracket in your code.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "branch",
      pron:      "BRANCH",
      es:        "rama",
      type:      "noun",
      category:  "dev",
      def:       "A separate line of development in version control.",
      defEs:     "Línea de desarrollo separada dentro del control de versiones.",
      example:   "Create a new branch for each feature.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "breadcrumbs",
      pron:      "BRED-crambs",
      es:        "ruta de navegación",
      type:      "noun",
      category:  "dev",
      def:       "A navigation trail that shows where you are inside a website or a file.",
      defEs:     "Rastro de navegación que muestra dónde estás dentro de un sitio web o de un archivo.",
      example:   "Breadcrumbs show where you are in the app.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "breakpoint",
      pron:      "BREIK-point",
      es:        "punto de interrupción",
      type:      "noun",
      category:  "dev",
      def:       "A marked line where the program pauses during debugging.",
      defEs:     "Línea marcada donde el programa se pausa durante la depuración.",
      example:   "Set a breakpoint on the first line.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "bug",
      pron:      "BAG",
      es:        "error de programación (bug)",
      type:      "noun",
      category:  "dev",
      def:       "An error in a program that makes it behave incorrectly.",
      defEs:     "Falla en un programa que hace que funcione mal.",
      example:   "The developer fixed a critical bug.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "bug report",
      pron:      "BAG ri-PORT",
      es:        "reporte de error",
      type:      "noun",
      category:  "dev",
      def:       "A document that describes an error so developers can fix it.",
      defEs:     "Documento que describe una falla para que los programadores la corrijan.",
      example:   "Reply to every bug report politely.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "build",
      pron:      "BILD",
      es:        "compilación / construcción (build)",
      type:      "noun",
      category:  "dev",
      def:       "The process of turning source code into a program ready to run, or the result of that process.",
      defEs:     "Proceso de convertir el código fuente en un programa listo para usar, o el resultado de ese proceso.",
      example:   "The build failed because of a missing file.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "CLI",
      pron:      "si-el-AI",
      es:        "interfaz de línea de comandos",
      type:      "abbreviation",
      category:  "dev",
      def:       "A text-based interface where you type commands to control a program.",
      defEs:     "Interfaz de texto donde se escriben comandos para controlar un programa.",
      example:   "The Angular CLI generates new components.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "command line",
      pron:      "co-MAND LAIN",
      es:        "línea de comandos",
      type:      "noun",
      category:  "dev",
      def:       "A text window where you type instructions for the computer.",
      defEs:     "Ventana de texto donde se escriben instrucciones para la computadora.",
      example:   "Run the script from the command line.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "commit",
      pron:      "co-MIT",
      es:        "confirmación de cambios (commit)",
      type:      "noun",
      category:  "dev",
      def:       "To save a snapshot of your changes in a repository, with a message.",
      defEs:     "Guardar una instantánea de tus cambios en un repositorio, con un mensaje.",
      example:   "Write a clear message in every commit.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "container",
      pron:      "con-TEI-ner",
      es:        "contenedor",
      type:      "noun",
      category:  "dev",
      def:       "A lightweight package that includes an application and everything it needs to run.",
      defEs:     "Paquete liviano que incluye una aplicación y todo lo que necesita para funcionar.",
      example:   "Docker runs apps inside a container.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "curly braces",
      pron:      "CER-li BREI-ses",
      es:        "llaves { }",
      type:      "noun",
      category:  "dev",
      def:       "The symbols { } used to group blocks of code.",
      defEs:     "Los símbolos { } que se usan para agrupar bloques de código.",
      example:   "Python doesn't use curly braces.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "debugger",
      pron:      "di-BA-ger",
      es:        "depurador",
      type:      "noun",
      category:  "dev",
      def:       "A tool that lets you run a program step by step to find errors.",
      defEs:     "Herramienta que permite ejecutar un programa paso a paso para encontrar errores.",
      example:   "Use the debugger to step through the code.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "debugging",
      pron:      "di-BA-guing",
      es:        "depuración",
      type:      "noun",
      category:  "dev",
      def:       "The process of finding and fixing errors in code.",
      defEs:     "Proceso de encontrar y corregir errores en el código.",
      example:   "Debugging helps you find what went wrong.",
      exampleEs: "La depuración te ayuda a encontrar qué salió mal.",
      note:      ""
    },

    {
      term:      "dependency",
      pron:      "di-PEN-den-si",
      es:        "dependencia",
      type:      "noun",
      category:  "dev",
      def:       "A library or package that a project needs in order to work.",
      defEs:     "Librería o paquete que un proyecto necesita para funcionar.",
      example:   "Each dependency must be installed first.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "deploy",
      pron:      "di-PLOI",
      es:        "desplegar",
      type:      "verb",
      category:  "dev",
      def:       "To put an application on a server so users can use it.",
      defEs:     "Poner una aplicación en un servidor para que los usuarios puedan usarla.",
      example:   "We deploy the app every Friday.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "developer",
      pron:      "di-VE-lo-per",
      es:        "desarrollador/a",
      type:      "noun",
      category:  "dev",
      def:       "A person who writes and maintains software.",
      defEs:     "Persona que escribe y mantiene software.",
      example:   "The developer checks the code repository every morning.",
      exampleEs: "El desarrollador revisa el repositorio de código cada mañana.",
      note:      ""
    },

    {
      term:      "embed",
      pron:      "em-BED",
      es:        "insertar",
      type:      "verb",
      category:  "dev",
      def:       "To place content, like a video or a map, inside a web page or document.",
      defEs:     "Colocar contenido, como un video o un mapa, dentro de una página web o un documento.",
      example:   "You can embed video into web pages.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "IDE",
      pron:      "ai-di-I",
      es:        "entorno de desarrollo integrado",
      type:      "abbreviation",
      category:  "dev",
      def:       "An application that combines a code editor, debugger and build tools in one place.",
      defEs:     "Aplicación que reúne editor de código, depurador y herramientas de compilación en un solo lugar.",
      example:   "Visual Studio is an IDE.",
      exampleEs: "Visual Studio es un IDE.",
      note:      "Integrated Development Environment"
    },

    {
      term:      "issue",
      pron:      "I-shu",
      es:        "incidencia (issue)",
      type:      "noun",
      category:  "dev",
      def:       "A reported problem, task or idea registered in a project.",
      defEs:     "Problema, tarea o idea reportada y registrada en un proyecto.",
      example:   "The customer reported an issue.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "lightweight",
      pron:      "LAIT-ueit",
      es:        "ligero",
      type:      "adjective",
      category:  "dev",
      def:       "Using few resources, like memory or processing power.",
      defEs:     "Que usa pocos recursos, como memoria o capacidad de procesamiento.",
      example:   "Flask is a lightweight framework.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "linter",
      pron:      "LIN-ter",
      es:        "analizador de código",
      type:      "noun",
      category:  "dev",
      def:       "A tool that checks code for errors and style problems without running it.",
      defEs:     "Herramienta que revisa el código en busca de errores y problemas de estilo sin ejecutarlo.",
      example:   "The linter found an error in my code.",
      exampleEs: "El linter encontró un error en mi código.",
      note:      ""
    },

    {
      term:      "merge",
      pron:      "MERG",
      es:        "fusionar",
      type:      "verb",
      category:  "dev",
      def:       "To combine changes from two branches into one.",
      defEs:     "Combinar los cambios de dos ramas en una sola.",
      example:   "Merge both branches into one.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "OS",
      pron:      "o-ES",
      es:        "sistema operativo",
      type:      "abbreviation",
      category:  "dev",
      def:       "The main software that manages the computer's hardware and runs other programs, like Windows or Linux.",
      defEs:     "Software principal que maneja el hardware de la computadora y ejecuta los demás programas, como Windows o Linux.",
      example:   "Android is a mobile OS.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "outline view",
      pron:      "AUT-lain VIU",
      es:        "vista de esquema",
      type:      "noun",
      category:  "dev",
      def:       "A panel that shows the structure of a file: its classes, functions and sections.",
      defEs:     "Panel que muestra la estructura de un archivo: sus clases, funciones y secciones.",
      example:   "Use the outline view to navigate the file.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "override",
      pron:      "o-ver-RAID",
      es:        "anular / sobrescribir",
      type:      "verb",
      category:  "dev",
      def:       "To replace a method inherited from a parent class with a new version.",
      defEs:     "Reemplazar un método heredado de la clase padre por una versión nueva.",
      example:   "This method overrides the default one.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "package manager",
      pron:      "PA-kij MA-na-yer",
      es:        "gestor de paquetes",
      type:      "noun",
      category:  "dev",
      def:       "A tool that installs, updates and removes libraries for a project.",
      defEs:     "Herramienta que instala, actualiza y elimina librerías de un proyecto.",
      example:   "pip is the Python package manager.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "patch",
      pron:      "PACH",
      es:        "parche",
      type:      "noun",
      category:  "dev",
      def:       "A small update that fixes errors or problems in software.",
      defEs:     "Pequeña actualización que corrige errores o problemas de un software.",
      example:   "Install the patch to fix the vulnerability.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "peek",
      pron:      "PIK",
      es:        "espiar / ver rápido",
      type:      "verb",
      category:  "dev",
      def:       "To take a quick look at something, like a definition, without leaving where you are.",
      defEs:     "Echar un vistazo rápido a algo, como una definición, sin salir de donde estás.",
      example:   "Peek at the definition without leaving the file.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "pull request",
      pron:      "PUL ri-KUEST",
      es:        "solicitud de integración (pull request)",
      type:      "noun",
      category:  "dev",
      def:       "A request to review and add your changes to the main code of a project.",
      defEs:     "Pedido para que revisen y agreguen tus cambios al código principal de un proyecto.",
      example:   "I opened a pull request on GitHub.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "refactor",
      pron:      "ri-FAC-ter",
      es:        "refactorizar",
      type:      "verb",
      category:  "dev",
      def:       "To improve the structure of code without changing what it does.",
      defEs:     "Mejorar la estructura del código sin cambiar lo que hace.",
      example:   "We refactor the code to make it cleaner.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "release",
      pron:      "ri-LIS",
      es:        "versión publicada (release)",
      type:      "noun",
      category:  "dev",
      def:       "A version of software that is made available to users.",
      defEs:     "Versión de un software que se pone a disposición de los usuarios.",
      example:   "The new release includes bug fixes.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "repository",
      pron:      "ri-PA-si-to-ri",
      es:        "repositorio",
      type:      "noun",
      category:  "dev",
      def:       "A place where a project's code and its history of changes are stored.",
      defEs:     "Lugar donde se guarda el código de un proyecto y su historial de cambios.",
      example:   "The developer checks the code repository.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "SDK",
      pron:      "es-di-KEI",
      es:        "kit de desarrollo de software",
      type:      "abbreviation",
      category:  "dev",
      def:       "A set of tools, libraries and documentation for creating apps for a platform.",
      defEs:     "Conjunto de herramientas, librerías y documentación para crear aplicaciones para una plataforma.",
      example:   "Download the SDK to build Java apps.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "snippet",
      pron:      "SNI-pet",
      es:        "fragmento de código",
      type:      "noun",
      category:  "dev",
      def:       "A small piece of reusable code.",
      defEs:     "Pedacito de código reutilizable.",
      example:   "Paste this snippet into your file.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "stack trace",
      pron:      "STAK TREIS",
      es:        "traza de pila",
      type:      "noun",
      category:  "dev",
      def:       "A report of the function calls that were active when an error happened.",
      defEs:     "Informe de las llamadas a funciones que estaban activas cuando ocurrió un error.",
      example:   "The stack trace shows where the error occurred.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "terminal",
      pron:      "TER-mi-nal",
      es:        "terminal",
      type:      "noun",
      category:  "dev",
      def:       "A program that gives you a text window to type commands.",
      defEs:     "Programa que te da una ventana de texto para escribir comandos.",
      example:   "Type the command in the terminal.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "toggle",
      pron:      "TO-gl",
      es:        "alternar",
      type:      "verb",
      category:  "dev",
      def:       "To switch between two states, like on and off.",
      defEs:     "Cambiar entre dos estados, como encendido y apagado.",
      example:   "Toggle the outline view on and off.",
      exampleEs: "Alterná la vista de esquema (activar/desactivar).",
      note:      ""
    },

    {
      term:      "troubleshoot",
      pron:      "TRA-bl-shut",
      es:        "solucionar problemas",
      type:      "verb",
      category:  "dev",
      def:       "To find the cause of a problem and solve it.",
      defEs:     "Encontrar la causa de un problema y resolverlo.",
      example:   "We troubleshoot software issues every day.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "unit test",
      pron:      "IU-nit TEST",
      es:        "prueba unitaria",
      type:      "noun",
      category:  "dev",
      def:       "A test that checks that one small part of the code works correctly.",
      defEs:     "Prueba que verifica que una pequeña parte del código funciona bien.",
      example:   "Write a unit test for each function.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "version control",
      pron:      "VER-shen con-TROL",
      es:        "control de versiones",
      type:      "noun",
      category:  "dev",
      def:       "A system that records changes to files over time, like Git.",
      defEs:     "Sistema que registra los cambios de los archivos a lo largo del tiempo, como Git.",
      example:   "Git is a version control system.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "workflow",
      pron:      "UERK-flou",
      es:        "flujo de trabajo",
      type:      "noun",
      category:  "dev",
      def:       "The sequence of steps followed to complete a task or process.",
      defEs:     "Secuencia de pasos que se siguen para completar una tarea o un proceso.",
      example:   "A good workflow saves time.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "wrapper",
      pron:      "RA-per",
      es:        "envoltorio",
      type:      "noun",
      category:  "dev",
      def:       "Code that surrounds other code to give it a simpler or different interface.",
      defEs:     "Código que rodea a otro código para darle una interfaz más simple o distinta.",
      example:   "A wrapper module exposes C++ code to Python.",
      exampleEs: "Un módulo envoltorio expone código C++ a Python.",
      note:      ""
    },


    // ══════════════════════════════════════════════════════════════════════
    //  WEB Y FRONT-END  (category: "web")  ·  20 términos
    // ══════════════════════════════════════════════════════════════════════

    {
      term:      "animation",
      pron:      "a-ni-MEI-shen",
      es:        "animación",
      type:      "noun",
      category:  "web",
      def:       "Movement or visual changes of elements on a screen over time.",
      defEs:     "Movimiento o cambios visuales de elementos en una pantalla a lo largo del tiempo.",
      example:   "Java applets can display animations.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "backend",
      pron:      "BAK-end",
      es:        "parte lógica (servidor)",
      type:      "noun",
      category:  "web",
      def:       "The part of an application that runs on the server and handles data and logic.",
      defEs:     "Parte de una aplicación que corre en el servidor y maneja los datos y la lógica.",
      example:   "Java is effective for large backend applications.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "browser",
      pron:      "BRAU-ser",
      es:        "navegador",
      type:      "noun",
      category:  "web",
      def:       "A program used to visit and view web pages, like Chrome or Firefox.",
      defEs:     "Programa que se usa para visitar y ver páginas web, como Chrome o Firefox.",
      example:   "Most browsers are programmed in C++.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "component",
      pron:      "com-PO-nent",
      es:        "componente",
      type:      "noun",
      category:  "web",
      def:       "An independent, reusable piece of an interface or a system.",
      defEs:     "Pieza independiente y reutilizable de una interfaz o de un sistema.",
      example:   "An Angular app is built from components.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "cookie",
      pron:      "CU-ki",
      es:        "cookie",
      type:      "noun",
      category:  "web",
      def:       "A small file that a website saves in your browser to remember information about you.",
      defEs:     "Pequeño archivo que un sitio web guarda en tu navegador para recordar información sobre vos.",
      example:   "PHP can read and write cookies.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "CSS",
      pron:      "si-es-ES",
      es:        "hojas de estilo en cascada",
      type:      "abbreviation",
      category:  "web",
      def:       "The language used to define the style of web pages: colors, fonts and layout.",
      defEs:     "Lenguaje que se usa para definir el estilo de las páginas web: colores, fuentes y diseño.",
      example:   "CSS controls the look of a page.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "data binding",
      pron:      "DEI-ta BAIN-din",
      es:        "enlace de datos",
      type:      "noun",
      category:  "web",
      def:       "Automatically connecting data with the interface so that a change in one updates the other.",
      defEs:     "Conectar automáticamente los datos con la interfaz para que un cambio en uno actualice al otro.",
      example:   "Data binding keeps the view and the data in sync.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "dependency injection",
      pron:      "di-PEN-den-si in-YEK-shen",
      es:        "inyección de dependencias",
      type:      "noun",
      category:  "web",
      def:       "A technique where an object receives the things it needs from outside instead of creating them.",
      defEs:     "Técnica en la que un objeto recibe desde afuera lo que necesita en lugar de crearlo él mismo.",
      example:   "Angular uses dependency injection.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "directive",
      pron:      "di-REK-tiv",
      es:        "directiva",
      type:      "noun",
      category:  "web",
      def:       "A special instruction that tells the compiler or framework how to process something.",
      defEs:     "Instrucción especial que le indica al compilador o al framework cómo procesar algo.",
      example:   "A directive adds behavior to an element.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "DOM",
      pron:      "di-o-EM",
      es:        "modelo de objetos del documento",
      type:      "abbreviation",
      category:  "web",
      def:       "A tree representation of a web page that programs can read and change.",
      defEs:     "Representación en forma de árbol de una página web que los programas pueden leer y modificar.",
      example:   "JavaScript changes the DOM.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "front-end",
      pron:      "FRANT-end",
      es:        "parte visual (cliente)",
      type:      "noun",
      category:  "web",
      def:       "The part of an application that users see and interact with.",
      defEs:     "Parte de una aplicación que los usuarios ven y con la que interactúan.",
      example:   "JavaScript is the go-to language for front-end.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "HTML",
      pron:      "eich-ti-em-EL",
      es:        "lenguaje de marcado de hipertexto",
      type:      "abbreviation",
      category:  "web",
      def:       "The markup language used to create the structure and content of web pages.",
      defEs:     "Lenguaje de marcado que se usa para crear la estructura y el contenido de las páginas web.",
      example:   "HTML defines the structure of a web page.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "hyperlink",
      pron:      "JAI-per-link",
      es:        "hipervínculo",
      type:      "noun",
      category:  "web",
      def:       "Text or an image that you click to go to another page or resource.",
      defEs:     "Texto o imagen en el que se hace clic para ir a otra página o recurso.",
      example:   "Click the hyperlink to open the page.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "lazy loading",
      pron:      "LEI-zi LOU-din",
      es:        "carga diferida (lazy loading)",
      type:      "noun",
      category:  "web",
      def:       "Loading content only when it is needed, for example when you scroll down.",
      defEs:     "Cargar contenido solo cuando hace falta, por ejemplo al bajar en la página.",
      example:   "Lazy loading reduces the initial load time.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "responsive",
      pron:      "ris-PON-siv",
      es:        "adaptable (responsive)",
      type:      "adjective",
      category:  "web",
      def:       "Describes a design that adjusts to different screen sizes, like phones and computers.",
      defEs:     "Se dice del diseño que se ajusta a distintos tamaños de pantalla, como celulares y computadoras.",
      example:   "A responsive site works on any screen size.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "routing",
      pron:      "RAU-tin",
      es:        "enrutamiento",
      type:      "noun",
      category:  "web",
      def:       "Deciding which page or content to show according to the URL.",
      defEs:     "Decidir qué página o contenido mostrar según la URL.",
      example:   "Routing lets users move between pages.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "server-side",
      pron:      "SER-ver-SAID",
      es:        "del lado del servidor",
      type:      "adjective",
      category:  "web",
      def:       "Describes code or processes that run on the server, not in the user's browser.",
      defEs:     "Se dice del código o los procesos que corren en el servidor y no en el navegador del usuario.",
      example:   "PHP is used for server-side development.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "single-page application",
      pron:      "SIN-gl PEIJ a-pli-KEI-shen",
      es:        "aplicación de una sola página",
      type:      "noun",
      category:  "web",
      def:       "A web app that loads one page and updates its content without reloading.",
      defEs:     "Aplicación web que carga una única página y actualiza su contenido sin recargarla.",
      example:   "Angular is used to build single-page applications.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "template",
      pron:      "TEM-pleit",
      es:        "plantilla",
      type:      "noun",
      category:  "web",
      def:       "A predefined model used as a base to create documents or pages.",
      defEs:     "Modelo predefinido que se usa como base para crear documentos o páginas.",
      example:   "The template defines the component's view.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "web page",
      pron:      "UEB PEIJ",
      es:        "página web",
      type:      "noun",
      category:  "web",
      def:       "A document on the internet that you can view in a browser.",
      defEs:     "Documento de internet que se puede ver en un navegador.",
      example:   "Java makes a web page more interactive.",
      exampleEs: "",
      note:      ""
    },


    // ══════════════════════════════════════════════════════════════════════
    //  DATOS E IA  (category: "data")  ·  15 términos
    // ══════════════════════════════════════════════════════════════════════

    {
      term:      "artificial intelligence",
      pron:      "ar-ti-FI-shal in-TE-li-yens",
      es:        "inteligencia artificial",
      type:      "noun",
      category:  "data",
      def:       "Technology that lets machines do tasks that normally need human intelligence.",
      defEs:     "Tecnología que permite a las máquinas hacer tareas que normalmente requieren inteligencia humana.",
      example:   "Synapse is an artificial intelligence assistant.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "big data",
      pron:      "BIG DEI-ta",
      es:        "grandes volúmenes de datos (big data)",
      type:      "noun",
      category:  "data",
      def:       "Extremely large sets of data that need special tools to be analyzed.",
      defEs:     "Conjuntos de datos enormes que necesitan herramientas especiales para ser analizados.",
      example:   "Python is used to process big data.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "CMS",
      pron:      "si-em-ES",
      es:        "sistema de gestión de contenidos",
      type:      "abbreviation",
      category:  "data",
      def:       "Software for creating and managing website content without programming, like WordPress.",
      defEs:     "Software para crear y administrar el contenido de un sitio web sin programar, como WordPress.",
      example:   "WordPress is a popular CMS.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "connector",
      pron:      "co-NEK-ter",
      es:        "conector",
      type:      "noun",
      category:  "data",
      def:       "A piece of software or hardware that links two systems or devices.",
      defEs:     "Pieza de software o hardware que une dos sistemas o dispositivos.",
      example:   "Install MySQL Connector with pip.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "data analytics",
      pron:      "DEI-ta a-na-LI-tiks",
      es:        "analítica de datos",
      type:      "noun",
      category:  "data",
      def:       "Examining data to find patterns and useful information for making decisions.",
      defEs:     "Examinar datos para encontrar patrones e información útil para tomar decisiones.",
      example:   "Data analytics turns data into decisions.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "database",
      pron:      "DEI-ta-beis",
      es:        "base de datos",
      type:      "noun",
      category:  "data",
      def:       "An organized collection of data stored so it can be easily searched and managed.",
      defEs:     "Colección organizada de datos guardados para poder buscarlos y administrarlos fácilmente.",
      example:   "PHP connects easily to a database.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "driver",
      pron:      "DRAI-ver",
      es:        "controlador (driver)",
      type:      "noun",
      category:  "data",
      def:       "Software that lets the operating system communicate with a hardware device.",
      defEs:     "Software que permite que el sistema operativo se comunique con un dispositivo de hardware.",
      example:   "Python needs a driver to talk to MySQL.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "machine learning",
      pron:      "ma-SHIN LER-nin",
      es:        "aprendizaje automático",
      type:      "noun",
      category:  "data",
      def:       "A branch of AI where computers learn patterns from data without being explicitly programmed.",
      defEs:     "Rama de la IA en la que las computadoras aprenden patrones a partir de datos sin ser programadas paso a paso.",
      example:   "TensorFlow is a machine learning library.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "primary key",
      pron:      "PRAI-me-ri KI",
      es:        "clave primaria",
      type:      "noun",
      category:  "data",
      def:       "A field that identifies each row of a table in a unique way.",
      defEs:     "Campo que identifica de forma única cada fila de una tabla.",
      example:   "The primary key identifies each record.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "query",
      pron:      "KUI-ri",
      es:        "consulta",
      type:      "noun",
      category:  "data",
      def:       "A request for information from a database.",
      defEs:     "Pedido de información a una base de datos.",
      example:   "Run a query to get the records.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "record",
      pron:      "RE-cord",
      es:        "registro",
      type:      "noun",
      category:  "data",
      def:       "One row of a table that contains the data of a single item.",
      defEs:     "Una fila de una tabla que contiene los datos de un solo elemento.",
      example:   "Delete the record from the table.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "schema",
      pron:      "SKI-ma",
      es:        "esquema",
      type:      "noun",
      category:  "data",
      def:       "The structure of a database: its tables, fields and relationships.",
      defEs:     "Estructura de una base de datos: sus tablas, campos y relaciones.",
      example:   "The schema describes the database structure.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "SQL",
      pron:      "es-kiu-EL",
      es:        "lenguaje de consultas estructurado",
      type:      "abbreviation",
      category:  "data",
      def:       "The standard language used to create, query and change relational databases.",
      defEs:     "Lenguaje estándar que se usa para crear, consultar y modificar bases de datos relacionales.",
      example:   "MySQL uses standard SQL.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "table",
      pron:      "TEI-bl",
      es:        "tabla",
      type:      "noun",
      category:  "data",
      def:       "A structure of rows and columns that stores data in a database.",
      defEs:     "Estructura de filas y columnas que guarda datos en una base de datos.",
      example:   "Each table stores one type of data.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "web scraping",
      pron:      "UEB SKREI-pin",
      es:        "extracción de datos web (web scraping)",
      type:      "noun",
      category:  "data",
      def:       "Automatically extracting information from websites with a program.",
      defEs:     "Sacar información de sitios web de forma automática con un programa.",
      example:   "Python is popular for web scraping.",
      exampleEs: "",
      note:      ""
    },


    // ══════════════════════════════════════════════════════════════════════
    //  REDES E INTERNET  (category: "networks")  ·  16 términos
    // ══════════════════════════════════════════════════════════════════════

    {
      term:      "bandwidth",
      pron:      "BAND-uidth",
      es:        "ancho de banda",
      type:      "noun",
      category:  "networks",
      def:       "The maximum amount of data that can travel through a connection per second.",
      defEs:     "Cantidad máxima de datos que puede viajar por una conexión en un segundo.",
      example:   "Video streaming needs high bandwidth.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "client",
      pron:      "CLAI-ent",
      es:        "cliente",
      type:      "noun",
      category:  "networks",
      def:       "A computer or program that requests services from a server.",
      defEs:     "Computadora o programa que pide servicios a un servidor.",
      example:   "The client sends a request to the server.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "DNS",
      pron:      "di-en-ES",
      es:        "sistema de nombres de dominio",
      type:      "abbreviation",
      category:  "networks",
      def:       "The system that translates domain names, like google.com, into IP addresses.",
      defEs:     "Sistema que traduce nombres de dominio, como google.com, en direcciones IP.",
      example:   "DNS translates domain names into IP addresses.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "FTP",
      pron:      "ef-ti-PI",
      es:        "protocolo de transferencia de archivos",
      type:      "abbreviation",
      category:  "networks",
      def:       "A standard protocol for sending files between computers over a network.",
      defEs:     "Protocolo estándar para enviar archivos entre computadoras a través de una red.",
      example:   "Upload the files by FTP.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "hosting",
      pron:      "JOS-tin",
      es:        "alojamiento web (hosting)",
      type:      "noun",
      category:  "networks",
      def:       "A service that stores your website on a server so people can visit it on the internet.",
      defEs:     "Servicio que guarda tu sitio web en un servidor para que la gente pueda visitarlo en internet.",
      example:   "Shared hosting is cheaper.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "HTTP",
      pron:      "eich-ti-ti-PI",
      es:        "protocolo de transferencia de hipertexto",
      type:      "abbreviation",
      category:  "networks",
      def:       "The protocol used to send web pages from servers to browsers.",
      defEs:     "Protocolo que se usa para enviar páginas web desde los servidores a los navegadores.",
      example:   "HTTP requests carry the data.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "IP address",
      pron:      "ai-PI a-DRES",
      es:        "dirección IP",
      type:      "noun",
      category:  "networks",
      def:       "A unique number that identifies each device on a network.",
      defEs:     "Número único que identifica a cada dispositivo en una red.",
      example:   "Every device has an IP address.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "LAN",
      pron:      "LAN",
      es:        "red de área local",
      type:      "abbreviation",
      category:  "networks",
      def:       "A network that connects devices in a small area, like a home, office or school.",
      defEs:     "Red que conecta dispositivos en un área pequeña, como una casa, una oficina o una escuela.",
      example:   "A LAN connects computers in one office.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "latency",
      pron:      "LEI-ten-si",
      es:        "latencia",
      type:      "noun",
      category:  "networks",
      def:       "The delay between sending data and receiving a response.",
      defEs:     "Demora entre que se envían datos y se recibe una respuesta.",
      example:   "Low latency improves online games.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "packet",
      pron:      "PA-ket",
      es:        "paquete de datos",
      type:      "noun",
      category:  "networks",
      def:       "A small unit of data sent over a network.",
      defEs:     "Pequeña unidad de información que se envía por una red.",
      example:   "Data travels across the network in packets.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "protocol",
      pron:      "PRO-to-col",
      es:        "protocolo",
      type:      "noun",
      category:  "networks",
      def:       "A set of rules that defines how devices communicate.",
      defEs:     "Conjunto de reglas que define cómo se comunican los dispositivos.",
      example:   "HTTP is a communication protocol.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "router",
      pron:      "RAU-ter",
      es:        "enrutador (router)",
      type:      "noun",
      category:  "networks",
      def:       "A device that sends data between different networks and connects your home to the internet.",
      defEs:     "Dispositivo que envía datos entre distintas redes y conecta tu casa a internet.",
      example:   "The router connects the LAN to the internet.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "switch",
      pron:      "SUICH",
      es:        "conmutador (switch)",
      type:      "noun",
      category:  "networks",
      def:       "A device that connects several devices inside the same local network.",
      defEs:     "Dispositivo que conecta varios equipos dentro de una misma red local.",
      example:   "A switch connects devices in a LAN.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "traffic",
      pron:      "TRA-fik",
      es:        "tráfico",
      type:      "noun",
      category:  "networks",
      def:       "The amount of data moving across a network or the visits a website receives.",
      defEs:     "Cantidad de datos que circula por una red o de visitas que recibe un sitio web.",
      example:   "The server handles heavy traffic.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "WAN",
      pron:      "UAN",
      es:        "red de área amplia",
      type:      "abbreviation",
      category:  "networks",
      def:       "A network that covers a large geographic area, like a country; the internet is the biggest one.",
      defEs:     "Red que cubre un área geográfica grande, como un país; internet es la más grande de todas.",
      example:   "The Internet is the largest WAN.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "wireless",
      pron:      "UAIR-les",
      es:        "inalámbrico",
      type:      "adjective",
      category:  "networks",
      def:       "Working without cables, using radio waves like Wi-Fi or Bluetooth.",
      defEs:     "Que funciona sin cables, usando ondas de radio como Wi-Fi o Bluetooth.",
      example:   "Wireless networks are convenient.",
      exampleEs: "",
      note:      ""
    },


    // ══════════════════════════════════════════════════════════════════════
    //  SEGURIDAD INFORMÁTICA  (category: "security")  ·  19 términos
    // ══════════════════════════════════════════════════════════════════════

    {
      term:      "access control",
      pron:      "AK-ses con-TROL",
      es:        "control de acceso",
      type:      "noun",
      category:  "security",
      def:       "Rules that decide who can use certain resources or information.",
      defEs:     "Reglas que deciden quién puede usar ciertos recursos o información.",
      example:   "PHP can implement access control.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "authentication",
      pron:      "o-THEN-ti-KEI-shen",
      es:        "autenticación",
      type:      "noun",
      category:  "security",
      def:       "The process of verifying who a user is, for example with a password.",
      defEs:     "Proceso de verificar quién es un usuario, por ejemplo con una clave.",
      example:   "Authentication verifies who the user is.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "authorization",
      pron:      "o-tho-ri-ZEI-shen",
      es:        "autorización",
      type:      "noun",
      category:  "security",
      def:       "The process of deciding what a user is allowed to do after logging in.",
      defEs:     "Proceso de decidir qué tiene permitido hacer un usuario después de ingresar.",
      example:   "Authorization decides what a user can do.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "breach",
      pron:      "BRICH",
      es:        "brecha de seguridad",
      type:      "noun",
      category:  "security",
      def:       "An incident where someone gets unauthorized access to data or systems.",
      defEs:     "Incidente en el que alguien accede sin permiso a datos o sistemas.",
      example:   "Most breaches happen due to human error.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "code injection",
      pron:      "COUD in-YEK-shen",
      es:        "inyección de código",
      type:      "noun",
      category:  "security",
      def:       "An attack where malicious code is inserted into a program to make it run.",
      defEs:     "Ataque en el que se mete código malicioso en un programa para que lo ejecute.",
      example:   "Validate inputs to prevent code injection.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "cross-site scripting",
      pron:      "CROS-SAIT SCRIP-tin",
      es:        "secuencias de comandos en sitios cruzados (XSS)",
      type:      "noun",
      category:  "security",
      def:       "An attack where malicious scripts are inserted into a trusted website to affect its visitors.",
      defEs:     "Ataque en el que se insertan scripts maliciosos en un sitio confiable para afectar a sus visitantes.",
      example:   "XSS is a common vulnerability.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "cyberattack",
      pron:      "SAI-ber-a-tak",
      es:        "ciberataque",
      type:      "noun",
      category:  "security",
      def:       "An attempt to damage, steal or disrupt computer systems or networks.",
      defEs:     "Intento de dañar, robar o interrumpir sistemas informáticos o redes.",
      example:   "Cyberattacks are evolving.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "cybersecurity",
      pron:      "SAI-ber-si-KIU-ri-ti",
      es:        "ciberseguridad",
      type:      "noun",
      category:  "security",
      def:       "The practice of protecting systems, networks and data from digital attacks.",
      defEs:     "Práctica de proteger sistemas, redes y datos de ataques digitales.",
      example:   "Cybersecurity is a major concern.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "DDoS attack",
      pron:      "di-di-OS a-TAK",
      es:        "ataque de denegación de servicio",
      type:      "noun",
      category:  "security",
      def:       "An attack that floods a server with traffic from many computers so it stops working.",
      defEs:     "Ataque que inunda un servidor con tráfico desde muchas computadoras para que deje de funcionar.",
      example:   "A DDoS attack floods the server.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "encryption",
      pron:      "en-CRIP-shen",
      es:        "cifrado",
      type:      "noun",
      category:  "security",
      def:       "Converting information into a secret code so only authorized people can read it.",
      defEs:     "Convertir la información en un código secreto para que solo las personas autorizadas puedan leerla.",
      example:   "Encryption protects your data.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "firewall",
      pron:      "FAIER-uol",
      es:        "cortafuegos",
      type:      "noun",
      category:  "security",
      def:       "A security system that controls and blocks incoming and outgoing network traffic.",
      defEs:     "Sistema de seguridad que controla y bloquea el tráfico de red que entra y sale.",
      example:   "A firewall protects a computer network.",
      exampleEs: "Un firewall protege una red informática.",
      note:      ""
    },

    {
      term:      "hacker",
      pron:      "JA-ker",
      es:        "hacker / intruso informático",
      type:      "noun",
      category:  "security",
      def:       "A person who uses technical skills to access systems, sometimes without permission.",
      defEs:     "Persona que usa sus conocimientos técnicos para entrar en sistemas, a veces sin permiso.",
      example:   "Hackers secretly change information in computer systems.",
      exampleEs: "Los hackers modifican información en sistemas en secreto.",
      note:      ""
    },

    {
      term:      "malware",
      pron:      "MAL-uer",
      es:        "software malicioso",
      type:      "noun",
      category:  "security",
      def:       "Software designed to damage or gain unauthorized access to a computer, like viruses.",
      defEs:     "Software diseñado para dañar una computadora o acceder a ella sin permiso, como los virus.",
      example:   "Malware can damage your system.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "password",
      pron:      "PAS-uerd",
      es:        "contraseña",
      type:      "noun",
      category:  "security",
      def:       "A secret word or combination of characters used to access an account.",
      defEs:     "Palabra o combinación secreta de caracteres que se usa para entrar a una cuenta.",
      example:   "Never share your password.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "phishing",
      pron:      "FI-shin",
      es:        "phishing (engaño para robar datos)",
      type:      "noun",
      category:  "security",
      def:       "A scam using fake emails or websites to trick people into giving personal data.",
      defEs:     "Estafa con correos o sitios web falsos para engañar a las personas y que entreguen sus datos.",
      example:   "Phishing scams steal passwords.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "security patch",
      pron:      "si-KIU-ri-ti PACH",
      es:        "parche de seguridad",
      type:      "noun",
      category:  "security",
      def:       "An update that fixes a weakness in software that attackers could use.",
      defEs:     "Actualización que corrige una debilidad del software que podrían aprovechar los atacantes.",
      example:   "Install every security patch.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "spear phishing",
      pron:      "SPIR FI-shin",
      es:        "phishing dirigido (spear phishing)",
      type:      "noun",
      category:  "security",
      def:       "A fake email attack aimed at one specific person or company.",
      defEs:     "Ataque con correos falsos dirigido a una persona o empresa en particular.",
      example:   "Spear phishing targets specific people.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "two-factor authentication",
      pron:      "TU-FAK-ter o-THEN-ti-KEI-shen",
      es:        "autenticación de dos factores",
      type:      "noun",
      category:  "security",
      def:       "A login method that asks for two different proofs of identity, like a password and a code.",
      defEs:     "Método de ingreso que pide dos pruebas de identidad distintas, como una clave y un código.",
      example:   "Enable two-factor authentication.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "vulnerability",
      pron:      "val-ne-ra-BI-li-ti",
      es:        "vulnerabilidad",
      type:      "noun",
      category:  "security",
      def:       "A weakness in a system that an attacker could exploit.",
      defEs:     "Debilidad de un sistema que un atacante podría aprovechar.",
      example:   "One vulnerability can expose the whole app.",
      exampleEs: "",
      note:      ""
    },


    // ══════════════════════════════════════════════════════════════════════
    //  PHRASAL VERBS TÉCNICOS  (category: "phrasal")  ·  10 términos
    // ══════════════════════════════════════════════════════════════════════

    {
      term:      "back up",
      pron:      "BAK ap",
      es:        "respaldar",
      type:      "phrasal verb",
      category:  "phrasal",
      def:       "To make a copy of data to protect it in case it is lost.",
      defEs:     "Hacer una copia de los datos para protegerlos por si se pierden.",
      example:   "Back up your files every week.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "boot up",
      pron:      "BUT AP",
      es:        "arrancar (el sistema)",
      type:      "phrasal verb",
      category:  "phrasal",
      def:       "To start a computer and load its operating system.",
      defEs:     "Encender una computadora y cargar su sistema operativo.",
      example:   "The server takes a minute to boot up.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "carry out",
      pron:      "CA-ri AUT",
      es:        "llevar a cabo",
      type:      "phrasal verb",
      category:  "phrasal",
      def:       "To do or complete a task or process.",
      defEs:     "Hacer o completar una tarea o un proceso.",
      example:   "Carry out a security audit.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "hook up",
      pron:      "JUK AP",
      es:        "conectar",
      type:      "phrasal verb",
      category:  "phrasal",
      def:       "To connect a device to another device or to a network.",
      defEs:     "Enchufar o unir un dispositivo a otro o a una red.",
      example:   "Hook up the printer to the network.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "log in",
      pron:      "LOG IN",
      es:        "iniciar sesión",
      type:      "phrasal verb",
      category:  "phrasal",
      def:       "To enter a system or account using your username and password.",
      defEs:     "Entrar a un sistema o cuenta con tu usuario y contraseña.",
      example:   "Log in with your username and password.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "log out",
      pron:      "LOG AUT",
      es:        "cerrar sesión",
      type:      "phrasal verb",
      category:  "phrasal",
      def:       "To leave a system or account so others cannot use your session.",
      defEs:     "Salir de un sistema o cuenta para que otros no puedan usar tu sesión.",
      example:   "Log out when you finish.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "roll back",
      pron:      "ROL BAK",
      es:        "revertir",
      type:      "phrasal verb",
      category:  "phrasal",
      def:       "To return a system or code to a previous version.",
      defEs:     "Volver un sistema o un código a una versión anterior.",
      example:   "Roll back the update if it fails.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "run out of",
      pron:      "RAN AUT AV",
      es:        "quedarse sin",
      type:      "phrasal verb",
      category:  "phrasal",
      def:       "To use all of something so that there is none left.",
      defEs:     "Usar todo algo hasta que no quede nada.",
      example:   "The server ran out of memory.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "set up",
      pron:      "SET ap",
      es:        "configurar / instalar",
      type:      "phrasal verb",
      category:  "phrasal",
      def:       "To prepare and configure a system or device so it is ready to use.",
      defEs:     "Preparar y ajustar un sistema o dispositivo para que quede listo para usar.",
      example:   "Set up the network first.",
      exampleEs: "",
      note:      ""
    },

    {
      term:      "shut down",
      pron:      "SHAT DAUN",
      es:        "apagar (el sistema)",
      type:      "phrasal verb",
      category:  "phrasal",
      def:       "To turn off a computer or system properly.",
      defEs:     "Cerrar todo correctamente y dejar la computadora o el sistema sin funcionar.",
      example:   "Shut down the server before the update.",
      exampleEs: "",
      note:      ""
    },

  ]
};
