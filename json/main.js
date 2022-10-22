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
    console.log(my_cart.length);

    if(my_cart > 0){
        
    }

    
}



onloadListData();