
function onloadListData(){    
    let show_name = localStorage.getItem('FoodName');
    let show_img = localStorage.getItem('FoodImage');
    let show_qty = localStorage.getItem('FoodQty');
    let show_prc = localStorage.getItem('FoodPrc');
    let show_code = localStorage.getItem('FoodCode');
    let show_inst = localStorage.getItem('FoodInst');

    var thisblock = document.getElementById("listData1");
    var chkbtnconfirm = document.getElementById("chk_beforeconfirm");
    
    // if(!show_code){
    //     console.log('1');
    //     thisblock.style.display = "none";
    //     chkbtnconfirm.href = '#';        

    //     document.getElementById("show_total").innerHTML = '$0';
    //     document.getElementById("show_fee").innerHTML = '$0';
    //     document.getElementById("show_topay").innerHTML = '$0';
    // }else{
    //     console.log('2');
    //     thisblock.style.display = "block";
    //     chkbtnconfirm.href = 'confirm.html';

    //     document.getElementById("show_name").innerHTML = show_name;
    //     document.getElementById("show_name2").innerHTML = show_name;
    //     $("#show_img").attr("src", show_img);
    //     document.getElementById("show_qty").value = show_qty;
    //     document.getElementById("show_prc").innerHTML = '$'+show_prc*show_qty;
    //     document.getElementById("show_total").innerHTML = 'ต่อหน่อย $'+show_prc;
    //     document.getElementById("show_inst").innerHTML = show_inst;
    //     // document.getElementById("show_fee").innerHTML = '$10';
    //     // document.getElementById("show_topay").innerHTML = '$'+((show_prc*show_qty)+10);   
    // }

    


    // let show_code2 = localStorage.getItem('FoodCode2');
    // var thisblock = document.getElementById("showItem2");
    // thisblock.style.display = 'none';

    // console.log(show_code2);
    // if(!show_code2){
    //     console.log('show;');
    //     thisblock.style.display = 'none';
    // }else{
    //     console.log('hide');
    //     thisblock.style.display = 'none';
    // }

    let my_cart = localStorage.getItem("cart");
    my_cart = JSON.parse(my_cart);

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


            // console.log(menu);
            document.getElementById("listData_point").appendChild(menu);
        }
    }

    
}

function chk_additem(item){
    
    var get_val = document.getElementById("show_qty"+item).value;
    get_val = parseInt(get_val);

    if(get_val){
        get_val += 1;
        document.getElementById("show_qty"+item).value = get_val;
    }

    var get_cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(get_cart[item]);
    get_cart[item].qty += 1;
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

function call_refresh(my_cart){
    let count_qty = my_cart.map(function(item){
        return parseInt(item.qty);
    });
    
    let sum_qty = count_qty.reduce(function(prev, next){
        return prev + next;
    }, 0);    
    
    document.getElementById("show_totalitem").innerHTML = my_cart.length;
    document.getElementById("show_totalqty").innerHTML = sum_qty;
    document.getElementById("show_totalprc").innerHTML = 99999;
}


onloadListData();