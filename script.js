
// Main App
const body = document.querySelector('body')
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const sliders = document.querySelectorAll('input[type="range"]')
const menus = document.querySelectorAll('.menu')
const waveSliders = document.querySelector('.wave-sliders')
const colorSliders = document.querySelector('.wave-color-sliders')
const captureBtn = document.querySelector('#capture')
const videoBtn = document.querySelector('#video')
let shaper = 0;
let increment = 0.01;


window.onresize = () => location.reload();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const wave = {
    y: canvas.height / 2,
    length: 0.01,
    amplitude: 150,
    frequency: 0.01
}
const strokeColor = {
    h: 200,
    s: 50,
    l: 50
}
const backgroundColor = {
    r: 0,
    g: 0,
    b: 0,
    a: 0.01
}
const fillStyle = {
    r: 0,
    g: 0,
    b: 0,
    a: 0.1
}


window.addEventListener('load', () => {
    alert("This app uses animated visual patterns that may be uncomfortable or harmful to photosensitive viewers.")
    animate()
    setTimeout(() => {
        startBillyBubbles()
    }, 1000)
})

// take screenshot
captureBtn.addEventListener('click', () => {
    try {
        html2canvas(canvas).then(function(canvas) {
            document.body.appendChild(canvas);
            const url = canvas.toDataURL('image/png')
            const a = document.createElement('a')
            a.setAttribute('download', 'imageName.png')
            a.setAttribute('href', url)
            a.click()
        })
    } catch (err) {
        alert('Error taking screenshot :' + err)
    }
});

// take video 
videoBtn.addEventListener('click', () => {
    startCapture()
})

async function startCapture() {
    let captureStream = null
    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia();
    } catch (err) {
        console.error(`Capture error : ${err}`)
    }
    const data = []
    const mediaRecorder = new MediaRecorder(captureStream)

    mediaRecorder.ondataavailable = (e) => {
        data.push(e.data)
        console.log(e.data)
    }
    mediaRecorder.start()
    setTimeout(() => {
        mediaRecorder.stop()
    }, 10000)
    mediaRecorder.onstop = (e) => {
        const url = URL.createObjectURL(
            new Blob(data)
        )
        const a = document.createElement('a')
        a.setAttribute('download', 'SineWaves.mp4')
        a.setAttribute('href', url)
        a.click()
    }
    console.log(captureStream)
    return captureStream
}

menus.forEach(menu => {
    menu.addEventListener("click", (e) => {
        if('dynamics' in e.target.dataset) {
            waveSliders.classList.add('open')
            colorSliders.classList.remove('open')            
            menus[0].classList.add('open')
            menus[1].classList.remove('open')
        }       
        if('color' in e.target.dataset) {
            colorSliders.classList.add('open')
            waveSliders.classList.remove('open')
            menus[1].classList.add('open')
            menus[0].classList.remove('open')
        }
    })
})

sliders.forEach(slider => {
    slider.addEventListener('input', () => {
        if(slider.name === "length") {
            wave.length = slider.value
        }
        if(slider.name === "amplitude") {
            wave.amplitude = slider.value
        }
        if(slider.name === "frequency") {
            wave.frequency = slider.value
        }
        if(slider.name === "shaper") {
            shaper = slider.value
        }
        if(slider.name === "hue") {
            strokeColor.h = slider.value
        }
        if(slider.name === "saturation") {
            strokeColor.s = slider.value
        }
        if(slider.name === "lightness") {
            strokeColor.l = slider.value
        }
    })
})

const colorizeSliders = (hue, sat, lightness) => {
    sliders.forEach(slider => {
        if(slider.name === "hue") {
            slider.style.backgroundImage = `linear-gradient(to right, hsl(0 ${sat}% ${lightness}%), hsl(127 ${sat}% ${lightness}%), hsl(255 ${sat}% ${lightness}%))`
        }
        if(slider.name === "saturation") {
            slider.style.backgroundImage = `linear-gradient(to right, hsl(${hue} 0% ${lightness}%), hsl(${hue} 50% ${lightness}%), hsl(${hue} 100% ${lightness}%))`
        }
        if(slider.name === "lightness") {
            slider.style.backgroundImage = `linear-gradient(to right, hsl(${hue} ${sat}% 0%), hsl(${hue} ${sat}% 50%), hsl(${hue} ${sat}% 100%))`
        }
    })
}

