import type { Strings } from "./en";

export const de: Strings = {
  meta: {
    tagline: "KI auf deinem eigenen Rechner",
    description:
      "Eine Desktop-App, die KI-Modelle auf deinem eigenen Computer ausführt. Sie prüft, was dein Rechner wirklich schafft, installiert mit einem Klick und schickt deine Gespräche nirgendwohin.",
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
    pricing: "Preise",
    privacy: "Datenschutz",
    terms: "AGB",
    rights: (year, company) => `© ${year} ${company}`,
    llc: "Eine Limited Liability Company nach dem Recht von West Virginia",
  },

  home: {
    heroTitle: "Privat, offline, ohne Zähler. Diese lokale KI gehört nur dir.",
    heroBody: (app) =>
      `${app} führt KI-Modelle auf deinem eigenen Computer aus statt auf den Servern anderer. Nichts, was du eingibst, verlässt deinen Rechner, es läuft auch ohne Internet weiter, und kein Zähler misst, wie viel du es nutzt. Schreib damit, fass damit zusammen und frag es zu deinen eigenen Dokumenten.`,
    download: "Für Windows herunterladen",
    downloadMac: "Für Mac herunterladen",
    requires: "Windows 10 oder 11, oder ein Mac mit Apple Silicon (M1 oder neuer). Am besten mit einer Grafikkarte ab 6 GB; ohne läuft es auch, nur langsam.",
    trial: "14 Tage zum Ausprobieren, danach",
    fromPrice: "ab 8 $ im Monat",

    whyTitle: "Warum selbst betreiben",
    whyIntro: "Die Cloud ist klüger, aber darum ging es nie allein. Nutze beides. Behalte eine Cloud-KI wie ChatGPT für das seltene Problem, das wirklich das Beste braucht, denn deine lokale KI ist beim schwierigen Schlussfolgern schwächer und auf einem bescheidenen PC langsamer. Erledige das Alltägliche, das Vertrauliche und das Wiederkehrende hier: einen Brief entwerfen, einen Bericht zusammenfassen, die Klausel in einem Vertrag finden.",
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
    ],

    shotTitle: "Es schreibt wie du, aus deinen eigenen Dateien",
    shotBody: "Schalte deine Dateien und eine Fähigkeit ein, die du ihm beigebracht hast, und es entwirft die Antwort so, wie du sie schreiben würdest, mit den Dokumenten, aus denen jeder Teil stammt. Modell, Fähigkeit und Dateien verlassen nie deinen Computer.",
    shotAlt: (app) => `Ein Chat in ${app}, der aus den eigenen Rechnungen und dem Mandatsschreiben eine Antwort an eine Kundin entwirft, mit eingeschalteter Fähigkeit „My writing style“`,

    individualTitle: "Was es für dich tut",
    practiceLine:
      "Für eine Kanzlei oder Praxis: Es wird nichts übertragen, also gibt es keinen Auftragsverarbeiter, den ein Datenschutzvertrag nennen müsste, und ein Abo „Kanzleien & Praxen“ deckt bis zu 15 Computer im Büro ab.",
    practicePlan: "Zum Abo",
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
        t: "Aufgaben für wiederkehrende Arbeit",
        b: "Speichere eine Arbeit, die du oft machst, etwa eine E-Mail beantworten oder aus Notizen ein Protokoll machen, mit eigenen Anweisungen. Dann fügst du ein, was du hast, und klickst auf Ausführen. Vier fertige Aufgaben helfen beim Einstieg.",
      },
      {
        t: "Bring ihm deinen Stil bei",
        b: "Gib ihm einen Ordner mit deinen eigenen Texten, und es lernt, wie du zu klingen, und nutzt das in jeder Aufgabe. Dafür braucht es einen Windows-PC mit NVIDIA-Grafikkarte; die Funktion kommt bald mit einem Update.",
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
    lead: "Vierzehn Tage, um alles auszuprobieren, danach ein Abo. Die Modelle selbst sind kostenlos: Lade sie in der App herunter oder lege Modelle, die du schon hast, in den Modellordner der App. Das Abo ist für die App, ohne Gebühren pro Nachricht oder pro Token.",
    lifetime: (p: string) => `oder einmalig ${p}, für immer deins`,
    yearly: (p: string, save: string) => `oder ${p} pro Jahr, du sparst ${save}`,
    plans: [
      {
        name: "Ausprobieren",
        price: "Kostenlos",
        per: "für 14 Tage",
        blurb: "Alles, 14 Tage lang. Keine Karte nötig.",
        points: ["Endet nach 14 Tagen"],
      },
      {
        name: "Gründungsmitglied",
        price: "",
        per: "pro Monat",
        blurb: "Der Tarif für Privatpersonen zum Gründungspreis, fest, solange dein Abo läuft.",
        points: ["Eine Person", "Bis zu 3 Computer", "Nur für die ersten 100"],
      },
      {
        name: "Privatpersonen",
        price: "",
        per: "pro Monat",
        blurb: "Für eine Person auf ihren eigenen Computern.",
        points: ["Eine Person", "Bis zu 3 Computer"],
      },
      {
        name: "Kanzleien & Praxen",
        price: "",
        per: "pro Monat",
        blurb: "Für eine Kanzlei, Praxis oder Steuerberatung.",
        points: ["Ein Standort", "Bis zu 15 Computer"],
      },
    ],
    faqTitle: "Häufige Fragen",
    faq: [
      ["Gibt es eine Grenze, wie viel ich es nutzen kann?", "Nein. Es läuft auf deinem eigenen Computer, also gibt es keine Kosten pro Nachricht und kein Tageslimit. Nutze es, so viel du willst."],
      ["Wird etwas, das ich eingebe, an euch geschickt?", "Nein. Deine Fragen, Antworten und Dateien verlassen nie deinen Computer. Die App geht nur online, um Modelle herunterzuladen und dein Abo zu prüfen."],
      ["Was passiert nach den 14 Tagen?", "Die App pausiert, bis du ein Abo abschließt. Deine Modelle und Gespräche bleiben auf deinem Computer, und nichts wird gelöscht."],
      ["Kann ich es auf mehreren Computern nutzen?", "Ja, auf bis zu 3 deiner Computer. Auf einem neuen öffnest du Konto und gibst die E-Mail-Adresse an, mit der du bezahlt hast; wir schicken dir einen 6-stelligen Code. Ist das Limit erreicht, zeigt die App deine Computer, damit du einen abmelden kannst. Ein Computer, der 60 Tage nicht genutzt wird, gibt seinen Platz von selbst frei."],
      ["Funktioniert es offline?", "Ja. Deine Lizenz wird auf deinem Computer geprüft, ohne Internet. Sie erneuert sich, sobald du online bist. Nur ein Computer, der länger als etwa 35 Tage offline bleibt, muss einmal online gehen."],
      ["Steigen meine 8 $ später?", "Für die ersten 100 Mitglieder bleibt es bei 8 $ im Monat, solange das Abo läuft, auch wenn der Preis für neue Mitglieder steigt. Oder einmalig 100 $ für eine lebenslange Lizenz, danach nie wieder zahlen."],
      ["Kann ich kündigen?", "Ja, jederzeit, im Bereich Konto der App."],
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
