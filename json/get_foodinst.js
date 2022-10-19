const data_signup = "http://103.58.151.121:8080/GetFoodInst?FoodCode=3";

const data_getmenu = "http://103.58.151.121:8080/GetMenu";

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
    var mainContainer = document.getElementById("myCatagory");
    console.log(data.data);

    // var show_name = document.getElementById("ins_custname");
    // show_name.innerHTML = data.data[0].Cust_Name;

}


function chk_additem(){
    
    var get_val = document.getElementById("ins_qty").value;
    get_val = parseInt(get_val);

    if(get_val){
        get_val += 1;
        document.getElementById("ins_qty").value = get_val;
    }
    
}

function chk_delitem(){
    var get_val = document.getElementById("ins_qty").value;
    get_val = parseInt(get_val);

    if(get_val){
        if(get_val == 1){
            document.getElementById("ins_qty").value = 1;
        }else{
            get_val -= 1;
            document.getElementById("ins_qty").value = get_val;
        }
    }else{
        document.getElementById("ins_qty").value = 1;
    }
}

function clickconfirm(fooditem){
    if(fooditem == 3){
        var foodname = 'เนื้อวากิว MD';
        var chk_qty = document.getElementById("ins_qty").value;
        var chk_option = document.querySelector('input[name="option"]:checked');

        // console.log('chkbox',chk_option);

        var checkedValue = null; 
        var inputElements = document.getElementsByClassName('messageCheckbox');
        for(var i=0; inputElements[i]; ++i){
            if(inputElements[i].checked){
                checkedValue = inputElements[i].value;
                break;
            }
        }
        // console.log('chkb',checkedValue);

        
        localStorage.setItem('NickName', 'John');
        localStorage.setItem('FoodCode', fooditem);
        localStorage.setItem('FoodName', foodname);
        localStorage.setItem('FoodQty',chk_qty);
        localStorage.setItem('FoodInst',chk_option.value);
        localStorage.setItem('FoodImage', 'img/steak_wagu01.png');
        localStorage.setItem('FoodPrc',350);

    }else if(fooditem == 1070){
        var foodname = 'โรลแซลมอน';
        var chk_qty = document.getElementById("ins_qty").value;
        var chk_option = '';

        
        localStorage.setItem('NickName2', 'John');
        localStorage.setItem('FoodCode2', fooditem);
        localStorage.setItem('FoodName2', foodname);
        localStorage.setItem('FoodQty2',chk_qty);
        localStorage.setItem('FoodInst2',chk_option.value);
        localStorage.setItem('FoodImage2', 'img/sushi_salmon02.png');
        localStorage.setItem('FoodPrc2',30);
    }

}