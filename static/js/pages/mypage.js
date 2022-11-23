function uploadedPost() {
    const mypost = document.querySelector('#mypost');
    const like = document.querySelector('#like');
    const scrab = document.querySelector('#scrab');
    const tab_underline = document.querySelector('.tab_underline');
    let selected = mypost

    if (mypost === selected) {
        mypost.classList.add('active');
        like.classList.remove('active');
        scrab.classList.remove('active');
        tab_underline.style.left = '0';
    }
}

function likePost() {
    const mypost = document.querySelector('#mypost');
    const like = document.querySelector('#like');
    const scrab = document.querySelector('#scrab');
    const tab_underline = document.querySelector('.tab_underline');
    
    let selected = like
    console.log(selected)
    if (like === selected) {
        mypost.classList.remove('active');
        like.classList.add('active');
        scrab.classList.remove('active');
        tab_underline.style.left = '33.3%';
    }
}

function scrabPost() {
    const mypost = document.querySelector('#mypost');
    const like = document.querySelector('#like');
    const scrab = document.querySelector('#scrab');
    const tab_underline = document.querySelector('.tab_underline');

    let selected = scrab
    if (scrab === selected) {
        mypost.classList.remove('active');
        like.classList.remove('active');
        scrab.classList.add('active');
        tab_underline.style.left = '66.6%';
    }
}

// like.addEventListener('click', function() {
//     let selected = like
//     if (like === selected) {
//         mypost.classList.remove('active');
//         like.classList.add('active');
//         scrab.classList.remove('active');
//     }
//     tab_underline.style.left = '33.3%';
// }) 

// scrab.addEventListener('click', function() {
//     let selected = scrab
//     if (scrab === selected) {
//         mypost.classList.remove('active');
//         like.classList.remove('active');
//         scrab.classList.add('active');
//     }
//     tab_underline.style.left = '66.6%';
// })