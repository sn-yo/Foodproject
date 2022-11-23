function chk_additem(){
    
    var get_val = document.getElementById("ins_qty").value;
    get_val = parseInt(get_val);

    if(get_val){
        get_val += 1;
        document.getElementById("ins_qty").value = get_val;
    }
    
}

function chk_delitem(){
    var get_val = document.getElementById("ins_qty").value;
    get_val = parseInt(get_val);

    if(get_val){
        if(get_val == 1){
            document.getElementById("ins_qty").value = 1;
        }else{
            get_val -= 1;
            document.getElementById("ins_qty").value = get_val;
        }
    }else{
        document.getElementById("ins_qty").value = 1;
    }
}

function myFunction_showmessagetimeout(count, urlxJson) {
    // console.log(count);
    if(count == 1){
        let bookingid  = localStorage.getItem("Set_bookingref");
        const data_signup = urlxJson+"CheckTimeOut?BookingID="+bookingid;

        fetch(data_signup)
            .then(function (response){
                return response.json()
            })
            .then(function (data){
                appendData(data)
            })
            .catch(function(err){
                console.log('error: ' + err)
                // chkbooking(err);
            })
        
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
    
        // Add the "show" class to DIV
        x.className = "show";
    
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

    }
    count += 1;
    localStorage.setItem("clickaddcart", count);
}

function appendData(data){
    // console.log(data);
    var x = document.getElementById("snackbar_message");
    x.innerHTML = data.message;
}

function chktimeout(typeconfirm){
    let jsonUrl2 = "json/config.json";
    $.ajax({
        type: "GET",
        url: jsonUrl2,
        async: false,
        cache: false,
        success: function( response ) {
            // console.log(response.urlJson);
            let urlxJson = response.urlJson;
            if(typeconfirm == 'normal'){
                clickconfirm(urlxJson, typeconfirm);
            }else if(typeconfirm == 'fast'){
                //fastconfirm(urlxJson);
                clickconfirm(urlxJson, typeconfirm);
            }else{

            }
        }
    });
}

