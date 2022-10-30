const jsonUrl2 = "json/config.json";

$.ajax({
    type: "GET",
    url: jsonUrl2,
    async: false,
    cache: false,
    success: function( response ) {
        // console.log(response.urlJson);
        let urlxJson = response.urlJson;
        console.log('onclickback');
        let local_lastpage = localStorage.getItem("lastPage");
        let local_currpage = localStorage.getItem("currPage");
        console.log(local_currpage);
        if(local_currpage == 0){
            loadPageGetRecommend(urlxJson);
        }else{
            loadPageGetCatagory_bylastpage();
        }
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
                row_mb.id = "home"+(xrow+1);    
                
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

function loadPageGetCatagory_bylastpage(){
    let getBookingID = localStorage.getItem("Set_bookingref");
    let addUrl = "&BookingID="+getBookingID;
    let menu_id = localStorage.getItem("currPage");

    let urlxJson = "http://103.58.151.121:8080/";

    $.ajax({
        type: "GET",
        url: urlxJson+"GetMenu?FoodGroup="+menu_id+addUrl,
        async: false,
        cache: false,
        success: function( response ) {
            // console.log(response);
            const data = response.data;
            // console.log(data.length);
            var xloop = 0;

            var show_groupname = localStorage.getItem("group_name");
            document.getElementById("cata_showgroupname").innerHTML = show_groupname;

            
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