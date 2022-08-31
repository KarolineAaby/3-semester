//Object raleation diagram - type: composition
//der skal være én inventory for at bolig kan eksitere - der kan være 0..* bolig

import Bolig from "./boligClass.js" //importere boligClass.js

export default class Inventory { //exportere så model kan hente inventoryClass.js
    //properties 
    constructor() {
        this.boliger = []; //array
    }

    //methods 

    // dvs. det fødder og adder Lejer til listen
    addLejer(lejlighedsNummer,lejer,indflytningsDato,indskud,husleje) {
       // adder et nyt bolig object, ved brug af bolig objectet
        const newLejer = new Bolig(lejlighedsNummer,lejer,indflytningsDato,indskud,husleje);
        
        // derefter adder jeg boligen til array/listen
        this.boliger.push(newLejer);
    }
    
    //metode er gør det muligt at finde en lejer i listen ved brug af dens serialnumber
    getLejer(lejlighedsNummer) {
        //forloop
        for (const bolig of this.boliger) {
            if (lejlighedsNummer == bolig.lejlighedsNummer) { //hvis serialnumber provited by the method er ligemed serialnumber på listen
                return bolig; //return den boligen som resultat
            }
        }

        //hvis serialnumberet ikke er på listen
        //The value null represents the intentional absence og an object value
        return null;
    }

    //søgefunktion - kan finde én bolig der passer til de specefikke kriterier
    search(idealBolig) {
        //destructuring - subtrakt de forskellige properies for den idelle bolig og laver unik values for hver properies
        const {lejlighedsNummer,lejer,indflytningsDato,indskud,husleje} = idealBolig;

        for (const bolig of this.boliger) {
            if (bolig.lejer === lejer && bolig.indflytningsDato === indflytningsDato && bolig.indskud <= indskud && bolig.husleje <= husleje) {
                return bolig;
            } // hvis prisen er laver en hvad brugeren søger vil den komme som resultat osv.
        }
        return null;
    }

    // show all boliger button
    allLejere() {
        return this.boliger;
    }

    //deleteBolig - det her som faktisk fjerner boligen
    deleteLejer(ln) {
        //hvor på boliglisten med det specifikke serialnumber den skal slettes. Så index bliver et nummer (arrays starts with 0) 
        //- og går gennem listen af bolige og kigger efter det spcifikke serial number, og når det er fundet retunere det positionen i array (f.eks. er er positionen 3 bliver index 3)
        const index=this.boliger.map(bolig => bolig.lejlighedsNummer).indexOf(ln); 
        //fjerner 1 item på listen, på positionen index
        this.boliger.splice(index, 1); //actual delete - removes bolig from bolig object list 
    }
}