$.ajax({
    type: "GET",
    url: "http://103.58.151.121:8080/GetPopular",
    async: false,
    success: function( response ) {
        //console.log( response );
        var cat_item = document.createElement('div');
        cat_item.className = "trending-slider rounded";
        const data = response.data;
        // console.log(data);
        for(var i=0; i < data.length; i++){
            var temp = document.getElementsByTagName("template")[2];
            // console.log('temp rec', temp.content);

            var menu = temp.content.firstElementChild.cloneNode(true);
            // console.log('menu', menu);

            //console.log(data[i].Grp_ID);
            menu.setAttribute("id", "mostpopular_"+data[i].FoodCode);
            // ชื่อเมนู
            menu.getElementsByClassName('text-black')[0].id = data[i].FoodCode;
            menu.getElementsByClassName('text-black')[0].innerHTML = data[i].FoodName;
            menu.getElementsByClassName('pic_mostpopular')[0].src = "img/FoodImage/"+data[i].Food_ImageName;
            
                        
            
            //console.log(menu.getElementsByClassName('m-0 small')[0].id);
            cat_item.appendChild(menu);
        }
        document.getElementById("mostpopular_point").appendChild(cat_item);
    }
});