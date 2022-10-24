// $.ajax({
//     type: "GET",
//     url: "http://103.58.151.121:8080/GetRecommend",
//     async: false,
//     success: function( response ) {
//         //console.log( response );
//         var cat_item = document.createElement('div');
//         cat_item.className = "trending-slider rounded";
//         const data = response.data;
//         // console.log(data);
//         for(var i=0; i < data.length; i++){
//             var temp = document.getElementsByTagName("template")[1];
//             // console.log('temp rec', temp.content);

//             var menu = temp.content.firstElementChild.cloneNode(true);
//             // console.log('menu', menu);

//             //console.log(data[i].Grp_ID);
//             menu.setAttribute("id", "recommend_"+data[i].FoodCode);
//             // ชื่อเมนู
//             menu.getElementsByClassName('text-black')[0].id = data[i].FoodCode;
//             menu.getElementsByClassName('text-black')[0].innerHTML = data[i].FoodName;
//             var pathimg = "img/FoodImage/"+data[i].Food_ImageName
//             menu.getElementsByClassName('pic_reccomend')[0].src = pathimg;

//             //set
//             var xx = menu.getElementsByClassName("click_for_this")[0];
//             // console.log('xx', xx);
//             xx.setAttribute("food", "xxxxx");
//             xx.setAttribute("onclick", "OnChooseFood('"+data[i].FoodCode+"','"+data[i].FoodName+"','"+pathimg+"')");
            
                        
            
//             //console.log(menu.getElementsByClassName('m-0 small')[0].id);
//             cat_item.appendChild(menu);
//         }
//         document.getElementById("recommend_point").appendChild(cat_item);
//     }
// });


$.ajax({
    type: "GET",
    url: "http://103.58.151.121:8080/GetRecommend",
    async: false,
    cache: false,
    success: function( response ) {
        // console.log( response );
        const data = response.data;
        // console.log(data.length);
        var xloop = 0;

        for(var xrow = 0; xrow < (data.length/2); xrow++){
            // console.log('xrow', xrow);
            var row_mb = document.createElement('div');
            row_mb.className = "row mb-3";

            
            for(var i=0; i < 2; i++){
                if(xloop < data.length){
                    var temp = document.getElementsByTagName("template")[3];
                    var menu = temp.content.firstElementChild.cloneNode(true);

                    menu.setAttribute("id", "hGrp_ID"+data[xloop].FoodCode);
                    // console.log('i'+i ," Grp_ID"+data[xloop].FoodCode);
                    // console.log('loop:', xloop + data[xloop].FoodCode);
                    menu.getElementsByClassName('text_name')[0].innerHTML = data[xloop].FoodName;
                    menu.getElementsByClassName("home_shownameeng")[0].innerHTML = data[xloop].FoodName_E;
                    var pathimg = "img/FoodImage/"+data[xloop].Food_ImageName;
                    menu.getElementsByClassName('pic_catagory_steak')[0].src = pathimg;

                    //set
                    var xx = menu.getElementsByClassName("click_for_this")[0];
                    var yy = menu.getElementsByClassName('text_name')[0];
                    // console.log('xx', xx);
                    
                    xx.setAttribute("onclick", "OnChooseFood('"+data[xloop].FoodCode+"','"+data[xloop].FoodName+"','"+data[xloop].FoodName_E+"','"+pathimg+"',"+data[xloop].Food_Price+")");
                    yy.setAttribute("onclick", "OnChooseFood('"+data[xloop].FoodCode+"','"+data[xloop].FoodName+"','"+data[xloop].FoodName_E+"','"+pathimg+"',"+data[xloop].Food_Price+")");
                    yy.href = "get_food.html"

                    var col_6_tag1 = document.createElement('div');
                    col_6_tag1.className = "col-6";
                    // col_6_tag1.innerHTML = "i="+xloop;
                    col_6_tag1.appendChild(menu);
                    row_mb.appendChild(col_6_tag1);
                }
                
                xloop += 1;
            }
            document.getElementById("catagory_home_point").appendChild(row_mb);
        }
        

    }
});