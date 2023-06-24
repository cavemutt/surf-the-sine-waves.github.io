
// Variables
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

animate()

