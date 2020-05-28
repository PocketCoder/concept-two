var rellax = new Rellax('.rellax');
var rellaxC = new Rellax('.rellax-c', {
    center: true
});

//TODO: https://medium.com/@aswin_s/fullscreen-video-backgrounds-e8376ef93c72 -- read through and complete before deployment
const v = document.getElementById('video-bg');
const hv = document.querySelector('.work--video-bg');
hv.preload = "auto";

v.addEventListener('canplay', () => {
    setTimeout(() => {
        v.play();
    });
});