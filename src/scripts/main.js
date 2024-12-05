const cardsData = [
    {
        title:"Estrenos en Exclusiva",
        description:"TIDAL ha estrenado en exclusiva los mejores álbumes de los dos últimos años y siempre con la mejor calidad de sonido.",
        imageUrl:"./assets/images/cards/card-1.webp",
        altText: "Hombre posando en un campo, con una camisa de colores y pulseras de colores, descansando con la cabeza apoyada en la mano."
    },
    {
        title:"El mejor contenido audiovisual",
        description:"Más de 200 mil videos musicales en alta definición, streaming de conciertos  en directo y series originales.",
        imageUrl:"./assets/images/cards/card-2.webp",
        altText: "Vista previa de un video con un hombre mirando hacia atrás, con el icono de reproducción en el centro."
    },
    {
        title:"Mucho más que música",
        description:"Recomendaciones de conciertos según tus gustos y localización geográfica. Gana entradas para tus conciertos preferidos.",
        imageUrl:"./assets/images/cards/card-3.webp",
        altText: "Personas levantando las manos en un concierto o evento, con teléfonos móviles en sus manos."
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
            <img src="${card.imageUrl}" title="${card.title}" alt="${card.altText}" class="card-image">
            <div class="card-info color-white font-vodafone-rg">
                <span class="card-title font-bold font-sm">${card.title}</span>
                <span class="card-description font-xs">${card.description}</span>
            </div>
        `;
        container.appendChild(cardElement);
    });
}
function carrouselCardsSwitch() {
    const windowWidth = window.innerWidth;
    if (windowWidth !== previousWidth) {
        previousWidth = windowWidth
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(()=>{
            const resizeWindowWidth = window.innerWidth;
            if (resizeWindowWidth > 768) {
                if (document.querySelector('.carrousel')) removeCarrousel()
                renderCards()
            } else if (resizeWindowWidth <= 768) {
                if (document.querySelectorAll('.card')) removeCards()
                renderCarrousel()
            }
        },200)
    }
}
function renderCarrousel() {
    carrouselCardIndex = 0;
    const container = document.querySelector('.cards-carrousel-area');
    container.innerHTML = '';
    const currentCard = cardsData[carrouselCardIndex];
    const carrouselSlider = document.createElement('div')
    carrouselSlider.classList.add('carrousel-slider');
    container.appendChild(carrouselSlider)
    cardsData.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <img src="${card.imageUrl}" alt="${card.title}" class="card-image">
            <div class="card-info color-white font-vodafone-rg">
                <span class="card-title font-bold font-sm">${card.title}</span>
                <span class="card-description font-xs">${card.description}</span>
            </div>
        `;
        carrouselSlider.appendChild(cardElement);
    });
    const carrouselCardElement = document.createElement('div');
    const carrouselButtons = document.createElement('div');
    carrouselButtons.classList.add('carrousel-buttons');
    carrouselButtons.innerHTML = `
        <div class="button-container">
        <button class="carrousel-button selected" aria-label="Ir a la imagen 1" id="carrousel-button-0"></button>
        <button class="carrousel-button" aria-label="Ir a la imagen 2" id="carrousel-button-1"></button>
        <button class="carrousel-button" aria-label="Ir a la imagen 3" id="carrousel-button-2"></button>
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
            buttons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            newCardIndex = parseInt(button.id.split('-')[2]);
            if (newCardIndex !== carrouselCardIndex) {
                carrouselCardIndex = newCardIndex
                carrouselSlideEffect(carrouselCardIndex);
            }
        });
    });
    const sliderArea = document.querySelector('.carrousel-slider');
    let startX = 0;
    let endX = 0;
    sliderArea.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });
      sliderArea.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSlideTouch(startX, endX);
      });
    
    carrouselButtonListeners = true;
}
function carrouselSlideEffect(cardIndex){
    const cards = document.querySelectorAll('.card');
    let offset
    let offsetValues
    const innerWidth = window.innerWidth;
    if (innerWidth <= 320) {
        offsetValues = [85, 2, -82];
      } else if (innerWidth <= 768) {
        offsetValues = [50, 0, -50];
    }
    offset = offsetValues[cardIndex]
    cards.forEach((card) => {
        card.style.transform = `translateX(${offset}vw)`;
        card.style.transition = 'transform 0.5s ease-in-out';
    });
}
function handleSlideTouch(start, end) {
    const diff = end - start;
    const totalCards = cardsData.length
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            if (carrouselCardIndex > 0) {
                carrouselCardIndex-=1
                carrouselSlideEffect(carrouselCardIndex);
            }
        } else {
            if (carrouselCardIndex < totalCards-1) {
                carrouselCardIndex+=1
                carrouselSlideEffect(carrouselCardIndex);
            }
        }
        const buttons = document.querySelectorAll('.carrousel-button');
        buttons.forEach(btn => btn.classList.remove('selected'));
        const selectedButton = document.getElementById(`carrousel-button-${carrouselCardIndex}`); 
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }
    }
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
    const carrouselSlider = document.querySelector('.carrousel-slider');
    carrouselSlider.remove();

}
document.addEventListener('DOMContentLoaded', renderContent);
window.addEventListener('resize', carrouselCardsSwitch);