function clickconfirm(urlxJson, typeconfirm){
    var get_curr_food_code = localStorage.getItem("code");
    var get_curr_food_name = localStorage.getItem("name");
    var get_curr_food_img = localStorage.getItem("pathimg");
    var get_bookingid = localStorage.getItem("Set_bookingref");
    var get_curr_food_prc = parseFloat(localStorage.getItem("prc"));
    var chk_qty = parseInt(document.getElementById("ins_qty").value);

    // console.log(urlxJson);
    $.ajax({
        type: "GET",
        url: urlxJson+"GetFood?BookingID="+get_bookingid+"&FoodCode="+get_curr_food_code,
        async: false,
        cache: false,
        success: function( response ) {
            // console.log(response);
            // console.log(response.data);
            if(response.status == 'True'){
                // console.log('add food');
                // var checkbox = document.getElementsById("optionchoose_21").value;
                // console.log('chkbox', checkbox);
                // alert($("input[type=checkbox][name=checkboxfor_101]:checked").val());
                // var chk = document.querySelector('input[type=checkbox][name=checkboxfor_101]:checked').value;
                // alert(chk.length);
                // var temp = document.querySelector('input[type=checkbox][name=checkboxfor_101]');
                // console.log(temp);
                const checked = document.querySelectorAll('input[type="checkbox"]:checked');
                var val_check = [...checked].map(c => c.value);
                // console.log([...checked].map(c => c.value));
                // console.log(val_check.length);
                var allcheck = '';
                for(var c=0; c<val_check.length; c++){
                    if(c >= 1){
                        allcheck += ','+val_check[c];
                    }else{
                        allcheck += val_check[c];
                    }
                }
                // console.log(allcheck);

                var food_objs = [
                    {
                        "code" : get_curr_food_code,
                        "name" : get_curr_food_name,
                        "qty" : chk_qty,
                        "opt_inst" : allcheck,
                        "img_path" : get_curr_food_img,
                        "prc" : get_curr_food_prc
                    }
                ]
                // console.log('food obj', food_objs);

                var get_cart = JSON.parse(localStorage.getItem("cart"));
                // console.log('cart ',get_cart);

                if(get_cart == null){
                    localStorage.setItem("cart", JSON.stringify(food_objs));
                }else{
                    // for(let data of get_cart){
                    //     if(data.code == get_curr_food_code){
                    //         data.qty += chk_qty;
                    //     }else{
                    //         // let chk_old_code = get_cart.find(element => element.code == get_curr_food_code);
                    //         console.log('oth');
                    //         get_cart.push(food_objs);
                    //     }
                    // }
                    // localStorage.setItem('cart', JSON.stringify(get_cart));
                    let chk_old_code = get_cart.find(element => element.code == get_curr_food_code && element.opt_inst == allcheck);

                    // console.log('chk 1', chk_old_code);
                    if(chk_old_code == undefined){
                        // console.log('เพิ่มรายการใหม่');
                        var food_objs = 
                        {
                            "code" : get_curr_food_code,
                            "name" : get_curr_food_name,
                            "qty" : chk_qty,
                            "opt_inst" : allcheck,
                            "img_path" : get_curr_food_img,
                            "prc" : get_curr_food_prc
                        }
                        get_cart.push(food_objs);
                        localStorage.setItem("cart", JSON.stringify(get_cart));
                    }else{
                        // console.log('มีรายการนี้แล้ว บวกเพิ่ม');
                        // console.log('จำนวนรายการ', get_cart.length);
                        for(let data of get_cart){
                            // console.log('1',get_cart);
                            // console.log('2',data);
                            if(data.code == get_curr_food_code && data.opt_inst == allcheck){
                                data.qty += chk_qty;
                                /// ตรวจสอบ การเลือก option
                                data.opt_inst = '';
                                for(var c=0; c<val_check.length; c++){
                                    if(c >= 1){
                                        data.opt_inst += ','+val_check[c];
                                    }else{
                                        data.opt_inst += val_check[c];
                                    }
                                }
                            }
                        }
                        localStorage.setItem('cart', JSON.stringify(get_cart));
                    }
                }

                var chk_addcart = localStorage.getItem("clickaddcart");
                // console.log(chk_addcart);
                if(chk_addcart == null || chk_addcart == '' || chk_addcart == 0){            
                    localStorage.setItem("clickaddcart",1);
                    chk_addcart = 1;
                    // myFunction(chk_addcart);
                    let jsonUrl2 = "json/config.json";
                    $.ajax({
                        type: "GET",
                        url: jsonUrl2,
                        async: false,
                        cache: false,
                        success: function( response ) {
                            // console.log(response.urlJson);
                            let urlxJson = response.urlJson;
                            myFunction_showmessagetimeout(chk_addcart, urlxJson);                
                            setTimeout(xredirecto(typeconfirm), 3000);
                        }
                    });
                }else{
                    // alert('555');
                    setTimeout(xredirecto(typeconfirm), 500);
                    
                }
            }else{
                //chkbooking(response.data, bookingid, pathname);
                window.location.href = "signup.html";
            }
        }
    });    

}

function xredirecto(chkconfirm){
    if(chkconfirm == 'normal'){
        window.location.href = "home.html";
    }else{
        window.location.href = "checkout.html";
    }
}

function fastconfirm(urlxJson){    
    var get_bookingid = localStorage.getItem("Set_bookingref");
    var get_curr_food_code = localStorage.getItem("code");

    $.ajax({
        type: "GET",
        url: urlxJson+"GetFood?BookingID="+get_bookingid+"&FoodCode="+get_curr_food_code,
        async: false,
        cache: false,
        success: function( response ) {
            // console.log(response);
            // console.log(response.data);
            if(response.status == 'True'){
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
                let food_code = localStorage.getItem("code");
                let food_name = localStorage.getItem("name");
                let food_qty = document.getElementById("ins_qty").value;
                console.log(food_qty);

                const checked = document.querySelectorAll('input[type="checkbox"]:checked');
                var val_check = [...checked].map(c => c.value);
                // console.log([...checked].map(c => c.value));
                // console.log(val_check.length);
                var allcheck = '';
                for(var c=0; c<val_check.length; c++){
                    if(c >= 1){
                        allcheck += ','+val_check[c];
                    }else{
                        allcheck += val_check[c];
                    }
                }

                let txtjson = [];
                let listorder = {};

                let ItemNo = 1;
                let NickName = cust_name;
                let FoodCode = food_code;
                let FoodName = food_name;
                let FoodQty = food_qty;
                let FoodInst = allcheck;
                let Order_Remark = "";
                let Inv_No = cust_invno;
                let Booking_Ref = cust_bookingref;

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
                console.log(txtjson);

                var final = JSON.stringify(txtjson);
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
                    // window.localStorage.removeItem('cart');

                    window.location.href = "successful.html";
                }

            }else{
                window.location.href = "signup.html";
            }
        }
    });

    
}