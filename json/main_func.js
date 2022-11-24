function clicktoHome(){
    localStorage.setItem("currPage", 0);
    console.log('click to home');
}

function showqty_on_mycart(){
    let curr_mycart = JSON.parse(localStorage.getItem("cart"));
    let count_mycart = curr_mycart.length;
    
    let showqty = document.getElementById("showqty_mycart");
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
