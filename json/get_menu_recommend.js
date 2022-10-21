$.ajax({
    type: "GET",
    url: "http://103.58.151.121:8080/GetRecommend",
    async: false,
    success: function( response ) {
        //console.log( response );
        var cat_item = document.createElement('div');
        cat_item.className = "trending-slider rounded";
        const data = response.data;
        // console.log(data);
        for(var i=0; i < data.length; i++){
            var temp = document.getElementsByTagName("template")[1];
            // console.log('temp rec', temp.content);

            var menu = temp.content.firstElementChild.cloneNode(true);
            // console.log('menu', menu);

            //console.log(data[i].Grp_ID);
            menu.setAttribute("id", "recommend_"+data[i].FoodCode);
            // ชื่อเมนู
            menu.getElementsByClassName('text-black')[0].id = data[i].FoodCode;
            menu.getElementsByClassName('text-black')[0].innerHTML = data[i].FoodName;
            var pathimg = "img/FoodImage/"+data[i].Food_ImageName
            menu.getElementsByClassName('pic_reccomend')[0].src = pathimg;

            //set
            var xx = menu.getElementsByClassName("click_for_this")[0];
            // console.log('xx', xx);
            xx.setAttribute("food", "xxxxx");
            xx.setAttribute("onclick", "OnBeforeClick('"+data[i].FoodCode+"','"+data[i].FoodName+"','"+pathimg+"')");
            
                        
            
            //console.log(menu.getElementsByClassName('m-0 small')[0].id);
            cat_item.appendChild(menu);
        }
        document.getElementById("recommend_point").appendChild(cat_item);
    }
});