function onclick1(){
    alert('');
    console.log('sss');
}


const jsonUrl = "json/config.json";

$.ajax({
    type: "GET",
    url: jsonUrl,
    async: false,
    cache: false,
    success: function( response ) {
        // console.log(response.urlJson);
        let urlxJson = response.urlJson;
        loadPageGroupmenu(urlxJson);
    }
});

function loadPageGroupmenu(urlxJson){
    let xbookingid = localStorage.getItem("Set_bookingref");
    $.ajax({
        type: "GET",
        url: urlxJson+"GetGroup?BookingID="+xbookingid,
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
    
                // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_.html";
                menu.getElementsByClassName('href_catagory')[0].href = "#";
                menu.getElementsByClassName('href_catagory')[0].setAttribute('onclick', "OnClickCata('"+data[i].Grp_ID+"','"+data[i].ShowName+"','"+urlxJson+"')");
    
                // console.log(data[i].Grp_Image);
                
                // if(data[i].Grp_ID == '1'){
                //     menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Steak.png";
                //     // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_steak.html";
                    
                // }else if(data[i].Grp_ID == '2'){
                //     menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Sandwich.png";
                //     // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_.html";
                // }else if(data[i].Grp_ID == '3'){
                //     menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Salad.png";
                //     // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_somtumandyum.html";
                // }else if(data[i].Grp_ID == '5'){
                //     menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Burger.png";
                //     // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_sushi.html";
                // }else if(data[i].Grp_ID == '6'){
                //     menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Pizza.png";
                //     // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_dessert.html";
                // }else if(data[i].Grp_ID == '7'){
                //     menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Salad.png";
                //     // menu.getElementsByClassName('href_catagory')[0].href = "get_catagory_salad.html";
                // }else{
                //     menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/Steak.png";
                //     // menu.getElementsByClassName('href_catagory')[0].href = "#";
                // }
    
                menu.getElementsByClassName('pic_catagory')[0].src = "img/icons/"+data[i].Grp_Image;
                
                
                //console.log(menu.getElementsByClassName('m-0 small')[0].id);
                cat_item.appendChild(menu);
                
                
            }
            document.getElementById("container_point").appendChild(cat_item);
        }
    });

    
}

