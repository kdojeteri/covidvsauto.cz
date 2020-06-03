import { data } from './data.mjs';
import fetch from 'node-fetch';
import dateFns from 'date-fns';



export async function aktualizuj() {

    // Stáhni zdrojová data:
    // https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/osoby.json

    // Nastav data.datum_covid na hodnotu modified z kořene staženého JSONu

    // Zjisti string včerejšího datumu ve formátu "2020-06-01"

    // Projdi všechny záznamy o nakažených lidech:

    //     Pro každého nakaženého včera zvyš počet nakažených v daném kraji o jedna

    // Nastav data.covid na slovník počtů nakažených podle kraje   

    let response = await fetch(`https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/osoby.json`);
    let covid_json = await response.json()

    const b = new Date();
    const bsub = dateFns.subDays(b, 1);
    var vcera = dateFns.format(bsub, 'yyyy-MM-dd');
    const datum = dateFns.format(new Date (covid_json.modified), 'dd. MM. yyyy');

    data.datum_covid = datum;
    

    let kody_kraju = ["CZ010", "CZ031", "CZ064", "CZ041", "CZ052", "CZ051", "CZ080", "CZ071", "CZ053", "CZ032", "CZ020", "CZ042", "CZ063", "CZ072"];

    var kraje = {
        CZ010: 0,
        CZ031: 0,
        CZ064: 0,
        CZ041: 0,
        CZ052: 0,
        CZ051: 0,
        CZ080: 0,
        CZ071: 0,
        CZ053: 0,
        CZ032: 0,
        CZ020: 0,
        CZ042: 0,
        CZ063: 0,
        CZ072: 0
    }

    const slovnik_kraju = {
        CZ072: "zlinsky",
        CZ032: "plzensky",
        CZ031: "jihocesky",
        CZ064: "jihomoravsky",
        CZ041: "karlovarsky",
        CZ052: "kralovehradecky",
        CZ051: "liberecky",
        CZ080: "moravskoslezsky",
        CZ071: "olomoucky",
        CZ053: "pardubicky",
        CZ063: "vysocina",
        CZ020: "stredocesky",
        CZ042: "ustecky",
        CZ010: "praha",

    }



    for (let person of covid_json.data) {
        if (person.datum === vcera) {

            kraje[person.kraj_nuts_kod] += 1;

        }
    }
    
    
    const nakazeni = {};

    for (let kod of kody_kraju) {
        let nazev = slovnik_kraju[kod];
        nakazeni[nazev] = kraje[kod];
    }
    data.covid = nakazeni;
};
