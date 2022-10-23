
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


                // console.log(menu);
                document.getElementById("listData_point").appendChild(menu);
            }
        }
    }else{
        document.getElementById("chk_beforeconfirm").href = "#";
        $("#my_message_chkcart").modal('show');
        
    }
}

onloadListData();

function redirectto(){
    window.location.href = "home.html";
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
    if(my_cart != null){
        let count_qty = my_cart.map(function(item){
            return parseInt(item.qty);
        });
        
        let sum_qty = count_qty.reduce(function(prev, next){
            return prev + next;
        }, 0);    
        
        document.getElementById("show_totalitem").innerHTML = my_cart.length;
        document.getElementById("show_totalqty").innerHTML = sum_qty;
        document.getElementById("show_totalprc").innerHTML = 99999;
    }else{
        document.getElementById("show_totalitem").innerHTML = '';
        document.getElementById("show_totalqty").innerHTML = '';
        document.getElementById("show_totalprc").innerHTML = '';
    }
    
}

