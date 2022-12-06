function testorder(){
    $.ajax({
        type: "GET",
        url: "http://103.58.151.121:8080/GetHistory?BookingID=553695",
        async: false,
        cache: false,
        success: function( response ) {
            console.log(response);
        }
    });
}

function testorder2(){
    fetch("http://103.58.151.121:8080/GetHistory?BookingID=553723")
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            // console.log('success: ' + data.data)
            appendData(data);
        })
        .catch(function(err){
            console.log('error: ' + err)
            // chkbooking(err, bookingid, pathname);
        })
}


testorder2();

function appendData(data){
    console.log(data);
}