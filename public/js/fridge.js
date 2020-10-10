$(document).ready(function(){

	function submitItem(Item) {
		$.post("/api/items/", Item, function() {
		  window.location.href = "/members";
		});
	  }
	var newItem = {};
	$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td><input type="text" class="form-control" name="item" id="foodName" placeholder="Add Item ..."></td>' +
			'<td><input type="number" min="0" class="form-control expirationIn" name="expiration" id="days" placeholder="Number of Days"></td>' +
			//added another cell to hold the countdown//
			'<td><class="expirationOut" name="expiration" id="department"></td>' +
			'<td>'+
			'<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>'+
			'<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>'+
			'<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>'+
		  '</td>'+
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
	// Add row on add button click
	$(document).on("click", ".add", function(){
		var empty = false;
		var input = $(this).parents("tr").find('input');
		var dayInput = $(".expirationIn").val();

		// Prototype to execute data addition //
		Date.prototype.addSetDays = function(days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		}
		// Runs protoype based on user input - 'expirationDate' is the date at which the produce is set to expire
		var date = new Date();
		console.log("Days entered by user", dayInput);


		/// ****** Prototype below (defined on 49) works when integer is passed, but does not work when integer variable is passed /// 
		var expirationDate = date.addSetDays(dayInput);
		
		// Update interval every 2 seconds
		var x = setInterval(function() {
		
		  // Gets current date and time
		  var now = new Date().getTime();
		  // Find the distance between now and the count down date
		  var distance = expirationDate - now;
		  // Time caluclation for Days (seconds included for testing)
		  var days = (Math.floor(distance / (1000 * 60 * 60 * 24)));
		
		  // Seconds include for testing (will be removed)
		  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			  
			// HTML Output for testing (adding seconds for testing purposes only)//
			var printDay = (days + " days left " + seconds + "s (for testing purposes only)");

			console.log("This is the variable that needs to be written to <td>", printDay)

			//<*** INSERT CODE TO WRITE 'printDay' variable to <td>****>//
			$(".expirationOut").html(printDay)
			  
			// Once the countdown recahes zero, the table data cell is replaced with "EXPIRED"
			if (distance < 0) {
			  clearInterval(x);
			$(".expirationOut").html("EXPIRED");
			}
		  }, 2000);
        input.each(function(){
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
				$(this).removeClass("error");
				
            }
		});
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
			input.each(function(){
				$(this).parent("td").html($(this).val());
			});			
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
		}		
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){		
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});		
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
    });
});