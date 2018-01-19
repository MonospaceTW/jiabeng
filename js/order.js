const titleStore = document.getElementById('titleStore');
const menuImg = document.getElementById('menuImg');
const orderName = document.getElementById('orderName');
const btn = document.getElementById('sendBtn');
const dishList = document.getElementById('dishList');
const membersOrder = document.getElementById('membersOrder');
const orderList = document.getElementById('orderList');

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
let orderKey = helper.getParameterByName("orderKey"); //取得 店家key

firebase.database().ref('team-order').child(orderKey).once('value',function(snapshot){
    const storeKey = snapshot.val().storeKey;
    
    firebase.database().ref('Store').child(storeKey).once('value', function (snapshot) {
        var storeData = snapshot.val();
        // let str = `
        //     <img src="${storeData.menuImg}">
        // `
        // menuImg.innerHTML = str;

        titleStore.innerHTML = `
            <span>${snapshot.val().storeName}</span>
        `
        
        


        firebase.database().ref('Store').child(storeKey).child('meal').once('value', function (snapshot) {
            // console.log(snapshot);
            var dish = "";
            snapshot.forEach(function (i) {
                var data = i.val();
                dish +=
                `
                <li class="mt-2 d-flex">
                    <span class="mr-auto">${data.mealName}</span>
                    <span >NT$${data.price}</span>
                    <input type="text" class="dish-amount ml-4" data-key="${i.key}" data-name="${data.mealName}" data-price="${data.price}" placeholder="0">
                </li>
                `
            })
            dishList.innerHTML = dish;
        })

        sendBtn.addEventListener('click', pushData, false);
        function pushData(){
            const orderNameVal = orderName.value;
            // console.log(orderKey);

            const All = document.querySelectorAll('ul#dishList li input');
            const AllAry = Array.from(All);
            const orderAry = [];
            for (i in AllAry) {
                // console.log(All[i].value);
                if (All[i].value == ""){
                    // console.log("空")
                }else{           
                    orderAry.push({
                        mealName: All[i].dataset.name,
                        count: All[i].value,
                        price: All[i].dataset.price
                    });
                    // console.log(orderAry);
                    }
            }
            firebase.database().ref('team-order').child(orderKey).child("members").push({
                "orderName":  orderNameVal,
                "orderMeal": orderAry
            })
            // console.log(`push!`);
            // console.log(orderAry);
        }
        firebase.database().ref('team-order').child(orderKey).child('members').on('value', function (snapshot) {
            // console.log(snapshot.val());
            let str ="";
            
            snapshot.forEach(function (i) {
                var data = i.val();
                // console.log(data.orderName);

                let orderDataAry = [];
                for (let i in data.orderMeal){                    // mealName = data.orderMeal[i].mealName;
                    orderDataAry.push(`<span class="result-meal">${data.orderMeal[i].mealName} </span><span class="result-amount"> ${data.orderMeal[i].count}</span> 份`)
                }
                // console.log(orderDataAry);

                for(let i in orderDataAry){
                    str += `
                            <li class="result-orders mt-4">
                                <span class="result-person">${data.orderName}</span> 已經訂購了 ${orderDataAry[i]}
                            </li>
                            `
                }
                // console.log(str);               
            })       
            membersOrder.innerHTML = str;     // console.log(str);
        })
    })

})


