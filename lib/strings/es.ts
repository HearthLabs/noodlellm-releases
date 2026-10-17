import type { Strings } from "./en";

export const es: Strings = {
  meta: {
    tagline: "IA en tu propio ordenador",
    description:
      "Una aplicación de escritorio que ejecuta modelos de IA en tu propio ordenador. Comprueba qué puede ejecutar de verdad tu equipo, se instala con un clic y nunca envía tus conversaciones a ninguna parte.",
    pricingTitle: "Precios",
    pricingDescription: (app) =>
      `Lo que cuesta ${app}: 14 días para probarlo y después una suscripción. Precio de fundador para los 100 primeros.`,
  },

  nav: {
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
    pricing: "Precios",
    privacy: "Privacidad",
    terms: "Condiciones",
    rights: (year, company) => `© ${year} ${company}`,
    llc: "Una sociedad de responsabilidad limitada de Virginia Occidental",
  },

  home: {
    heroTitle: "Privado, sin conexión, sin contador. Esta IA local es solo tuya.",
    heroBody: (app) =>
      `${app} ejecuta modelos de IA en tu propio ordenador en lugar de en los servidores de otros. Nada de lo que escribes sale de tu equipo, sigue funcionando sin internet y no hay contador de cuánto lo usas. Escribe con él, resume con él y pregúntale por tus propios documentos.`,
    download: "Descargar para Windows",
    downloadMac: "Descargar para Mac",
    requires: "Windows 10 u 11, o un Mac con Apple Silicon (M1 o posterior). Mejor con una tarjeta gráfica de 6 GB o más; sin ella también funciona, pero despacio.",
    trial: "14 días para probarlo, después",
    fromPrice: "desde 8 $ al mes",

    whyTitle: "Por qué ejecutarla tú",
    whyIntro: "La nube es más lista, pero esa nunca fue toda la cuestión. Usa las dos. Guarda una IA en la nube como ChatGPT para el problema raro que necesita lo mejor de lo mejor, porque tu IA local puede ser peor que los modelos en la nube en preguntas de razonamiento difícil. Haz aquí lo cotidiano, lo privado y lo repetitivo: redactar una carta, resumir un informe, encontrar la cláusula en un contrato.",
    why: [
      {
        t: "Ellos ponen las reglas. Tú te aguantas.",
        b: "Las empresas de IA en la nube deciden el precio, los límites y qué modelo te toca, y lo cambian cuando les conviene. En tu ordenador nada cambia a menos que lo cambies tú.",
      },
      {
        t: "Vuelve a intentarlo tantas veces como quieras.",
        b: "Los buenos resultados salen de reformular, reintentar y pulir. Cuando cada intento se cobra, te contienes. En tu propio ordenador el décimo intento cuesta lo mismo que el primero: nada extra.",
      },
      {
        t: "Tus archivos no salen de la habitación.",
        b: "No se sube nada de lo que escribes o abres, así que no hay nada que filtrar ni ninguna política de privacidad ajena en la que confiar. Una vez instalado un modelo, no necesita internet en absoluto.",
      },
    ],

    shotTitle: "Escribe como tú, a partir de tus propios archivos",
    shotBody: "Activa tus archivos y una habilidad que le hayas enseñado, y redacta la respuesta como lo harías tú, indicando de qué documento sale cada parte. El modelo, la habilidad y tus archivos nunca salen de tu ordenador.",
    shotAlt: (app) => `Un chat en ${app} redactando la respuesta a una clienta a partir de las propias facturas y la carta de encargo, con la habilidad «My writing style» activada`,

    individualTitle: "Lo que hace por ti",
    individualIntro: "La app está en español, inglés, alemán, japonés y chino, y la mayoría de los modelos responden en el idioma en que escribas.",
    practiceLine:
      "Para un despacho o consulta: no se transmite nada, así que no hay ningún encargado del tratamiento que nombrar en un acuerdo de datos, y un plan Despachos cubre hasta 15 ordenadores en la oficina.",
    practicePlan: "Ver el plan",
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
        t: "Tareas para lo que repites",
        b: "Guarda un trabajo que haces a menudo, como responder un correo o convertir notas en un acta, con sus propias instrucciones. Luego pega lo que tienes y pulsa Ejecutar. Incluye cuatro tareas listas para empezar.",
      },
      {
        t: "Enséñale tu estilo",
        b: "Dale una carpeta con tus propios textos y aprende a sonar como tú, para usarlo en cualquier tarea. Enseñarle requiere un PC con Windows y una tarjeta gráfica NVIDIA, y llega pronto en una actualización.",
      },
      {
        t: "Úsalo desde el móvil",
        b: "Vincula tu móvil una vez escaneando un código y sigue tus conversaciones desde el sofá o la habitación de al lado, con tus archivos incluidos. Funciona a través de la wifi y todo va cifrado entre los dos, así que nada sale de ahí.",
      },
    ],

  },


  subscribeSuccess: {
    title: "Ya estás suscrito",
    body: "Vuelve a Noodle LLM: añade tu suscripción por sí solo en unos segundos. Si al cabo de un minuto no lo ha hecho, abre Ajustes, luego Cuenta, y elige «¿Ya estás suscrito? Usa el correo con el que pagaste».",
    manageBody: "Para actualizar tu tarjeta o cancelar más adelante, usa Gestionar suscripción en la sección Cuenta de la aplicación.",
    backHome: "Volver al inicio",
  },
  pricing: {
    tryItButton: "Descargar",
    title: "Lo que cuesta",
    // es-ES leaves 2000 ungrouped; the de-DE form gives the "2.000" Spanish prices use.
    money: (n) => `${n.toLocaleString("de-DE")} $`,
    lead: "Catorce días para probarlo todo y después una suscripción. Los modelos son gratis: descárgalos desde la aplicación o pon los que ya tengas en la carpeta de modelos de la aplicación. La suscripción es por la aplicación, sin cargos por mensaje ni por token.",
    lifetime: (p: string) => `o ${p} una sola vez, tuyo para siempre`,
    yearly: (p: string, save: string) => `o ${p} al año, ahorras ${save}`,
    plans: [
      {
        name: "Pruébalo",
        price: "Gratis",
        per: "durante 14 días",
        blurb: "Todo, durante 14 días. Sin tarjeta.",
        points: ["Termina a los 14 días"],
      },
      {
        name: "Miembro fundador",
        price: "",
        per: "al mes",
        blurb: "El plan Particulares a precio de fundador, fijo mientras sigas suscrito.",
        points: ["Una persona", "Hasta 2 ordenadores", "Solo los 100 primeros"],
      },
      {
        name: "Particulares",
        price: "",
        per: "al mes",
        blurb: "Para una persona en sus propios ordenadores.",
        points: ["Una persona", "Hasta 2 ordenadores"],
      },
      {
        name: "Despachos",
        price: "",
        per: "al mes",
        blurb: "Para un despacho de abogados, una clínica o una asesoría.",
        points: ["Una oficina", "Hasta 15 ordenadores"],
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      ["¿Hay un límite de uso?", "No. Funciona en tu propio ordenador, así que no se cobra por mensaje ni hay tope diario. Úsalo todo lo que quieras."],
      ["¿Os llega algo de lo que escribo?", "No. Tus preguntas, respuestas y archivos nunca salen de tu ordenador. La aplicación solo se conecta para descargar modelos y comprobar tu suscripción."],
      ["¿Qué pasa después de los 14 días?", "La aplicación se pausa hasta que te suscribas. Tus modelos y conversaciones se quedan en tu ordenador y no se borra nada."],
      ["¿Puedo usarlo en más de un ordenador?", "Sí, en hasta 2 de tus ordenadores. En uno nuevo, abre Cuenta y usa el correo con el que pagaste; te enviamos un código de 6 dígitos. Al llegar al límite, la aplicación muestra tus ordenadores para que cierres la sesión en uno. Un ordenador que no se usa durante 60 días libera su plaza solo."],
      ["¿Funciona sin conexión?", "Sí. Tu licencia se comprueba en tu ordenador, sin internet. Se renueva sola cuando estás conectado, así que solo un ordenador que pase más de unos 35 días sin conexión tendrá que conectarse una vez."],
      ["¿Subirán mis 8 $ más adelante?", "Para los 100 primeros miembros, se mantienen los 8 $ al mes mientras sigan suscritos, aunque suba el precio para los nuevos miembros. O paga 100 $ una sola vez por una licencia de por vida y no vuelvas a pagar."],
      ["¿Puedo cancelar?", "Sí, cuando quieras, desde la sección Cuenta de la aplicación."],
      ["Somos un despacho. ¿Necesitamos una suscripción cada uno?", "No. El plan Despachos cubre hasta 15 ordenadores de una oficina por un solo precio."],
    ],
    ctaDownload: "Descárgalo y empieza los 14 días",
  },

  notFound: {
    title: "Página no encontrada",
    body: "Ese enlace no lleva a ningún sitio que reconozcamos.",
    browse: "Ir a la página de inicio",
  },

};
