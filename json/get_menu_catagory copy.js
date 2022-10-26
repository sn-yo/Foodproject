
$(document).ready(function(){
    // console.log( "ready!" );

    var yyy = document.getElementById("point");
    // console.log(typeof(yyy));
    // var xxx = yyy.getElementsByClassName("slick-list draggable");
    // console.log(typeof(xxx));
    var findmaster = yyy.getElementsByClassName("cat-item px-1 py-3");
    // console.log(findmaster);

    var point = yyy.getElementsByClassName("slick-track")[0];
    point.setAttribute("id", "mark");


    // console.log('point :', typeof(point));
    
    // console.log(point);
    // console.log(pointx);
    
    const data_signup = "http://103.82.248.28:8080/GetGroup";

    var getjson = {}

    fetch(data_signup)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            appendData(data)
        })
        .catch(function(err){
            console.log('error: ' + err)
        });

    // const response = await fetch(resource[data_signup, options]);

    // function currentloginid() {
    //     return fetch(data_signup, {
    //         method: 'GET',
    //       })
    //       .then(function(response) {
    //         return response.json();
    //       })
    //       .then(function(data) {
    //         //console.log(data);
    //         return data;
    //       })
    //   }
      
    //   console.log(currentloginid());


    function appendData(data){
        var main = document.getElementById("test");
        var main1 = document.querySelector("div#my_cata.cat-slider");

        // console.log(main1.children[0]);

        var main2 = main1.children[0];
        // console.log(main2.children[0]);
        var main3 = main2.children[0];

        // console.log(data);
        // console.log(data.data[0]);
        const GetCata = data.data;
        for(var i=0; i < GetCata.length; i++){
            // console.log(GetCata[i].ShowName);
            var new_row = document.createElement('div');
            // if(i == 0){
            //     new_row.className = "cat-item px-1 py-3 slick-slide slick-current slick-center";
            // }else{
            //     new_row.className = "cat-item px-1 py-3 slick-slide";
            // } 
            new_row.className = "cat-item px-1 py-3";
            // new_row.setAttribute("data-slick-index", i);
            // new_row.setAttribute("aria-hidden", "true");
            // new_row.setAttribute("tabindex", "0");

            var new_a = document.createElement('a');
            new_a.className = "bg-white rounded d-block p-2 text-center shadow-sm";

            var new_img = document.createElement("img");
            new_img.className = "img-fluid mb-2";
            new_img.src = "img/icons/Steak.png";

            var new_p = document.createElement("p");
            new_p.className = "m-0 small";
            new_p.innerHTML = GetCata[i].ShowName;

            // ประกอบแต่ละส่วน
            // new_a.appendChild(new_img);
            // new_a.appendChild(new_p);
            // new_row.appendChild(new_a);
            // main3.appendChild(new_row);

        }

            

        
        // console.log(point);
        // console.log(pointx);
        // var point2 = point.children[0];
        // var point3 = point2.children[0];

        // console.log(point.length);
        

        for(var i=0; i < GetCata.length; i++){
            var mark = document.getElementById("mark");
            // var master = document.getElementById("master").cloneNode(true);

            var temp = document.getElementsByTagName("template")[0];
            
            var master = temp.content.cloneNode(true);
            // document.body.appendChild(clon);

            console.log(master);
            // var temp = document.getElementById("temp");
            // console.log(master);
            //master.style.display = "block";
            // master.setAttribute("id", "master_"+i);
            // master.setAttribute("")
            //master.removeAttribute("style");

            // $("#master_"+i).show();

            // point.insertBefore(master,null);
            
            mark.appendChild(master);
            // console.log(point);
        }


    }
});

