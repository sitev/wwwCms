jQuery(document).ready(function() {
	$("#userEnter").click(function() {
		var login = $("#sitev_ru_InputEmail").val();
		var password = $("#sitev_ru_InputPassword").val();
		var chkSave = 0;//$("#chkSave:checked").val();
				
		alert(login);
		alert(password);
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/user/login?cmd=ajax",
			cache: false,
			data: ({login: login, password: password, chkSave: chkSave}),
			dataType: "xml", 
			success: function(xml) {
				alert("111");
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					var error = $(this).find("error").text();
					var login = $(this).find("login").text();
					
					//alert(login);
					
					//if (result == "1") $("#menuLoginA").html(login);
					if (result == "1") {
						//location = loc;
						//alert(loc);
						location.reload(true);
					}
					else {
						$("#passwordStatus").css("display", "block");
						if (error != "") {
							$("#passwordStatus").empty();
							$("#passwordStatus").append(error);
						}
					}
				});
			}
		});
	});
});
