$(document).ready(function () {

	function submitItem(Item) {
		$.post("/api/items/", Item).then(
			console.log("success")
		);
	}

	// expiration
	Date.prototype.addDays = function (days) {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	}

	var date = new Date();

	var newItem = {};
	var updatedItem = {};
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
			// '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
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
		var edited = [];
		var id = $(this).parent().data("id");
		console.log(id);
		var input = $(this).parents("tr").find('input');
		input.each(function () {
			edited.push($(this).val());
			if (!$(this).val()) {
				$(this).addClass("error");
				empty = true;
			} else {
				$(this).removeClass("error");
				//newItem.foodName = $(this).val();
			}
		});
			edited[2] = date.addDays(parseInt(edited[1]));
			edited[3] = date.addDays(parseInt(edited[1])).toLocaleDateString();
		$.ajax({
			method: "PUT",
			url: "/api/items/" + id,
			data: { foodName: edited[0], days: edited[1], expireDate: edited[2], expireString: edited[3] }
		})
			.then(function () {
				console.log("updated successfully");
				console.log("hi" + edited[2]);
				console.log(edited[3]);
			});
	var inputFoodName = $(this).parents("tr").find('input[name="foodName"]');
	inputFoodName.each(function () {
		newItem.foodName = $(this).val();
		console.log("food", inputFoodName.val())
	});
	var inputDays = $(this).parents("tr").find('input[name="days"]');
	inputDays.each(function () {
		newItem.days = $(this).val();
		newItem.expireDate = date.addDays(parseInt($(this).val()));
		newItem.expireString = date.addDays(parseInt($(this).val())).toLocaleDateString();
		console.log(inputDays.val())

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
$(document).on("click", ".edit", function () {
	$(this).parents("tr").find("td:not(:last-child)").each(function () {
		console.log($(this).val());
		$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
	});
	$(this).parents("tr").find(".add, .edit").toggle();
	var id = $(this).parent().data("id");
	console.log(id);
	$(".add-new").attr("disabled", "disabled");
});

var inputFoodName = $(this).parents("tr").find('input[name="foodName"]');
inputFoodName.each(function () {
	updatedItem.foodName = $(this).val();
	console.log(inputFoodName);
});
var inputDays = $(this).parents("tr").find('input[name="days"]');
inputDays.each(function () {
	updatedItem.days = $(this).val();
	updatedItem.expireDate = date.addDays(parseInt($(this).val()));
	updatedItem.expireString = date.addDays(parseInt($(this).val())).toLocaleDateString();
});

// line 77 -- is this getting an id? Who is the "parent"?
// what is the variable to send information to database when calling on get method?

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
