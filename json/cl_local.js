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