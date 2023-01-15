function clicktoHome(){
    // localStorage.setItem("currPage", 0);
    //menuyyyyyyyyyyyyyyyyyyy
    localStorage.setItem("group_id", 1);
    localStorage.setItem("currPage", 1);
    localStorage.setItem("group_name", localStorage.getItem("Set_menufirst"));
    localStorage.setItem("group_nameen", localStorage.getItem("Set_menufirsten"));
    // console.log('click to home');
}

function showqty_on_mycart(){
    let curr_mycart = JSON.parse(localStorage.getItem("cart"));
    let count_mycart = curr_mycart.length;
    
    let showqty = document.getElementById("showqty_mycart");
    console.log(showqty);
    showqty.classList.add("showqtyonmycartx");
    showqty.style.display = 'flex';
    showqty.innerHTML = count_mycart;
}


// function addHours(numOfHours, date = new Date()) {
//     date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

//     return date;
// }
// const result = addHours(2);
// // console.log('time',result);
// var now = new Date();
// // console.log('now',now.getTime());
// var dt_checkin = new Date("Nov 23, 2022 22:30");
// console.log('dt-checkin', dt_checkin);
// console.log(addHours(2, dt_checkin));
// var get_timetoout = localStorage.getItem("Set_timetoout");
// var dt_timeout = new Date(get_timetoout).getTime();
// console.log('dt_timeout', dt_timeout);

// const xdate = new Date('2022-11-23 23:30:00').getTime();
// console.log(xdate);

function get_languagehome(language, page){
    const jsonUrl = "json/config.json";
    const jsonUrldata = '';
    fetch(jsonUrl)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            const urlxJson = data.urlJson;
            if(page == 'home'){
                chk_languagehome(urlxJson, language);
            }else if(page == 'getfood'){
                chk_language_getfood(urlxJson, language);
            }else if(page == 'myorder'){
                chk_language_myorder(urlxJson, language);
            }else if(page == 'checkout'){
                chk_language_checkout(urlxJson, language);
            }else if(page == 'confirm'){
                chk_language_confirm(urlxJson, language);
            }else if(page == 'success'){
                chk_language_success(urlxJson, language);
            }

            getcopperconfig(urlxJson);
        })
        .catch(function(err){
            console.log('error: ' + err)
        })

    
}

function chk_languagehome(urlxJson, language){
    const data_language = urlxJson+"GetLanguage";

    $.ajax({
        type: "GET",
        url: data_language,
        async: false,
        cache: false,
        success: function( response ) {
            //console.log(response);
            // console.log('home',response.data);
            if(language == 'EN'){                
                document.getElementById("language_sir").innerHTML = response.data[6].Lang_EN+" ";
                document.getElementById("language_timeexp").innerHTML = response.data[7].Lang_EN+" ";
                document.getElementById("language_table").innerHTML = response.data[1].Lang_EN+" ";
                document.getElementById("language_minute").innerHTML = response.data[9].Lang_EN+" ";
                
                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_EN;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_EN;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_EN;


            }else{
                document.getElementById("language_sir").innerHTML = response.data[6].Lang_TH+" ";
                document.getElementById("language_timeexp").innerHTML = response.data[7].Lang_TH+" ";
                document.getElementById("language_table").innerHTML = response.data[1].Lang_TH+" ";
                document.getElementById("language_minute").innerHTML = response.data[9].Lang_TH+" ";

                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_TH;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_TH;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_TH;
            }
            
        }
    });

}

function chk_language_getfood(urlxJson, language){
    const data_language = urlxJson+"GetLanguage";

    $.ajax({
        type: "GET",
        url: data_language,
        async: false,
        cache: false,
        success: function( response ) {
            //console.log(response);
            // console.log('home',response.data);
            if(language == 'EN'){
                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_EN;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_EN;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_EN;
                
                document.getElementById("language_qty").style.display = "block";
                document.getElementById("language_qty").innerHTML = response.data[13].Lang_EN;
                document.getElementById("language_addfood").innerHTML = response.data[14].Lang_EN;
                document.getElementById("language_orderthisfood").innerHTML = response.data[15].Lang_EN;
                document.getElementById("language_chooseinst").innerHTML = response.data[16].Lang_EN;
            }else{
                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_TH;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_TH;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_TH;

                document.getElementById("language_qty").style.display = "block";
                document.getElementById("language_qty").innerHTML = response.data[13].Lang_TH;
                document.getElementById("language_addfood").innerHTML = response.data[14].Lang_TH;
                document.getElementById("language_orderthisfood").innerHTML = response.data[15].Lang_TH;
                document.getElementById("language_chooseinst").innerHTML = response.data[16].Lang_TH;
            }
            
        }
    });

}


