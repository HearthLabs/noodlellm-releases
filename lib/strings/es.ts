import type { Strings } from "./en";

export const es: Strings = {
  meta: {
    tagline: "IA en tu propio ordenador",
    description:
      "Una aplicación de escritorio que ejecuta modelos de IA en tu propio ordenador. Comprueba qué puede ejecutar de verdad tu equipo, se instala con un clic y nunca envía tus conversaciones a ninguna parte.",
    downloadTitle: "Descargar",
    downloadDescription: (app) =>
      `Descarga ${app} para Windows o Mac. Funciona con gráficos NVIDIA, AMD e Intel, Apple Silicon, o sin tarjeta gráfica.`,
    pricingTitle: "Precios",
    pricingDescription: (app) =>
      `Lo que cuesta ${app}: 14 días para probarlo y después una suscripción. Precio de fundador para los 100 primeros.`,
    modelsTitle: "Modelos por tarjeta gráfica",
    modelsDescription:
      "Qué modelos de IA funcionan en una tarjeta gráfica de 8, 16 o 24 GB, con tamaños, fechas de publicación y para qué sirve cada uno.",
    modelDescription: (tagline, needs, price, licence) =>
      `${tagline}. Funciona en tu propio ordenador, desde ${needs} de memoria gráfica. ${price}, ${licence}.`,
  },

  nav: {
    models: "Modelos",
    pricing: "Precios",
    download: "Descargar",
    language: "Idioma",
    alsoIn: (language) => `Esta página también está en ${language}.`,
    switchTo: (language) => `Leerla en ${language}`,
    dismiss: "No, gracias",
    smartscreen: "Puede que Windows te avise la primera vez. Haz clic en Más información y luego en Ejecutar de todas formas.",
    gatekeeper: "Puede que tu Mac lo bloquee la primera vez. Abre Ajustes del Sistema, luego Privacidad y seguridad, y haz clic en Abrir igualmente.",
  },

  footer: {
    blurb: (tagline) => `${tagline}. Los modelos funcionan en tu equipo, no en nuestra nube.`,
    product: "Producto",
    legal: "Legal",
    download: "Descargar",
    models: "Modelos",
    pricing: "Precios",
    privacy: "Privacidad",
    terms: "Condiciones",
    licences: "Licencias",
    sellModel: "Publica tu modelo",
    creatorAgreement: "Acuerdo para creadores",
    rights: (year, company) => `© ${year} ${company}`,
    llc: "Una sociedad de responsabilidad limitada de Virginia Occidental",
  },

  home: {
    heroTitle: "Privado, sin conexión, sin contador. Esta es tuya.",
    heroBody: (app) =>
      `${app} ejecuta modelos de IA en tu propio ordenador en lugar de en los servidores de otros. Nada de lo que escribes sale de tu equipo, sigue funcionando sin internet y no hay contador de cuánto lo usas. Escribe con él, resume con él y pregúntale por tus propios documentos.`,
    download: "Descargar para Windows",
    downloadMac: "Descargar para Mac",
    trial: "14 días para probarlo, después",
    fromPrice: "desde 8 $ al mes",

    chooserTitle: "¿Cuál de estos eres tú?",
    chooserIntro: "La misma aplicación, por dos motivos distintos. Elige el tuyo y te enseñamos lo que te importa.",
    chooser: [
      {
        t: "Para ti",
        b: "Una persona, en su propio ordenador, para el día a día.",
      },
      {
        t: "Para un pequeño despacho",
        b: "Abogados, contables, médicos y terapeutas cuyos expedientes no pueden ir a un servicio externo.",
      },
    ],
    chooserMore: "Mira lo que hace por ti",

    whyTitle: "Por qué ejecutarla tú",
    whyIntro: "Cuanto más depende tu trabajo de la IA, más importa quién la controla.",
    why: [
      {
        t: "Ellos ponen las reglas. Tú te aguantas.",
        b: "Las empresas de IA en la nube deciden cuánto cuesta, cuánto puedes usar, en qué países se puede usar y qué modelo te toca, y lo cambian todo cuando les conviene. En tu propio ordenador nada cambia a menos que tú lo cambies: el modelo que tienes se queda tal cual y, cuando sale uno mejor, lo descargas sin contrato nuevo.",
      },
      {
        t: "Vuelve a intentarlo tantas veces como quieras.",
        b: "Los buenos resultados salen de reformular, reintentar y pulir. Cuando cada intento se cobra, te contienes. En tu propio ordenador el décimo intento cuesta lo mismo que el primero: nada extra.",
      },
      {
        t: "Tus archivos no salen de la habitación.",
        b: "No se sube nada de lo que escribes o abres, así que no hay nada que filtrar ni ninguna política de privacidad ajena en la que confiar. Una vez instalado un modelo, no necesita internet en absoluto.",
      },
      {
        t: "La nube es más lista. Esa nunca fue toda la cuestión.",
        b: "Algunas tareas necesitan el modelo más listo que exista. La mayoría no: redactar una carta, resumir un informe, encontrar la cláusula en un contrato. Tu IA local suele ser peor en el razonamiento difícil y más lenta en un PC modesto, así que guarda una IA en la nube (por ejemplo, ChatGPT) para el problema raro que necesita lo mejor de lo mejor, y haz aquí lo cotidiano, lo privado y lo repetitivo.",
      },
    ],

    stepsTitle: "Tres pasos y es tuya",
    steps: [
      ["Instálala", "Un clic y luego inicias sesión. Nada que configurar."],
      ["Elige uno que diga que irá bien", "Ya ha revisado tu ordenador, así que cada modelo aparece marcado como que irá bien, lento o que no funcionará. La descarga ocupa más o menos lo que una película."],
      ["Empieza a escribir", "Esa es toda la preparación."],
    ],
    shotAlt: (app) => `Una conversación en ${app}, respondiendo a partir de un documento del propio usuario`,
    shotCaption: "Una conversación real en un equipo real. La respuesta indica el archivo del que salió.",

    individualEyebrow: "Para usuarios individuales",
    individualTitle: "Lo que hace por ti",
    individual: [
      {
        t: "Lee tus propios archivos",
        b: "Indícale una carpeta con documentos de Word, PDF, hojas de cálculo, presentaciones o notas y pregunta. Antes de leer te dice cuánto tardará y qué archivos tendrá que saltarse, y cada respuesta indica de qué archivo salió.",
      },
      {
        t: "Te recuerda",
        b: "Dile una vez quién eres y cómo quieres las respuestas, y cada conversación empieza desde ahí. Es un cuadro que puedes leer, editar y vaciar, y empezar un mensaje con «recuerda:» le añade algo.",
      },
      {
        t: "Las conversaciones largas no se desmoronan",
        b: "Cuando un chat supera lo que el modelo puede retener, resume los mensajes anteriores en vez de olvidarlos, así que los nombres, las cifras y las decisiones del principio siguen contando. Puedes leer ese resumen cuando quieras.",
      },
      {
        t: "Prepara cada chat para una tarea",
        b: "Dale a una conversación sus propias instrucciones, como un profesor que pregunta de una en una o un tono formal para cartas a clientes, y elige si sus respuestas son más estables o más atrevidas. Hay ejemplos para empezar.",
      },
      {
        t: "Úsalo desde el móvil",
        b: "Vincula tu móvil una vez escaneando un código y sigue tus conversaciones desde el sofá o la habitación de al lado, con tus archivos incluidos. Solo funciona en la wifi de casa o de la oficina y todo va cifrado entre los dos, así que nada pasa por nosotros. La app para móvil llegará pronto.",
      },
      {
        t: "En tu idioma",
        b: "La app está en español, inglés, alemán, japonés y chino, y la mayoría de los modelos responden en el idioma en que escribas.",
      },
    ],

    readsMore: "Lo que puede leer y lo que no",
    readsHeading: "Lee",
    reads: [
      "Documentos de Word (.docx)",
      "PDF con texto seleccionable",
      "Presentaciones de PowerPoint (.pptx)",
      "Hojas de cálculo de Excel (.xlsx)",
      "Texto plano, Markdown, CSV, JSON y RTF",
    ],
    cannotHeading: "Todavía no lee",
    cannot: [
      ["Escaneos y fotos de páginas", "No hay texto que leer en el archivo, solo una imagen de él."],
      ["Los formatos .doc, .xls y .ppt anteriores a 2007", "Volver a guardarlo en Office como .docx lo soluciona."],
      ["Pages, Numbers y Keynote", "Exportarlo al equivalente de Word, Excel o PowerPoint funciona."],
      ["Imágenes, audio y vídeo", "Solo texto, por ahora."],
    ],

    practiceEyebrow: "Para pequeños despachos",
    practiceTitle: "Cuando la respuesta a «¿adónde fueron los datos?» tiene que ser «a ninguna parte»",
    practiceIntro:
      "Un abogado, un contable, un médico o un terapeuta a menudo no pueden enviar material de clientes a un servicio externo en absoluto, cueste lo que cueste y prometa lo que prometa el proveedor.",
    practice: [
      {
        t: "Nada que poner en un acuerdo de datos",
        b: "No hay encargado del tratamiento que nombrar ni transferencia que declarar, porque no se transmite nada. La pregunta que hace tu política de cumplimiento ni siquiera se plantea.",
      },
      {
        t: "Cada respuesta muestra de dónde sale",
        b: "Indícale las carpetas donde de verdad están los expedientes, con sus documentos de Word y PDF, y cada respuesta indica de qué archivo sale cada parte; un clic lo abre. Compruebas la fuente en vez de fiarte del modelo.",
      },
      {
        t: "Prepara cada chat para una tarea",
        b: "Una conversación para redactar cartas a clientes con el estilo del despacho, otra para resumir notas de casos: cada una puede tener sus propias instrucciones, con ejemplos para empezar.",
      },
      {
        t: "Un solo precio para todo el despacho",
        b: "El plan para despachos cubre hasta 15 ordenadores de un despacho o clínica por una sola cuota, mensual o anual, sin contar puestos por persona.",
      },
    ],

    devEyebrow: "Para desarrolladores",
    devSoon: "Muy pronto",
    devTitle: "Lleva tu modelo a quien puede ejecutarlo",
    devIntro: "Si ajustas modelos o creas adaptadores, publícalos gratis en la tienda. Tus archivos se quedan en Hugging Face; la tienda muestra cada modelo a quien tiene un ordenador capaz de ejecutarlo y lo instala con un clic. Nadie paga por token y nadie alquila una GPU.",
    dev: [
      {
        t: "Publicar es gratis",
        b: "Sin comisiones y sin nada que subir. La tienda enlaza el archivo exacto de tu página de Hugging Face.",
      },
      {
        t: "Solo se muestra donde funciona",
        b: "Cada publicación se compara con el hardware real de cada persona, para que sepa si funcionará antes de descargarla.",
      },
      {
        t: "Una página propia",
        b: "Una página de creador en la tienda con todos tus modelos, tu nombre y unas palabras sobre ti.",
      },
      {
        t: "La venta llegará después",
        b: "Las publicaciones de pago están en camino: pondrás un precio y te quedarás el 75 % de cada venta. Si publicas ahora, tus modelos ya estarán revisados y en la tienda.",
      },
    ],
    devStepsTitle: "Todo por tu cuenta, de principio a fin",
    devSteps: [
      ["Crea tu cuenta", "Entra con tu dirección de correo. Sin formularios de solicitud ni llamadas."],
      ["Acepta el Acuerdo de creador", "Condiciones claras: publicar es gratis y puedes retirar una publicación cuando quieras."],
      ["Enlaza tu modelo", "Descríbelo y pega el enlace de Hugging Face de cada versión. El repositorio debe ser público."],
      ["Lo revisamos y se publica", "Cada publicación se revisa antes de que nadie la vea, y solo se muestran modelos que el ordenador de cada persona puede ejecutar."],
      ["Mantenlo al día", "Añade una versión nueva cada vez que publiques una. Las versiones que la gente ya tiene nunca cambian."],
    ] as [string, string][],
    devNote: "La parte de creadores aún no está abierta. Así será cuando lo esté.",

    devOpen: "Abrir el portal de creadores",
    devOpenNote:
      "Entra con tu correo, describe tu modelo y enlaza sus archivos en Hugging Face. Cada publicación se revisa antes de salir.",
  },

  download: {
    title: (app) => `Descargar ${app}`,
    lead: "Gratis durante 14 días. Un instalador y después funciona sin conexión.",
    windows: "Windows 10 y 11",
    windowsMeta: "64 bits · 19 MB",
    windowsBody: (app) =>
      `Funciona con gráficos NVIDIA, AMD e Intel, y también sin tarjeta gráfica, solo que más despacio. ${app} comprueba cuál tienes la primera vez que lo abres.`,
    mac: "Mac con Apple Silicon",
    macMeta: "M1 o posterior · 31 MB",
    macBody: (app) =>
      `Ejecuta los modelos en los gráficos integrados del Mac, que comparten su memoria. Necesita macOS 13.3 o posterior. ${app} comprueba cuánta puede usar la primera vez que lo abres.`,
    costTitle: "Lo que cuesta",
    cost1:
      "Todo es gratis los primeros 14 días: la aplicación entera, todos los modelos abiertos del catálogo y sin tarjeta para empezar. Después es una suscripción, mensual o anual.",
    cost2:
      "Más adelante, algunos modelos especializados de la tienda también los venderán quienes los crearon. Serán una compra única, no un alquiler: compras uno y es tuyo.",
    warnTitle: "Windows te avisará la primera vez.",
    warn1: {
      before: "Al ejecutar el instalador, Windows muestra una pantalla azul que dice",
      quote: "«Windows protegió su PC»",
      middle: ". No hay una forma evidente de seguir: tienes que hacer clic en",
      moreInfo: "Más información",
      then: " y después en",
      runAnyway: "Ejecutar de todas formas",
      after: ".",
    },
    warn2:
      "No es un aviso de virus. Windows lo muestra con las aplicaciones nuevas que todavía no conoce, y solo la primera vez.",
    macWarnTitle: "Tu Mac también preguntará.",
    macWarn:
      "La primera vez que lo abras, macOS dirá que no puede comprobar si la aplicación contiene software malicioso. Tampoco es un aviso de virus. Haz clic en OK, abre Ajustes del Sistema, ve a Privacidad y seguridad, desplázate hacia abajo y haz clic en Abrir igualmente. Solo lo pregunta una vez.",
    needsTitle: "Lo que necesita",
    needs: [
      ["Windows 10 u 11, o un Mac con Apple Silicon", "Windows de 64 bits, o un Mac con M1 o posterior y macOS 13.3 o posterior. Nada más que instalar: ni Python, ni línea de comandos, ni configuración."],
      ["Cualquier tarjeta gráfica, o ninguna", "NVIDIA, AMD e Intel funcionan, y en un Mac, sus gráficos integrados. Sin tarjeta, los modelos se ejecutan en el procesador: más despacio, pero funciona."],
      ["Espacio para los modelos", "La aplicación ocupa 19 MB en Windows y 31 MB en Mac. Los modelos se descargan aparte, normalmente de 2 a 10 GB cada uno, y tú eliges cuáles."],
      ["Conexión a internet de vez en cuando", "Para descargar modelos y mantener la suscripción al día. En el día a día funciona con la red desconectada; tus preguntas nunca la necesitan."],
    ],
    unsure: "¿No sabes qué puede con tu ordenador?",
    seeModels: "Mira los modelos agrupados por tarjeta gráfica",
    orInstall: "o simplemente instálalo y te lo dirá.",
  },

  subscribeSuccess: {
    title: "Ya estás suscrito",
    boughtTitle: "Gracias por tu compra",
    boughtBody: "Abre Noodle LLM con el botón de abajo para añadir la licencia y luego instala el modelo desde la tienda. O ve a Ajustes → Cuenta y pega esto:",
    boughtManage: "La licencia no caduca. Abre este enlace en tus otros ordenadores para descargar el modelo allí también.",
    processing: "Terminando…",
    processingBody: "Esto tarda unos segundos después de pagar. Esta página se actualizará sola.",
    errorTitle: "Algo salió mal",
    errorBody: "No pudimos encontrar este pago. Si se te cobró, contacta con soporte y lo resolveremos.",
    openInApp: "Abrir en Noodle LLM",
    tokenLabel: "Tu licencia",
    tokenBody: "Abre Noodle LLM, ve a Ajustes → Cuenta, y pega esto:",
    copyButton: "Copiar",
    copied: "Copiado",
    manageBody: "Para actualizar tu tarjeta o cancelar más adelante, usa Gestionar suscripción en la sección Cuenta de la aplicación.",
    backHome: "Volver al inicio",
  },
  pricing: {
    checkoutButton: "Suscribirme",
    checkoutOpening: "Abriendo el pago…",
    checkoutError: "No se pudo iniciar el pago. Inténtalo de nuevo en un momento.",
    tryItButton: "Descargar",
    title: "Lo que cuesta",
    // es-ES leaves 2000 ungrouped; the de-DE form gives the "2.000" Spanish prices use.
    money: (n) => `${n.toLocaleString("de-DE")} $`,
    billingMonthly: "Mensual",
    billingYearly: "Anual",
    yearlySave: "Más barato",
    lead: "Catorce días para probarlo todo y después una suscripción. Los modelos se descargan gratis y se usan tanto como quieras; la suscripción es por la aplicación. Sin cargos por mensaje ni por token.",
    plans: [
      {
        name: "Pruébalo",
        price: "Gratis",
        per: "durante 14 días",
        perYear: "",
        blurb: "Todo, durante 14 días. Sin tarjeta.",
        points: ["Todos los modelos abiertos del catálogo", "Chatear, escribir y resumir", "Preguntas sobre tus propios documentos", "Funciona sin internet"],
        note: "",
      },
      {
        name: "Particulares",
        price: "",
        per: "al mes (solo los 100 primeros)",
        perYear: "al año (solo los 100 primeros)",
        blurb: "Para una persona que quiere su IA en su propio ordenador.",
        points: ["Todo lo de la prueba, sin límite de tiempo", "Sin cobros por mensaje ni topes diarios", "Hasta 3 de tus ordenadores", "Tu precio fijo mientras sigas suscrito"],
        note: "",
      },
      {
        name: "Despachos",
        price: "",
        per: "al mes",
        perYear: "al año",
        blurb: "Para un despacho de abogados, una clínica o una asesoría.",
        points: ["Los archivos de los clientes nunca salen del despacho", "Cada respuesta muestra de dónde sale", "Prepara cada chat para una tarea", "Hasta 15 ordenadores en una oficina"],
        note: "",
      },
    ],
    othersTitle: "Modelos de otras personas",
    others1:
      "El catálogo se descarga gratis con cualquier plan, igual que los modelos que otras personas publican en la tienda. Más adelante, quienes crean modelos especializados también podrán venderlos: un modelo para redactar textos legales, otro ajustado para un tipo de código.",
    others2Before: "Serán una",
    others2Strong: "compra única, no un alquiler",
    others2After:
      ". Compras uno y es tuyo, en los equipos donde lo instalaste, pase lo que pase después con tu suscripción.",
    faqTitle: "Preguntas frecuentes",
    faq: [
      ["¿Hay un límite de uso?", "No. Funciona en tu propio ordenador, así que no se cobra por mensaje ni hay tope diario. Úsalo todo lo que quieras."],
      ["¿Os llega algo de lo que escribo?", "No. Tus preguntas, respuestas y archivos nunca salen de tu ordenador. La aplicación solo se conecta para descargar modelos y comprobar tu suscripción."],
      ["¿Qué pasa después de los 14 días?", "La aplicación se pausa hasta que te suscribas. Tus modelos y conversaciones se quedan en tu ordenador y no se borra nada."],
      ["¿Puedo usarlo en más de un ordenador?", "Sí, en hasta 3 de tus ordenadores. Para usar un cuarto, cierra la sesión en uno de los otros desde la aplicación."],
      ["¿Subirán mis 8 $ más adelante?", "Para los 100 primeros miembros, se mantienen los 8 $ al mes, u 80 $ al año, mientras sigan suscritos, aunque suba el precio para los nuevos miembros."],
      ["¿Puedo cancelar?", "Sí, cuando quieras, desde la sección Cuenta de la aplicación. Los modelos que compraste siguen siendo tuyos."],
      ["Somos un despacho. ¿Necesitamos una suscripción cada uno?", "No. El plan Despachos cubre hasta 15 ordenadores de una oficina por un solo precio."],
    ],
    ctaDownload: "Descárgalo y empieza los 14 días",
    ctaOr: "o",
    ctaModels: "mira qué modelos le van a tu ordenador",
    ctaFirst: "primero.",
  },

  models: {
    title: "Qué modelos funcionan en tu PC",
    lead: (app) =>
      `Agrupados por tarjeta gráfica, para que encuentres la tuya. ${app} comprueba tu hardware real al instalarlo y te dice cuáles irán bien, cuáles irán lentos y cuáles no funcionarán.`,
    versionNames: { recommended: "Recomendada", higher: "Más calidad", best: "Máxima calidad", other: "Otra" },
    visionComing: "Ve imágenes: próximamente",
    goodFor: {
      allround: "Todoterreno",
      code: "Código",
      writing: "Escritura",
      reasoning: "Razonamiento paso a paso",
      instructions: "Instrucciones detalladas",
      speed: "Respuestas rápidas",
      longchats: "Conversaciones largas",
    },
    tiers: [
      { gb: 8, title: "Tarjeta gráfica de 8 GB", note: "La más común. Estos funcionan enteros en ella, con sitio para una conversación larga." },
      { gb: 16, title: "Tarjeta gráfica de 12–16 GB", note: "Modelos claramente más capaces, con sitio para documentos largos." },
      { gb: 24, title: "Tarjeta gráfica de 24 GB", note: "Los modelos más fuertes que caben en una sola tarjeta de consumo." },
      { gb: 32, title: "Tarjeta gráfica de 32 GB", note: "Todo lo anterior, y los modelos más grandes en una versión de más calidad. Estas son las versiones que añade una tarjeta de 32 GB." },
    ],
    download: (size) => `Descarga de ${size}`,
    needs: (memory) => `necesita ${memory}`,
    estimated: "estimado",
    estimatedTitle: "Calculado a partir del archivo y el diseño del modelo; aún no medido en hardware real. La aplicación lo comprueba con tu tarjeta.",
  },

  model: {
    back: "← Modelos",
    buy: (price: string) => `Comprar para ti · ${price}`,
    buyPractice: (price: string) => `Comprar para un despacho · ${price}`,
    buyOpening: "Abriendo el pago…",
    buyError: "No se pudo iniciar el pago. Inténtalo de nuevo en un momento.",
    buyNote: "Para ti: hasta 3 de tus ordenadores. Para un despacho: hasta 15 ordenadores de tu firma. Pago único, es tuyo para siempre; después de pagar, instálalo desde la app.",
    install: (app) => `Instalar con ${app}`,
    noApp: "¿No tienes la aplicación?",
    getApp: "Descárgala aquí",
    versions: "Versiones disponibles",
    colVersion: "Versión",
    colSize: "Tamaño",
    colGraphics: "Memoria gráfica",
    colRam: "Memoria",
    colContext: "Recuerda",
    installOne: "Instalar",
    est: "est.",
    estTitle: "Estimado a partir del tamaño del modelo; aún no medido en hardware real.",
    note:
      "La memoria necesaria crece con la longitud de la conversación, así que estas cifras son para la longitud indicada. Lo marcado como est. se calcula a partir del tamaño del archivo, no se mide en hardware real; la aplicación también lo indica. La aplicación de escritorio lo comprueba todo con tu equipo real antes de instalar.",
  },

  creator: {
    count: (n) => (n === 1 ? "1 modelo" : `${n} modelos`),
    from: (size) => `desde ${size}`,
  },

  notFound: {
    title: "Página no encontrada",
    body: "Ese enlace no lleva a ningún sitio que reconozcamos.",
    browse: "Ver los modelos",
  },

  format: {
    included: "Incluido en la suscripción",
    once: (amount) => `${amount}, pago único`,
    released: (when) => `Publicado en ${when}`,
    brandNew: "recién salido",
    months: (n) => (n === 1 ? "1 mes de antigüedad" : `${n} meses de antigüedad`),
    years: (y, m) => {
      const years = y === 1 ? "1 año" : `${y} años`;
      if (m === 0) return `${years} de antigüedad`;
      return `${years} y ${m === 1 ? "1 mes" : `${m} meses`} de antigüedad`;
    },
    downloadsMillions: (n) => `${n} M descargas/mes`,
    downloadsThousands: (n) => `${n} mil descargas/mes`,
    downloads: (n) => `${n} descargas/mes`,
  },
};
