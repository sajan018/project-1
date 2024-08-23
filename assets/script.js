var loader = document.getElementById("prLoader");
window.addEventListener("load" , function(){
    loader.style.display = "none"
    if (isMobile.any()) {
        message.style.display = 'block';
        setTimeout(() => {
            hideLeftAndRightArrows();
            message.style.display = 'none';
        }, 3000);
    } 
})


const images = document.querySelectorAll('.image-container');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const message = document.querySelector('.message');
const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

let currentIndex = 0;

function showImage(index) {
    images.forEach((imgContainer, i) => {
        imgContainer.classList.remove('active');
        if (i === index) {
            imgContainer.classList.add('active');
            setBackdropColor(imgContainer.querySelector('img'));
        }
    });
    if(!isMobile.any()){
        updateArrowsVisibility();
    }
    
}

function showNextImage() {
    if(currentIndex === images.length - 1) {
        return;
    }
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function showPrevImage() {
    if(currentIndex === 0) {
        return;
    }
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

// Debounced scroll handler
function handleScroll(event) {
    if (event.deltaY > 0) {
        showNextImage();
    } else {
        showPrevImage();
    }
}

function updateArrowsVisibility() {
    leftArrow.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    rightArrow.style.visibility = currentIndex === images.length - 1 ? 'hidden' : 'visible';
}

const debouncedHandleScroll = debounce(handleScroll, 75);

// Initialize the first image as active
window.onload = () => {
    showImage(currentIndex);
}


rightArrow.addEventListener('click', showNextImage);
leftArrow.addEventListener('click', showPrevImage);
window.addEventListener('wheel', debouncedHandleScroll);
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        showPrevImage();
    }
    else if (e.keyCode == '40') {
       showNextImage();
    }
    else if (e.keyCode == '37') {
        showPrevImage();
    }
    else if (e.keyCode == '39') {
        showNextImage();
    }

}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function getDominantColor(imageElement) {
    const colorThief = new ColorThief();
    return colorThief.getColor(imageElement);
}

function setBackdropColor(imageElement) {
    const color = getDominantColor(imageElement);
    document.body.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}



function hideLeftAndRightArrows() {
    leftArrow.style.visibility = 'hidden';
    rightArrow.style.visibility = 'hidden';
}

document.body.addEventListener('touchstart', function (event) {
    if (isMobile.any()) {
        const touch = event.touches[0];
        const screenWidth = window.innerWidth;
        if (touch.clientX < screenWidth / 2) {
            showPrevImage();
        } else {
            showNextImage();
        }
    }
    
});


