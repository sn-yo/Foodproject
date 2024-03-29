let xbookingid = localStorage.getItem("Set_bookingref");
// console.log(xbookingid);

let jsonUrl2 = "json/config.json";
$.ajax({
    type: "GET",
    url: jsonUrl2,
    async: false,
    cache: false,
    success: function( response ) {
        // console.log(response.urlJson);
        let urlxJson = response.urlJson;
        onLoadPageMyorder(xbookingid, urlxJson);
    }
});

function onLoadPageMyorder(xbookingid, urlxJson){
    //console.log('load my order', urlxJson);
    //console.log('load my order', xbookingid);
    $.ajax({
        type: "GET",
        url: urlxJson+"GetHistory?BookingID="+xbookingid,
        async: false,
        cache: false,
        success: function( response ) {
            //console.log('chk');
            //console.log( response.data );
            var mydata = response.data;
            // console.log(mydata);
    
            for(var i=0; i<mydata.length; i++){
                var temp = document.getElementsByTagName("template")[0];
                var menu = temp.content.firstElementChild.cloneNode(true);
                
                menu.getElementsByClassName('myorder_showtime')[0].innerHTML = 'ORDER '+mydata[i].Time;
                menu.getElementsByClassName('myorder_showdate')[0].innerHTML = mydata[i].Date;
                menu.getElementsByClassName("myorder_showprc")[0].innerHTML = xFormatNumber(mydata[i].SumPrice);
                var myLanguage = localStorage.getItem("Set_Language");
                if(myLanguage == 'EN'){
                    var listfood = mydata[i].Detail_E;
                }else{
                    var listfood = mydata[i].Detail;
                }   
                
                // console.log(listfood);
                const myArray = listfood.split("/n");
                // console.log(myArray);
    
                         
    
                // document.getElementById("myorder_point").appendChild(menu);
    
                // var row_p = document.createElement("p");
                // row_p.className = "text- font-weight-bold mb-0";
                // row_p.innerHTML = myArray[i];
    
                // var point = document.getElementById("myorder_showlistfood"); 
                // point.appendChild(row_p); 
    
                var row1 = document.createElement("div");
                row1.className = "pb-3";
    
                var row2 = document.createElement("div");
                if(i % 2){
                    // console.log(i%2);
                    row2.className = "rounded shadow-sm bg-white";
                    // row2.style = "background-color: rgb(180, 255, 202)";
                }else{
                    row2.className = "rounded shadow-sm bg-white";
                    // row2.style = "background-color: rgb(64,224,208)";
                }
    
                var row3 = document.createElement("div");
                row3.className = "d-flex myorder_showmain";
                // row3.style = "background-color: #F5F5F5; padding: 15px 15px 1px 15px;";
    
                var row4 = document.createElement("div");
                var rowp1 = document.createElement("span");
                rowp1.className = "myorder_maindetail";
                if(myLanguage == 'EN'){
                    rowp1.innerHTML = "Khun "+mydata[i].Name+'<br/>'+'time of order '+mydata[i].Time;
                }else{
                    rowp1.innerHTML = "คุณ "+mydata[i].Name+'<br/>'+'เวลาที่สั่ง '+mydata[i].Time;
                }
    
                var row4_2 = document.createElement("div");
                row4_2.className = "ml-auto";
                var rowp1_2 = document.createElement("span");
                rowp1_2.className = "myorder_maindetail text-center";
                rowp1_2.innerHTML = mydata[i].Date;
    
                var xrow1 = document.createElement("div");
                xrow1.className  = "d-flex";
                xrow1.style = "background-color: #FFFAF0; padding:5px;";
    
                var xrow2 = document.createElement("div");
                xrow2.className  = "myorder_showdetail";
    
                var xrow3 = document.createElement("div");
                xrow3.className = "m-0 ml-auto mr-3 myorder_showdetail";
                // xrow3.style = "font-size: 20px; color: #633710;";
                if(myLanguage == 'EN'){
                    xrow3.innerHTML = "Total price<br/>";
                }else{
                    xrow3.innerHTML = "ราคารวม<br/>";
                }
    
                var row_span = document.createElement("span");
                row_span.className = "myorder_showsmprc myorder_showprc";
                // row_span.style = "font-size: 14px";
                if(myLanguage == 'EN'){
                    row_span.innerHTML = xFormatNumber(mydata[i].SumPrice)+" baht";
                }else{
                    row_span.innerHTML = xFormatNumber(mydata[i].SumPrice)+" บาท";
                }
                
    
                row4.appendChild(rowp1);
                row3.appendChild(row4);
    
                row4_2.appendChild(rowp1_2);
                row3.appendChild(row4_2);
    
                row2.appendChild(row3);
    
                
                for(var j=0; j<myArray.length; j++){
                    var rowp2 = document.createElement("p");
                    rowp2.className = "font-weight mb-0 myorder_showdetail";
                    // rowp2.style = "font-size: 12px";
                    rowp2.innerHTML = myArray[j];
                    xrow2.appendChild(rowp2);
                }
                xrow1.appendChild(xrow2);
                xrow3.appendChild(row_span);
                xrow1.appendChild(xrow3);
    
                row2.appendChild(xrow1);
                row1.appendChild(row2);
                
                document.getElementById("myorder_point").appendChild(row1);
            }
    
        }
    });
}


function xFormatNumber(number){
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number);
}