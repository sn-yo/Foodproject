const jsonUrl2 = "json/config.json";

$.ajax({
    type: "GET",
    url: jsonUrl2,
    async: false,
    cache: false,
    success: function( response ) {
        // console.log(response.urlJson);
        let urlxJson = response.urlJson;
        loadPageGetRecommend(urlxJson);
    }
});

function loadPageGetRecommend(urlxJson){
    $.ajax({
        type: "GET",
        url: urlxJson+"GetRecommend",
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

                        var liveStation = data[xloop].LiveStation;
                        var liveStationdesc = data[xloop].SubGroupName;
                        // console.log(liveStation)
                        
                        xx.setAttribute("onclick", "OnChooseFood('"+data[xloop].FoodCode+"','"+data[xloop].FoodName+"','"+data[xloop].FoodName_E+"','"+pathimg+"',"+data[xloop].Food_Price+","+liveStation+",'"+liveStationdesc+"')");
                        yy.setAttribute("onclick", "OnChooseFood('"+data[xloop].FoodCode+"','"+data[xloop].FoodName+"','"+data[xloop].FoodName_E+"','"+pathimg+"',"+data[xloop].Food_Price+","+liveStation+",'"+liveStationdesc+"')");
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
}