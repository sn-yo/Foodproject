function checkin(bookingid, pathname, urlxJson){
    // const mainUrl = resultData(0);
    // console.log(urlxJson);
    const data_signup = urlxJson+"Checkin?BookingID="+bookingid;
    // console.log('url',data_signup);

    // fetch(data_signup)
    //     .then(function (response){
    //         return response.json()
    //     })
    //     .then(function (data){
    //         // console.log('success: ' + data)
    //         appendData(data, bookingid, pathname);
    //     })
    //     .catch(function(err){
    //         // console.log('error: ' + err)
    //         chkbooking(err, bookingid, pathname);
    //     })

    $.ajax({
        type: "GET",
        url: data_signup,
        async: false,
        cache: false,
        success: function( response ) {
            // console.log(response);
            // console.log(response.data);
            if(response.status == 'True'){
                appendData(response, bookingid, pathname);
            }else{
                chkbooking(response.data, bookingid, pathname);
            }
        }
    });
}



function chkbooking(err, bookingid, pathname){
    // alert('ไม่สามารถใช้ได้ '+err);
    document.getElementById("bookingref").innerHTML = bookingid;
    // console.log('error');
    // console.log(pathname);
    window.location.href = "page_error.html"+pathname;
    // $('#my_message').modal('show');
}

function appendData(data, bookingid, pathname){
    console.log(data.data[0]);
    if(data.status == "False"){        
        // console.log(pathname);
        window.location.href = "page_error.html"+pathname;
    }

    // var show_name = document.getElementById("ins_custname");
    // show_name.innerHTML = data.data[0].Cust_Name;

    var show_promote = document.getElementById("ins_promote");
    show_promote.innerHTML = data.data[0].Package_Name;

    var show_tableno = document.getElementById("ins_tableno");
    show_tableno.innerHTML = data.data[0].TableNo;
    document.getElementById("hdtableno").value = data.data[0].TableNo;

    var show_time = document.getElementById("ins_timebook");
    show_time.innerHTML = data.data[0].Round_Time;

    document.getElementById("ins_adult").innerHTML = data.data[0].adult;

    var ins_newname = document.getElementById("ins_newname").value;
    
    var inv_no = document.getElementById("hdins_invno");
    inv_no.value = data.data[0].Inv_No;

    var booking_ref = document.getElementById("hdbooking_ref");
    booking_ref.value = data.data[0].Booking_Ref;
    
    
}

function myFunction() {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("ins_newname").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (isNaN(x) || x == "") {
      text = "<font class='color:red;'>กรุณาระบุชื่อ</font>";
    } else {
      text = "Input OK";
    }
    document.getElementById("demo").innerHTML = text;
}

function validateForm() {
    let x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
}