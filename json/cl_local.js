function chk_clearlocal(){
    // document.getElementById("chk_beforesuccees").href = "#";
    //successful.html
    window.localStorage.clear();
}

function test(){
    // console.log('xxxxx');
    let show_code = localStorage.getItem('FoodCode');
    let show_name = localStorage.getItem('FoodName');

    var testdata = JSON.stringify(
        [
            {
                "ItemNo": "99",
                "NickName": "john",
                "FoodCode": "3",
                "FoodName":"เนื้อวากิว MD",
                "FoodQty": "1",
                "FoodInst": "11111,12222",
                "Order_Remark":"ทดสอบ",
                "Inv_No":"425922",
                "Booking_Ref":"553706"
            }
        ]
    );
    
    
    const dataToSend = JSON.stringify(
        [
            {   
                ItemNo : "1", 
                NickName : "yoyo",
                FoodCode : "3",
                FoodName :"เนื้อวากิว MD",
                FoodQty :"1",
                FoodInst :"อยากได้แบบเผ็ดจัด",
                Order_Remark :"test",
                Inv_No :"425922",
                Booking_Ref :"553706"
            }
        ]        
    );

    // console.log(dataToSend);

    // let dataReceived = ""; 

    // const xhr = new XMLHttpRequest();
    // const url = "https://cors-anywhere.herokuapp.com/http://103.58.151.121:8080/PostData?DBTable=orderdetail&DBAction=Insert&KeyUpdate=ItemNo";

    // xhr.open('POST', url, true);
    // xhr.setRequestHeader('Content-Type','application/json; charset=UTF-8');
    
    // xhr.withCredentials = true;
    // xhr.onreadystatechange = () => {
    //     if(xhr.readyState === 4 && xhr.status === 201){
    //         let object = JSON.parse(xhr.response)
    //     }
    // }

    // let body = testdata;
    // xhr.send(body);

    // fetch(url, {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    //     body: dataToSend,
    //     })
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));

    // fetch(url, {
    //     method: 'POST',
    //     body: dataToSend,
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    // })
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));




//     fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({
//     title: 'foo',
//     body: 'barrrrrr',
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));

}




function onloadListData(){  
    let show_name = localStorage.getItem('name');
    let show_img = localStorage.getItem('FoodImage');
    let show_qty = localStorage.getItem('FoodQty');
    let show_prc = localStorage.getItem('FoodPrc');
    let show_code = localStorage.getItem('FoodCode');

    // document.getElementById("show_name").innerHTML = '';
    // document.getElementById("show_qty").innerHTML = ' x '+show_qty;
    
    // document.getElementById("show_total").innerHTML = '$'+show_prc*show_qty;        
    // document.getElementById("show_fee").innerHTML = '$10';
    // document.getElementById("show_topay").innerHTML = '$'+((show_prc*show_qty)+10); 
}

onloadListData();