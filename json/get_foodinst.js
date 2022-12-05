function onLoadPage(code, urlxJson){
    const data_signup = urlxJson+"GetFoodInst?FoodCode="+code;

    fetch(data_signup)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            appendData(data)
        })
        .catch(function(err){
            console.log('error: ' + err)
        })


    function appendData(data){
        var mainContainer = document.getElementById("myCatagory");
        // console.log(data.data);

        var get_code = localStorage.getItem("code");
        var get_name = localStorage.getItem("name");
        var get_nameeng = localStorage.getItem("nameeng");
        var get_img = localStorage.getItem("pathimg");
        var myLanguage = localStorage.getItem("Set_Language");

        if(myLanguage == 'EN'){
            document.getElementById("show_detail_name").innerHTML = get_nameeng;
        }else{
            document.getElementById("show_detail_name").innerHTML = get_name;
        }

        
        document.getElementById("show_detail_img").src = get_img;
        // document.getElementById("show_detail_nameeng").innerHTML = get_nameeng;

        let current_livestation = localStorage.getItem("livestation");
        let current_livestationdesc = localStorage.getItem("livestationdesc");
        
        if(current_livestation == 0){
            // console.log('live 0');
            // document.getElementById("addtobasket").style.display = "block";
            document.getElementById("addtobasket2").style.display = "inline";
            document.getElementById("addtobasket3").style.display = "inline";
            // document.getElementById("addtobasket").innerHTML = "";
            document.getElementById("showbasket").style.display = "none";
            document.getElementById("showclickqty").style.display = "block";
        }else{
            // console.log('live 1');
            // document.getElementById("addtobasket").style.display = "none";
            document.getElementById("addtobasket2").style.display = "none";
            document.getElementById("addtobasket3").style.display = "none";
            document.getElementById("showbasket").style.display = "block";
            document.getElementById("showbasket").innerHTML = current_livestationdesc;
            document.getElementById("showbasket").style.pointerEvents = "none";
            document.getElementById("showclickqty").style.display = "none";
        }

        // var show_name = document.getElementById("ins_custname");
        // show_name.innerHTML = data.data[0].Cust_Name;
        var chk_inst = data.data.length;
        // console.log(chk_inst);
        if(chk_inst > 0){
            document.getElementById("option_forall").style.display = "block";
            
            const myoption = data.data;
            for(var i=0; i<myoption.length; i++){
                var temp = document.getElementsByTagName("template")[0];
                // console.log(temp.content);
                var option_choose = temp.content.firstElementChild.cloneNode(true);
                option_choose.setAttribute("id", "getfood_"+myoption[i].ID);
                option_choose.getElementsByClassName("desc_foroption")[0].innerHTML = myoption[i].SpcDesc;
                
                option_choose.getElementsByClassName("desc_foroption")[0].setAttribute("for","optionchoose_"+myoption[i].ID);
                option_choose.getElementsByClassName("desc_idforoption")[0].setAttribute("id", "optionchoose_"+myoption[i].ID);
                option_choose.getElementsByClassName("desc_idforoption")[0].setAttribute("name", "checkboxfor_"+myoption[i].ItemID);
                if(myLanguage == 'EN'){
                    option_choose.getElementsByClassName("desc_idforoption")[0].setAttribute("value", myoption[i].SpcDesc_E);
                }else{
                    option_choose.getElementsByClassName("desc_idforoption")[0].setAttribute("value", myoption[i].SpcDesc);
                }

                // var setid_option = document.getElementById("checkbox_for1");
                // console.log(setid_option);
                // setid_option.setAttribute("id", "optionchoose_"+myoption[i].ID);

                document.getElementById("getfood_point").appendChild(option_choose);
            }
        }

        //load limit qty
        var get_bookingid = localStorage.getItem("Set_bookingref");
        var data_limitqty = urlxJson+"GetFood?BookingID="+get_bookingid+"&FoodCode="+code;
        // console.log('limit qty',data_limitqty);

        $.ajax({
            type: "GET",
            url: data_limitqty,
            async: false,
            cache: false,
            success: function( response ) {
                // console.log(response.urlJson);
                let data = response.data[0];
                // console.log(data.LimitQty);
                localStorage.setItem("LimitQty", data.LimitQty);
                if(data.LimitQty == 0){
                    document.getElementById("ins_qty").value = 0;
                }
            }
        });
    }
}





// function clickconfirm(fooditem){
//     var get_curr_food_code = localStorage.getItem("code");
//     var get_curr_food_name = localStorage.getItem("name");
//     var chk_qty = parseInt(document.getElementById("ins_qty").value);
//     // var food_objs = [
//     //     {
//     //         "code" : get_curr_food_code,
//     //         "name" : get_curr_food_name,
//     //         "qty" : chk_qty
//     //     }
//     // ]

//     var food_objs = {
//         "code" : get_curr_food_code,
//         "name" : get_curr_food_name,
//         "qty" : chk_qty
//     }


//     // localStorage.setItem("cart", JSON.stringify(food_objs));
    
//     var get_cart = JSON.parse(localStorage.getItem("cart"));
    
//     // console.log('cart:', get_cart.length);
//     if(get_cart.length == 0){
//         get_cart.push(food_objs);
//     }else{
//         // console.log(get_cart.find(element => element.code == get_curr_food_code));
//         let chk_old_code = get_cart.find(element => element.code == get_curr_food_code);
//         if(chk_old_code === undefined){
//             get_cart.push(food_objs);
//         }else{
//             // console.log('qty', chk_qty);
//             updatemyCart(get_curr_food_code, chk_qty);
//             // removemyCart(get_curr_food_code);
//             // localStorage.setItem('image', 'myCat.png');
//             // removemyCart(get_curr_food_code);
//         }
//     }
    
//     localStorage.setItem("cart", JSON.stringify(get_cart));

// }

function updatemyCart(product_cood, Quantity){
    // console.log('update');
    var get_cart = JSON.parse(localStorage.getItem("cart"));
    for(let data of get_cart){
        // console.log(data.code);
        if(data.code == product_cood){
            
            // console.log(data.qty);

            data.qty += Quantity;
            // console.log(Quantity);
            // console.log(data.qty);
        }
    }
    // console.log(get_cart);
    localStorage.removeItem("cart");
    // localStorage.setItem("cart", JSON.stringify(get_cart));
    // console.log(get_cart);

}

function removemyCart(product_cood){
    var get_cart = JSON.parse(localStorage.getItem("cart"));
    var temp = get_cart.filter(item => item.code != product_cood);
    // console.log(temp);
    localStorage.setItem("cart", JSON.stringify(temp));
}

function test123(){
    var food_objs = {
        "code" : "3",
        "name" : "get_curr_food_name",
        "qty" : 10
    }

    // localStorage.removeItem('image');
    localStorage.setItem('cart', food_objs);
}

function xFormatNumber(number){
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number);
}

function shownotify(){
    let curr_mycart = JSON.parse(localStorage.getItem("cart"));
    let count_mycart = curr_mycart.length;
    let count_prc = curr_mycart.map(function(item){
        return parseFloat(item.prc)*parseInt(item.qty);
    });
    
    let sum_prc = count_prc.reduce(function(prev, next){
        return prev + next;
    }, 0);  

    $(".notify_message").notify({
        item1 : "รายการอาหารที่เลือก : "+count_mycart+" รายการ",
        p1: "                       ",
        item2 : "฿"+sum_prc,
        },            
        {
            
            position : "top",
            autoHide : false,
            style: 'bootstrap',
            className: 'copper',
            arrowShow: false,
        }
    );

}