import { data } from "./sources/data.mjs";
import {readFileSync} from 'fs';
import Handlebars from 'handlebars';

const indexHtml = readFileSync("browser/index.html");

const template = Handlebars.compile(indexHtml.toString());

const kraje = [
    {
        idkey: "praha",
        name: "Hl. město Praha",
    },
    {
        idkey: "stredocesky",
        name: "Středočeský",
    },
    {
        idkey: "jihocesky",
        name: "Jihočeský",
    },
    {
        idkey: "plzensky",
        name: "Plzeňský",
    },
    {
        idkey: "karlovarsky",
        name: "Karlovarský",
    },
    {
        idkey: "ustecky",
        name: "Ústecký",
    },
    {
        idkey: "liberecky",
        name: "Liberecký",
    },
    {
        idkey: "kralovehradecky",
        name: "Královéhradecký",
    },
    {
        idkey: "pardubicky",
        name: "Pardubický",
    },
    {
        idkey: "vysocina",
        name: "Vysočina",
    },
    {
        idkey: "jihomoravsky",
        name: "Jihomoravský",
    },
    {
        idkey: "olomoucky",
        name: "Olomoucký",
    },
    {
        idkey: "moravskoslezsky",
        name: "Moravskoslezský",
    },
    {
        idkey: "zlinsky",
        name: "Zlínský",
    }
]

export function makeHtml() {
    const templateData = {
        covid_datum: "2020-06-12",
        nehody_datum: "2020-06-12",
        
    };

    return template(templateData);
}