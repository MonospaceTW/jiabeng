const storeList = document.getElementById('storeList');
var str ="";
firebase.database().ref('Store').once('value', function (snapshot) {

    snapshot.forEach(function(i){
        var data = i.val();
        // 
        str +=`
        <li class="text-center d-flex flex-column" >
            <a href="confirm.html?key=${i.key}">
                <h2>${data.storeName}</h2>
                <img src="${data.menuImg}">
            </a>
            <span>連絡資訊：${data.phone}</span>
            <span>店家地址：${data.address}</span>
            <span>營業時間：${data.time}</span>
        </li>
        `
    })
    storeList.innerHTML = str;
})