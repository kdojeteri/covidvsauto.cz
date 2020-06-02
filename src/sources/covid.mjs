import {data} from './data.mjs';
import fetch from 'node-fetch';

export async function aktualizuj() {
    // Stáhni zdrojová data:
    // https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/osoby.json

    // Nastav data.datum_covid na hodnotu modified z kořene staženého JSONu

    // Zjisti string včerejšího datumu ve formátu "2020-06-01"

    // Projdi všechny záznamy o nakažených lidech:
    
    //     Pro každého nakaženého včera zvyš počet nakažených v daném kraji o jedna

    // Nastav data.covid na slovník počtů nakažených podle kraje
}