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

        document.getElementById("show_detail_name").innerHTML = get_name;
        document.getElementById("show_detail_img").src = get_img;
        document.getElementById("show_detail_nameeng").innerHTML = get_nameeng;

        // if((get_code == '3') || (get_code == '32') || (get_code == '52')){
        //     // document.getElementById("option_forsteak").style.display = "block";
        // }else if(get_code == '65'){
        //     // console.log('spa');
        //     // document.getElementById("option_forspa").style.display = "block";
        // }else{
        //     // console.log('salud');
        //     // document.getElementById("option_forslud").style.display = "block";
        // }

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
                option_choose.getElementsByClassName("desc_idforoption")[0].setAttribute("value", myoption[i].SpcDesc);

                // var setid_option = document.getElementById("checkbox_for1");
                // console.log(setid_option);
                // setid_option.setAttribute("id", "optionchoose_"+myoption[i].ID);

                document.getElementById("getfood_point").appendChild(option_choose);
            }
        }


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