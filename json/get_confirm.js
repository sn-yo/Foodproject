function onLoadPage(){

    let my_cart = localStorage.getItem("cart");
    my_cart = JSON.parse(my_cart);
    document.getElementById("confirm_showitem").innerHTML = my_cart.length;

    // document.getElementById("confirm_showtableno").innerHTML = '#'+localStorage.getItem("Set_tableno");

    if(my_cart.length > 0){
        var total_amount = 0;
        for(var i=0; i<my_cart.length; i++){
            // console.log(my_cart);
            var temp = document.getElementsByTagName("template")[0];

            var menu = temp.content.firstElementChild.cloneNode(true);
            // console.log(menu);
            menu.getElementsByClassName('confirm_showname')[0].innerHTML = my_cart[i].name;
            menu.getElementsByClassName('confirm_showqty')[0].innerHTML = "x "+my_cart[i].qty;
            menu.getElementsByClassName('confirm_showprc')[0].innerHTML = "฿"+xFormatNumber(parseFloat(my_cart[i].prc * parseInt(my_cart[i].qty)));
            total_amount += parseFloat(my_cart[i].prc * parseInt(my_cart[i].qty));
            document.getElementById("confirm_showamount").innerHTML = "฿"+xFormatNumber(total_amount);

            // console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(total_amount));

            document.getElementById("list_order_point").appendChild(menu);
        }
    }
    

}

onLoadPage();

function xFormatNumber(number){
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number);
}

function OnConcirm(){
    let jsonUrl2 = "json/config.json";
    $.ajax({
        type: "GET",
        url: jsonUrl2,
        async: false,
        cache: false,
        success: function( response ) {
            // console.log(response.urlJson);
            let urlxJson = response.urlJson;
            OnConfirm(urlxJson);
        }
    });
}

function OnConfirm(urlxJson){
    var myHeaders = new Headers();
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Accept-Encoding", "gzip, deflate, br");
    myHeaders.append("Connection", "keep-alive");

    let my_cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(my_cart);
    let cust_name = localStorage.getItem("Set_name");
    let cust_invno = localStorage.getItem("Set_invno");
    let cust_bookingref = localStorage.getItem("Set_bookingref");

    let txtjson = [];
    let listorder = {};

    for(var i=0; i<my_cart.length; i++){
        
        ItemNo = i+1;
        NickName = cust_name;
        FoodCode = my_cart[i].code;
        FoodName = my_cart[i].name;
        FoodQty = my_cart[i].qty;
        FoodInst = my_cart[i].opt_inst;
        Order_Remark = "";
        Inv_No = cust_invno;
        Booking_Ref = cust_bookingref;

        listorder = {
            "ItemNo" : ItemNo,
            "NickName" : NickName,
            "FoodCode" : FoodCode,
            "FoodName" : FoodName,
            "FoodQty" : FoodQty,
            "FoodInst" : FoodInst,
            "Order_Remark" : Order_Remark,
            "Inv_No" : Inv_No,
            "Booking_Ref" : Booking_Ref
        }
        txtjson.push(listorder);
    }
    // console.log('list', listorder);
    // console.log('final', JSON.stringify(txtjson));

    var final = JSON.stringify(txtjson);


    var raw = JSON.stringify([
    {
        "ItemNo": "1",
        "NickName": "Kasuha",
        "FoodCode": "3",
        "FoodName": "เนื้อวากิว MD",
        "FoodQty": "2",
        "FoodInst": "ติดมัน",
        "Order_Remark": "ทดสอบจากwebapp",
        "Inv_No": "425922",
        "Booking_Ref": "553706"
    }
    ]);
    // console.log(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: final,
        redirect: 'follow',
        mode: 'no-cors'
    };

    
    // fetch(urlxJson+"PostData?DBTable=orderdetail&DBAction=Insert&KeyUpdate=ItemNo", requestOptions)
    // .then(response => response.text())
    // .then(result => appendData(result))
    // .catch(error => appendError(error));

    fetch(urlxJson+"PostData?DBTable=orderdetail&DBAction=Insert&KeyUpdate=ItemNo", requestOptions)
    .then(data => appendData(data))
    .catch(error => appendError(error));

    function appendError(error){
        // console.log('error');
        console.log(error);
    }

    function appendData(data){
        // console.log('finish');
        console.log(data);
        window.localStorage.removeItem('cart');

        window.location.href = "successful.html";
    }

    
}