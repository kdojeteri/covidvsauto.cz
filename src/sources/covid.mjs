import {data} from './data.mjs';
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
  
  

   data.datum_covid = covid_json.modified;

   var kraje = {
   /* CZ010 : "Hlavní město Praha"
    CZ031 :	"Jihočeský kraj"
    CZ064 :	"Jihomoravský kraj"
    CZ06 : "Jihovýchod"
    CZ03 :	"Jihozápad"
    CZ041 :	"Karlovarský kraj"
    CZ052 :	"Královéhradecký kraj"
    CZ051 :	"Liberecký kraj"
    CZ08 :	"Moravskoslezsko"
    CZ080 :	"Moravskoslezský kraj"
    CZ071 : "Olomoucký kraj"
    CZ053 : "Pardubický kraj"
    CZ032 : "Plzeňský kraj"
    CZ01 : "Praha"*/
CZ010 :0,
CZ031 :0,
CZ064 :0,
CZ041 :0,
CZ052 :0,
CZ051 :0,
CZ080 :0,
CZ071 :0,
CZ053 :0,
CZ032 :0,
CZ020 :0,
CZ042 :0,
CZ063 :0,
CZ072 :0,

   }
for kraje() {
    if 
}
    
   
  /* let vcerejsi_datum = covid_json.data.datum.;
    var dateFns = require("date-fns")
    var result = dataFns.set(
        new Date(), {
    
    */
   const b = new Date();
   const bsub = dateFns.subDays(b, 1);
   var result = dateFns.format(bsub, 'yyyy-MM-dd');


    
};
