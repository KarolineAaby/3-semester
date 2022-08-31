// view er det brugeren ser - her når der bruges submit
import Bolig from "../utils/boligClass.js";

export default class View {
    constructor(controller) {
        const self = this;
        const lnSearchForm = document.getElementById("lnSearchForm"); //læser field fra HTML
        const lnField = document.getElementById("lnField"); //læser field fra HTML
        const panelText = document.getElementById("panelText"); // læser igen fra HTML - det er ikke nødvendigt at hente dem, men kan give et overblik over det man henter og bruger
        const closeCross = document.getElementById("closeCross");
        const searchForm = document.getElementById("searchForm"); // finde ud af om brugeren submitter form 
        // skal bruge informationen brugeren skriver i formfield - til at lave panellet
        const indflytningsdato = document.getElementById("indflytningsDato"); 
        const indskud = document.getElementById("indskud"); 
        const husleje = document.getElementById("husleje"); 
        const lejer = document.getElementById("lejer"); 
        const showAllLejereButton = document.getElementById("showAllLejereButton");
        //Dialog eventhandler
        const lejerDialogForm = document.getElementById("lejerDialogForm");
        const addLejerButton = document.getElementById("addLejerButton");
        const lejerDialog = document.getElementById("lejerDialog");
        const cancelButton = document.getElementById("cancelButton");
        //delete buttons
        const searchResult = document.getElementById("searchResult");
        const hiddenLnField = document.getElementById("hiddenLnField");
        const confirmDialog = document.getElementById("confirmDialog");
        const confirmDialogForm = document.getElementById("confirmDialogForm");
        const cancelConfirmBtn = document.getElementById("cancelConfirmBtn");

        self.controller = controller;

        // show all lejere button - registrere at brugeren trykker knappen
        showAllLejereButton.onclick = function() {
            self.controller.showAllLejere();
        }

        //event handler for the submit - hvis formen bliver submitted
        lnSearchForm.onsubmit = function (e) {
            e.preventDefault(); //Forhindre reload - hvis der ikke er prevent default, så vil submit knappen reload siden istedet
            self.controller.lnSearch(lnField.value); // passing den value som er skrevet af brugeren til controlleren, som så tager over og aktivere og søger dataen
        }

        // search panel - lytter om brugeren submitter 
        searchForm.onsubmit = function (e) {
            e.preventDefault();
            // object der holder information som brugeren skriver i searchform - fordi det skal matche kriterierne på guitarlisten
            const optimalBolig = new Bolig("", lejer.value, indflytningsdato.value, indskud.value, husleje.value);
            self.controller.search(optimalBolig); // sender til controllor
            searchPanel.classList.remove("searchPanelAnim");  // luk panellet når brugeren har submittet
        }

        //panel search - når brugeren klikker på search panellet (paneltext 30px width), så tilføjes ændres bredden via searchPanelAnim
        panelText.onclick = function () {
            searchPanel.classList.add("searchPanelAnim");
        }
        // luk panellet igen
        closeCross.onclick = function () {
            searchPanel.classList.remove("searchPanelAnim");
        }

        // Dialog eventhandler
        addLejerButton.onclick = function () {
            lejerDialogForm.reset(); //ønsker dialogformen uden indhold (ingenting typed in)
            lejerDialog.showModal(); //viser dialog ovenpå alting (med add guitar btn) - og når det visses skal brugeren trykke cancel eller save for at få dialogen til at forsvinde
        }

        // Dialog eventhandler - cancel button
        cancelButton.onclick = function () {
            lejerDialog.close(); //lukker dialog
        }

        // Dialog eventhandler - save button (form bliver submitted)
        lejerDialogForm.onsubmit = function () {
            // Sender som et objekt (som indeholder alt info fra the form) til metode i controller (Kontakt controller - lave en metode i controller til at håndtere dialog og når man laver en ny guitar)
            self.controller.newLejer({
                lejlighedsNummer: document.getElementById("lnfield").value,
                lejer: document.getElementById("lejerfield").value,
                indflytningsDato: document.getElementById("indflytningsdatofield").value,
                indskud: parseFloat(document.getElementById("indskudfield").value),
                husleje: parseFloat(document.getElementById("huslejefield").value)
            })
        }

        //delete btns
        searchResult.onclick = function (e) {
            //hvis brugeren klikker på btn indenfor forældre-arealet (dvs. searchResult) = (nedenunder) så knappens id  (som er serial number for guitaren) blive læst og derefter store det i hiddenSnfield
            if (e.target.nodeName === "BUTTON") { 
                hiddenLnField.value = e.target.id;
                confirmDialog.showModal(); //brugeren skal confirm, hvis de ønsker at slette det
            }
        }

        //cancel btn - brugeren vil ikke slette og dialog lukker
        cancelConfirmBtn.onclick = function () {
            confirmDialog.close();
        }

        // confirm btn - brugeren vil slette
        confirmDialogForm.onsubmit = function () {
            self.controller.deleteLejer(hiddenLnField.value); //kontakt controller og fortæller at den skal slette den guitar med hiddenSnField value (da vi i linje 92 stored id for btn i hiddenfield)
            self.controller.showAllLejere(); //opdatere guitar list
        }
    }

    //Viser resultatet til brugeren (efter controlleren har fundet det) 
    message(template) {
        const element = document.getElementById("searchResult");
        element.innerHTML=""; //resets result output element
        element.insertAdjacentHTML("beforeend", template);

        //istedet for sidste to linjer:
        //  element.innerHTML=template;
    }

    // snackbar/toast message
    snackbar(snackmessage) {
        const snackbar = document.getElementById("snackbar"); //skal være her (ligesom den ovenover) fordi det er metoder af objekterne og ikke linker til controller
        snackbar.innerHTML = snackmessage;
        snackbar.className = "show";
        setTimeout(function () {
            snackbar.className=snackbar.className.replace("show", "");
        },3000);
    }
}