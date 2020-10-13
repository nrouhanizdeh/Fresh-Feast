$(document).ready(function () {

	function submitItem(Item) {
		$.post("/api/items/", Item).then(
			// console.log("success");
		);
	}

	// expiration
	Date.prototype.addDays = function(days) {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	}

	var date = new Date();

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
			//'<td></td>' +
			'<td>' +
			'<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
			//'<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
			'<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
			'</td>' +
			'</tr>';
		$("table").append(row);
		// $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
		$("table tbody tr").eq(index + 1).find(".add").toggle();
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
				//newItem.foodName = $(this).val();
			}
		});
		
		var inputFoodName = $(this).parents("tr").find('input[name="foodName"]');
		inputFoodName.each(function () {
				newItem.foodName = $(this).val();
		});
		var inputDays = $(this).parents("tr").find('input[name="days"]');
		inputDays.each(function () {
				newItem.days = $(this).val();
				newItem.expireDate = date.addDays(parseInt($(this).val()));
				newItem.expireString = date.addDays(parseInt($(this).val())).toLocaleDateString();
		});

		$(this).parents("tr").find(".error").first().focus();
		if (!empty) {
			input.each(function () {
				$(this).parent("td").html($(this).val());
			});
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
		}
		submitItem(newItem);
	});
	// Edit row on edit button click
	// $(document).on("click", ".edit", function () {
	// 	$(this).parents("tr").find("td:not(:last-child)").each(function () {
	// 		$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
	// 	});
	// 	$(this).parents("tr").find(".add, .edit").toggle();
	// 	$(".add-new").attr("disabled", "disabled");
	// });
	// Delete row on delete button click
	$(document).on("click", ".delete", function () {
		$(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
		var id = $(this).parent().data("id");
		$.ajax({
		  method: "DELETE",
		  url: "/api/items/" + id
		})
		  .then(
			  console.log("deleted successfully!")
		  );
	});
});
