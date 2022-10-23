const urlhistory = "http://103.58.151.121:8080/GetHistory?BookingID=553706";

$.ajax({
    type: "GET",
    url: urlhistory,
    async: false,
    cache: false,
    success: function( response ) {
        // console.log( response.data );
        var mydata = response.data;
        console.log(mydata);

        

        // var oldname = '';
        // var namegroup = []
        // var namelist = {}
        // for(var i = 0; i<mydata.length; i++){
        //     if(oldname != mydata[i].NickName){
        //         namelist = {
        //             "NickName" : mydata[i].NickName
        //         }
        //         namegroup.push(namelist);
        //         oldname = mydata[i].NickName;
        //     }
        // }
        // console.log(namegroup);

        // var aquaticCreatures =  mydata.filter(function(item) {
        //     // console.log(namegroup);
        //     return item.NickName == namegroup[0].NickName;
        // });
          
        // console.log(aquaticCreatures);
        // var foodall = []
        // for(var j=0; j<aquaticCreatures.length; j++){
        //     var fooditem = {
        //         "FoodCode" : aquaticCreatures[j].FoodCode,
        //         "FoodName" : aquaticCreatures[j].FoodName
        //     }
        //     foodall.push(fooditem)
        // }

        // var xx = [
        //     {
        //         "NickName" : namegroup[0].NickName,
        //         "item" : {
        //             "FoodCode" : foodall
        //         }
        //     }
        // ]

        // console.log(xx);

        
        // console.log(totaldata);
    }
});