function OnClickCata(group_id, group_name, urlxJson){
    // alert(group_id);
    localStorage.setItem('group_id',group_id);
    localStorage.setItem('group_name',group_name);

    let xlastPage = localStorage.getItem("currPage");
    localStorage.setItem("lastPage", xlastPage);
    localStorage.setItem("currPage", group_id);

    let getBookingID = localStorage.getItem("Set_bookingref");
    let addUrl = "&BookingID="+getBookingID;
    let menu_id = group_id;
    // console.log(group_name);

    if(group_name == "Live Station"){
        // console.log('live station');
        $.ajax({
            type: "GET",
            url: urlxJson+"GetMenu?FoodGroup="+menu_id+addUrl,
            async: false,
            cache: false,
            success: function( response ) {
                document.getElementById("catagory_home_point").remove();                
                var cata_master = document.createElement("div");
                cata_master.className = "most_sale";
                cata_master.id = "catagory_home_point";
                document.getElementById("mainpoint").appendChild(cata_master);

                document.getElementById("catagory_first_point").remove();
                var cata_first_master = document.createElement("div");
                cata_first_master.className = "most_sale";
                cata_first_master.id = "catagory_first_point";
                document.getElementById("mainpoint").appendChild(cata_first_master);

                
                document.getElementById("cata_showgroupname").innerHTML = group_name;
                var masterdata = response.data;
                // console.log(masterdata);
                let curr_live = [];
                
                let unique = [...new Set(masterdata.map(item => item.SubGroupName))]
                // console.log(unique);


                for(var i=0;i<unique.length;i++){
                    // console.log(unique[i])
                    var create_header = document.createElement("div");
                    create_header.className = "pt-2 pb-3 title d-flex align-items-center";

                    var create_h5 = document.createElement("h5");
                    create_h5.className = "m-0";
                    create_h5.innerHTML = unique[i];

                    var xloop = 0;

                    let curr_livestation = masterdata.filter(item => item.SubGroupName == unique[i]);
                    // console.log(curr_livestation);

                    for(var xrow = 0; xrow < (curr_livestation.length/2); xrow++){
                        // console.log('xrow', xrow);
                        var row_mb = document.createElement('div');
                        row_mb.className = "row mb-3";

                        for(var j=0; j < 2; j++){
                            if(xloop < curr_livestation.length){
                                var temp = document.getElementsByTagName("template")[4];
                                var menu = temp.content.firstElementChild.cloneNode(true);

                                menu.setAttribute("id", "hGrp_ID"+curr_livestation[xloop].FoodCode);
                                // console.log('i'+i ," Grp_ID"+data[xloop].FoodCode);
                                // console.log('loop:', xloop + data[xloop].FoodCode);
                                menu.getElementsByClassName('text_name')[0].innerHTML = curr_livestation[xloop].FoodName;

                                menu.getElementsByClassName("home_shownameeng")[0].innerHTML = curr_livestation[xloop].FoodName_E;

                                var pathimg = "img/FoodImage/"+curr_livestation[xloop].Food_ImageName;
                                menu.getElementsByClassName('pic_catagory_steak')[0].src = pathimg;
            
                                //set
                                var xx = menu.getElementsByClassName("click_for_this")[0];
                                var yy = menu.getElementsByClassName('text_name')[0];
                                // console.log('xx', xx);
        
                                var liveStation = curr_livestation[xloop].LiveStation;
                                var liveStationdesc = curr_livestation[xloop].SubGroupName;
                                // console.log(liveStation)
                                
                                xx.setAttribute("onclick", "OnChooseFood('"+curr_livestation[xloop].FoodCode+"','"+curr_livestation[xloop].FoodName+"','"+curr_livestation[xloop].FoodName_E+"','"+pathimg+"',"+curr_livestation[xloop].Food_Price+","+liveStation+",'"+liveStationdesc+"')");
                                yy.setAttribute("onclick", "OnChooseFood('"+curr_livestation[xloop].FoodCode+"','"+curr_livestation[xloop].FoodName+"','"+curr_livestation[xloop].FoodName_E+"','"+pathimg+"',"+curr_livestation[xloop].Food_Price+","+liveStation+",'"+liveStationdesc+"')");
                                yy.href = "get_food.html"

                                var col_6_tag1 = document.createElement('div');
                                col_6_tag1.className = "col-6";
                                // col_6_tag1.innerHTML = "i="+xloop;
                                col_6_tag1.appendChild(menu);
                                row_mb.appendChild(col_6_tag1);
                            }
                            xloop += 1;

                        }
                        create_h5.appendChild(row_mb);
                    }

                    create_header.appendChild(create_h5);
                    document.getElementById("catagory_livestation_point").appendChild(create_header);
                }
            }
        });
    }else{
        $.ajax({
            type: "GET",
            url: urlxJson+"GetMenu?FoodGroup="+menu_id+addUrl,
            async: false,
            cache: false,
            success: function( response ) {
                // console.log(response);
                const data = response.data;
                // console.log(data);
                var xloop = 0;
    
                document.getElementById("cata_showgroupname").innerHTML = group_name;
                
                var homemaster = document.getElementById("catagory_home_point");
                homemaster.remove();
                // var xxx = document.getElementById("home1");
                // xxx.remove();
                // document.getElementById("catagory_home_point").removeChild("row mb-3");
    
                var cata_master = document.createElement("div");
                cata_master.className = "most_sale";
                cata_master.id = "catagory_home_point";
                document.getElementById("mainpoint").appendChild(cata_master);
    
                // document.getElementById("catagory_first_point").remove();
                // var maindata = document.getElementById("catagory_first_point");
                // console.log(maindata.childNodes[0]);
                // var xrow_mb = document.createElement('div');
                // xrow_mb.className = "row mb-3"; 
                // document.getElementById("catagory_first_point").replaceChild(xrow_mb, maindata);
    
                document.getElementById("catagory_first_point").remove();
                var cata_first_master = document.createElement("div");
                cata_first_master.className = "most_sale";
                cata_first_master.id = "catagory_first_point";
                document.getElementById("mainpoint").appendChild(cata_first_master);

                document.getElementById("catagory_livestation_point").remove();
                var cata_livestation_master = document.createElement("div");
                cata_livestation_master.className = "most_sale";
                cata_livestation_master.id = "catagory_livestation_point";
                document.getElementById("mainpoint").appendChild(cata_livestation_master);
    
    
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
                    document.getElementById("catagory_first_point").appendChild(row_mb);
                    // document.getElementById("catagory_first_point").replaceChild(row_mb, maindata.childNodes[0]);
                    // cata_master.appendChild(row_mb);
                }
            }
        });
    }
}