/**
 * Every word the site shows, in English. The other four languages are typed against this,
 * so a page cannot build with a sentence missing in one of them.
 *
 * Written for someone who has never heard of a quantization: bookkeepers and solicitors
 * rather than developers. Raw values stay on the model pages, and even there are explained.
 */

export const en = {
  meta: {
    tagline: "Run AI on your own machine",
    description:
      "A desktop app that runs AI models on your own computer. It checks what your machine can actually run, installs in one click, and never sends your conversations anywhere.",
    downloadTitle: "Download",
    downloadDescription: (app: string) =>
      `Download ${app} for Windows or Mac. Works with NVIDIA, AMD and Intel graphics, Apple Silicon, or no graphics card at all.`,
    pricingTitle: "Pricing",
    pricingDescription: (app: string) =>
      `What ${app} costs: 14 days to try it, then a subscription. Founding rate for the first 100.`,
  },

  nav: {
    pricing: "Pricing",
    download: "Download",
    language: "Language",
    alsoIn: (language: string) => `This page is also in ${language}.`,
    switchTo: (language: string) => `Read it in ${language}`,
    dismiss: "No thanks",
    smartscreen: "Windows may warn you the first time. Click More info, then Run anyway.",
    gatekeeper: "Your Mac may refuse the first time. Open System Settings, then Privacy & Security, and click Open Anyway.",
  },

  footer: {
    blurb: (tagline: string) => `${tagline}. Models run on your machine, not in our cloud.`,
    product: "Product",
    legal: "Legal",
    download: "Download",
    pricing: "Pricing",
    privacy: "Privacy",
    terms: "Terms",
    licences: "Licences",
    rights: (year: number, company: string) => `© ${year} ${company}`,
    llc: "A West Virginia limited liability company",
  },

  home: {
    heroTitle: "Private, offline, unmetered. This one is yours.",
    heroBody: (app: string) =>
      `${app} runs AI models on your own computer instead of someone else's servers. Nothing you type leaves your machine, it keeps working with the internet off, and there is no meter on how much you use it. Write with it, summarise with it, and ask it about your own documents.`,
    download: "Download for Windows",
    downloadMac: "Download for Mac",
    trial: "14 days to try it, then",
    fromPrice: "from $8 a month",

    chooserTitle: "Which of these are you?",
    chooserIntro: "The same app, for two different reasons. Pick yours and we will show you what matters to you.",
    chooser: [
      {
        t: "For yourself",
        b: "One person, on their own computer, for everyday use.",
      },
      {
        t: "For a small practice",
        b: "Solicitors, accountants, clinicians and therapists whose client files cannot go to an outside service.",
      },
    ],
    chooserMore: "See what it does for you",

    whyTitle: "Why run it yourself",
    whyIntro: "The more of your work depends on AI, the more it matters who is in control of it.",
    why: [
      {
        t: "They set the terms. You live with them.",
        b: "Cloud AI companies decide what it costs, how much you can use, which countries can use it and which model you get, and they change all of it when it suits them. On your own computer nothing changes unless you change it: the model you have stays exactly as it is, and when a better one comes out you download it, with no new contract.",
      },
      {
        t: "Try again as often as you like.",
        b: "Good results come from rewording, retrying and refining. When every attempt is metered, you hold back. On your own computer the tenth try costs the same as the first: nothing extra.",
      },
      {
        t: "Your files never leave the room.",
        b: "Nothing you type or open is uploaded, so there is nothing to leak and nobody else's privacy policy to trust. Once a model is installed it does not need the internet at all.",
      },
      {
        t: "The cloud is smarter. That was never the whole question.",
        b: "Some jobs need the cleverest model there is. Most do not: drafting a letter, summarising a report, finding the clause in a contract. Your local AI tends to be weaker at hard reasoning and slower on a modest PC, so keep a cloud AI (e.g., ChatGPT) for the rare problem that needs the very best, and do the everyday, the private and the repetitive here.",
      },
    ],

    stepsTitle: "Three steps, then it is yours",
    steps: [
      ["Install it", "One click, then sign in. Nothing to configure."],
      ["Pick one it says will run well", "It has already checked your computer, so every model is marked as running well, slowly or not at all. The download is about the size of a film."],
      ["Start typing", "That is the whole setup."],
    ],
    shotAlt: (app: string) => `A conversation in ${app}, answering from the user's own document`,
    shotCaption: "A real conversation on a real machine. The answer names the file it came from.",

    individualEyebrow: "For individual users",
    individualTitle: "What it does for you",
    individual: [
      {
        t: "It reads your own files",
        b: "Point it at a folder of Word documents, PDFs, spreadsheets, slides or notes and ask about them. Before reading, it tells you how long it will take and which files it has to skip, and every answer names the file it came from.",
      },
      {
        t: "It remembers you",
        b: "Tell it once who you are and how you like answers written, and every conversation starts from there. It is a box you can read, edit and empty, and starting a message with \"remember:\" adds to it.",
      },
      {
        t: "Long conversations do not fall apart",
        b: "When a chat grows longer than the model can hold, it condenses the earlier messages into a summary instead of forgetting them, so names, figures and decisions from the start still count. You can read that summary at any time.",
      },
      {
        t: "Set each chat up for a job",
        b: "Give a conversation its own instructions, such as a tutor that asks one question at a time or a formal tone for client letters, and choose how steady or inventive its answers are. There are examples to start from.",
      },
      {
        t: "Use it from your phone",
        b: "Pair your phone once by scanning a code, then carry on your conversations from the sofa or the next room, with your files included. It only works on your home or office Wi-Fi and everything is encrypted between the two, so nothing passes through us. The phone app is coming soon.",
      },
      {
        t: "In your language",
        b: "The app speaks English, German, Spanish, Japanese and Chinese, and most models answer in whichever language you write in.",
      },
    ],

    readsMore: "What it can and cannot read",
    readsHeading: "It reads",
    reads: [
      "Word documents (.docx)",
      "PDFs with selectable text",
      "PowerPoint decks (.pptx)",
      "Excel spreadsheets (.xlsx)",
      "Plain text, Markdown, CSV, JSON and RTF",
    ],
    cannotHeading: "It does not, yet",
    cannot: [
      ["Scans and photographs of pages", "There is no text in the file to read, only a picture of it."],
      ["The pre-2007 .doc, .xls and .ppt formats", "Re-saving one in Office as .docx fixes it."],
      ["Pages, Numbers and Keynote", "Exporting to the Word, Excel or PowerPoint equivalent works."],
      ["Images, audio and video", "Text only, for now."],
    ],

    practiceEyebrow: "For small practices",
    practiceTitle: "When the answer to “where did the data go?” has to be nowhere",
    practiceIntro:
      "A solicitor, an accountant, a clinician or a therapist often cannot send client material to a third-party service at all, whatever it costs and whatever the provider promises.",
    practice: [
      {
        t: "Nothing to put in a data agreement",
        b: "There is no processor to name and no transfer to disclose, because nothing is transmitted. The question your compliance policy asks does not arise.",
      },
      {
        t: "Every answer shows where it came from",
        b: "Point it at the folders where client files actually live, Word documents and PDFs included, and every answer names the file each part came from; one click opens it. You check the source rather than taking the model's word for it.",
      },
      {
        t: "Set each chat up for a job",
        b: "One conversation for drafting client letters in your house style, another for summarising case notes: each can have its own instructions, with examples to start from.",
      },
      {
        t: "One price for the whole office",
        b: "The Practices plan covers up to 15 computers in one firm or clinic for a single fee, monthly or yearly, with no per-person seats to count.",
      },
    ],

  },

  download: {
    title: (app: string) => `Download ${app}`,
    lead: "Free for 14 days. One installer, then it works offline.",
    windows: "Windows 10 and 11",
    windowsMeta: "64-bit · 19 MB",
    windowsBody: (app: string) =>
      `Works with NVIDIA, AMD and Intel graphics, and without a graphics card at all, just more slowly. ${app} checks which you have the first time you open it.`,
    mac: "Mac with Apple Silicon",
    macMeta: "M1 or newer · 31 MB",
    macBody: (app: string) =>
      `Runs models on the Mac's built-in graphics, which share the Mac's memory. Needs macOS 13.3 or later. ${app} checks how much it can use the first time you open it.`,
    costTitle: "What it costs",
    cost1:
      "Everything is free for the first 14 days: the whole app, every open model in the catalog, no card required to start. After that it is a subscription, paid monthly or yearly.",
    cost2:
      "Later, some specialist models in the store will also be sold by the people who made them. Those will be a one-off purchase rather than a rental: buy one and it stays yours.",
    warnTitle: "Windows will warn you the first time.",
    warn1: {
      before: "When you run the installer, Windows shows a blue screen saying",
      quote: "“Windows protected your PC”",
      middle: ". There is no obvious way past it: you have to click",
      moreInfo: "More info",
      then: ", then",
      runAnyway: "Run anyway",
      after: ".",
    },
    warn2:
      "This is not a virus warning. Windows shows it for new apps it does not recognise yet, and only the first time.",
    macWarnTitle: "Your Mac will ask too.",
    macWarn:
      "The first time you open it, macOS says it cannot check the app for malicious software. This is not a virus warning either. Click Done, open System Settings, go to Privacy & Security, scroll down and click Open Anyway. It only asks once.",
    needsTitle: "What it needs",
    needs: [
      ["Windows 10 or 11, or a Mac with Apple Silicon", "64-bit Windows, or an M1 or newer Mac on macOS 13.3 or later. Nothing else to install: no Python, no command line, no configuration."],
      ["Any graphics card, or none", "NVIDIA, AMD and Intel all work, and on a Mac its built-in graphics do. Without one, models run on the processor instead: slower, but it works."],
      ["Room for the models", "The app is 19 MB on Windows and 31 MB on a Mac. Models are separate downloads, usually 2–10 GB each, and you choose which."],
      ["An internet connection, now and then", "To download models and to keep your subscription current. Day to day it runs with the network switched off; your questions never need it."],
    ],
    unsure: "Not sure what your computer can handle?",
    orInstall: "Install it, and it will tell you.",
  },

  subscribeSuccess: {
    title: "You're subscribed",
    body: "Go back to Noodle LLM: it adds your subscription on its own within a few seconds. If it has not after a minute, open Settings, then Account, and choose “Already subscribed? Use the email you paid with”.",
    manageBody: "To update your card or cancel later, use Manage subscription in the app's Account section.",
    backHome: "Back to the homepage",
  },
  pricing: {
    tryItButton: "Download",
    title: "What it costs",
    money: (n: number) => `$${n.toLocaleString("en-US")}`,
    billingMonthly: "Monthly",
    billingYearly: "Yearly",
    yearlySave: "Pay less",
    lead: "Fourteen days to try everything, then a subscription. The models themselves are free to download and run as often as you like; the subscription is for the app. No per-message or per-token charges.",
    lifetime: (p: string) => `or ${p} once, yours for life`,
    plans: [
      {
        name: "Try it",
        price: "Free",
        per: "for 14 days",
        perYear: "",
        blurb: "Everything, for 14 days. No card needed.",
        points: ["Every open model in the catalog", "Chat, write and summarise", "Ask questions about your own documents", "Works with the internet switched off"],
        note: "",
      },
      {
        name: "Founding member",
        price: "",
        per: "per month (first 100 only)",
        perYear: "per year (first 100 only)",
        blurb: "For one person who wants their AI on their own computer.",
        points: ["Everything in the trial, with no time limit", "No per-message charges or daily caps", "Up to 3 of your computers", "Your price is locked in while you stay subscribed"],
        note: "",
      },
      {
        name: "Individuals",
        price: "",
        per: "per month",
        perYear: "per year",
        blurb: "For one person who wants their AI on their own computer.",
        points: ["Everything in the trial, with no time limit", "No per-message charges or daily caps", "Up to 3 of your computers", "Cancel any time"],
        note: "",
      },
      {
        name: "Practices",
        price: "",
        per: "per month",
        perYear: "per year",
        blurb: "For a law firm, clinic or accountancy.",
        points: ["Client files never leave the office", "Every answer shows where it came from", "Set each chat up for a job", "Up to 15 computers in one office"],
        note: "",
      },
    ],
    othersTitle: "Models from other people",
    others1:
      "The catalog is free to download on any plan, and so are the models other people list in the store. Later, people who build specialist models will also be able to sell them: a legal drafting model, a model tuned for one kind of code.",
    others2Before: "Those will be a",
    others2Strong: "one-off purchase, not a rental",
    others2After:
      ". Buy one and it stays yours, on the machines you installed it on, whatever happens to your subscription afterwards.",
    faqTitle: "Common questions",
    faq: [
      ["Is there a limit on how much I can use it?", "No. It runs on your own computer, so there is no charge per message and no daily cap. Use it as much as you like."],
      ["Does anything I type get sent to you?", "No. Your questions, answers and files never leave your computer. The app only goes online to download models and check your subscription."],
      ["What happens after the 14 days?", "The app pauses until you subscribe. Your models and conversations stay on your computer, and nothing is deleted."],
      ["Can I use it on more than one computer?", "Yes, on up to 3 of your computers. To use a fourth, sign one of the others out from the app."],
      ["Will my $8 go up later?", "For the first 100 members, you keep $8 a month for as long as you stay subscribed, even after the price for new members rises. Or pay $100 once for a lifetime licence and never pay again."],
      ["Can I cancel?", "Yes, at any time, from the Account section of the app. Models you bought outright stay yours."],
      ["We are a firm. Do we each need a subscription?", "No. The Practices plan covers up to 15 computers in one office for one price."],
    ],
    ctaDownload: "Download it and start the 14 days",
  },

  notFound: {
    title: "Page not found",
    body: "That link does not point anywhere we recognise.",
    browse: "Go to the homepage",
  },

};

export type Strings = typeof en;
