// model holder (adgangen til) dataen

import Inventory from "../utils/inventoryClass.js"

export default class Model {
    constructor() {
        this.boligList = new Inventory;
        //adder guitarer
        this.boligList.addLejer("1a", "Peter Gade", "02.12.21", 9000, 3000);
        this.boligList.addLejer("1b", "Ole Madsen", "18.02.20", 9000, 3000);
        this.boligList.addLejer("2a", "Lærke Pedersen", "22.09.21", 12000, 4000);
        this.boligList.addLejer("2b", "Kristoffer Jensen", "14.07.22", 12000, 4000);
        this.boligList.addLejer("3a", "Søren Hansen", "19.05.18", 13000, 4333);
        this.boligList.addLejer("3b", "Josefine Møller", "20.06.19", 13000, 4333);
        this.boligList.addLejer("4a", "Mathias Sørensen", "07.01.22", 13000, 4333);
        this.boligList.addLejer("4b", "Vanessa Christiansen", "17.03.20", 15000, 5000);
        this.boligList.addLejer("5a", "Karl Munk", "19.06.15", 18000, 6000);
    }
}

/*
LejlighedsNummer
lejer
indflytningsDato
indskud
husleje
 */