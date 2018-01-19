var helper = {
    getParameterByName: function (name, url) {
        var regex, results;
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
        results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
};
let key = helper.getParameterByName("key"); //取得 店家key

// console.log(store);
const titleStore = document.getElementById('titleStore');
const titleStoreLarge = document.getElementById('titleStoreLarge');
const menuImg = document.getElementById('menuImg');
const bar = document.getElementById('bar');
const establish = document.getElementById('establish');



firebase.database().ref('Store').child(key).once('value', function (snapshot) {
    menuImg.innerHTML = `
        <img src=${snapshot.val().menuImg}  alt="Sorry!我們還沒有這家店的照片">
        
    `
    titleStore.innerHTML = `
        <h1>${snapshot.val().storeName}</h1>
    `
    titleStoreLarge.innerHTML = `
        <h1>${snapshot.val().storeName}</h1>
    `
})

const NowDate = new Date();
const h = NowDate.getHours();
const m = NowDate.getMinutes();
const time = `${NowDate.getFullYear()}/${(NowDate.getMonth() + 1)}/${NowDate.getDate()} ${h}:${m}`;
// console.log(time);

establish.addEventListener('click', creatOrder, false);
function creatOrder(){
    var orderKey = firebase.database().ref('team-order').push({
        "creatTime": time,
        "storeKey": key
    }).key
    location.href = `order.html?orderKey=${orderKey}`;
}