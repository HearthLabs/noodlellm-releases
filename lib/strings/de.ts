import type { Strings } from "./en";

export const de: Strings = {
  meta: {
    tagline: "KI auf deinem eigenen Rechner",
    description:
      "Eine Desktop-App, die KI-Modelle auf deinem eigenen Computer ausführt. Sie prüft, was dein Rechner wirklich schafft, installiert mit einem Klick und schickt deine Gespräche nirgendwohin.",
    downloadTitle: "Herunterladen",
    downloadDescription: (app) =>
      `${app} für Windows oder Mac herunterladen. Läuft mit NVIDIA-, AMD- und Intel-Grafik, Apple Silicon oder ganz ohne Grafikkarte.`,
    pricingTitle: "Preise",
    pricingDescription: (app) =>
      `Was ${app} kostet: 14 Tage zum Ausprobieren, danach ein Abo. Gründerpreis für die ersten 100.`,
  },

  nav: {
    pricing: "Preise",
    download: "Herunterladen",
    language: "Sprache",
    alsoIn: (language) => `Diese Seite gibt es auch auf ${language}.`,
    switchTo: (language) => `Auf ${language} lesen`,
    dismiss: "Nein danke",
    smartscreen: "Windows warnt dich beim ersten Mal vielleicht. Klicke auf Weitere Informationen und dann auf Trotzdem ausführen.",
    gatekeeper: "Dein Mac blockiert es beim ersten Mal vielleicht. Öffne die Systemeinstellungen, dann Datenschutz & Sicherheit, und klicke auf Trotzdem öffnen.",
  },

  footer: {
    blurb: (tagline) => `${tagline}. Die Modelle laufen auf deinem Rechner, nicht in unserer Cloud.`,
    product: "Produkt",
    legal: "Rechtliches",
    download: "Herunterladen",
    pricing: "Preise",
    privacy: "Datenschutz",
    terms: "AGB",
    licences: "Lizenzen",
    rights: (year, company) => `© ${year} ${company}`,
    llc: "Eine Limited Liability Company nach dem Recht von West Virginia",
  },

  home: {
    heroTitle: "Privat, offline, ohne Zähler. Diese hier gehört dir.",
    heroBody: (app) =>
      `${app} führt KI-Modelle auf deinem eigenen Computer aus statt auf den Servern anderer. Nichts, was du eingibst, verlässt deinen Rechner, es läuft auch ohne Internet weiter, und kein Zähler misst, wie viel du es nutzt. Schreib damit, fass damit zusammen und frag es zu deinen eigenen Dokumenten.`,
    download: "Für Windows herunterladen",
    downloadMac: "Für Mac herunterladen",
    trial: "14 Tage zum Ausprobieren, danach",
    fromPrice: "ab 8 $ im Monat",

    chooserTitle: "Was davon bist du?",
    chooserIntro: "Dieselbe App, aus zwei verschiedenen Gründen. Wähl deinen, und wir zeigen dir, was für dich zählt.",
    chooser: [
      {
        t: "Für dich selbst",
        b: "Eine Person, auf dem eigenen Computer, für den Alltag.",
      },
      {
        t: "Für eine kleine Kanzlei oder Praxis",
        b: "Anwälte, Steuerberater, Ärzte und Therapeuten, deren Akten nicht an einen externen Dienst gehen dürfen.",
      },
    ],
    chooserMore: "Sieh, was es für dich tut",

    whyTitle: "Warum selbst betreiben",
    whyIntro: "Je mehr deine Arbeit von KI abhängt, desto wichtiger wird, wer sie kontrolliert.",
    why: [
      {
        t: "Sie machen die Regeln. Du musst damit leben.",
        b: "Cloud-KI-Anbieter entscheiden, was es kostet, wie viel du nutzen darfst, in welchen Ländern es verfügbar ist und welches Modell du bekommst, und sie ändern das alles, wann es ihnen passt. Auf deinem eigenen Computer ändert sich nichts, außer du änderst es: Dein Modell bleibt, wie es ist, und kommt ein besseres heraus, lädst du es ohne neuen Vertrag herunter.",
      },
      {
        t: "Probier es so oft, wie du willst.",
        b: "Gute Ergebnisse entstehen durch Umformulieren, Wiederholen und Feinschliff. Wenn jeder Versuch abgerechnet wird, hältst du dich zurück. Auf deinem eigenen Rechner kostet der zehnte Versuch dasselbe wie der erste: nichts extra.",
      },
      {
        t: "Deine Dateien verlassen nie den Raum.",
        b: "Nichts, was du tippst oder öffnest, wird hochgeladen, also kann nichts durchsickern, und du musst niemandes Datenschutzerklärung vertrauen. Ist ein Modell installiert, braucht es überhaupt kein Internet.",
      },
      {
        t: "Die Cloud ist klüger. Darum ging es aber nie allein.",
        b: "Manche Aufgaben brauchen das klügste Modell, das es gibt. Die meisten nicht: einen Brief entwerfen, einen Bericht zusammenfassen, die Klausel in einem Vertrag finden. Deine lokale KI ist beim schwierigen Schlussfolgern meist schwächer und auf einem bescheidenen PC langsamer. Behalte also eine Cloud-KI (z. B. ChatGPT) für das seltene Problem, das wirklich das Beste braucht, und erledige das Alltägliche, das Vertrauliche und das Wiederkehrende hier.",
      },
    ],

    stepsTitle: "Drei Schritte, dann gehört sie dir",
    steps: [
      ["Installieren", "Ein Klick, dann anmelden. Nichts zu konfigurieren."],
      ["Eines wählen, das gut laufen wird", "Deinen Computer hat es schon geprüft, also ist jedes Modell als gut, langsam oder gar nicht lauffähig markiert. Der Download ist etwa so groß wie ein Film."],
      ["Lostippen", "Das ist die ganze Einrichtung."],
    ],
    shotAlt: (app) => `Ein Gespräch in ${app}, das aus einem eigenen Dokument des Nutzers antwortet`,
    shotCaption: "Ein echtes Gespräch auf einem echten Rechner. Die Antwort nennt die Datei, aus der sie stammt.",

    individualEyebrow: "Für Einzelpersonen",
    individualTitle: "Was es für dich tut",
    individual: [
      {
        t: "Es liest deine eigenen Dateien",
        b: "Zeig ihm einen Ordner mit Word-Dokumenten, PDFs, Tabellen, Präsentationen oder Notizen und frag. Vor dem Einlesen sagt es dir, wie lange es dauert und welche Dateien es überspringen muss, und jede Antwort nennt die Datei, aus der sie stammt.",
      },
      {
        t: "Es merkt sich dich",
        b: "Sag ihm einmal, wer du bist und wie du Antworten magst, und jedes Gespräch beginnt dort. Es ist ein Feld, das du lesen, ändern und leeren kannst, und eine Nachricht, die mit „merk dir:“ beginnt, ergänzt es.",
      },
      {
        t: "Lange Gespräche fallen nicht auseinander",
        b: "Wird ein Chat länger, als das Modell behalten kann, fasst es die früheren Nachrichten zusammen, statt sie zu vergessen, sodass Namen, Zahlen und Entscheidungen vom Anfang weiter zählen. Diese Zusammenfassung kannst du jederzeit lesen.",
      },
      {
        t: "Richte jeden Chat für eine Aufgabe ein",
        b: "Gib einem Gespräch eigene Anweisungen, etwa einen Nachhilfelehrer, der eine Frage nach der anderen stellt, oder einen förmlichen Ton für Briefe an Mandanten, und wähle, wie ruhig oder mutig die Antworten sind. Es gibt Beispiele zum Einstieg.",
      },
      {
        t: "Vom Handy aus nutzen",
        b: "Koppeln Sie Ihr Handy einmal per Code-Scan und führen Sie Ihre Unterhaltungen vom Sofa oder aus dem Nebenzimmer weiter, mitsamt Ihren Dateien. Es funktioniert nur im WLAN zu Hause oder im Büro, und alles ist zwischen beiden Geräten verschlüsselt, sodass nichts über uns läuft. Die Handy-App erscheint in Kürze.",
      },
      {
        t: "In Ihrer Sprache",
        b: "Die App gibt es auf Deutsch, Englisch, Spanisch, Japanisch und Chinesisch, und die meisten Modelle antworten in der Sprache, in der Sie schreiben.",
      },
    ],

    readsMore: "Was es lesen kann und was nicht",
    readsHeading: "Es liest",
    reads: [
      "Word-Dokumente (.docx)",
      "PDFs mit markierbarem Text",
      "PowerPoint-Präsentationen (.pptx)",
      "Excel-Tabellen (.xlsx)",
      "Text, Markdown, CSV, JSON und RTF",
    ],
    cannotHeading: "Noch nicht",
    cannot: [
      ["Scans und abfotografierte Seiten", "In der Datei steht kein Text, nur ein Bild davon."],
      ["Die älteren Formate .doc, .xls und .ppt (vor 2007)", "In Office als .docx neu speichern behebt das."],
      ["Pages, Numbers und Keynote", "Als Word, Excel oder PowerPoint exportieren funktioniert."],
      ["Bilder, Audio und Video", "Vorerst nur Text."],
    ],

    practiceEyebrow: "Für kleine Kanzleien und Praxen",
    practiceTitle: "Wenn die Antwort auf „Wo sind die Daten hin?“ lauten muss: nirgendwohin",
    practiceIntro:
      "Anwälte, Steuerberater, Ärzte oder Therapeuten dürfen Mandanten- und Patientendaten oft gar nicht an einen externen Dienst geben, egal was er kostet und was der Anbieter verspricht.",
    practice: [
      {
        t: "Nichts für einen Auftragsverarbeitungsvertrag",
        b: "Es gibt keinen Auftragsverarbeiter zu benennen und keine Übermittlung offenzulegen, weil nichts übertragen wird. Die Frage, die deine Compliance-Richtlinie stellt, stellt sich gar nicht.",
      },
      {
        t: "Jede Antwort zeigt ihre Quelle",
        b: "Zeig ihm die Ordner, in denen deine Akten wirklich liegen, samt Word-Dokumenten und PDFs, und jede Antwort nennt die Datei, aus der jeder Teil stammt; ein Klick öffnet sie. Du prüfst die Quelle, statt dem Modell zu glauben.",
      },
      {
        t: "Richte jeden Chat für eine Aufgabe ein",
        b: "Ein Gespräch für Mandantenbriefe im Stil deiner Kanzlei, ein anderes zum Zusammenfassen von Fallnotizen: Jedes kann eigene Anweisungen haben, mit Beispielen zum Einstieg.",
      },
      {
        t: "Ein Preis für die ganze Kanzlei",
        b: "Der Tarif für Kanzleien und Praxen deckt bis zu 15 Computer einer Kanzlei oder Praxis zu einem Pauschalpreis ab, monatlich oder jährlich, ohne Plätze pro Person zu zählen.",
      },
    ],

  },

  download: {
    title: (app) => `${app} herunterladen`,
    lead: "14 Tage kostenlos. Ein Installer, danach läuft es offline.",
    windows: "Windows 10 und 11",
    windowsMeta: "64-Bit · 19 MB",
    windowsBody: (app) =>
      `Läuft mit NVIDIA-, AMD- und Intel-Grafik und auch ganz ohne Grafikkarte, nur langsamer. ${app} prüft beim ersten Start, was du hast.`,
    mac: "Mac mit Apple Silicon",
    macMeta: "M1 oder neuer · 31 MB",
    macBody: (app) =>
      `Führt die Modelle auf der eingebauten Grafik des Mac aus, die sich den Arbeitsspeicher mit dem Mac teilt. Braucht macOS 13.3 oder neuer. ${app} prüft beim ersten Öffnen, wie viel davon es nutzen kann.`,
    costTitle: "Was es kostet",
    cost1:
      "Die ersten 14 Tage ist alles kostenlos: die ganze App, jedes offene Modell im Katalog, keine Karte nötig zum Start. Danach ist es ein Abo, monatlich oder jährlich bezahlt.",
    cost2:
      "Später werden manche Spezialmodelle im Store auch von ihren Entwicklern verkauft. Das wird ein Einmalkauf, keine Miete: Kaufst du eines, gehört es dir.",
    warnTitle: "Windows warnt dich beim ersten Mal.",
    warn1: {
      before: "Wenn du den Installer startest, zeigt Windows einen blauen Bildschirm mit",
      quote: "„Der Computer wurde durch Windows geschützt“",
      middle: ". Ein Weiter ist nicht zu sehen: Du musst auf",
      moreInfo: "Weitere Informationen",
      then: " klicken und dann auf",
      runAnyway: "Trotzdem ausführen",
      after: ".",
    },
    warn2:
      "Das ist keine Virenwarnung. Windows zeigt sie bei neuen Apps, die es noch nicht kennt, und nur beim ersten Mal.",
    macWarnTitle: "Auch dein Mac fragt nach.",
    macWarn:
      "Beim ersten Öffnen meldet macOS, dass es die App nicht auf Schadsoftware prüfen kann. Auch das ist keine Virenwarnung. Klicke auf Fertig, öffne die Systemeinstellungen, gehe zu Datenschutz & Sicherheit, scrolle nach unten und klicke auf Trotzdem öffnen. Es fragt nur einmal.",
    needsTitle: "Was es braucht",
    needs: [
      ["Windows 10 oder 11, oder ein Mac mit Apple Silicon", "64-Bit-Windows oder ein Mac ab M1 mit macOS 13.3 oder neuer. Sonst nichts zu installieren: kein Python, keine Kommandozeile, keine Konfiguration."],
      ["Irgendeine Grafikkarte oder keine", "NVIDIA, AMD und Intel funktionieren alle, auf dem Mac die eingebaute Grafik. Ohne Karte laufen die Modelle auf dem Prozessor: langsamer, aber es geht."],
      ["Platz für die Modelle", "Die App hat 19 MB unter Windows und 31 MB auf dem Mac. Modelle sind eigene Downloads, meist 2–10 GB pro Stück, und du wählst welche."],
      ["Ab und zu eine Internetverbindung", "Zum Herunterladen von Modellen und um das Abo aktuell zu halten. Im Alltag läuft es mit ausgeschaltetem Netz; deine Fragen brauchen es nie."],
    ],
    unsure: "Nicht sicher, was dein Computer schafft?",
    orInstall: "Installier es, und es sagt es dir.",
  },

  subscribeSuccess: {
    title: "Du bist abonniert",
    body: "Geh zurück zu Noodle LLM: Es übernimmt dein Abo innerhalb weniger Sekunden von selbst. Falls nicht, öffne nach einer Minute Einstellungen, dann Konto, und wähle „Schon abonniert? Nutze die E-Mail, mit der du bezahlt hast“.",
    manageBody: "Um deine Karte zu aktualisieren oder später zu kündigen, nutze „Abo verwalten“ im Konto-Bereich der App.",
    backHome: "Zurück zur Startseite",
  },
  pricing: {
    tryItButton: "Herunterladen",
    title: "Was es kostet",
    money: (n) => `${n.toLocaleString("de-DE")} $`,
    billingMonthly: "Monatlich",
    billingYearly: "Jährlich",
    yearlySave: "Günstiger",
    lead: "Vierzehn Tage, um alles auszuprobieren, danach ein Abo. Die Modelle selbst sind kostenlos herunterzuladen und so oft zu nutzen, wie du willst; das Abo ist für die App. Keine Gebühren pro Nachricht oder pro Token.",
    lifetime: (p: string) => `oder einmalig ${p}, für immer deins`,
    plans: [
      {
        name: "Ausprobieren",
        price: "Kostenlos",
        per: "für 14 Tage",
        perYear: "",
        blurb: "Alles, 14 Tage lang. Keine Karte nötig.",
        points: ["Jedes offene Modell im Katalog", "Chatten, schreiben und zusammenfassen", "Fragen zu deinen eigenen Dokumenten", "Funktioniert ohne Internet"],
        note: "",
      },
      {
        name: "Gründungsmitglied",
        price: "",
        per: "pro Monat (nur die ersten 100)",
        perYear: "pro Jahr (nur die ersten 100)",
        blurb: "Für eine Person, die ihre KI auf dem eigenen Computer will.",
        points: ["Alles aus der Testphase, ohne Zeitlimit", "Keine Kosten pro Nachricht, kein Tageslimit", "Bis zu 3 deiner Computer", "Dein Preis bleibt fest, solange dein Abo läuft"],
        note: "",
      },
      {
        name: "Privatpersonen",
        price: "",
        per: "pro Monat",
        perYear: "pro Jahr",
        blurb: "Für eine Person, die ihre KI auf dem eigenen Computer will.",
        points: ["Alles aus der Testphase, ohne Zeitlimit", "Keine Kosten pro Nachricht, kein Tageslimit", "Bis zu 3 deiner Computer", "Jederzeit kündbar"],
        note: "",
      },
      {
        name: "Kanzleien & Praxen",
        price: "",
        per: "pro Monat",
        perYear: "pro Jahr",
        blurb: "Für eine Kanzlei, Praxis oder Steuerberatung.",
        points: ["Mandantendaten verlassen nie die Kanzlei", "Jede Antwort zeigt ihre Quelle", "Richte jeden Chat für eine Aufgabe ein", "Bis zu 15 Computer an einem Standort"],
        note: "",
      },
    ],
    othersTitle: "Modelle von anderen",
    others1:
      "Der Katalog ist in jedem Tarif kostenlos herunterladbar, ebenso die Modelle, die andere im Store eintragen. Später können Leute, die Spezialmodelle bauen, sie dort auch verkaufen: ein Modell für juristische Entwürfe, ein Modell für eine bestimmte Art von Code.",
    others2Before: "Das wird ein",
    others2Strong: "Einmalkauf, keine Miete",
    others2After:
      ". Kaufst du eines, gehört es dir, auf den Rechnern, auf denen du es installiert hast, egal was danach mit deinem Abo passiert.",
    faqTitle: "Häufige Fragen",
    faq: [
      ["Gibt es eine Grenze, wie viel ich es nutzen kann?", "Nein. Es läuft auf deinem eigenen Computer, also gibt es keine Kosten pro Nachricht und kein Tageslimit. Nutze es, so viel du willst."],
      ["Wird etwas, das ich eingebe, an euch geschickt?", "Nein. Deine Fragen, Antworten und Dateien verlassen nie deinen Computer. Die App geht nur online, um Modelle herunterzuladen und dein Abo zu prüfen."],
      ["Was passiert nach den 14 Tagen?", "Die App pausiert, bis du ein Abo abschließt. Deine Modelle und Gespräche bleiben auf deinem Computer, und nichts wird gelöscht."],
      ["Kann ich es auf mehreren Computern nutzen?", "Ja, auf bis zu 3 deiner Computer. Für einen vierten meldest du einen der anderen in der App ab."],
      ["Steigen meine 8 $ später?", "Für die ersten 100 Mitglieder bleibt es bei 8 $ im Monat, solange das Abo läuft, auch wenn der Preis für neue Mitglieder steigt. Oder einmalig 100 $ für eine lebenslange Lizenz, danach nie wieder zahlen."],
      ["Kann ich kündigen?", "Ja, jederzeit, im Bereich Konto der App. Modelle, die du gekauft hast, bleiben deine."],
      ["Wir sind eine Kanzlei. Braucht jede Person ein Abo?", "Nein. Der Tarif für Kanzleien & Praxen gilt für bis zu 15 Computer an einem Standort, zu einem Preis."],
    ],
    ctaDownload: "Herunterladen und die 14 Tage starten",
  },

  notFound: {
    title: "Seite nicht gefunden",
    body: "Dieser Link führt nirgendwohin, das wir kennen.",
    browse: "Zur Startseite",
  },

};
