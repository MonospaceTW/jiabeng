const storeList = document.getElementById('storeList');
var str ="";
firebase.database().ref('Store').once('value', function (snapshot) {

    snapshot.forEach(function(i){
        var data = i.val();
        // 
        str +=`
        <li class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex align-items-center justify-content-center flex-column">
            <a class="d-flex flex-column" href="confirm.html?key=${i.key}">
                <img src="${data.menuImg}" alt="Sorry!我們還沒有這家店的照片">
                <h2>${data.storeName}</h2>
                <span>營業時間：</span>
                <span>${data.time}</span>
            </a>
        </li>
        `
        
    })
    storeList.innerHTML = str;
})


//原始js

/* firebase.database().ref('Store').once('value', function (snapshot) {

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
}) */