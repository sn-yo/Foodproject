function get_list(menu_id, menu_catagory){
    let lastPageUrl = document.referrer;
    let menuX = menu_id;
    console.log(`Last visited page URL is ${lastPageUrl}`);
    console.log(menuX);

    $.ajax({
        type: "GET",
        url: "http://103.58.151.121:8080/GetMenu?FoodGroup="+menu_id,
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
                        menu.getElementsByClassName('text_name')[0].innerHTML = data[xloop].FoodName;
                        menu.getElementsByClassName('text_name')[0].setAttribute("onclick", "OnChooseFood('"+data[xloop].FoodCode+"','"+data[xloop].FoodName+"','"+pathimg+"')");
                        var pathimg = '';
                        if(data[xloop].Food_ImageName == ''){
                            pathimg = "img/food_empty.png";
                        }else{
                            pathimg = "img/FoodImage/"+data[xloop].Food_ImageName;
                        }
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
                        xx.setAttribute("onclick", "OnChooseFood('"+data[xloop].FoodCode+"','"+data[xloop].FoodName+"','"+pathimg+"')");

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

