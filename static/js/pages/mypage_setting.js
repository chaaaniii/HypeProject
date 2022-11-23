// const imgUpload = document.querySelector('.img_upload');
// const imgChoose = document.querySelector('#imgUpload');

// imgUpload.addEventListener('click',()=>{
// 	imgChoose.click();
// });

function upload_img() {
    const imgChoose = document.querySelector('#imgUpload');
    imgChoose.click();
}

function mod() {
    const info = document.querySelector('#info')
    const modify = document.querySelector('#modify')
    info.style.visibility = 'hidden';
    modify.style.visibility = 'visible';
}

function save() {
    const urname = document.querySelector('#urnameinput').value;
    const urintroduce = document.querySelector('#urintroduceinput').value;
    const username = document.querySelector('#username');
    const userintroduce = document.querySelector('#userintroduce');
    const info = document.querySelector('#info')
    const modify = document.querySelector('#modify')
    if (urname === '') {
        alert("이름을 입력해주세요.");
        onclick.preventDefault();
    }
    username.innerHTML = urname;
    userintroduce.innerHTML = urintroduce;
    info.style.visibility = 'visible';
    modify.style.visibility = 'hidden';
}