# Surf The Sine Waves

Change the waves to make a beautiful generative art piece of your own!
(Hand-coded with love by Jennifer Lee Dev)

![Surf The Sine Waves in action](/assets/sine-waves1.jpg)

## This project uses : 
HTML5, CSS3, JavaScript, HTML Canvas, and GSAP (for the Silly Billy Bubbles Tour)
**Note:** This project uses animated visual patterns that may be uncomfortable or potentially harmful for photosensitive users.

## Features summary :
- This app begins with an ALERT warning that the lights used in this app may not be suitable for photosensitive users.
- A Wave Dynamics dropdown tab allows users to change several parameters of the waves, including length, amplitude, speed and the shape.
- A Wave Color dropdown tab allows user to change the base hue, the saturation, and the lightness of the waves.
- A Screenshot button allows users to take a screenshot of the current state of the waves and save it to your computer.
- A Video button allows user to take a 10 second video of the waves in action and download it. (The browser first requires permission from the user)
- The color controls in the Wave Color tab mirror the color of the waves as you change them.
- A brief tour of the app, along with some explanation of the controls, is provided by The Silly Billy Bubbles Tour, which you can close and restart at any time.

## Why I Built This :
I wanted to learn more about HTML Canvas before I dove into learning three.js, since three.js is a combination of HTML Canvas and WebGL and I learn better having broader knowledge of a subject. I found a tutorial on HTML Canvas using the Math sine function to create sine waves, thought it was cool, and expanded upon that to build this app. 

## Features that I added/expanded on beyond the tutorial : 
The tutorial gave the basics of setting up the animation loop which drew lines on the canvas according to the sin function, and also used the sine function to add some shifting to the color. But while the tutorial used an external library for a few basic sliders to change the height, width and color of the waves, I created my own sliders. I added the amplitude and shaper control abilities and separated the color controls into Hue, Saturation and Lightness. To the color-oriented controls, I added the color-changing background effects. I also added added reloading on window resize capability, as well as the screenshot and video buttons and functionalities, and the opening photosensitive alert to be more accessible-friendly.

## Silly Billy's Bubble Tour
I've also installed my very own **Silly Billy Bubbles Tour guide** to give some bts of the project for those interested. (see the silly-billy-bubbles-tour repo!).

### What I've learned and future development : 
This was great practice with HTML Canvas animation and using JavaScript to allow users to control the app. I really enjoyed being able to feel confident with inputs and outputs in this app. This project allowed me to use some skills that are not so common, such as allowing the user to take screenshots and videos. I also learned more about HTML Canvas and how to use the Math.sin() function to create cool looking animations, though I definitely need to brush up on my math skills! 

This app is best enjoyed on a desktop, and is ok on smaller screen sizes, but just 'ok', it could be improved. It also needs improvement as far as accessibility. I am very sure some ARIA properties would benefit the screen-reading of this app, as well as the Silly Billy Bubbles Tour. I will come back to my projects to upgrade their accessibility. I might possibly add a few more features to this app, such as more control over the video taking and controls to add more than one wave...? 

If you see any errors or have any comments or suggestions, please let me know! Feel free to email me at jennifer_lee_dev@protonmail.com


Thanks for looking, and please enjoy!

![Surf The Sine Waves in action](/assets/sine-waves2.jpg)


