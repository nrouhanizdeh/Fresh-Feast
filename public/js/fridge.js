$(document).ready(function () {

	function submitItem(Item) {
		$.post("/api/items/", Item, function () {
			//window.location.href = "/members";
			console.log("success");
		});
	}
	var newItem = {};
	//$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
	// Append table with add row form on add new button click
	$(".add-new").click(function () {
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
		var row = '<tr>' +
			'<td><input type="text" class="form-control" name="foodName" id="foodName" placeholder="Add Item ..."></td>' +
			'<td><input type="number" min="0" class="form-control" name="days" id="days" placeholder="Expiration in Days"></td>' +
			'<td>' +
			'<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
			'<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
			'<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
			'</td>' +
			'</tr>';
		$("table").append(row);
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
		//$('[data-toggle="tooltip"]').tooltip();
	});
	// Add row on add button click
	$(document).on("click", ".add", function () {
		var empty = false;
		var input = $(this).parents("tr").find('input');
		input.each(function () {
			if (!$(this).val()) {
				$(this).addClass("error");
				empty = true;
			} else {
				$(this).removeClass("error");
				newItem.foodName = $(this).val();
			}
		});

		var inputFoodName = $(this).parents("tr").find('input[type="text"]');
		inputFoodName.each(function () {
				newItem.foodName = $(this).val();
		});
		var inputDays = $(this).parents("tr").find('input[type="number"]');
		inputDays.each(function () {
				newItem.days = $(this).val();
			
		});

		$(this).parents("tr").find(".error").first().focus();
		if (!empty) {
			input.each(function () {
				$(this).parent("td").html($(this).val());
			});
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
		}
		// for(let i=0; i<input.length;i++){
		// 	console.log(input) ;
		// }
		//newItem.foodName = $(".foodName").val();
		//newItem.foodName = "Apple";
		//newItem.foodName = $("input[name='foodName']");
		//newItem.days= $("input[name='days']");
		//newItem.foodName = $("#foodName").val().trim();
		//newItem.days = $("#days").val().trim();
		submitItem(newItem);
	});
	// Edit row on edit button click
	$(document).on("click", ".edit", function () {
		$(this).parents("tr").find("td:not(:last-child)").each(function () {
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
	});
	// Delete row on delete button click
	$(document).on("click", ".delete", function () {
		$(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
	});
});