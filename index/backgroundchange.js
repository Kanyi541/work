//backgroundimage change in after 5 min
const images =[
    'Assets/images/ebook1-cover.png'
];
let currentIndex = 0;
function changeBackground() {
    document.body.style.backgroundImage =images[currentIndex];
    currentIndex =(currentIndex +1)% images.length;

}
setInterval(changeBackground,300000);//300000 milliseconds = 5 min
// initial background image
changeBackground();