body.style.backgroundColor = `rgba(${backgroundColor.r} ${backgroundColor.g} ${backgroundColor.b} ${backgroundColor.a})`


// let increment = wave.frequency

const animate = () => {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.03)'
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.moveTo(0, canvas.height / 2);
    for(let i = 0; i < canvas.width; i++) {
        c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(i*shaper + increment));
    }
    let hue = strokeColor.h * Math.abs(Math.sin(increment))
    let sat = strokeColor.s
    let lightness = strokeColor.l
    c.strokeStyle = `hsl(${hue} ${sat}% ${lightness}%)`
    c.stroke();
    increment += parseFloat(wave.frequency)
    colorizeSliders(hue, sat, lightness)
}

// animate()

// Billy Bubbles
const bubbleWrapper = document.querySelector('.bubble-wrapper')
const billyBtn = document.querySelector('#billy-btn')
const billyBtnTooltip = document.querySelector('#billy-btn-tooltip')
const bubbleContainer = document.querySelector('#silly-billy-bubbles')
const billyBubble = document.querySelector('#billy-bubble')
const bubbleContent = document.querySelector('#bubble-content')
const bubbleIndicatorDot = document.querySelector('#bubble-indicator')
const closeBubbleBtn = document.querySelector('#close-bubble')
const nextBubbleBtn = document.querySelector('#continue-bubble')
const bubbleBtns = document.querySelectorAll('.bubble-btn')
let tourCounter = 0

const tourArray = ['#bubble-intro', '#app-title', '#wave-menu', '#bubble-length', '#bubble-amplitude', '#bubble-frequency', '#bubble-shaper', '#color-menu', '#bubble-hue', '#bubble-saturation', '#bubble-lightness', '#capture', '#video', '#bubble-outro' ]

billyBtn.addEventListener('click', () => {
    billyBtn.classList.toggle('start')
    if(billyBtn.classList.contains('start')) {
        tourCounter = 0
        startBillyBubbles()
    } else {
        bubbleContainer.classList.add('close')
        closeIt()
    }
})

billyBtn.addEventListener('mouseover', () => {
    billyBtnTooltip.classList.add('show')
})
billyBtn.addEventListener('mouseout', () => {
    billyBtnTooltip.classList.remove('show')
})

// the close button will end the tour
closeBubbleBtn.addEventListener('click', () => {
    closeBubbleBtn.style.background = "#555"
    bubbleContainer.classList.toggle('close')
    closeIt()
})

// the next button continues the tour to the next stop
nextBubbleBtn.addEventListener('click', () => {
    nextBubbleBtn.style.background = '#555'
    closeBillyBubbles()
    tourCounter += 1
    
    setTimeout(() => {
        if (tourCounter === tourArray.length - 1) {
            bubbleContainer.classList.add('close')
            closeIt()
        } else {
            bubbleTour(tourArray, tourCounter)
        }
    }, 1000)
})

// the bubbleBtns are the close tour and continue tour buttons, this is just to cover for the CSS hover effect that was overridden by the gsap animations
bubbleBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.opacity = '1'
        btn.style.scale = '1.1'
    })
    btn.addEventListener('mouseleave', () => {
        btn.style.opacity = '0.8'
        btn.style.scale = '1'
    })
})


// THE TOUR 

// start the tour at the beginning of the array
function startBillyBubbles() {
    bubbleTour(tourArray, 0)
}

// this separate function controls closing the container to go to the next stop, or closing at the end of the tour, which removes the next/continue button
function closeIt() {
    if(bubbleContainer.classList.contains('close')) {
        closeBillyBubbles()
        setTimeout(() => {
            lastStop()
        }, 500)
    } else {
        closeBillyBubbles()
        bubbleContainer.classList.remove('close')
    }
}

