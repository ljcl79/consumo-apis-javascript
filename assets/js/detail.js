function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const codigo = getQueryParam('code');


async function getDatos(codigo) {

    try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${codigo}`);
        const pais = await res.json();

        if (pais.length > 0) {
            const data = pais[0];
            console.log(data);
            document.getElementById('country-name').textContent = data.name.common;
            document.getElementById('country-capital').textContent = data.capital;
            document.getElementById('country-population').textContent = data.population;
            document.getElementById('country-language').textContent = Object.values(data.languages || { '': 'No Disponible' }).join(', ');
            document.getElementById('country-currency').textContent = data.currencies ? Object.values(data.currencies)[0].name : 'No Disponible';

            document.getElementById('country-flag').src = data.flags.svg;
            document.getElementById('country-coat').src = data.coatOfArms.svg;

            const latlng = data.latlng;
            const mapURL = `https://www.openstreetmap.org/export/embed.html?bbox=${latlng[1] - 10},${latlng[0] - 10},${latlng[1] + 10},${latlng[0] + 10}&layer=mapnik`;



            document.getElementById('country-map').src = mapURL;
        }


    } catch (error) {
        console.error("Error al obtener los detalles del país:", error);

    }

}

getDatos(codigo);