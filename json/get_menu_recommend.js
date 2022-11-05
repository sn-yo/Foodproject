const jsonUrl2 = "json/config.json";
function shownotify(){
    console.log('show noti');
    document.getElementsByClassName("notify_message").notify('55555555556');
    // $(".notify_message").notify(
    //     "2 item    250฿",
    //     {
    //         position : "top right",
    //         autoHide : false
    //     }
    // );
}

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
        let group_name = localStorage.getItem("group_name");
        console.log(local_currpage);
        if(local_currpage == 0){
            loadPageGetRecommend(urlxJson);
        }else{
            loadPageGetCatagory_bylastpage(urlxJson, group_name);
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
            // setTimeout(shownotify(), 5000);
    
        }
    });
}

function loadPageGetCatagory_bylastpage(urlxJson, group_name){
    let getBookingID = localStorage.getItem("Set_bookingref");
    let addUrl = "&BookingID="+getBookingID;
    let menu_id = localStorage.getItem("currPage");
    let menucata_name = localStorage.getItem("group_name");

    if(menucata_name == "Live Station"){
        // console.log('menucata_name live station');
        
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
    
}

function xFormatNumber(number){
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number);
}

function shownotify(){
    let curr_mycart = JSON.parse(localStorage.getItem("cart"));
    let count_mycart = curr_mycart.length;
    let count_prc = curr_mycart.map(function(item){
        return parseFloat(item.prc)*parseInt(item.qty);
    });
    
    let sum_prc = count_prc.reduce(function(prev, next){
        return prev + next;
    }, 0);  

    $(".notify_message").notify({
            item1 : count_mycart+" Item",
            p1: "                       ",
            item2 : sum_prc + " ฿",
        },            
        {
            
            position : "top",
            autoHide : false,
            style: 'bootstrap',
            className: 'success2',
            arrowShow: false,
        }
    );

    // $(".notify_message").notify("xxxx", "success");
    // $.notify.addStyle('happyblue', {
    //     html: "<div>☺<span data-notify-text/>☺</div>",
    //     classes: {
    //       base: {
    //         "white-space": "nowrap",
    //         "background-color": "lightblue",
    //         "padding": "5px"
    //       },
    //       superblue: {
    //         "color": "white",
    //         "background-color": "blue"
    //       }
    //     }
    //   });
    // console.log('show data');
    // alert('123');

    // $('#showtoast').toast('show');
}