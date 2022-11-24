function uploadedPost() {
    const mypost = document.querySelector('#mypost');
    const like = document.querySelector('#like');
    const scrap = document.querySelector('#scrap');
    const tab_underline = document.querySelector('.tab_underline');
    let selected = mypost;
    if (mypost === selected) {
        mypost.classList.add('active');
        like.classList.remove('active');
        scrap.classList.remove('active');
        tab_underline.style.left = '0';
    }
}

function likePost() {
    const mypost = document.querySelector('#mypost');
    const like = document.querySelector('#like');
    const scrap = document.querySelector('#scrap');
    const tab_underline = document.querySelector('.tab_underline');
    let selected = like;
    if (like === selected) {
        mypost.classList.remove('active');
        like.classList.add('active');
        scrap.classList.remove('active');
        tab_underline.style.left = '33.3%';
    }
}

function scrapPost() {
    const mypost = document.querySelector('#mypost');
    const like = document.querySelector('#like');
    const scrap = document.querySelector('#scrap');
    const tab_underline = document.querySelector('.tab_underline');
    let selected = scrap;
    if (scrap === selected) {
        mypost.classList.remove('active');
        like.classList.remove('active');
        scrap.classList.add('active');
        tab_underline.style.left = '66.6%';
    }
}

// like.addEventListener('click', function() {
//     let selected = like
//     if (like === selected) {
//         mypost.classList.remove('active');
//         like.classList.add('active');
//         scrap.classList.remove('active');
//     }
//     tab_underline.style.left = '33.3%';
// }) 

// scrap.addEventListener('click', function() {
//     let selected = scrap
//     if (scrap === selected) {
//         mypost.classList.remove('active');
//         like.classList.remove('active');
//         scrap.classList.add('active');
//     }
//     tab_underline.style.left = '66.6%';
// })