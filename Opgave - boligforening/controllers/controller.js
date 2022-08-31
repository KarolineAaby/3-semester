// controllor - mellemmand som forbinder view og model

export default class Controller {
    initialize(model, view) { // controlleren bliver nød til at kende til view og model
        this.model = model;
        this.view = view;
    }

    //template
    //henter metoderne, som retunere informationen om den specifikke bolig
    buildTemplate(bolig) {
        return `
        <div class="card">
            <img src="image/pb.png" alt="Profilbillede">
            <p><strong>Lejlighedsnummer:</strong> ${bolig.getLejlighedsNummer()}</p>
            <p><strong>Lejer:</strong> ${bolig.getLejer()}</p>
            <p><strong>Indflytningsdato:</strong> ${bolig.getIndflytningsDato()}</p>
            <p><strong>Indskud:</strong> ${bolig.getIndskud()} kr.</p>
            <p><strong>Husleje:</strong> ${bolig.getHusleje()} kr.</p>
            <p><button type="button" id="${bolig.getLejlighedsNummer()}">Delete</button></p>
        </div>`;
    }
    //knappen ovenover = hver bolig får en delete btn, id for knappen er deres unikke serial number

    lnSearch(lejlighedsNummer) {
        const bolig = this.model.boligList.getLejer(lejlighedsNummer); // controlleren kontakter model - søger serial nummer og retunere et guitarobjekt eller null
        let template =""; //templatet er controllerens respons til view om resultatet

        //hvis en bolig er fundet (different from null) - bruges det lavede template l. 9, som fører til view til brugeren
        if(bolig !== null) {
            template = this.buildTemplate(bolig);
        }
        //hvis ingen bolig er fundet (= null) - får brugeren en besked
        else {
            template = `
            <tr class="custommerrow">
                <td colspan="8">Ingenting fundet</td>
            </tr>`;
        }
        //controlleren 'fortæller' view hvad der skal vises til brugeren
        this.view.message(template);
    }

    // search panel
    search(searchLejer) { //searchLejer er det samme object som i view - optimalBolig
        const bolig = this.model.boligList.search(searchLejer); // controlleren kontakter model - søger lejerer/bolig og retunere et boligobjekt eller null
        let template =""; //templatet er controllerens respons til view om resultatet

        //hvis en lejer er fundet (different from null) - bruges det lavede template l. 9, som fører til view til brugeren
        if(bolig !== null) {
            template = this.buildTemplate(bolig);
        }
        //hvis ingen lejer er fundet (= null) - får brugeren en besked
        else {
            template = `
            <tr class="custommerrow">
                <td colspan="8">Ingeting fundet</td>
            </tr>`;
        }
        //controlleren 'fortæller' view hvad der skal vises til brugeren
        this.view.message(template);
    }

    //vis alle lejere button 
    showAllLejere() {
        let template = "";
        for (const bolig of this.model.boligList.allLejere()) { // en metode på allLejere, som viser hele listen - husk der er linket til bolig listen
            template += this.buildTemplate(bolig); //+= for alle boliger på listen, adder det en row med den bolig/lejer til templatet
        }
        this.view.message(template); // sender svaret til view
    }

    // dialog eventshandler - håndtere dialog og når man laver en ny lejer
    newLejer(bolig) {
        //før man adder en ny lejer, skal den tjekke om den eksitere
        const doesLejerAlreadyExist = this.model.boligList.getLejer(bolig.lejlighedsNummer); //bruger samme metode (getLejer) som i serial number search - fordi den her metode vil give null hvis lejeren ikke eksitere
        
        // hvis den er null, så eksitere den ikke og det er ok den bliver tilføjet
        if (doesLejerAlreadyExist === null) {
            this.model.boligList.addLejer(bolig.lejlighedsNummer, bolig.lejer, bolig.indflytningsDato, bolig.indskud, bolig.husleje);
            this.view.snackbar("Lejeren blev gemt");
            this.showAllLejere(); //opdatere lejer/bolig liste
        } else { //hvis det ikke er null eksistere lejeren allerede
            this.view.snackbar("Denne lejer eksistere allerede");
        }
    }

    // delete lejer - vi skal bruge det unikke serial number
    deleteLejer(ln) {
        this.model.boligList.deleteLejer(ln); //kontakter model og en anden deleteLejer som en del af inventory
        this.view.snackbar("Lejeren er slettet!");
    }
}