function get_language(language){
    const jsonUrl = "json/config.json";
    const jsonUrldata = '';
    fetch(jsonUrl)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            const urlxJson = data.urlJson;
            chk_language(urlxJson, language);
        })
        .catch(function(err){
            console.log('error: ' + err)
        })

    
}

function chk_language(urlxJson, language){
    const data_language = urlxJson+"GetLanguage";

    $.ajax({
        type: "GET",
        url: data_language,
        async: false,
        cache: false,
        success: function( response ) {
            //console.log(response);
            // console.log(response.data);
            if(language == 'EN'){
                document.getElementById("setlanguage_th").className = "setth";
                document.getElementById("setlanguage_en").className = "seten_active";
                localStorage.setItem("Set_Language", "EN");
                
                document.getElementById("ins_newname").placeholder = response.data[0].Lang_EN;
                document.getElementById("language_table").innerHTML = response.data[1].Lang_EN;
                document.getElementById("language_time").innerHTML = response.data[2].Lang_EN;
                document.getElementById("language_person").innerHTML = response.data[3].Lang_EN;
                document.getElementById("language_package").innerHTML = response.data[4].Lang_EN;
                document.getElementById("language_btstart").innerText = response.data[5].Lang_EN;
            }else{
                document.getElementById("setlanguage_th").className = "setth_active";
                document.getElementById("setlanguage_en").className = "seten";
                localStorage.setItem("Set_Language", "TH");
                // console.log('set language');

                document.getElementById("ins_newname").placeholder = response.data[0].Lang_TH;
                document.getElementById("language_table").innerHTML = response.data[1].Lang_TH;
                document.getElementById("language_time").innerHTML = response.data[2].Lang_TH;
                document.getElementById("language_person").innerHTML = response.data[3].Lang_TH;
                document.getElementById("language_package").innerHTML = response.data[4].Lang_TH;
                document.getElementById("language_btstart").innerText = response.data[5].Lang_TH;
            }
            
        }
    });

}