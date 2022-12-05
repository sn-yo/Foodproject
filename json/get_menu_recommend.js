const jsonUrl2 = "json/config.json";
function shownotify2(){
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
        // console.log('onclickback');
        let local_lastpage = localStorage.getItem("lastPage");
        let local_currpage = localStorage.getItem("currPage");
        let group_name = localStorage.getItem("group_name");
        // console.log(local_currpage);
        if(local_currpage == 0 || local_currpage == null){
            //menuyyyyyyyyyyyyyyyyyyy
            //loadPageGetRecommend(urlxJson);
            console.log('grp name',group_name);
            loadPageGetCatagory_bylastpage(urlxJson, group_name);
        }else{
            loadPageGetCatagory_bylastpage(urlxJson, group_name);
            // console.log('loadpagegetcatagory');
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
                        // menu.getElementsByClassName("home_shownameeng")[0].innerHTML = data[xloop].FoodName_E;
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

                                // menu.getElementsByClassName("home_shownameeng")[0].innerHTML = curr_livestation[xloop].FoodName_E;

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

                console.log('show grp name');
                
                var myLanguage = localStorage.getItem("Set_Language");
                if(myLanguage == 'EN'){
                    var show_groupname = localStorage.getItem("group_nameen");
                    console.log('sss', show_groupname);
                    if(show_groupname == '' || show_groupname == null){
                        var showfirst_groupname = localStorage.getItem("Set_menufirsten");
                        document.getElementById("cata_showgroupname").innerHTML = showfirst_groupname;
                    }else{
                        var showfirst_groupname = localStorage.getItem("Set_menufirst");
                        document.getElementById("cata_showgroupname").innerHTML = show_groupname;
                    }
                }else{
                    if(show_groupname == '' || show_groupname == null){
                        var showfirst_groupname = localStorage.getItem("Set_menufirst");
                        // console.log('show grp name2 = null', showfirst_groupname);         
                        document.getElementById("cata_showgroupname").innerHTML = showfirst_groupname;
                    }else{
                        document.getElementById("cata_showgroupname").innerHTML = show_groupname;
                    }
                }
                // console.log('this', show_groupname);

                let xmenu_recommend = document.getElementById("menucata0");
                // console.log(xmenu_recommend);
                //menuyyyyyyyyyyyyyyyyyyy
                //xmenu_recommend.classList.remove("active");
                

                var show_groupid = localStorage.getItem("group_id");
                // console.log('group id', show_groupid);
                // var xlistmenu = 7;
                // var xxthis = parseInt(xlistmenu) / 4;                
                // console.log('xxthis',xxthis);

                
                // let xpage_cata0 = document.getElementById("Grp_ID_recommend");
                // let xpage_cata1 = document.getElementById("Grp_ID1");
                // let xpage_cata2 = document.getElementById("Grp_ID2");
                // let xpage_cata3 = document.getElementById("Grp_ID3");
                //
                // let xpage_cata4 = document.getElementById("Grp_ID4");
                // let xpage_cata5 = document.getElementById("Grp_ID5");
                // let xpage_cata6 = document.getElementById("Grp_ID6");
                // let xpage_cata7 = document.getElementById("Grp_ID7");
                // xpage_cata0.className = "cat-item px-1 slick-slide";
                // xpage_cata1.className = "cat-item px-1 slick-slide";
                // xpage_cata2.className = "cat-item px-1 slick-slide";
                // xpage_cata3.className = "cat-item px-1 slick-slide";
                // $('.cat-slider').slick('slickGoTo');
                // var currentSlide = $('.cat-slider').slick('slickCurrentSlide');
                // var cata7 = xpage_cata7.getAttribute("aria-hidden");
                // console.log(cata7);

                // xpage_cata0.setAttribute("aria-hidden", "true");
                // xpage_cata1.setAttribute("aria-hidden", "true");
                // xpage_cata2.setAttribute("aria-hidden", "true");
                // xpage_cata3.setAttribute("aria-hidden", "true");

                // xpage_cata4.setAttribute("aria-hidden", "false");
                // xpage_cata5.setAttribute("aria-hidden", "false");
                // xpage_cata6.setAttribute("aria-hidden", "false");
                // xpage_cata7.setAttribute("aria-hidden", "false");

                let xmenu_recommend_list = document.getElementById("menucata"+show_groupid);
                // console.log(xmenu_recommend_list);
                xmenu_recommend_list.className = "btn btn-info-copper active href_catagory";
    
                
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
                            if(myLanguage == 'EN'){
                                menu.getElementsByClassName('text_name')[0].innerHTML = data[xloop].FoodName_E;
                            }else{
                                menu.getElementsByClassName('text_name')[0].innerHTML = data[xloop].FoodName;
                            }
                            // menu.getElementsByClassName("home_shownameeng")[0].innerHTML = data[xloop].FoodName_E;
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

    let myLanguage = localStorage.getItem("Set_Language");
    if(myLanguage == 'EN'){
        txtshownoti = "select food order : "+count_mycart+" item";
    }else{
        txtshownoti = "รายการอาหารที่เลือก : "+count_mycart+" รายการ";
    }

    $(".notify_message").notify({
            item1 : txtshownoti,
            p1: "                       ",
            item2 : "฿"+sum_prc,
        },            
        {
            
            position : "top",
            autoHide : false,
            style: 'bootstrap',
            className: 'copper',
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