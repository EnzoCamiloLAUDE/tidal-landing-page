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
let debounceTimeout;
let previousWidth = window.innerWidth;
let carrouselCardIndex = 0;
let carrouselButtonListeners = false;
function renderContent() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 768) {
        renderCards()
    } else if (windowWidth <= 768) {
        renderCarrousel()
    }
}
function renderCards() {
    const container = document.querySelector('.cards-carrousel-area');
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

function renderCarrousel() {
    console.log('render carrousel');
    const container = document.querySelector('.cards-carrousel-area');
    container.innerHTML = '';
    const currentCard = cardsData[carrouselCardIndex];
       const carrouselCardElement = document.createElement('div');
       const carrouselButtons = document.createElement('div');
       carrouselCardElement.classList.add('carrousel-card');
       carrouselCardElement.innerHTML = `
            <img src="${currentCard.imageUrl}" alt="${currentCard.title}" class="card-image">
            <div class="card-info color-white font-vodafone-rg">
                <span class="card-title font-bold">${currentCard.title}</span>
                <span class="card-description">${currentCard.description}</span>
            </div>
    `;
    carrouselButtons.classList.add('carrousel-buttons');
    carrouselButtons.innerHTML = `
        <div class="button-container">
        <button class="carrousel-button" id="carrousel-button-0"></button>
        <button class="carrousel-button" id="carrousel-button-1"></button>
        <button class="carrousel-button" id="carrousel-button-2"></button>
        </div>
    `
    container.appendChild(carrouselCardElement);
    container.appendChild(carrouselButtons);
    if (!carrouselButtonListeners) {
        addCarrouselButtonsListener()
    }

}
function addCarrouselButtonsListener() {
    const buttons = document.querySelectorAll('.carrousel-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('test listener button');
            buttons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            carrouselCardIndex = parseInt(button.id.split('-')[2]);
        });
    });
    carrouselButtonListeners = true;
}
function removeCards() {
    carrouselButtonListeners = false;
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(cardElement => {
        cardElement.remove();
    });
}
function removeCarrousel() {
    carrouselButtonListeners = false;
    console.log('to do remove carrousel');
}

function carrouselCardsSwitch() {
    const windowWidth = window.innerWidth;
    console.log(windowWidth);
    if (windowWidth !== previousWidth) {
        previousWidth = windowWidth
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(()=>{
            const resizeWindowWidth = window.innerWidth;
            if (resizeWindowWidth > 768) {
                console.log('no carrousel');
                if (document.querySelector('.carrousel')) removeCarrousel()
                renderCards()
            } else if (resizeWindowWidth <= 768) {
                console.log('carrousel');
                if (document.querySelectorAll('.card')) removeCards()
                renderCarrousel()
            }
        },200)
    }
}

document.addEventListener('DOMContentLoaded', renderContent);
window.addEventListener('resize', carrouselCardsSwitch);