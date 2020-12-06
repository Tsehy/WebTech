$(function(){ 
    var table = $("#table");
    $("#edit").hide();
    $("#cancel").hide();
    $("#delete").hide();

    $.ajax({
        type:"GET",
        url: "https://webtechcars.herokuapp.com/api/manufacturers",
        success: function(data){
            
            for(var i in data){
                table.append("<tr><td>" + data[i].name +
                            "</td><td>" + data[i].country +
                            "</td><td>" + data[i].founded +
                            "</td><td id='edit' dataid='" + data[i]._id + "'>Edit" +
                            "</td></tr>");
            }
        },
        error: function(){
            alert("error loading database");
        }
    });

    $("#add").on("click",function(){
        var date = new Date($("#founded").val());
        var manufacturer = JSON.stringify({
            "name":$("#name").val(),
            "country":$("#country").val(),
            "founded":date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 9 ? "0" + date.getDate() : date.getDate())
        });

        $.ajax({
            type:"POST",
            url: "https://webtechcars.herokuapp.com/api/manufacturers",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data:manufacturer,
            contentType:"application/json",
            success: function(data)
            {
                $("#content").load("manufacturers.html");
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
        $("#country").val($(this).parent().children()[1].outerText);
        $("#founded").val($(this).parent().children()[2].outerText);
    });

    $("#cancel").on("click",function(){
        $("#edit").hide();
        $("#cancel").hide();
        $("#delete").hide();
        $("#add").show();

        $("#name").val("")
        $("#country").val(""),
        $("#founded").val("")
    });

    $("#delete").on("click",function(){
        del($(this).attr("dataid"));
    });

    $("#edit").on("click", function(){
        del($(this).attr("dataid"));

        var date = new Date($("#founded").val());
        var manufacturer = JSON.stringify({
            "name":$("#name").val(),
            "country":$("#country").val(),
            "founded":date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 9 ? "0" + date.getDate() : date.getDate())
        });

        $.ajax({
            type:"POST",
            url: "https://webtechcars.herokuapp.com/api/manufacturers",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data:manufacturer,
            contentType:"application/json",
            success: function(data)
            {
                $("#content").load("manufacturers.html");
            },
            error: function(){
                alert("error loading database");
            }
        })
    });

    function del(id)
    {
        $.ajax({
            type:"DELETE",
            url:"https://webtechcars.herokuapp.com/api/manufacturers/"+id,
            success:function(){
                $("#content").load("manufacturers.html");
            },
            error:function(){
                alert("error deleting data")
            }
        })
    }
});