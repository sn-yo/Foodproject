fetch('people.json')
    .then(function (response){
        return response.json()
    })
    .then(function (data){
        appendData(data)
    })
    .catch(function(err){
        console.log('error: ' + err)
    })

function appendData(data){
    // console.log(data);
    // console.log(data.data);
    //console.log(data.data[0].Grp_Name);
    //console.log(data.data[0].ShowName);
    var alldata = data.data;
    // console.log('all :',alldata);

    // var mainContainer = document.getElementById("myCatagory");
    // console.log('main',mainContainer);

    // for(var i = 0; i < alldata.length; i++){

    //     var cat_main = document.createElement("div");
    //     cat_main.className = "cat-slider slick-initialized slick-slider";
        
    //     var cat_div = document.createElement("div");
    //     cat_div.className = "cat-item px-1 py-3 ";
    //     cat_div.id = "cat"+alldata[i].Grp_ID;

    //     var cat_ahef = document.createElement("a");
    //     cat_ahef.className = "bg-white rounded d-block p-2 text-center shadow-sm";
    //     cat_ahef.href = "#";

    //     var cat_img = document.createElement("img");
    //     cat_img.className = "img-fluid mb-2";
    //     cat_img.src = alldata[i].Grp_Image;

    //     var cat_p = document.createElement("p");
    //     cat_p.className = "m-0 small";

        
    //     cat_p.innerHTML = alldata[i].ShowName;
    //     cat_ahef.appendChild(cat_img);
    //     cat_ahef.appendChild(cat_p);
    //     cat_div.appendChild(cat_ahef);
    //     cat_main.appendChild(cat_div);
    //     mainContainer.appendChild(cat_main);
    // }

    var mainContainer = document.getElementById("myCatagory");

    
    var cat_main = document.createElement("div");
    cat_main.className = "cat-slider slick-initialized slick-slider";

    var cat_detail1 = document.createElement("div");
    cat_detail1.className = "slick-list draggable";    

    var cat_detail2 = document.createElement("div");
    cat_detail2.className = "slick-track";

    

    for(var i = 0; i < alldata.length; i++){

        
        
        var cat_div = document.createElement("div");
        cat_div.className = "cat-item px-1 py-3 ";
        cat_div.id = "cat"+alldata[i].Grp_ID;

        var cat_ahef = document.createElement("a");
        cat_ahef.className = "bg-white rounded d-block p-2 text-center shadow-sm";
        cat_ahef.href = "#";

        var cat_img = document.createElement("img");
        cat_img.className = "img-fluid mb-2";
        cat_img.src = alldata[i].Grp_Image;

        var cat_p = document.createElement("p");
        cat_p.className = "m-0 small";

        
        cat_p.innerHTML = alldata[i].ShowName;
        cat_ahef.appendChild(cat_img);
        cat_ahef.appendChild(cat_p);
        cat_div.appendChild(cat_ahef);
        cat_detail2.appendChild(cat_div);
        cat_detail1.appendChild(cat_detail2);
        cat_main.appendChild(cat_detail1);
        mainContainer.appendChild(cat_main);
    }

    // cat_detail1.appendChild(cat_detail2);
    // cat_main.appendChild(cat_detail1);
    // mainContainer.appendChild(cat_main);


    
    
}