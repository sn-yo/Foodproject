
function onloadListData(){    
    let show_name = localStorage.getItem('FoodName');
    let show_img = localStorage.getItem('FoodImage');
    let show_qty = localStorage.getItem('FoodQty');
    let show_prc = localStorage.getItem('FoodPrc');
    let show_code = localStorage.getItem('FoodCode');
    let show_inst = localStorage.getItem('FoodInst');

    var thisblock = document.getElementById("listData1");
    var chkbtnconfirm = document.getElementById("chk_beforeconfirm");

    let my_cart = localStorage.getItem("cart");
    my_cart = JSON.parse(my_cart);
    // console.log(my_cart);

    if(my_cart != null){
        call_refresh(my_cart);
        if(my_cart.length > 0){
            
            // console.log('aa');
            for(var i=0; i<my_cart.length; i++){
                // console.log(my_cart);
                var temp = document.getElementsByTagName("template")[0];

                var menu = temp.content.firstElementChild.cloneNode(true);

                menu.getElementsByClassName('my_cart_show_name')[0].innerHTML = my_cart[i].name;
                menu.getElementsByClassName('my_cart_show_optinst')[0].innerHTML = my_cart[i].opt_inst;

                menu.getElementsByClassName("my_cart_show_qty")[0].value = my_cart[i].qty;
                menu.getElementsByClassName("my_cart_show_prc")[0].innerHTML = '';
                //set
                var chk_qty_input = menu.getElementsByClassName("my_cart_show_qty")[0];
                chk_qty_input.setAttribute("id", "show_qty"+i);

                var bt_minus = menu.getElementsByClassName("my_cart_minus")[0];
                bt_minus.setAttribute("onclick", "chk_delitem("+i+")");
                // console.log(bt_minus);
                
                var bt_plus = menu.getElementsByClassName("my_cart_plus")[0];
                bt_plus.setAttribute("onclick", "chk_additem("+i+")");

                var bt_remove = menu.getElementsByClassName("mycart_remove")[0];
                bt_remove.setAttribute("onclick", "chk_removeitem("+my_cart[i].code+",'"+my_cart[i].opt_inst+"')");


                // console.log(menu);
                document.getElementById("listData_point").appendChild(menu);
            }
        }

        // var chk_addcart = localStorage.getItem("clickaddcart");
        // // console.log(chk_addcart);
        // if(chk_addcart == null || chk_addcart == '' || chk_addcart == 0){            
        //     // localStorage.setItem("clickaddcart",1);
        //     chk_addcart = 1;
        //     // myFunction(chk_addcart);
        //     let jsonUrl2 = "json/config.json";
        //     $.ajax({
        //         type: "GET",
        //         url: jsonUrl2,
        //         async: false,
        //         cache: false,
        //         success: function( response ) {
        //             // console.log(response.urlJson);
        //             let urlxJson = response.urlJson;
        //             //myFunction(chk_addcart, urlxJson);
        //         }
        //     });
        // }
        

    }else{
        document.getElementById("chk_beforeconfirm").href = "#";
        // $("#my_message_chkcart").modal('show');
        
    }
}

onloadListData();

function redirectto(){
    window.location.href = "home.html";
}

function chk_limit_qty(itemcode){
    let qty = 0;
    let jsonUrl2 = "json/config.json";
    $.ajax({
        type: "GET",
        url: jsonUrl2,
        async: false,
        cache: false,
        success: function( response ) {
            // console.log(response.urlJson);
            let urlxJson = response.urlJson;
            var get_bookingid = localStorage.getItem("Set_bookingref");
            var data_limitqty = urlxJson+"GetFood?BookingID="+get_bookingid+"&FoodCode="+itemcode;
            
            $.ajax({
                type: "GET",
                url: data_limitqty,
                async: false,
                cache: false,
                success: function( response ) {
                    // console.log(response.urlJson);
                    let data = response.data[0];
                    // console.log(data.LimitQty);
                    qty = data.LimitQty;
                }
            });
        }
    });
    return qty;
}

function chk_additem(item){
    // console.log('item', item);
    var get_val = document.getElementById("show_qty"+item).value;
    get_val = parseInt(get_val);
    var get_cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(get_cart[item]);
    var get_food_code = get_cart[item].code;
    var chk_qty_foodcode = parseInt(chk_limit_qty(get_food_code));

    // if(get_val){
    //     console.log('get val', get_val);
    //     if((get_val += 1) <= chk_qty_foodcode){
    //         get_val += 1;
    //     }else{
    //         get_val = chk_qty_foodcode;
    //     }
    //     // get_val += 1;
    //     document.getElementById("show_qty"+item).value = get_val;
    // }
    // console.log('chk_qty_foodcode', chk_qty_foodcode);

    if((get_cart[item].qty+1) <= chk_qty_foodcode){
        get_cart[item].qty += 1;
    }else{
        get_cart[item].qty = chk_qty_foodcode;
    }
    // console.log('curr qty', get_cart[item].qty);
    document.getElementById("show_qty"+item).value = get_cart[item].qty;

    //get_cart[item].qty += 1;
    localStorage.setItem('cart', JSON.stringify(get_cart));
    call_refresh(get_cart);
    
}

function chk_delitem(item){
    var get_val = document.getElementById("show_qty"+item).value;
    get_val = parseInt(get_val);

    if(get_val){
        if(get_val == 1){
            document.getElementById("show_qty"+item).value = 1;
        }else{
            get_val -= 1;
            document.getElementById("show_qty"+item).value = get_val;

            var get_cart = JSON.parse(localStorage.getItem("cart"));
            // console.log(get_cart[item]);
            get_cart[item].qty -= 1;
            localStorage.setItem('cart', JSON.stringify(get_cart));
            
            call_refresh(get_cart);
        }
    }else{
        document.getElementById("show_qty"+item).value = 1;
    }
    
}