function chk_language_myorder(urlxJson, language){
    const data_language = urlxJson+"GetLanguage";

    $.ajax({
        type: "GET",
        url: data_language,
        async: false,
        cache: false,
        success: function( response ) {
            //console.log(response);
            // console.log('home',response.data);
            if(language == 'EN'){
                document.getElementById("language_sir").innerHTML = response.data[6].Lang_EN+" ";
                document.getElementById("language_timeexp").innerHTML = response.data[7].Lang_EN+" ";
                document.getElementById("language_table").innerHTML = response.data[1].Lang_EN+" ";
                document.getElementById("language_minute").innerHTML = response.data[9].Lang_EN+" ";

                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_EN;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_EN;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_EN;

                document.getElementById("language_myorder").innerHTML = response.data[11].Lang_EN;
                
            }else{
                document.getElementById("language_sir").innerHTML = response.data[6].Lang_TH+" ";
                document.getElementById("language_timeexp").innerHTML = response.data[7].Lang_TH+" ";
                document.getElementById("language_table").innerHTML = response.data[1].Lang_TH+" ";
                document.getElementById("language_minute").innerHTML = response.data[9].Lang_TH+" ";

                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_TH;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_TH;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_TH;

                document.getElementById("language_myorder").innerHTML = response.data[11].Lang_TH;

            }
            
        }
    });

}

function chk_language_checkout(urlxJson, language){
    const data_language = urlxJson+"GetLanguage";

    $.ajax({
        type: "GET",
        url: data_language,
        async: false,
        cache: false,
        success: function( response ) {
            //console.log(response);
            // console.log('home',response.data);
            if(language == 'EN'){
                document.getElementById("language_sir").innerHTML = response.data[6].Lang_EN+" ";
                document.getElementById("language_timeexp").innerHTML = response.data[7].Lang_EN+" ";
                document.getElementById("language_table").innerHTML = response.data[1].Lang_EN+" ";
                document.getElementById("language_minute").innerHTML = response.data[9].Lang_EN+" ";

                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_EN;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_EN;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_EN;

                document.getElementById("language_listforchoose").innerHTML = response.data[12].Lang_EN;
                document.getElementById("language_countmenu").innerHTML = response.data[19].Lang_EN;
                document.getElementById("language_countqty").innerHTML = response.data[20].Lang_EN;
                document.getElementById("language_totalprc").innerHTML = response.data[21].Lang_EN;
                document.getElementById("language_txtmenu").innerHTML = response.data[22].Lang_EN;
                document.getElementById("language_txtqty").innerHTML = response.data[23].Lang_EN;
                document.getElementById("language_txtprc").innerHTML = response.data[24].Lang_EN;

                document.getElementById("language_choosemore").textContent = response.data[25].Lang_EN;
                document.getElementById("chk_beforeconfirm").textContent = response.data[26].Lang_EN;
                
            }else{
                document.getElementById("language_sir").innerHTML = response.data[6].Lang_TH+" ";
                document.getElementById("language_timeexp").innerHTML = response.data[7].Lang_TH+" ";
                document.getElementById("language_table").innerHTML = response.data[1].Lang_TH+" ";
                document.getElementById("language_minute").innerHTML = response.data[9].Lang_TH+" ";
                
                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_TH;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_TH;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_TH;

                document.getElementById("language_listforchoose").innerHTML = response.data[12].Lang_TH;
                document.getElementById("language_countmenu").innerHTML = response.data[19].Lang_TH;
                document.getElementById("language_countqty").innerHTML = response.data[20].Lang_TH;
                document.getElementById("language_totalprc").innerHTML = response.data[21].Lang_TH;
                document.getElementById("language_txtmenu").innerHTML = response.data[22].Lang_TH;
                document.getElementById("language_txtqty").innerHTML = response.data[23].Lang_TH;
                document.getElementById("language_txtprc").innerHTML = response.data[24].Lang_TH;

                document.getElementById("language_choosemore").textContent = response.data[25].Lang_TH;
                document.getElementById("chk_beforeconfirm").textContent = response.data[26].Lang_TH;

            }
            
        }
    });

}

