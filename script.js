  $(document).ready(function() {
    
    $(".send_invoice").click(function(){
      var invoice_number = $('input[name="invoice_number"]').val();
      var  current_date_recup= $('input[name="current_date"]').val();
      var current_date = new Date(current_date_recup).getTime()
      var due_date_recup = $('input[name="due_date"]').val();
      var due_date = new Date(due_date_recup).getTime()
      var customer_name = $('input[name="customer_name"]').val();
      
      var customer_email = $('input[name="customer_email"]').val();
      var customer_tel = $('input[name="customer_tel"]').val();
      
      var customer_address = $('input[name="customer_address"]').val();
      var customer_postcode = $('input[name="customer_postcode"]').val();
      var customer_city = $('input[name="customer_city"]').val();
      var customer_country = $('input[name="customer_country"]').val();
      
      var proper_name = $('input[name="proper_name"]').val();
      var proper_email = $('input[name="proper_email"]').val();
      var proper_tel = $('input[name="proper_tel"]').val();
      var proper_address = $('input[name="proper_address"]').val();
      var proper_postcode = $('input[name="proper_postcode"]').val();
      var proper_city = $('input[name="proper_city"]').val();
      var proper_country = $('input[name="proper_country"]').val();


      var d = {
        "id" : invoice_number,
        "date" : current_date,
        "due_date" : due_date,
        "customer" : [
          {
            "summary" : customer_name,
            "address_line_1" : customer_address,
            "address_line_2" : customer_postcode,
            "address_line_3" : customer_city,
            "adsress_line_4" : customer_country,
            "phone" : customer_tel,
            "email" : customer_email
          }
        ],
        "company" : [
          {
            "summary" : proper_name,
            "address_line_1" : proper_address,
            "address_line_2" : proper_postcode,
            "address_line_3" : proper_city,
            "adsress_line_4" : proper_country,
            "phone" : proper_tel,
            "email" : proper_email

          }
        ],
        "items" : items
        

      }
      $(".form-invoice")[0].reset();


      var ajaxRequest = $.ajax({
        type: "POST",
        url: 'https://invoice-as-a-service.cleverapps.io/api/invoice/generate',
        data: d,
        dataType: "json",
                
        success: function(result)
          {
            $.each(result,function(index, value)
            { 
            alert(index+' : '+value);
            })
        
          }
        });
        $.when(ajaxRequest).done(function (ajaxValue) {
        var win = window.open('', '_blank');
        win.location.href = ajaxValue;
        });
        
        
     
        
    })
  

    $(".table_value").click(function(){
      var rowCount = $('#items_table >tbody >tr').length; 
      var items = [];
      var item = {};
      
      for (var i = 1 ; i<rowCount; i++){
          var item_test = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[i].cells[1].innerHTML;
          var name_test = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[i].cells[2].innerHTML;
          var description_test = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[i].cells[3].innerHTML;          
          var quantity_test = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[i].cells[4].innerHTML;
          var unit_price_test = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[i].cells[5].innerHTML;
          
          item = {
            "item" : item_test,
            "name" : name_test,
            "description" : description_test,
            "quantity" : quantity_test,
            "unit_price" : unit_price_test,
          }
          items.push(item)
          alert(JSON.stringify(item));
        }
        alert(JSON.stringify(items));
      
    });


    $(".add-row").click(function(){
      var items = $("#items").val();
      var names = $("#names").val();
      var description = $("#description").val();
      var quantity = $("#quantity").val();
      var unitPrice  = $("#unit_price").val();
      var tax = $("#tax").val();
      var test = "<tr><td><input type='checkbox' name='record'></td><td>" + items + "</td><td>" + names+ "</td><td>" + description +"</td><td>" + quantity + "</td><td>" + unitPrice + "</td><>" + tax  + "</td></tr></<tr>";    $("table").append(test);
      $("#newitems")[0].reset();
      
    });

    $(".delete-row").click(function(){
      $("table").find('input[name="record"]').each(function(){

        if($(this).is(":checked")){

            $(this).parents("tr").remove();
          }
      });

    });



    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;       
    $(".theDate").attr("value", today);

  });



