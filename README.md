# 2. kodutöö – kirjutamise mängu täiendamine

Mängu eesmärk on võimalikult kiiresti ekraanile tekkivaid sõnu ära trükkida. Sõnad on võetud [Eesti Keele Instituudi lehelt](http://www.eki.ee/tarkvara/wordlist/) – [lemmad2013](http://www.eki.ee/tarkvara/wordlist/lemmad2013.txt). Aluseks tuleb võtta kood **[eesrakenduste-arendamine-2018k/klahvimine](https://github.com/eesrakenduste-arendamine-2018k/klahvimine)**. 

### Tähtpäev 26.03.2018 23:59
 Silver Kaugemaa ja Ulvar Kaugemaa tegid: night-day mode.
 Robert Ševtšenko tegi : kõike, välja arvatud night-day mode.

## Kirjeldus
Lisatud funktsionaalsus:
    1.day-night mode = muudab tausta pildi ja fondi värvi sõltuvalt kellaajast.
    2.fondi muutus enter klahvile vajutades mängu jooksul.
    3.top 10 mängijate tulemuste nimekiri.
    4.Mängija nime sisestamine start leheküljel
    5.mängu lõppus teate saatmine mängijale. Teatel on mängija nimi ja skoor.
Skoori arvutuskäik
    Sõna pikkus korrutatud lahendatud sõnade arvule ja jäänud aja vahe on saadavad punktid. valem: ((sõnapikus * lahendatudsõnade arv) - jäänud aeg).
    Mängijale antakse 30 sekundit. Selle aja jooksul on vaja sisestada kogu aeg sõnu ja kinnitada neid vajutades enterile. Kui mängija ei tee midagi siis skoor läheb miinus arvudesse.
## Pildid ja skeemid
![](Images/2018-05-13%20(1).png)
Start Screen

![](Images/2018-05-13%20(2).png)
Game Screen

![](Images/2018-05-13.png)
Result Screen

![](Images/2018-05-13%20(4).png)
Current game result popup and night mode
## Nõuded

1. Töö tuleb teha vähemalt kahekesi, eelnevalt kokkuleppel on lubatud ka kolm liiget. GitHub'is peab eristuma, kes mida tegi!
1. README.md fail sisaldab:
    * autorite nimesid; 
    * repositooriumisse lisatud pilti/skeemi rakenduse tööprotsessidest (sh skoori moodustamine); 
    * skoori moodustamise ja lisatud funktsionaalsuste tekstipõhist kirjeldust.
1. Mängu on lisatud täiendavad funktsionaalsused:  
    * eraldi on mängu tutvustav leht, kus kirjeldatakse mängu, saab sisestada mängija nime ning alustada mängu (ühe-lehe-rakenduse stiilis); 
    * mängijate kohta hoitakse meeles ja salvestakse skoor, nt kasutades [localStorage](https://www.w3schools.com/html/html5_webstorage.asp)'it; 
    * skoori arvutus on lahendatud keerulisemalt kui seda on juba olemasolev arvatud sõnade loetlemine; 
    * eraldi näidatakse välja 10 parima mängija skoori (brauseri põhjal kui kasutate localStorage'it); 
    * mängule on lisatud mõni lisafunktsioon, nt:
        * valesti tähe trükkimisel on tagajärg (nt mõjutab skoori, ekraan vilgub, vms)
        * kasutaja saab ise valida raskusastme või teda huvitavad sõnad (sõnapikkuse vms järgi)
        * eraldi on öörežiim (ingl *dark mode*)
        * mängus on animatsioonid (nt tähed lendavad ära pärast trükkimist)
        * ...
    * [EI OLE KOHUSTUSLIK] eraldi on statistika leht, kus näidatakse ära arvatud sõnade ja kasutajate kohta statistikat (nt eksimuste arv, kirjutamise kiirus vms)
    * [EI OLE KOHUSTUSLIK] juba mängitud sõnu enam ei loosita
    * [EI OLE KOHUSTUSLIK] skoori ja kõiki muid andmeid hoitakse serveris 
    * [EI OLE KOHUSTUSLIK] mängu loogika on serveris ja kasutatakse mängus petmist ennetatakse – *cheat*'imine on kõvasti keerulisem

## Abimaterjal
* Lintimiseks on ühe võimalusena vaja paigaldada [Node.js](https://nodejs.org/en/), [VSCode](https://code.visualstudio.com/) ja VSCode plugin [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). Loe lähemalt kursuse [3.loangu materjalist](https://github.com/eesrakenduste-arendamine-2018k/kursus#3-loeng). Abiks Vajalike asjade paigaldamiseks projektis: `npm install`
* Sündmuste loetelu [HTML DOM Events](http://www.w3schools.com/jsref/dom_obj_event.asp)
* Ajal põhinevad sündmused [JavaScript Timing Events](http://www.w3schools.com/js/js_timing.asp)
* Canvas retina ekraani jaoks [High DPI Canvas](https://www.html5rocks.com/en/tutorials/canvas/hidpi/)
* Mäng 60fps [requestAnimationFrame](http://creativejs.com/resources/requestanimationframe/) ja näide 60fps töötavast mängust [Typer60fps](eesrakenduste-arendamine-2017k/https://github.com/eesrakenduste-arendamine-2017k/Typer60fps) 
