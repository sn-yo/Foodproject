function onclick1(){
    alert('');
    console.log('sss');
}

$.ajax({
    type: "GET",
    url: "http://103.58.151.121:8080/GetGroup",
    async: false,
    cache: false,
    success: function( response ) {
        // console.log( response );
        var cat_item = document.createElement('div');
        cat_item.className = "cat-slider";
        const data = response.data;
        for(var i=0; i < data.length; i++){
            var temp = document.getElementsByTagName("template")[0];
            // console.log('temp', temp.content);
            var menu = temp.content.firstElementChild.cloneNode(true);
            //console.log(data[i].Grp_ID);
            menu.setAttribute("id", "Grp_ID"+data[i].Grp_ID);
            // ชื่อเมนู
            menu.getElementsByClassName('m-0 small')[0].id = data[i].Grp_ID;
            menu.getElementsByClassName('m-0 small')[0].innerHTML = data[i].ShowName;

            menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_.html";
            menu.getElementsByClassName('href_catagory')[0].setAttribute('onclick', "OnClickCata('"+data[i].Grp_ID+"','"+data[i].ShowName+"')");
            
            if(data[i].Grp_ID == '1'){
                menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Steak.png";
                // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_steak.html";
                
            }else if(data[i].Grp_ID == '2'){
                menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Sandwich.png";
                // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_.html";
            }else if(data[i].Grp_ID == '3'){
                menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Salad.png";
                // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_somtumandyum.html";
            }else if(data[i].Grp_ID == '5'){
                menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Burger.png";
                // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_sushi.html";
            }else if(data[i].Grp_ID == '6'){
                menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Pizza.png";
                // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_dessert.html";
            }else if(data[i].Grp_ID == '7'){
                menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Salad.png";
                // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_salad.html";
            }else{
                menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Steak.png";
                menu.getElementsByClassName('href_catagory')[0].href = "#";
            }
            
            
            //console.log(menu.getElementsByClassName('m-0 small')[0].id);
            cat_item.appendChild(menu);
        }
        document.getElementById("container_point").appendChild(cat_item);
    }
});