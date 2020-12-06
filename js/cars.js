$(function(){ 
    var table = $("#table");
    $("#edit").hide();
    $("#cancel").hide();
    $("#delete").hide();

    $.ajax({
        type:"GET",
        url: "https://webtechcars.herokuapp.com/api/cars",
        success: function(data){
            for(var i in data){
                table.append("<tr><td>" + data[i].name +
                            "</td><td>" + data[i].consumption +
                            "</td><td>" + data[i].color + 
                            "</td><td>" + data[i].manufacturer + 
                            "</td><td>" + (data[i].available==undefined ? data[i].avaiable : data[i].available) +
                            "</td><td>" + data[i].year +
                            "</td><td>" + data[i].horsepower +
                            "</td><td id='edit' dataid='" + data[i]._id + "'>Edit" + 
                            "</td></tr>");
            }
        },
        error: function(){
            alert("error loading database");
        }
    });

    $("#add").on("click",function(){
        var carData = JSON.stringify({
            "name":$("#name").val(),
            "consumption":$("#consumption").val(),
            "color":$("#color").val(),
            "manufacturer":$("#manufacturer").val(),
            "avaiable":$("#available").val(),
            "year":$("#year").val(),
            "horsepower":$("#horsepower").val()
        });

        $.ajax({
            type:"POST",
            url: "https://webtechcars.herokuapp.com/api/cars",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data:carData,
            contentType:"application/json",
            success: function()
            {
                $("#content").load("cars.html");
            },
            error: function(){
                alert("error loading database");
            }
        })
    });

    table.on("click","#edit",function(){
        $("#add").hide();
        $("#edit").show();
        $("#cancel").show();
        $("#delete").show();
        $("#edit").attr("dataid",$(this).attr("dataid"));
        $("#delete").attr("dataid",$(this).attr("dataid"));

        $("#name").val($(this).parent().children()[0].outerText);
        $("#consumption").val($(this).parent().children()[1].outerText);
        $("#color").val($(this).parent().children()[2].outerText);
        $("#manufacturer").val($(this).parent().children()[3].outerText);
        $("#available").val($(this).parent().children()[4].outerText);
        $("#year").val($(this).parent().children()[5].outerText);
        $("#horsepower").val($(this).parent().children()[6].outerText);
    });

    $("#cancel").on("click",function(){
        $("#edit").hide();
        $("#cancel").hide();
        $("#delete").hide();
        $("#add").show();

        $("#name").val("")
        $("#consumption").val(""),
        $("#color").val(""),
        $("#manufacturer").val(""),
        $("#available").val(""),
        $("#year").val(""),
        $("#horsepower").val("")
    });

    $("#delete").on("click",function(){
        del($(this).attr("dataid"));
    });

    $("#edit").on("click", function(){
        del($(this).attr("dataid"));

        var car = JSON.stringify({
            "name":$("#name").val(),
            "consumption":$("#consumption").val(),
            "color":$("#color").val(),
            "manufacturer":$("#manufacturer").val(),
            "avaiable":$("#available").val(),
            "year":$("#year").val(),
            "horsepower":$("#horsepower").val()
        });

        $.ajax({
            type:"POST",
            url:"https://webtechcars.herokuapp.com/api/cars",
            headers:{
                "Access-Control-Allow-Origin":"*"
            },
            data:car,
            contentType:"application/json",
            success:function(){
                $("#content").load("cars.html");
            },
            error:function(){
                alert("error updating database")
            }
        });
    });

    function del(id)
    {
        $.ajax({
            type:"DELETE",
            url:"https://webtechcars.herokuapp.com/api/cars/"+id,
            success:function(){
                $("#content").load("cars.html");
            },
            error:function(){
                alert("error deleting data")
            }
        })
    }
});