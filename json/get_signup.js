function checkin(bookingid){
    const data_signup = "http://103.58.151.121:8080/Checkin?BookingID="+bookingid;

    fetch(data_signup)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            appendData(data)
        })
        .catch(function(err){
            // console.log('error: ' + err)
            chkbooking(err, bookingid);
        })
}

function chkbooking(err, bookingid){
    // alert('ไม่สามารถใช้ได้ '+err);
    document.getElementById("bookingref").innerHTML = bookingid;
    $('#my_message').modal('show');
}

function appendData(data){
    console.log(data);
    var mainContainer = document.getElementById("myCatagory");
    // console.log(data.data);

    var show_name = document.getElementById("ins_custname");
    show_name.innerHTML = data.data[0].Cust_Name;

    var show_promote = document.getElementById("ins_promote");
    show_promote.innerHTML = data.data[0].Package_Name;

    var show_tableno = document.getElementById("ins_tableno");
    show_tableno.value = data.data[0].TableNo;

    var show_time = document.getElementById("ins_timebook");
    show_time.value = data.data[0].Round_Time;

    var inv_no = document.getElementById("ins_invno");
    inv_no.value = data.data[0].Inv_No;

    var booking_ref = document.getElementById("booking_ref");
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