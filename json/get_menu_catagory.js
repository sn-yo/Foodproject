const data_signup = "http://103.58.151.121:8080/GetGroup";

fetch(data_signup)
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
    console.log(data);

    // var cata_1 = document.getElementById("cata_1");
    // cata_1.innerHTML = data.data[0].ShowName;

    // var cata_2 = document.getElementById("cata_2");
    // cata_2.innerHTML = data.data[1].ShowName;

    // var cata_3 = document.getElementById("cata_3");
    // cata_3.innerHTML = data.data[2].ShowName;

    // var cata_4 = document.getElementById("cata_4");
    // cata_4.innerHTML = data.data[3].ShowName;

    // var cata_5 = document.getElementById("cata_5");
    // cata_5.innerHTML = data.data[4].ShowName;

    // var cata_6 = document.getElementById("cata_6");
    // cata_6.innerHTML = data.data[5].ShowName;


}