function chk_language_confirm(urlxJson, language){
    const data_language = urlxJson+"GetLanguage";

    $.ajax({
        type: "GET",
        url: data_language,
        async: false,
        cache: false,
        success: function( response ) {
            //console.log(response);
            // console.log('home',response.data);
            if(language == 'EN'){
                document.getElementById("language_sir").innerHTML = response.data[6].Lang_EN+" ";
                document.getElementById("language_timeexp").innerHTML = response.data[7].Lang_EN+" ";
                document.getElementById("language_table").innerHTML = response.data[1].Lang_EN+" ";
                document.getElementById("language_minute").innerHTML = response.data[9].Lang_EN+" ";

                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_EN;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_EN;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_EN;

                document.getElementById("language_confirmorder").innerHTML = response.data[27].Lang_EN;
                document.getElementById("chk_beforesuccees").textContent = response.data[27].Lang_EN;

                document.getElementById("language_showqty").innerHTML = response.data[22].Lang_EN;
                document.getElementById("language_totalprc").innerHTML = response.data[28].Lang_EN;
                document.getElementById("language_term").innerHTML = response.data[29].Lang_EN;
                document.getElementById("language_term1").innerHTML = response.data[30].Lang_EN;
                document.getElementById("language_term2").innerHTML = response.data[31].Lang_EN;
                document.getElementById("language_term3").innerHTML = response.data[32].Lang_EN;
                
            }else{
                document.getElementById("language_sir").innerHTML = response.data[6].Lang_TH+" ";
                document.getElementById("language_timeexp").innerHTML = response.data[7].Lang_TH+" ";
                document.getElementById("language_table").innerHTML = response.data[1].Lang_TH+" ";
                document.getElementById("language_minute").innerHTML = response.data[9].Lang_TH+" ";
                
                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_TH;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_TH;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_TH;

                document.getElementById("language_confirmorder").innerHTML = response.data[27].Lang_TH;
                document.getElementById("chk_beforesuccees").textContent = response.data[27].Lang_TH;

                document.getElementById("language_showqty").innerHTML = response.data[22].Lang_TH;
                document.getElementById("language_totalprc").innerHTML = response.data[28].Lang_TH;
                document.getElementById("language_term").innerHTML = response.data[29].Lang_TH;
                document.getElementById("language_term1").innerHTML = response.data[30].Lang_TH;
                document.getElementById("language_term2").innerHTML = response.data[31].Lang_TH;
                document.getElementById("language_term3").innerHTML = response.data[32].Lang_TH;

            }
            
        }
    });

}

function chk_language_success(urlxJson, language){
    const data_language = urlxJson+"GetLanguage";

    $.ajax({
        type: "GET",
        url: data_language,
        async: false,
        cache: false,
        success: function( response ) {
            //console.log(response);
            // console.log('home',response.data);
            if(language == 'EN'){
                document.getElementById("language_sir").innerHTML = response.data[6].Lang_EN+" ";
                document.getElementById("language_timeexp").innerHTML = response.data[7].Lang_EN+" ";
                document.getElementById("language_table").innerHTML = response.data[1].Lang_EN+" ";
                document.getElementById("language_minute").innerHTML = response.data[9].Lang_EN+" ";

                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_EN;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_EN;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_EN;

                document.getElementById("language_confirmorder").innerHTML = response.data[33].Lang_EN;
                document.getElementById("language_pleasewait").innerHTML = response.data[34].Lang_EN;
                
            }else{
                document.getElementById("language_sir").innerHTML = response.data[6].Lang_TH+" ";
                document.getElementById("language_timeexp").innerHTML = response.data[7].Lang_TH+" ";
                document.getElementById("language_table").innerHTML = response.data[1].Lang_TH+" ";
                document.getElementById("language_minute").innerHTML = response.data[9].Lang_TH+" ";
                
                document.getElementById("language_bthome").innerHTML = response.data[10].Lang_TH;
                document.getElementById("language_btmyorder").innerHTML = response.data[11].Lang_TH;
                document.getElementById("language_btmychoose").innerHTML = response.data[12].Lang_TH;

                document.getElementById("language_confirmorder").innerHTML = response.data[33].Lang_TH;
                document.getElementById("language_pleasewait").innerHTML = response.data[34].Lang_TH;

            }
            
        }
    });

}

function getcopperconfig(urlxJson){
    const data_copperconfig = urlxJson+"GetConfig";

    $.ajax({
        type: "GET",
        url: data_copperconfig,
        async: false,
        cache: false,
        success: function( response ) {
            //console.log(response.data[0]);
            let maxperorder = response.data[0].MaxPerOrder;
            let maxperqty = response.data[0].MaxPerQty;

            localStorage.setItem("maxperorder", maxperorder);
            localStorage.setItem("maxperqty", maxperqty);
        }
    });

}