function chk_removeitem(code, type){
    // console.log(code);
    // console.log(type);
    var get_cart = JSON.parse(localStorage.getItem("cart"));
    let curr_cart = get_cart.filter(item => item.code != code || item.opt_inst != type);
    localStorage.setItem("cart", JSON.stringify(curr_cart));
    
    // document.getElementById("listData_point").style.display = 'none';
    location.reload();
}

function call_refresh(my_cart){
    if(my_cart != null){
        let count_qty = my_cart.map(function(item){
            return parseInt(item.qty);
        });
        
        let sum_qty = count_qty.reduce(function(prev, next){
            return prev + next;
        }, 0);
        
        let count_prc = my_cart.map(function(item){
            return parseFloat(item.prc)*parseInt(item.qty);
        });
        
        let sum_prc = count_prc.reduce(function(prev, next){
            return prev + next;
        }, 0);  
        
        document.getElementById("show_totalitem").innerHTML = my_cart.length+" เมนู";
        document.getElementById("show_totalqty").innerHTML = xFormatNumber(sum_qty)+" จาน";
        document.getElementById("show_totalprc").innerHTML = xFormatNumber(sum_prc)+" บาท";
    }else{
        document.getElementById("show_totalitem").innerHTML = '';
        document.getElementById("show_totalqty").innerHTML = '';
        document.getElementById("show_totalprc").innerHTML = '';
    }
    
}

function xFormatNumber(number){
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number);
}

function myFunction(count, urlxJson) {
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
                // console.log('error: ' + err)
                chkbooking(err);
            })
        
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
    
        // Add the "show" class to DIV
        x.className = "show";
    
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

    }
    count += 1;
    // localStorage.setItem("clickaddcart", count);
}

function appendData(data){
    // console.log(data);
    var x = document.getElementById("snackbar_message");
    x.innerHTML = data.message;
}

function backPage(){
    let lastPage = localStorage.getItem("lastPage");
    let menu_id = lastPage;

    let getBookingID = localStorage.getItem("Set_bookingref");
    let addUrl = "&BookingID="+getBookingID;
    // console.log(urlxJson);

    let jsonUrl2 = "json/config.json";
    $.ajax({
        type: "GET",
        url: jsonUrl2,
        async: false,
        cache: false,
        success: function( response ) {
            // console.log(response.urlJson);
            let urlxJson = response.urlJson;
            backPageTo(urlxJson);
        }
    });    

}

function backPageTo(urlxJson){
    $.ajax({
        type: "GET",
        url: urlxJson+"GetMenu?FoodGroup="+menu_id+addUrl,
        async: false,
        cache: false,
        success: function( response ) {
            // console.log( response );
            const data = response.data;
            // console.log(data.length);
            var xloop = 0;

            var show_groupname = localStorage.getItem("group_name");
            // console.log(show_groupname);
            document.getElementById("cata_showgroupname").innerHTML = show_groupname;

            for(var xrow = 0; xrow < (data.length/2); xrow++){
                // console.log('xrow', xrow);
                var row_mb = document.createElement('div');
                row_mb.className = "row mb-3";

                
                for(var i=0; i < 2; i++){
                    if(xloop < data.length){
                        var temp = document.getElementsByTagName("template")[1];
                        var menu = temp.content.firstElementChild.cloneNode(true);

                        menu.setAttribute("id", "Grp_ID"+data[xloop].FoodCode);
                        // console.log('i'+i ," Grp_ID"+data[xloop].FoodCode);
                        // console.log('loop:', xloop + data[xloop].FoodCode);
                        var pathimg = "img/FoodImage/"+data[xloop].Food_ImageName;

                        menu.getElementsByClassName('text_name')[0].innerHTML = data[xloop].FoodName;
                        menu.getElementsByClassName('cata_shownameeng')[0].innerHTML = data[xloop].FoodName_E;
                        menu.getElementsByClassName('text_name')[0].setAttribute("onclick", "OnChooseFood('"+data[xloop].FoodCode+"','"+data[xloop].FoodName+"','"+data[xloop].FoodName_E+"','"+pathimg+"','"+data[xloop].Food_Price+"')");                        
                        
                        // if(data[xloop].Food_ImageName == ''){
                        //     pathimg = "img/food_empty.png";
                        // }else{
                        //     pathimg = "img/FoodImage/"+data[xloop].Food_ImageName;
                        // }
                        // console.log(pathimg);
                        // var img = document.createElement('img');
                        // img.src = pathimg;
                        // img.onload = function(e){
                        //     menu.getElementsByClassName('pic_catagory_steak')[0].src = pathimg;
                        // };
                        // img.onerror = function(e) {                            
                        //     pathimg2 = "img/food_empty.png";
                        //     menu.getElementsByClassName('pic_catagory_steak')[0].src = pathimg2;
                        // };
                        menu.getElementsByClassName('pic_catagory_steak')[0].src = pathimg;

                        //set
                        var xx = menu.getElementsByClassName("click_for_this")[0];                        
                        xx.setAttribute("onclick", "OnChooseFood('"+data[xloop].FoodCode+"','"+data[xloop].FoodName+"','"+data[xloop].FoodName_E+"','"+pathimg+"','"+data[xloop].Food_Price+"')");

                        var col_6_tag1 = document.createElement('div');
                        col_6_tag1.className = "col-6";
                        // col_6_tag1.innerHTML = "i="+xloop;
                        col_6_tag1.appendChild(menu);
                        row_mb.appendChild(col_6_tag1);
                    }
                    
                    xloop += 1;
                }
                document.getElementById(menu_catagory).appendChild(row_mb);
            }
            

        }
    });
}