# 📜 Projectplan: RuneScape Agility Browser App

**Doel:** Een interactieve browser-applicatie die de gebruiker motiveert om fysieke oefeningen te doen, verpakt in een RuneScape Agility thema, inclusief humoristische wendingen en beloningen.

## 🛠 Technische Vereisten (Algemeen)

* **Platform:** Webbrowser (HTML/CSS/JavaScript).
* **Assets:** Afbeeldingen (Locaties, Level 99, Pets) en Animaties (Fitness oefeningen) worden aangeleverd.
* **Afbeelding restrictie:** Alle getoonde afbeeldingen (vooral pets) worden via CSS geforceerd naar max **300px x 300px** (object-fit: contain/cover) om uniformiteit te bewaren.

---

## 🚀 De User Flow (Stap voor Stap)

### Fase 1: Het Startscherm (Main Menu)

Het eerste scherm dat de gebruiker ziet.

* **Elementen:**
  1. Knop: **"Start agility training"** (Start de flow).
  2. Knop: **"Play again"** (Herstart de applicatie volledig - zie Fase 7).
  3. Knop: **"Stop workout"** (Sluit het venster of toont een zwart scherm met "Programma gestopt").

### Fase 2: Character Creation & Setup

Wordt geactiveerd na klikken op *"Start agility training"* of  *"Play again"* .

* **Actie:** Gebruiker voert een naam in.
* **Variabelen:**
  * `Character Name`: [Input User]
  * `Current Level`: **98** (Hardcoded startwaarde).
  * `XP`: 0.
  * `Locations Completed`: 0.

### Fase 3: Locatie Selectie (De Map)

De gebruiker kiest waar hij traint.

* **Weergave:** 5 tegels/knoppen met de bijbehorende afbeelding (ingeladen uit bijlage).
* **Opties:**
  1. Gnome Stronghold
  2. Draynor
  3. Canifis
  4. Brimhaven Arena
  5. Hallowed Sepulchre
* **Logica:** Bij klik wordt de afbeelding van de locatie als achtergrond of header ingesteld voor de volgende fase.

### Fase 4: De Training (Gameplay Loop)

Hier doet de gebruiker de oefeningen.

* **Content:**
  * Toon **3 willekeurige fitness oefeningen** uit een predefined array (bijv. Push-ups, Jumping Jacks, Squats).
  * Laad de bijbehorende **animatie** per oefening.
* **Interactie:** De gebruiker klikt op "Oefening voltooid" (of vergelijkbaar) per oefening.
* **Feedback:** Visuele XP "drops" (zoals in RuneScape) na elke oefening.
* **Progressie:** Nadat de 3 oefeningen van de gekozen locatie klaar zijn:
  * Teller `Locations Completed` gaat +1.
  * Als `Locations Completed` < 2: Keer terug naar **Fase 3** (Kies volgende locatie).
  * Als `Locations Completed` == 2: Ga naar  **Fase 5** .

### Fase 5: Level Up Event

Wordt getriggerd na het voltooien van de 2e locatie.

* **Pop-up:** Tekst:  *"Je bent een level omhoog gegaan"* .
* **Afbeelding:** Toon de **"Level 99 Agility"** afbeelding (uit bijlage).
* **Reward sound**: Het volgende muziek fragment word afgespeeld (uit bijlage).
* **State:** Level variabele wordt geüpdatet naar 99.
* **Transitie:** Na wegklikken/timer -> Ga naar Fase 6.

### Fase 6: Pet Selectie (De Grap & Beloning)

Een carrousel om een beloning te kiezen.

* **Weergave:** Een slider/carrousel die 1 voor 1 de pets toont.
* **Data:** 6 Pets (afbeelding + titel + korte lore tekst). *Afbeeldingen max 300x300px.*
* **De Logica (Cruciaal):**
  1. **Eerste Klik (De Prank):** De gebruiker kiest een pet (maakt niet uit welke).
     * **Actie:** Toon een **Fortnite-stijl** custom melding.
     * **Tekst:** *"Sorry, de gekozen pet zit vast in de 'God Wars Dungeon', claim je prijs nu."*
     * De gebruiker moet dit wegklikken.
  2. **Tweede Klik (De Echte Beloning):** De gebruiker mag opnieuw kiezen.
     * **Resultaat:** Ongeacht welke pet de gebruiker nu aanklikt, de applicatie forceert de **"Giant Squirrel"** als gekozen pet.
     * **Feedback:** *"Je hebt de Giant Squirrel ontvangen!"*
     * **Pet sound:** Het volgende muziek fragment word afgespeeld (uit bijlage).

### Content: Pet Lijst voor Carrousel

*Gebruik onderstaande teksten in de carrousel. Zorg dat de bijbehorende afbeelding (max 300x300px) wordt getoond.*

