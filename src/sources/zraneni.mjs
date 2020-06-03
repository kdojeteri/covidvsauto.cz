import { data } from './data.mjs';
import fetch from 'node-fetch';

let slovnik_kraju = {
    " hl. m. Praha\">V&#218;SC - hl. m. Praha": "praha", 
    " Středočeský": "stredocesky", 
    " Jihočeský": "jihocesky", 
    " Plzeňský": "plzensky", 
    " Karlovarský": "karlovarsky", 
    " Ústecký": "ustecky",
    " Liberecký": "liberecky", 
    " Královéhradecký": "kralovehradecky", 
    " Pardubický": "pardubicky", 
    " Vysočina": "vysocina", 
    " Jihomoravský": "jihomoravsky", 
    " Olomoucký": "olomoucky",
    " Moravskoslezský": "moravskoslezsky", 
    " Zlínský": "zlinsky"
};

export async function aktualizuj() {
    // Stáhni zdrojová data (HTML stránku):
    // https://aplikace.policie.cz/statistiky-dopravnich-nehod/default.aspx

    let response = await fetch('https://aplikace.policie.cz/statistiky-dopravnich-nehod/default.aspx');
    let zraneni = await response.text();
    const regex = /<b>(.*)<\/b>/;
    const vyvoz_dat = zraneni.match(regex);
    console.log(vyvoz_dat[1]);

    data.datum_zraneni = vyvoz_dat[1];

    const regex2 = /VÚSC -(.*?)<.*?Label2">(\d*)<.*?Label3">(\d*)<.*?Label4">(\d*)/gs;
    const vyvoz_dat2 = zraneni.matchAll(regex2);
    const celek = {};
    for (const radek of vyvoz_dat2) {
        console.log([radek[2], radek[3], radek[4]]);
        var integer = parseInt(radek[2]);
        var integer2 = parseInt(radek[3]);
        var integer3 = parseInt(radek[4]);
        var soucet = (integer + integer2 + integer3);
        const jmeno_kraje = radek[1];
        console.log(JSON.stringify(jmeno_kraje));
        const preloz_jmeno = slovnik_kraju[jmeno_kraje];
        celek[preloz_jmeno] = soucet;
    }

    data.zraneni = celek;
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