// take in the array and the index of the current element, pass through to the functions to position the bubble, the indicator, and to set styles and content of bubble animation 
function bubbleTour(arr, i) { 
    const element = document.querySelector(arr[i])
    openBillyBubbles(element)
}

// set the descriptive content of the bubble for each tour stop 
function showBubbleContent(el) {
    bubbleContent.innerText = el.dataset.bubble
}

// scroll to the current tour stop
function scrollToBubble(elem) {
    elem.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})

    bubblePosition(elem)
    bubbleIndicator(elem)
// **HIGHLIGHTER** 1 of 3 - if no highlighting is wanted, remove/comment out next line and 2 more things below
    highlighter(elem)
}

// determine the position of the bubble for each tour stop
function bubblePosition(el) {
    const body = document.querySelector('body')
    const bodyHeight = body.offsetHeight
    const elOffsetTop = el.offsetTop 
    const elOffsetHeight = el.offsetHeight
    const elOffsetLeft = el.offsetLeft
    const elBoundingTop = el.getBoundingClientRect.top 
    const elBoundingLeft = el.getBoundingClientRect.left
    const bubbleOffsetHeight = bubbleContainer.offsetHeight

    // Y positioning
    if(el.hasAttribute('data-boundingBubbleY')) {
        let isAtBottom = elBoundingTop + elOffsetHeight >= bodyHeight - elOffsetHeight
        if (
            elBoundingTop + elOffsetHeight + bubbleOffsetHeight >= window.innerHeight 
            ) {
                bubbleContainer.style.top = (elBoundingTop + (elOffsetHeight * 0.3)) + 'px'
            } 
        if ( isAtBottom ) {
                bubbleContainer.style.top = (elBoundingTop - (bubbleOffsetHeight + 50)) + 'px' 
            } else {
                bubbleContainer.style.top = (elBoundingTop + elOffsetHeight + 10) + 'px'
            }
    } else {
        let isAtBottom = elOffsetTop + elOffsetHeight >= bodyHeight - elOffsetHeight
        if (
            elOffsetTop + elOffsetHeight + bubbleOffsetHeight >= window.innerHeight 
            ) {
                bubbleContainer.style.top = (elOffsetTop + (elOffsetHeight * 0.3)) + 'px'
            } 
        if ( isAtBottom ) {
                bubbleContainer.style.top = (elOffsetTop - (bubbleOffsetHeight + 50)) + 'px' 
            } else {
                bubbleContainer.style.top = (elOffsetTop + elOffsetHeight + 50) + 'px'
            }
    }

    // X positioning
    if(el.hasAttribute('data-boundingBubbleX')) {
        elBoundingLeft <= body.offsetLeft ? bubbleContainer.style.left = '20px' : elBoundingLeft + bubbleContainer.offsetWidth + 20 >= body.offsetWidth ? bubbleContainer.style.left = (body.offsetWidth - (bubbleContainer.offsetWidth + 40) - 40) + 'px' : bubbleContainer.style.left = (elBoundingLeft + 20) + 'px'
    } else {
        elOffsetLeft <= body.offsetLeft ? bubbleContainer.style.left = '20px' : elOffsetLeft + bubbleContainer.offsetWidth + 20 >= body.offsetWidth ? bubbleContainer.style.left = (body.offsetWidth - (bubbleContainer.offsetWidth + 20)) + 'px' : bubbleContainer.style.left = (elOffsetLeft + 20) + 'px'
    }

}

// **HIGHLIGHTER** 2 of 3 - if no highlighting is wanted, remove/comment out below function and one more line at the bottom
function highlighter(elem) {
    elem.classList.add('highlight')
}

