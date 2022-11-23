const mypost = document.querySelector('#mypost');
const like = document.querySelector('#like');
const scrab = document.querySelector('#scrab');
const cmypost = document.querySelector('.mypost');
const tab_underline = document.querySelector('.tab_underline');
const info = document.querySelector('#info')
const modify = document.querySelector('#modify')
const urname = document.querySelector('#urname')
const urintroduce = document.querySelector('#urintroduce')

let selected = mypost

mypost.addEventListener('click', function() {
    let selected = mypost
    if (mypost === selected) {
        mypost.classList.add('active');
        like.classList.remove('active');
        scrab.classList.remove('active');
    }
    tab_underline.style.left = '0';
}) 

like.addEventListener('click', function() {
    let selected = like
    if (like === selected) {
        mypost.classList.remove('active');
        like.classList.add('active');
        scrab.classList.remove('active');
    }
    tab_underline.style.left = '33.3%';
}) 

scrab.addEventListener('click', function() {
    let selected = scrab
    if (scrab === selected) {
        mypost.classList.remove('active');
        like.classList.remove('active');
        scrab.classList.add('active');
    }
    tab_underline.style.left = '66.6%';
})