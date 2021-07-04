document.addEventListener('DOMContentLoaded', function() {
    var btnR = document.querySelector('.phai'),
        btnL = document.querySelector('.trai'),
        slides = document.getElementsByTagName('li'),
        stt = document.querySelectorAll('.a'),
        id_pre = 0,
        id_next = 1,
        slidesCount = document.querySelectorAll('.a').length,
        status = 'dangDungYen',
        eff = document.getElementById('effects');

    function getValueOptions(eff) {
        var opt;
        for (var i = 0; i < eff.options.length; i++) {
            opt = eff.options[i];
            if (opt.selected === true) {
                break;
            }
        }
        return opt.value;
    }

    function slide_loading(btn, effect) {
        //Check trang thai slide co dang chuyen dong hay ko
        if (status == 'dangChuyenDong') {
            return;
        }
        status = 'dangChuyenDong';
        // Loai bo tat ca class truoc khi them class moi
        for (var i = 0; i < slidesCount; i++) {
            for (var j = 0; j < slides[i].classList.length; j++) {
                slides[i].classList.remove(slides[i].classList[j]);
            }
            stt[i].classList.remove('active');
        }
        if (btn == "nut trai") {
            id_pre = (id_pre == 0) ? (slidesCount - 1) : (id_pre - 1);
            id_next = (id_next == 0) ? (slidesCount - 1) : (id_next - 1);
            slides[id_next].classList.add('bienmat_' + effect);
            slides[id_pre].classList.add('hienra_' + effect);
            stt[id_pre].classList.add('active');
            //Chi dung 1 event khi ket thuc vi class return co thoi gian chuyen dong lau nhat
            slides[id_next].addEventListener('webkitAnimationEnd', function() {
                status = 'dangDungYen';
            })
        } else {
            slides[id_next].classList.add('active_' + effect);
            slides[id_pre].classList.add('return_' + effect);
            stt[id_next].classList.add('active');
            //Chi dung 1 event khi ket thuc vi class return co thoi gian chuyen dong lau nhat
            slides[id_pre].addEventListener('webkitAnimationEnd', function() {
                status = 'dangDungYen';
            })
            id_next = (id_next == slidesCount - 1) ? 0 : (id_next + 1);
            id_pre = (id_pre == slidesCount - 1) ? 0 : (id_pre + 1);
        }
    }


    function slide_next() {
        slide_loading("nut phai", getValueOptions(eff));
        console.log(getValueOptions(eff));
    }

    function slide_before() {
        slide_loading("nut trai", getValueOptions(eff));
        console.log(getValueOptions(eff));
    }
    btnR.addEventListener('click', slide_next);
    btnL.addEventListener('click', slide_before);
}, false);