// set the position of the indicator, which highlights the current stop of the tour
function bubbleIndicator(el) {
    const body = document.querySelector('body')
    const bodyLeft = body.offsetLeft
    const bodyHeight = body.offsetHeight
    const elBoundingTop = el.getBoundingClientRect().top
    const elTop = el.offsetTop
    const elBoundingLeft = el.getBoundingClientRect().left
    const elLeft = el.offsetLeft
    const elHeight = el.offsetHeight
    let isAtBottom = elTop + elHeight >= bodyHeight - elHeight


    // Y position
    if(el.hasAttribute('data-boundingDotY')) {
        isAtBottom ? bubbleIndicatorDot.style.top = (elBoundingTop - 50) + 'px' : bubbleIndicatorDot.style.top = (elBoundingTop + (elHeight * 0.2)) + 'px'   
    } else {
        isAtBottom ? bubbleIndicatorDot.style.top = (elTop - 50) + 'px' : bubbleIndicatorDot.style.top = (elTop + (elHeight * 0.2)) + 'px'   
    }
    
    // X position
    if(el.hasAttribute('data-boundingDotX')) {
        elLeft <= bodyLeft ? bubbleIndicatorDot.style.left = (elBoundingLeft + 40) + 'px' : bubbleIndicatorDot.style.left = (elBoundingLeft - 60) + 'px'
    } else {
        elLeft <= bodyLeft ? bubbleIndicatorDot.style.left = (elLeft + 40) + 'px' : bubbleIndicatorDot.style.left = (elLeft - 60) + 'px'
    }
    
    // call a small random rotation on the indicator, for fun
    randomRotation(bubbleIndicatorDot) 
}

// a little fun rotation for Silly Billy and the indicator
function randomRotation(elem) {
    let random = Math.floor(Math.random() * 21) - 10
    return elem.style.rotate = `${random}deg`
}

// set up the last stop on the tour to show the outro and end the tour
function lastStop() {
    tourCounter = tourArray.length - 1
    bubbleTour(tourArray, tourArray.length - 1)
    billyBtn.classList.remove('start')
}

// ANIMATIONS 
function openBillyBubbles(element) {
    const tl = new gsap.timeline({defaults: {duration: 0.75, ease: 'elastic.out(0.8, 0.5)' }})
    const waveMenu = document.querySelector('#wave-menu')
    const colorMenu = document.querySelector('#color-menu')

    
    if(tourCounter === tourArray.length - 1) {
        tl.set(nextBubbleBtn, {visibility: 'hidden'})
    } else {
        tl.set(nextBubbleBtn, {visibility: 'visible'})
    }

    if(tourCounter === 3) {
        waveMenu.classList.add('open')
        waveSliders.classList.add('open')
    }
    
    if(tourCounter === 7) {
        waveMenu.classList.remove('open')
        waveSliders.classList.remove('open')
        colorMenu.classList.add('open')
        colorSliders.classList.add('open')  
    } 
    
    if(tourCounter === 11) {
        colorMenu.classList.remove('open')
        colorSliders.classList.remove('open')  
    } 



    tl
    .set(nextBubbleBtn, { background: 'var(--bubble-btn-color)'})
    .set(closeBubbleBtn, {background: 'var(--bubble-btn-color)'})
    .set(window, {onStart: scrollToBubble(element)})
    .to(billyBubble, { onStart: randomRotation(billyBubble), scale: 1}, '-=.3')
    .to(bubbleContent, {duration: 1, scale: 1, width:"clamp(10em, 24vw, 18em)", onComplete: showBubbleContent(element)}, '-=0.5')
    .fromTo(bubbleIndicatorDot, {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '-=.5')
    .to(closeBubbleBtn, {opacity: 0.8, scale: 1}, '-=.2')
    .to(nextBubbleBtn, {opacity: 0.8, scale: 1}, '-=.6')
}

function topAtEnd() {
    if(tourCounter === tourArray.length - 1) {
        window.scrollTo(0, 0)
    }
}


function closeBillyBubbles() {
    const currentElem = document.querySelector(tourArray[tourCounter])
    const tl = new gsap.timeline({defaults: {duration: .3, ease: 'power2.out' }})
    tl
    .to(nextBubbleBtn, {opacity: 0, scale: 0})
    .to(bubbleContent, { scale: 0}, '<.05')
    .to(bubbleIndicatorDot, {opacity: 0}, '<.05')
    .to(closeBubbleBtn, {opacity: 0, scale: 0}, '<.05')
    .to(billyBubble, {scale: 0, onComplete: topAtEnd}, '<.05')
    .to(currentElem, {onComplete: ()=>currentElem.classList.remove('highlight')}, '-=.3')
}


