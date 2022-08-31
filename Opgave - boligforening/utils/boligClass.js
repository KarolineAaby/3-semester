// export så det kan importes i inventoryClass.js
export default class Bolig {
    //properties
    constructor(lejlighedsNummer,lejer,indflytningsDato,indskud,husleje) {
        this.lejlighedsNummer = lejlighedsNummer;
        this.lejer = lejer;
        this.indflytningsDato = indflytningsDato;
        this.indskud = indskud;
        this.husleje = husleje;
    }

    //methods
    getLejlighedsNummer() {
        return this.lejlighedsNummer;
    }

    getLejer() {
        return this.lejer
    }

    getIndflytningsDato() {
        return this.indflytningsDato;
    }

    getIndskud() {
        return this.indskud;
    }

    getHusleje() {
        return this.husleje;
    }
}