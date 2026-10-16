/* ==========================================================================
   UX-CodeCamp –Praktiska övningar
   Kursens kapitel med bara kodrutorna (Exempel och Övning).
   Förklaringarna finns i lärarens version av kursen.
   ========================================================================== */

window.KURS = {
  "parts": [
    {
      "id": "html",
      "title": "HTML – strukturen"
    },
    {
      "id": "css",
      "title": "CSS – utseendet"
    },
    {
      "id": "layout",
      "title": "Layout"
    },
    {
      "id": "system",
      "title": "Designsystem i kod"
    },
    {
      "id": "ref",
      "title": "Bibliotek"
    }
  ],
  "chapters": [
    {
      "id": "html-grunder",
      "part": "html",
      "title": "Element, taggar och attribut",
      "summary": "",
      "time": "20 min",
      "blocks": [
        {
          "t": "h",
          "text": "Anatomin av ett element"
        },
        {
          "t": "ex",
          "title": "Taggen bestämmer vad innehållet är",
          "task": "Byt <code>p</code> mot <code>h1</code> på första raden – i både starttaggen och sluttaggen. Samma text blir en huvudrubrik. Prova sedan <code>h2</code>.",
          "html": "<p>Det här är ett stycke.</p>\n\n<p>Det här är ett till stycke.</p>",
          "css": "/* Ingen CSS behövs här.\n   Det du ser är webbläsarens standardutseende. */"
        },
        {
          "t": "h",
          "text": "Element i element"
        },
        {
          "t": "ex",
          "title": "Ett element inuti ett annat",
          "task": "<code>&lt;strong&gt;</code> betyder <em>viktigt</em> och visas fetstilt. Gör även ordet <em>stycke</em> fetstilt genom att lägga det mellan <code>&lt;strong&gt;</code> och <code>&lt;/strong&gt;</code>.",
          "html": "<p>Det här är ett <strong>viktigt</strong> stycke.</p>",
          "css": "/* Ingen CSS behövs här. */"
        },
        {
          "t": "h",
          "text": "class – kopplingen till CSS"
        },
        {
          "t": "ex",
          "title": "class kopplar ihop HTML och CSS",
          "task": "<ol><li>Byt <code>class=\"ingress\"</code> till <code>class=\"intro\"</code>. Stilen försvinner, eftersom CSS:en letar efter <code>.ingress</code>.</li><li>Klicka på fliken CSS och byt <code>.ingress</code> till <code>.intro</code>. Nu hittar de varandra igen.</li></ol>",
          "html": "<p class=\"ingress\">Det här är en ingress – en inledande text.</p>\n\n<p>Det här är ett vanligt stycke.</p>",
          "css": "/* Punkten betyder: element med class=\"ingress\" */\n.ingress {\n  font-size: 1.25rem;\n  color: #4f46e5;\n}"
        },
        {
          "t": "play",
          "title": "Öva: bygg med element",
          "task": "<ol><li>Lägg till ett stycke under rubriken.</li><li>Gör ett ord i stycket fetstilt med <code>&lt;strong&gt;</code>.</li></ol>",
          "html": "<h1>Om mig</h1>\n",
          "css": "",
          "solution": {
            "html": "<h1>Om mig</h1>\n<p>Jag är <strong>UX-designer</strong> och lär mig koda.</p>",
            "css": ""
          }
        }
      ]
    },
    {
      "id": "grundmall",
      "part": "html",
      "title": "Grundmallen – sidans skelett",
      "summary": "",
      "time": "15 min",
      "blocks": [
        {
          "t": "ex",
          "title": "Grundmallen",
          "task": "Ta bort raden med <code>&lt;link rel=\"stylesheet\" …&gt;</code>. Den lila färgen försvinner, eftersom sidan inte längre hittar sin CSS.",
          "html": "<!DOCTYPE html>\n<html lang=\"sv\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Min första sida</title>\n    <link rel=\"stylesheet\" href=\"css/style.css\">\n  </head>\n  <body>\n    <h1>Hej världen!</h1>\n    <p>Allt i body syns. Inget i head syns.</p>\n  </body>\n</html>",
          "css": "/* Det här är filen css/style.css */\nh1 {\n  color: #4f46e5;\n}"
        }
      ]
    },
    {
      "id": "html-text",
      "part": "html",
      "title": "Text, listor, länkar och bilder",
      "summary": "",
      "time": "25 min",
      "blocks": [
        {
          "t": "h",
          "text": "Rubriker"
        },
        {
          "t": "ex",
          "title": "Tre rubriknivåer",
          "html": "<h1>Kafémenyn</h1>\n\n<h2>Drycker</h2>\n<h3>Kaffe</h3>\n<h3>Te</h3>\n\n<h2>Bakverk</h2>",
          "css": ""
        },
        {
          "t": "h",
          "text": "Listor"
        },
        {
          "t": "ex",
          "title": "Punktlista och numrerad lista",
          "task": "Lägg till en fjärde punkt i den numrerade listan.",
          "html": "<ul>\n  <li>Research</li>\n  <li>Skiss</li>\n  <li>Prototyp</li>\n</ul>\n\n<ol>\n  <li>Öppna VS Code</li>\n  <li>Skapa index.html</li>\n  <li>Starta Live Server</li>\n</ol>",
          "css": ""
        },
        {
          "t": "h",
          "text": "Länkar"
        },
        {
          "t": "ex",
          "title": "Tre sorters länkar",
          "html": "<!-- Till en annan sida -->\n<p><a href=\"om-oss.html\">Om oss</a></p>\n\n<!-- Till en del av samma sida, med id=\"kontakt\" -->\n<p><a href=\"#kontakt\">Hoppa till kontakt</a></p>\n\n<!-- Öppnar mejlprogrammet -->\n<p><a href=\"mailto:hej@exempel.se\">Mejla oss</a></p>",
          "css": ""
        },
        {
          "t": "h",
          "text": "Bilder"
        },
        {
          "t": "ex",
          "title": "En bild som laddas – och en som saknas",
          "task": "Ändra <code>src</code> på den första bilden till <code>images/finns-inte.svg</code>. Bilden försvinner och alt-texten visas istället.",
          "html": "<p><strong>Bilden finns:</strong></p>\n<img src=\"images/whiteboard.svg\"\n     alt=\"Tecknad whiteboard med gula, rosa och blå post-it-lappar\">\n\n<!-- Den här bildfilen finns inte.\n     Då visar webbläsaren alt-texten istället. -->\n<p><strong>Bilden saknas:</strong></p>\n<img src=\"images/kaffekopp.svg\"\n     alt=\"En kopp kaffe på ett träbord\">",
          "css": "img {\n  width: 300px;\n}"
        },
        {
          "t": "play",
          "title": "Öva: ett litet portfolio-kort",
          "task": "<ol><li>Gör om texten <em>Verktyg</em> till en <code>&lt;h2&gt;</code>.</li><li>Gör en punktlista med tre verktyg du använder.</li><li>Gör <em>Se mitt case</em> till en länk till <code>case.html</code>.</li></ol>",
          "html": "<img src=\"images/skrivbord.svg\" alt=\"Tecknat skrivbord med en laptop, en kaffekopp och en krukväxt\">\n<h1>Anna Andersson</h1>\n<p>UX-designer med fokus på tillgänglighet.</p>\n\nVerktyg\n\nSe mitt case",
          "css": "img {\n  width: 100%;\n  max-width: 400px;\n}",
          "solution": {
            "html": "<img src=\"images/skrivbord.svg\" alt=\"Tecknat skrivbord med en laptop, en kaffekopp och en krukväxt\">\n<h1>Anna Andersson</h1>\n<p>UX-designer med fokus på tillgänglighet.</p>\n\n<h2>Verktyg</h2>\n<ul>\n  <li>Figma</li>\n  <li>Miro</li>\n  <li>VS Code</li>\n</ul>\n\n<a href=\"case.html\">Se mitt case</a>",
            "css": "img {\n  width: 100%;\n  max-width: 400px;\n}"
          }
        }
      ]
    },
    {
      "id": "semantik",
      "part": "html",
      "title": "Semantisk HTML & tillgänglighet",
      "summary": "",
      "time": "20 min",
      "blocks": [
        {
          "t": "h",
          "text": "Sidans landmärken"
        },
        {
          "t": "ex",
          "title": "Sidans landmärken",
          "html": "<!DOCTYPE html>\n<html lang=\"sv\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Studio Form</title>\n  <link rel=\"stylesheet\" href=\"css/style.css\">\n</head>\n<body>\n\n  <header>\n    <nav>Meny</nav>\n  </header>\n\n  <main>\n    <h1>Sidans rubrik</h1>\n\n    <section>\n      <h2>En sektion</h2>\n    </section>\n\n    <article>\n      <h2>Ett blogginlägg</h2>\n    </article>\n  </main>\n\n  <footer>Kontakt och copyright</footer>\n\n</body>\n</html>",
          "css": "/* Ingen egen CSS här.\n   Ramarna och etiketterna ritas av kursen,\n   så att du ser strukturen som en wireframe. */",
          "frame": "header,nav,main,section,article,aside,footer{display:block;position:relative;border:2px dashed #a5a1f5;border-radius:8px;padding:24px 12px 10px;margin:8px 0}header::before,nav::before,main::before,section::before,article::before,footer::before{position:absolute;top:3px;left:10px;font:600 11px monospace;color:#4f46e5}header::before{content:\"<header>\"}nav::before{content:\"<nav>\"}main::before{content:\"<main>\"}section::before{content:\"<section>\"}article::before{content:\"<article>\"}footer::before{content:\"<footer>\"}h1,h2{margin:4px 0;font-size:1rem}"
        },
        {
          "t": "h",
          "text": "Fyra regler för tillgänglighet"
        },
        {
          "t": "play",
          "title": "Öva: byt div mot rätt element",
          "task": "Byt ut varje <code>&lt;div&gt;</code> mot rätt semantiskt element. Tips: titta på klassnamnen. Utseendet ändras inte – men betydelsen gör det.",
          "html": "<div class=\"top\">\n  <strong>Studio Form</strong>\n  <div class=\"menu\">Arbete · Om · Kontakt</div>\n</div>\n\n<div class=\"content\">\n  <h1>Vi designar tjänster som människor förstår</h1>\n</div>\n\n<div class=\"bottom\">© 2026 Studio Form</div>",
          "css": "/* Ingen CSS behövs i den här övningen. */",
          "frame": "body{padding:0}header,.top{display:flex;justify-content:space-between;padding:16px;background:#f1f0ff}main,.content{padding:24px 16px}footer,.bottom{padding:16px;font-size:14px;color:#666;border-top:1px solid #ddd}",
          "solution": {
            "html": "<header class=\"top\">\n  <strong>Studio Form</strong>\n  <nav class=\"menu\">Arbete · Om · Kontakt</nav>\n</header>\n\n<main class=\"content\">\n  <h1>Vi designar tjänster som människor förstår</h1>\n</main>\n\n<footer class=\"bottom\">© 2026 Studio Form</footer>",
            "css": "/* Ingen CSS behövs i den här övningen. */"
          }
        }
      ]
    },
    {
      "id": "formular",
      "part": "html",
      "title": "Formulär",
      "summary": "",
      "time": "20 min",
      "blocks": [
        {
          "t": "h",
          "text": "Fält och etikett"
        },
        {
          "t": "ex",
          "title": "Ett enkelt formulär",
          "task": "Klicka på ordet <em>Namn</em> i resultatet. Fältet aktiveras – det är etiketten som gör det.",
          "html": "<form>\n  <label for=\"namn\">Namn</label>\n  <input type=\"text\" id=\"namn\">\n\n  <label for=\"epost\">E-post</label>\n  <input type=\"email\" id=\"epost\">\n\n  <button type=\"submit\">Skicka</button>\n</form>",
          "css": "/* Lite luft så att fälten hamnar under varandra */\nlabel, input, button {\n  display: block;\n  margin-bottom: 8px;\n}"
        },
        {
          "t": "h",
          "text": "Fälttyper"
        },
        {
          "t": "play",
          "title": "Öva: ett anmälningsformulär",
          "task": "<ol><li>Lägg till ett fält för telefonnummer med rätt <code>type</code> och en kopplad etikett.</li><li>Klicka på din nya etikett – aktiveras fältet?</li></ol>",
          "html": "<form>\n  <label for=\"namn\">Namn</label>\n  <input type=\"text\" id=\"namn\">\n\n  <label for=\"epost\">E-post</label>\n  <input type=\"email\" id=\"epost\">\n\n  <button type=\"submit\">Anmäl mig</button>\n</form>",
          "css": "label, input, button {\n  display: block;\n  margin-bottom: 8px;\n}",
          "solution": {
            "html": "<form>\n  <label for=\"namn\">Namn</label>\n  <input type=\"text\" id=\"namn\">\n\n  <label for=\"epost\">E-post</label>\n  <input type=\"email\" id=\"epost\">\n\n  <label for=\"telefon\">Telefon</label>\n  <input type=\"tel\" id=\"telefon\">\n\n  <button type=\"submit\">Anmäl mig</button>\n</form>",
            "css": "label, input, button {\n  display: block;\n  margin-bottom: 8px;\n}"
          }
        }
      ]
    },
    {
      "id": "css-grunder",
      "part": "css",
      "title": "CSS-grunder: regler",
      "summary": "",
      "time": "15 min",
      "blocks": [
        {
          "t": "h",
          "text": "Anatomin av en CSS-regel"
        },
        {
          "t": "ex",
          "title": "En regel med två egenskaper",
          "tab": "css",
          "task": "Byt selektorn <code>h1</code> mot <code>p</code>. Vilket element får nu stilen?",
          "html": "<h1>Jag styls av regeln</h1>\n<p>Jag är ett vanligt stycke.</p>",
          "css": "h1 {\n  color: #4f46e5;\n  font-size: 40px;\n}"
        },
        {
          "t": "h",
          "text": "Kommentarer"
        },
        {
          "t": "ex",
          "title": "En bortkommenterad rad",
          "tab": "css",
          "task": "Ta bort <code>/*</code> och <code>*/</code> runt den röda färgen. Vad händer?",
          "html": "<p>Vilken färg får jag?</p>",
          "css": "p {\n  color: #4f46e5;\n  /* color: red; */\n}",
          "keepComments": true
        },
        {
          "t": "play",
          "title": "Öva: dina första regler",
          "tab": "css",
          "task": "<ol><li>Ge <code>h1</code> en annan färg och storleken <code>40px</code>.</li><li>Ge <code>p</code> färgen <code>#555</code>.</li></ol>",
          "html": "<h1>Kaffe & kod</h1>\n<p>En blogg om att lära sig HTML och CSS, en kopp i taget.</p>",
          "css": "h1 {\n\n}\n\np {\n\n}",
          "solution": {
            "html": "<h1>Kaffe & kod</h1>\n<p>En blogg om att lära sig HTML och CSS, en kopp i taget.</p>",
            "css": "h1 {\n  color: #8a4b2a;\n  font-size: 40px;\n}\n\np {\n  color: #555;\n}"
          }
        }
      ]
    },
    {
      "id": "selektorer",
      "part": "css",
      "title": "Selektorer och klasser",
      "summary": "",
      "time": "20 min",
      "blocks": [
        {
          "t": "h",
          "text": "Klasser är din bästa vän"
        },
        {
          "t": "ex",
          "title": "En bas-klass och en variant",
          "tab": "css",
          "task": "Ge även <em>Avbryt</em>-knappen klassen <code>primar</code>. Ta sedan bort den igen.",
          "html": "<button class=\"knapp\">Avbryt</button>\n<button class=\"knapp primar\">Spara</button>",
          "css": "/* Gäller alla knappar */\n.knapp {\n  padding: 10px 16px;\n  border-radius: 8px;\n  border: 1px solid #ccc;\n}\n\n/* Gäller bara knappar som också har klassen primar */\n.primar {\n  background: #4f46e5;\n  color: white;\n}"
        },
        {
          "t": "h",
          "text": "Hover och fokus"
        },
        {
          "t": "ex",
          "title": "Hover och tangentbordsfokus",
          "tab": "css",
          "task": "Hovra över knappen. Klicka sedan i resultatrutan och tryck <kbd>Tab</kbd> för att se fokusringen.",
          "html": "<button class=\"knapp\">Hovra över mig</button>",
          "css": ".knapp {\n  padding: 10px 16px;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  background: white;\n}\n\n.knapp:hover {\n  background: #eef0ff;\n}\n\n.knapp:focus-visible {\n  outline: 3px solid #4f46e5;\n}"
        },
        {
          "t": "h",
          "text": "När två regler krockar"
        },
        {
          "t": "ex",
          "title": "Vem vinner?",
          "tab": "css",
          "task": "Texten blir grön, trots att den röda regeln står sist – klassen vinner. Ta bort <code>class=\"notis\"</code> i HTML. Vilken färg blir det nu?",
          "html": "<p class=\"notis\">Vilken färg får jag?</p>",
          "css": ".notis {\n  color: green;\n}\n\np {\n  color: red;\n}"
        },
        {
          "t": "play",
          "title": "Öva: bygg en knappvariant",
          "tab": "css",
          "task": "<ol><li>Skapa klassen <code>.sekundar</code> med vit bakgrund och lila text (<code>#4f46e5</code>).</li><li>Ge den till knappen <em>Avbryt</em>.</li><li>Lägg till en <code>:hover</code>-stil på <code>.primar</code>.</li></ol>",
          "html": "<button class=\"knapp primar\">Spara</button>\n<button class=\"knapp\">Avbryt</button>",
          "css": ".knapp {\n  padding: 10px 18px;\n  border: 2px solid #4f46e5;\n  border-radius: 8px;\n}\n\n.primar {\n  background: #4f46e5;\n  color: white;\n}",
          "solution": {
            "html": "<button class=\"knapp primar\">Spara</button>\n<button class=\"knapp sekundar\">Avbryt</button>",
            "css": ".knapp {\n  padding: 10px 18px;\n  border: 2px solid #4f46e5;\n  border-radius: 8px;\n}\n\n.primar {\n  background: #4f46e5;\n  color: white;\n}\n\n.primar:hover {\n  background: #3730a3;\n}\n\n.sekundar {\n  background: white;\n  color: #4f46e5;\n}"
          }
        }
      ]
    },
    {
      "id": "farg-typografi",
      "part": "css",
      "title": "Färger och typografi",
      "summary": "",
      "time": "20 min",
      "blocks": [
        {
          "t": "h",
          "text": "Färger"
        },
        {
          "t": "ex",
          "title": "Textfärg, bakgrund och ram",
          "tab": "css",
          "task": "Byt bakgrundsfärgen till <code>rgb(79 70 229 / 0.1)</code>.",
          "html": "<div class=\"kort\">Ett kort med textfärg, bakgrund och ram.</div>",
          "css": ".kort {\n  color: #1c1c1a;            /* textfärg */\n  background: #fff8e6;       /* bakgrund */\n  border: 2px solid #f0c66b; /* ram: tjocklek, stil, färg */\n  padding: 20px;\n}"
        },
        {
          "t": "h",
          "text": "Typsnitt och textstorlek"
        },
        {
          "t": "ex",
          "title": "En typskala",
          "tab": "css",
          "task": "Ändra <code>line-height</code> på <code>h1</code> till <code>1.8</code>. Ser du hur rubriken faller isär?",
          "html": "<h1>En rubrik som bryts över två rader</h1>\n<p>Brödtext med lite luftigare radhöjd. Det gör längre text lättare att läsa.</p>",
          "css": "body {\n  font-family: Georgia, serif;\n}\n\nh1 {\n  font-size: 40px;\n  font-weight: 700;\n  line-height: 1.1;\n}\n\np {\n  font-size: 18px;\n  line-height: 1.6;\n}"
        },
        {
          "t": "h",
          "text": "Fler textegenskaper"
        },
        {
          "t": "ex",
          "title": "Versaler, bokstavsavstånd och understrykning",
          "tab": "css",
          "html": "<p class=\"etikett\">Case study</p>\n<a href=\"#\">En länk utan understrykning</a>",
          "css": ".etikett {\n  text-transform: uppercase;  /* VERSALER */\n  letter-spacing: 0.1em;      /* luft mellan bokstäverna */\n  font-weight: 600;\n  color: #4f46e5;\n}\n\na {\n  text-decoration: none;      /* tar bort understrykningen */\n}"
        },
        {
          "t": "h",
          "text": "Typsnitt från Google Fonts"
        },
        {
          "t": "ex",
          "title": "Ett typsnitt från Google Fonts",
          "tab": "css",
          "task": "Byt <code>\"Inter\"</code> mot <code>\"Lora\"</code> och <code>sans-serif</code> mot <code>serif</code>. Det fungerar eftersom båda typsnitten hämtas på Google Fonts-raden.",
          "html": "<!DOCTYPE html>\n<html lang=\"sv\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Typsnitt</title>\n\n  <!-- 1. Typsnittet från Google Fonts -->\n  <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Lora:wght@400;700&display=swap\" rel=\"stylesheet\">\n\n  <!-- 2. Din egen stilmall – efter typsnittet -->\n  <link rel=\"stylesheet\" href=\"css/style.css\">\n</head>\n<body>\n  <h1>Hej typsnitt!</h1>\n  <p>Den här texten använder ett typsnitt från Google Fonts.</p>\n</body>\n</html>",
          "css": "body {\n  font-family: \"Inter\", sans-serif;\n}"
        },
        {
          "t": "play",
          "title": "Öva: sätt en typskala",
          "tab": "css",
          "task": "<ol><li>Gör <code>.overrubrik</code> till versaler med lite <code>letter-spacing</code>.</li><li>Ge <code>h1</code> storleken <code>2.5rem</code>.</li><li>Ge <code>p</code> radhöjden <code>1.6</code>.</li></ol>",
          "html": "<p class=\"overrubrik\">Case study</p>\n<h1>Hur vi halverade tiden för att boka en tvättid</h1>\n<p>Genom intervjuer, skisser och tre rundor av användartester tog vi fram en bokningstjänst som de boende faktiskt gillar.</p>",
          "css": ".overrubrik {\n  color: #4f46e5;\n  font-weight: 600;\n}\n\nh1 {\n\n}\n\np {\n\n}",
          "solution": {
            "html": "<p class=\"overrubrik\">Case study</p>\n<h1>Hur vi halverade tiden för att boka en tvättid</h1>\n<p>Genom intervjuer, skisser och tre rundor av användartester tog vi fram en bokningstjänst som de boende faktiskt gillar.</p>",
            "css": ".overrubrik {\n  color: #4f46e5;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n}\n\nh1 {\n  font-size: 2.5rem;\n}\n\np {\n  line-height: 1.6;\n}"
          }
        }
      ]
    },
    {
      "id": "boxmodellen",
      "part": "css",
      "title": "Boxmodellen",
      "summary": "",
      "time": "20 min",
      "blocks": [
        {
          "t": "h",
          "text": "Skrivsätt"
        },
        {
          "t": "ex",
          "title": "Padding, ram och marginal",
          "tab": "css",
          "task": "Ändra <code>padding</code> till <code>16px 48px</code>. Ändra sedan <code>margin-bottom</code> och se hur avståndet till nästa kort ändras.",
          "html": "<div class=\"kort\">Kort 1</div>\n<div class=\"kort\">Kort 2</div>",
          "css": ".kort {\n  padding: 24px;              /* luft innanför */\n  border: 2px solid #4f46e5;  /* ramen */\n  border-radius: 12px;        /* rundade hörn */\n  margin-bottom: 16px;        /* luft utanför, under */\n  background: #c9f0d6;\n}"
        },
        {
          "t": "h",
          "text": "box-sizing: viktig rad nummer ett"
        },
        {
          "t": "ex",
          "title": "Före och efter box-sizing",
          "tab": "css",
          "html": "<div class=\"lada standard\">Standard: 300px + padding + ram = 348px</div>\n<div class=\"lada\">border-box: exakt 300px</div>",
          "css": "/* Lägg alltid den här först */\n* {\n  box-sizing: border-box;\n}\n\n.lada {\n  width: 300px;\n  padding: 20px;\n  border: 4px solid #4f46e5;\n  margin-bottom: 12px;\n}\n\n/* Webbläsarens standard – bara för att visa skillnaden */\n.standard {\n  box-sizing: content-box;\n}"
        },
        {
          "t": "play",
          "title": "Öva: ett projektkort",
          "tab": "css",
          "task": "<ol><li>Ge kortet 24 px padding.</li><li>Ge det en ram: <code>1px solid #ddd</code>.</li><li>Ge det rundade hörn på 12 px.</li></ol>",
          "html": "<div class=\"kort\">\n  <h2>Projekt Tvättstuga</h2>\n  <p>Ny bokningstjänst för 400 hushåll.</p>\n</div>",
          "css": ".kort {\n  width: 300px;\n  background: white;\n}",
          "solution": {
            "html": "<div class=\"kort\">\n  <h2>Projekt Tvättstuga</h2>\n  <p>Ny bokningstjänst för 400 hushåll.</p>\n</div>",
            "css": ".kort {\n  width: 300px;\n  background: white;\n  padding: 24px;\n  border: 1px solid #ddd;\n  border-radius: 12px;\n}"
          }
        }
      ]
    },
    {
      "id": "flexbox",
      "part": "layout",
      "title": "Flexbox – auto layout i kod",
      "summary": "",
      "time": "25 min",
      "blocks": [
        {
          "t": "ex",
          "title": "Prova flexbox",
          "tab": "css",
          "task": "Ändra ett värde i taget och se vad som händer:<ul><li><code>justify-content</code>: <code>center</code>, <code>flex-end</code> eller <code>space-between</code></li><li><code>align-items</code>: <code>center</code> eller <code>flex-end</code></li></ul>",
          "html": "<div class=\"rad\">\n  <div class=\"ruta\">A</div>\n  <div class=\"ruta\">B<br>hög</div>\n  <div class=\"ruta\">C</div>\n</div>",
          "css": ".rad {\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  gap: 12px;\n\n  height: 180px;\n  background: #eef0ff;\n}\n\n.ruta {\n  padding: 16px 20px;\n  background: #4f46e5;\n  color: white;\n}"
        },
        {
          "t": "h",
          "text": "Vanliga mönster"
        },
        {
          "t": "ex",
          "title": "Logga till vänster, meny till höger",
          "tab": "css",
          "html": "<header class=\"header\">\n  <strong>Studio Form</strong>\n  <nav class=\"meny\">\n    <a href=\"#\">Arbete</a>\n    <a href=\"#\">Om</a>\n    <a href=\"#\">Kontakt</a>\n  </nav>\n</header>",
          "css": ".header {\n  display: flex;\n  justify-content: space-between;  /* isär */\n  align-items: center;             /* lodrätt centrerade */\n}\n\n.meny {\n  display: flex;\n  gap: 24px;                       /* luft mellan länkarna */\n}"
        },
        {
          "t": "ex",
          "title": "Centrera något mitt i en yta",
          "tab": "css",
          "html": "<div class=\"yta\">\n  <p>Jag är centrerad</p>\n</div>",
          "css": ".yta {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 180px;\n  background: #eef0ff;\n}"
        },
        {
          "t": "play",
          "title": "Öva: en navigationsrad",
          "tab": "css",
          "task": "<ol><li>Gör <code>header</code> till en flexbox med loggan till vänster och menyn till höger.</li><li>Centrera dem lodrätt.</li><li>Gör även <code>ul</code> till en flexbox med <code>gap: 24px</code>.</li></ol>",
          "html": "<header>\n  <a class=\"logga\" href=\"#\">Studio Form</a>\n  <nav>\n    <ul>\n      <li><a href=\"#\">Arbete</a></li>\n      <li><a href=\"#\">Om oss</a></li>\n      <li><a href=\"#\">Kontakt</a></li>\n    </ul>\n  </nav>\n</header>",
          "css": "header {\n  padding: 16px;\n  border-bottom: 1px solid #ddd;\n}\n\nul {\n  list-style: none;  /* tar bort listpunkterna */\n  margin: 0;\n  padding: 0;\n}",
          "solution": {
            "html": "<header>\n  <a class=\"logga\" href=\"#\">Studio Form</a>\n  <nav>\n    <ul>\n      <li><a href=\"#\">Arbete</a></li>\n      <li><a href=\"#\">Om oss</a></li>\n      <li><a href=\"#\">Kontakt</a></li>\n    </ul>\n  </nav>\n</header>",
            "css": "header {\n  padding: 16px;\n  border-bottom: 1px solid #ddd;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  gap: 24px;\n}"
          }
        }
      ]
    },
    {
      "id": "grid",
      "part": "layout",
      "title": "Grid – layoutgrid i kod",
      "summary": "",
      "time": "20 min",
      "blocks": [
        {
          "t": "ex",
          "title": "Tre kolumner",
          "tab": "css",
          "task": "Ändra till <code>repeat(4, 1fr)</code> för fyra kolumner. Prova sedan <code>2fr 1fr 1fr</code>.",
          "html": "<div class=\"galleri\">\n  <div>1</div><div>2</div><div>3</div>\n  <div>4</div><div>5</div><div>6</div>\n</div>",
          "css": ".galleri {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.galleri div {\n  padding: 24px;\n  background: #eef0ff;\n  text-align: center;\n}"
        },
        {
          "t": "h",
          "text": "Spänna över flera kolumner"
        },
        {
          "t": "ex",
          "title": "Ett kort som tar två kolumner",
          "tab": "css",
          "html": "<div class=\"galleri\">\n  <div class=\"stor\">Stor</div>\n  <div>2</div>\n  <div>3</div><div>4</div><div>5</div>\n</div>",
          "css": ".galleri {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.galleri div {\n  padding: 24px;\n  background: #eef0ff;\n}\n\n.stor {\n  grid-column: span 2;  /* tar två kolumner */\n  background: #c7d2fe !important;\n}"
        },
        {
          "t": "play",
          "title": "Öva: en kortlista",
          "tab": "css",
          "task": "Gör <code>.kortlista</code> till ett grid med tre lika breda kolumner och 24 px mellanrum.",
          "html": "<div class=\"kortlista\">\n  <div class=\"kort\">Research</div>\n  <div class=\"kort\">Koncept</div>\n  <div class=\"kort\">Prototyp</div>\n</div>",
          "css": ".kortlista {\n\n}\n\n.kort {\n  padding: 24px;\n  border: 1px solid #ddd;\n  border-radius: 12px;\n}",
          "solution": {
            "html": "<div class=\"kortlista\">\n  <div class=\"kort\">Research</div>\n  <div class=\"kort\">Koncept</div>\n  <div class=\"kort\">Prototyp</div>\n</div>",
            "css": ".kortlista {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n\n.kort {\n  padding: 24px;\n  border: 1px solid #ddd;\n  border-radius: 12px;\n}"
          }
        }
      ]
    },
    {
      "id": "variabler",
      "part": "system",
      "title": "CSS-variabler = designtokens",
      "summary": "",
      "time": "25 min",
      "blocks": [
        {
          "t": "h",
          "text": "Skapa och använda en variabel"
        },
        {
          "t": "ex",
          "title": "En variabel, två användningar",
          "tab": "css",
          "task": "Ändra <code>--farg-primar</code> till <code>#e11d48</code>. Både knappen och länken byter färg.",
          "html": "<button class=\"knapp\">Knapp</button>\n<a href=\"#\">En länk</a>",
          "css": "/* 1. Definiera */\n:root {\n  --farg-primar: #4f46e5;\n}\n\n/* 2. Använd */\n.knapp {\n  background: var(--farg-primar);\n  color: white;\n  padding: 10px 16px;\n  border: 0;\n}\n\na {\n  color: var(--farg-primar);\n}"
        },
        {
          "t": "h",
          "text": "Ett litet designsystem"
        },
        {
          "t": "ex",
          "title": "Byt varumärke med några rader",
          "tab": "css",
          "task": "Ändra <code>--farg-primar</code> till <code>#0f766e</code> och <code>--radie</code> till <code>0</code>.",
          "html": "<div class=\"kort\">\n  <h2>Boka tvättid på 10 sekunder</h2>\n  <p>Den nya appen är här.</p>\n  <button class=\"knapp\">Ladda ner</button>\n</div>",
          "css": ":root {\n  --farg-primar: #4f46e5;\n  --farg-yta: #ffffff;\n  --avstand: 24px;\n  --radie: 12px;\n}\n\nbody {\n  background: #f1f0ec;\n}\n\n.kort {\n  background: var(--farg-yta);\n  padding: var(--avstand);\n  border-radius: var(--radie);\n  border-top: 6px solid var(--farg-primar);\n}\n\n.knapp {\n  background: var(--farg-primar);\n  color: white;\n  padding: 10px 16px;\n  border: 0;\n  border-radius: var(--radie);\n}"
        },
        {
          "t": "h",
          "text": "Mörkt läge"
        },
        {
          "t": "play",
          "title": "Öva: lägg till ett mörkt tema",
          "tab": "css",
          "task": "Det andra kortet har <code>class=\"mork\"</code>. Skriv en regel för <code>.mork</code> som ger <code>--farg-yta</code> värdet <code>#1b1b1f</code> och <code>--farg-text</code> värdet <code>#ececef</code>. Rör inte regeln för <code>.kort</code>.",
          "html": "<div class=\"kort\">Ljust tema</div>\n<div class=\"kort mork\">Mörkt tema</div>",
          "css": ":root {\n  --farg-yta: #ffffff;\n  --farg-text: #1c1c1a;\n}\n\n/* Skriv ditt mörka tema här */\n\n\n/* Komponenten – använder bara variabler */\n.kort {\n  background: var(--farg-yta);\n  color: var(--farg-text);\n  padding: 20px;\n  margin-bottom: 12px;\n  border: 1px solid #ccc;\n}",
          "solution": {
            "html": "<div class=\"kort\">Ljust tema</div>\n<div class=\"kort mork\">Mörkt tema</div>",
            "css": ":root {\n  --farg-yta: #ffffff;\n  --farg-text: #1c1c1a;\n}\n\n.mork {\n  --farg-yta: #1b1b1f;\n  --farg-text: #ececef;\n}\n\n/* Komponenten – använder bara variabler */\n.kort {\n  background: var(--farg-yta);\n  color: var(--farg-text);\n  padding: 20px;\n  margin-bottom: 12px;\n  border: 1px solid #ccc;\n}"
          }
        }
      ]
    }
  ],
  "library": []
};
