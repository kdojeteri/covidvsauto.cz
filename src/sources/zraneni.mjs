import {data} from './data.mjs';
import fetch from 'node-fetch';

export async function aktualizuj() {
    // Stáhni zdrojová data (HTML stránku):
    // https://aplikace.policie.cz/statistiky-dopravnich-nehod/default.aspx

    let response = await fetch('https://aplikace.policie.cz/statistiky-dopravnich-nehod/default.aspx');
    let zraneni = await response.text();
    const regex = /<b>(.*)<\/b>/;
    const vyvoz_dat = zraneni.match(regex);
    console.log(vyvoz_dat[1]);

    data.datum_zraneni = vyvoz_dat[1];

    const regex2 = /VÚSC -(.*)<(.|\n)*?Label2">(\d*)<(.|\n)*?Label3">(\d*)<(.|\n)*?Label4">(\d*)/ ;
    const vyvoz_dat2 = zraneni.matchAll(regex2);
    for (const radek of vyvoz_dat2) {
        console.log(radek);
    }

    


    // Pomocí regexu vytáhni string datumu ze zdrojové věty:
    // "Tabulky obsahují data, která Policejní prezidium ČR mělo k dispozici [[2. června 2020]]"
    // -> "2. června 2020"
    // Nastav data.datum_zraneni na tuhle hodnotu.

    // Pomocí regexu projdi všechny řádky v tabulce tak, abys pro každý kraj získal:
    // -> "VÚSC - hl. m. Praha"       0       0       4
    //    (název kraje)         (úmrtí) (těžké) (lehké) zranění

    // Pro každý kraj: 
    //     Nastav počet zranění v kraji na součet úmrtí, těžkých a lehkých.
    
    // Nastav data.zraneni na slovník počtů zranění podle kraje
}