var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();
    // console.log('now', now);
    
    // Find the distance between now and the count down date
    var get_timetoout = localStorage.getItem("Set_timetoout");
    var dtime = new Date(get_timetoout.replace(" ", "T"));
    var dt_timeout = new Date(get_timetoout).getTime();
    var distance = dtime - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    // document.getElementById("demo").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    // console.log('hours ',hours);
    if(hours > 0){
        minutes =  minutes + (hours*60);
    }
    document.getElementById("counttimeout").innerHTML = (minutes) + " : " + seconds;
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        //document.getElementById("counttimeout").innerHTML = "หมดเวลา";
        let chkmyLanguage = localStorage.getItem("Set_Language");
        if(chkmyLanguage == 'EN'){
            document.getElementById("counttimeout").innerHTML = "Out of time";
        }else{
            document.getElementById("counttimeout").innerHTML = "หมดเวลา";
        }
    }
}, 1000);