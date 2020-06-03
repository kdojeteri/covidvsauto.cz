import { data } from "./sources/data.mjs";
import { readFileSync } from 'fs';
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

function makeLegenda() {
    const legenda = [];
    let max_soucet = 1;

    for (const kraj of kraje) {
        const covid = data.covid[kraj.idkey];
        const zraneni = data.zraneni[kraj.idkey];

        legenda.push({
            id: "legend-" + kraj.idkey,
            name: kraj.name,

            covid: covid,

            zraneni: zraneni,
        });

        const soucet = covid + zraneni;

        if (soucet > max_soucet) {
            max_soucet = soucet
        }
    }

    for (const kraj of legenda) {
        kraj.threat_covid = (kraj.covid / max_soucet).toFixed(3) + "em";
        kraj.threat_zraneni = (kraj.zraneni / max_soucet).toFixed(3) + "em";
    }

    return legenda;
}

function makeSvg() {
    const svg = {};
    let max_soucet = 1;
    let min_soucet = Infinity;

    for (const kraj of kraje) {
        const covid = data.covid[kraj.idkey];
        const zraneni = data.zraneni[kraj.idkey];

        const soucet = covid + zraneni;

        if (soucet > max_soucet) {
            max_soucet = soucet
        }

        if (soucet < min_soucet) {
            min_soucet = soucet
        }

        const pomer_covid = covid / soucet;

        svg[kraj.idkey] = {
            covid_size: (pomer_covid * 14.2).toFixed(3),
        }
    }

    for (const kraj of kraje) {
        const covid = data.covid[kraj.idkey];
        const zraneni = data.zraneni[kraj.idkey];

        const soucet = covid + zraneni;

        const patternScale = (
            1 - (
                (soucet - min_soucet)
                /
                Math.max(max_soucet - min_soucet, 1)
            )
        ) * 10 + 5; // in range 5 - 15

        svg[kraj.idkey].scale = patternScale.toFixed(3)
    }

    return svg;
}

export function makeHtml() {
    const legenda = makeLegenda();

    const svg = makeSvg();

    const templateData = {
        covid_datum: data.datum_covid,
        nehody_datum: data.datum_zraneni,

        covid_celkem: Object.values(data.covid).reduce((a, b) => a + b),
        zraneni_celkem: Object.values(data.zraneni).reduce((a, b) => a + b),

        legenda: legenda,

        svg: svg
    };

    console.log(templateData);

    return template(templateData);
}