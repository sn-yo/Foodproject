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