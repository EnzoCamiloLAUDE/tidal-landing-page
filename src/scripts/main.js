const cardsData = [
    {
        title:"Estrenos en Exclusiva",
        description:"TIDAL ha estrenado en exclusiva los mejores álbumes de los dos últimos años y siempre con la mejor calidad de sonido.",
        imageUrl:"./assets/images/cards/card-1.png"
    },
    {
        title:"El mejor contenido audiovisual",
        description:"Más de 200 mil videos musicales en alta definición, streaming de conciertos  en directo y series originales.",
        imageUrl:"./assets/images/cards/card-2.png"
    },
    {
        title:"Mucho más que música",
        description:"Recomendaciones de conciertos según tus gustos y localización geográfica. Gana entradas para tus conciertos preferidos.",
        imageUrl:"./assets/images/cards/card-3.png"
    },
]

function renderCards() {
    const container = document.querySelector('.cards-area');
    console.log(container);
    container.innerHTML = '';
    cardsData.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <img src="${card.imageUrl}" alt="${card.title}" class="card-image">
            <div class="card-info color-white font-vodafone-rg">
                <span class="card-title font-bold">${card.title}</span>
                <span class="card-description">${card.description}</span>
            </div>
        `;
        container.appendChild(cardElement);
    });
}
document.addEventListener('DOMContentLoaded', renderCards);