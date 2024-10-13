const loadingIndicator = document.getElementById('loading');

function showLoading() {
    loadingIndicator.classList.remove('hidden');
}

function hideLoading() {
    loadingIndicator.classList.add('hidden');
}


async function getDatos(subregion) {

    try {
        showLoading();
        const res = await fetch(`https://restcountries.com/v3.1/subregion/${subregion}`);
        const data = await res.json();
        dibujaCards(data);
    } catch (error) {
        alert('No pude conectarme a la API')
    } finally {
        hideLoading();
    }

}

function dibujaCards(paises) {
    const galeria = document.querySelector('.gallery');
    let htmlPaises = '';
    paises.forEach((pais) => {
        htmlPaises += `
        <div class="card">
            <h2>${pais.name.official}</h2>
            <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : 'No Disponible'}</p>
            <p><strong>Idioma:</strong> ${Object.values(pais.languages || { '': 'No Disponible' }).join(', ')}</p>
            <button onclick="viewMore('${pais.cca3}')">Ver más</button>
        </div>
        `;
    });

    galeria.innerHTML = htmlPaises;
}

function viewMore(countryCode) {
    window.location.href = `detail.html?code=${countryCode}`;
}

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (event) => {
        const region = event.target.textContent;

        let subregion = '';

        switch (region) {
            case 'América del Norte':
                subregion = 'North%20America';
                break;
            case 'América del Sur':
                subregion = 'South%20America';
                break;
            case 'América Central':
                subregion = 'Central%20America';
                break;
        }

        getDatos(subregion);
    });
});

getDatos('South America');