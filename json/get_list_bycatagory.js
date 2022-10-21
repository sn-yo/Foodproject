function get_list(menu_id){
    $.ajax({
        type: "GET",
        url: "http://103.58.151.121:8080/GetMenu?FoodGroup="+menu_id,
        async: false,
        cache: false,
        success: function( response ) {
            console.log( response );
            var cat_item = document.createElement('div');
            cat_item.className = "cat-slider";
            const data = response.data;
    
        }
    });
}