1. **Giant Squirrel**
   * **Herkomst:** Deze zeldzame eekhoorn wordt soms gespot tijdens het rennen van rondjes op de Agility courses, van Gnome Stronghold tot de daken van Ardougne.
   * **Gebruik:** Hij is razendsnel, dol op eikels en de enige die jouw tempo kan bijhouden tijdens een workout.
2. **Bloodhound**
   * **Herkomst:** Deze trouwe viervoeter is een uiterst zeldzame beloning voor avonturiers die complexe Master Clue Scrolls oplossen.
   * **Gebruik:** Met zijn speurneus vindt hij altijd de juiste route. Hij is de perfecte joggingpartner die nooit moe wordt en je motiveert om die laatste kilometer nog vol te houden.
3. **Beaver**
   * **Herkomst:** Dit kleine houtdier verschijnt magisch wanneer je bomen omhakt in de bossen van Gielinor.
   * **Gebruik:** Een harde werker die altijd hout zoekt om aan te knagen. Let op je houten meubels als je hem binnenlaat!
4. **Tangleroot**
   * **Herkomst:** Een levend wezen gemaakt van wortels en bladeren dat soms tevoorschijn komt wanneer je gewassen oogst op het land.
   * **Gebruik:** Hij staat symbool voor pure, natuurlijke groei. Net zoals hij groeit vanuit de aarde, zal hij toekijken hoe jouw spieren groeien bij elke workout.
5. **Rock Golem**
   * **Herkomst:** Een levend stuk gesteente dat ontstaat wanneer je met veel kracht op mineralen hakt in de mijnen.
   * **Gebruik:** Hij is misschien traag en zwaar, maar hij is onverwoestbaar. De perfecte inspiratie voor krachttraining.
6. **Rift Guardian**
   * **Herkomst:** Een magisch wezen dat is ontsnapt uit de Runecrafting altaren. Hij kan van kleur veranderen afhankelijk van de energie in de lucht.
   * **Gebruik:** Hij zweeft naast je en zorgt voor een mystieke sfeer. Pas op dat hij je niet per ongeluk naar een andere dimensie teleporteert.

### 🏁 Concretisering van de "Prank" Flow

Om zeker te zijn dat de developer de logica van de grap snapt in combinatie met bovenstaande lijst:

1. De gebruiker ziet bovenstaande 6 opties in de carrousel.
2. **Eerste keuze:** Gebruiker kiest (bijvoorbeeld) "Rock Golem".
   * *Resultaat:* Fopmelding (Fortnite stijl):  *"Sorry de gekozen pet zit vast in de God Wars Dungeon, claim je prijs nu"* .
3. **Tweede keuze:** Gebruiker probeert opnieuw en kiest (bijvoorbeeld) "Beaver".
   * *Resultaat:* De applicatie negeert de keuze "Beaver" en laadt direct de **Giant Squirrel** in als definitieve beloning met de melding:  *"Gefeliciteerd, je hebt de Giant Squirrel ontvangen!"* .

### Fase 7: Het Leaderboard (Eindscherm)

Een overzicht van de prestatie.

* **Weergave:**
  * **Naam:** [Character Name]
  * **Level:** 99
  * **Gekozen Locaties:** [Lijst van de 2 locaties]
  * **Oefeningen:** Lijst van gedane oefeningen.
    * *Logica:* Als een oefening >1 keer is voorgekomen, toon deze groot met label:  **"Favoriete fitness oefening"** .
  * **Pet:** Afbeelding van de  **Giant Squirrel** .
* **Knoppen:**
  1. **"Play again":** Reset alle variabelen, maar ga naar Fase 2 (Character maken).
  2. **"Stop workout":** Trigger bevestiging.

### Fase 8: Afsluiten

* **Actie:** Gebruiker klikt op "Stop workout" in het leaderboard.
* **Bevestiging:** Toon dialoog "Weet je zeker dat je wilt stoppen?".
* **Resultaat bij 'Ja':**
  * Toon melding:  *"You will not get stronger this way"* .
  * Keer terug naar **Fase 1** (Startscherm) of sluit applicatie (afhankelijk van browser mogelijkheden).


## Bijlage

Te gebruiken bijlages kunnen gevonden worden in het mapje `assets/`:

1. **Locatie Selectie:**
   * `gnome_stronghold.png`
   * `draynor.png`
   * `canifis.png`
   * `brimhaven.png`
   * `hallowed_sepulchre.png`
2. **Level Up:**
   * `99_agility_notification.webp`
   * Reward sound: `Agility_Level_Up!.ogg`
3. **Animaties:**
   * Video's of GIFs van de fitness oefeningen.
4. **Pets (max 300x300px):**
   * `Rift_guardian.webp`
   * `Bloodhound.png`
   * `Beaver.png`
   * `Rock_Golem.png`
   * `Tangleroot.png`
   * `giant_squirrel.png` (Zorg dat deze zeker aanwezig is).
5. Pet Selectie
   * Pet sound: `Getting_pet.ogg`
6. **UI:**
   * Afbeelding voor de Fortnite "fop" melding.
     * `vbucks.png`
