function sitev_ru_ChangeVisibility(elemId) {
	if ($("#" + elemId).hasClass('not-visible')) {
		$("#" + elemId).removeClass('not-visible');
	}
	else {
		$("#" + elemId).addClass('not-visible');
	}
}

function sitev_ru_sendToSite(pref) {
	var name = $("#sitev_ru_postName").val();
	alert(name);
	var content = $("#sitev_ru_summernote").val();
	alert(content);
	
	$.ajax({
		global: false,
		type: "POST",
		url: "/" + pref + "/sendPost?cmd=ajax",
		cache: false,
		data: ({content: content, name: name}),
		dataType: "xml", 
		success: function(xml) {
			$(xml).find("note").each(function() {
				var result = $(this).find("result").text();
				if (result == "1") {
					location.assign("/");
				}
				else alert("error");
			});
		}
	});
}	

$(document).ready(function() {
	//$("#sitev_ru_Comment").elastic();
	$("#sitev_ru_sendComment").click(function() {
		var comment = $("#sitev_ru_Comment").val();
		var newsId = $("#sitev_ru_sendComment").attr("newsId");
		$.ajax({
			global: false,
			type: "POST",
			url: "/post/sendComment?cmd=ajax",
			cache: false,
			data: ({comment: comment, newsId: newsId}),
			dataType: "xml",
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						location.reload(true);
					}
				});
			}
		});
	});
	
	$("#sitev_ru_sendPostToModeration").click(function() {
		var name = $("#sitev_ru_postName").val();
		alert(name);
		var content = $("#sitev_ru_summernote").val();
		alert(content);
		
		if (content.length >= 10) {
			$.ajax({
				global: false,
				type: "POST",
				url: "/post/sendPost?cmd=ajax",
				cache: false,
				data: ({content: content, name: name}),
				dataType: "xml", 
				success: function(xml) {
					$(xml).find("note").each(function() {
						var result = $(this).find("result").text();
						if (result == "1") {
							location.reload(true);
						}
						else alert("error");
					});
				}
			});
		}
		else alert("Пост слишком короткий...");
	});
	
	$("#sitev_ru_sendPostToSite").click(function() {
		sitev_ru_sendToSite("post");
	});
	
	$("#sitev_ru_sendNewsToSite").click(function() {
		alert(1);
		sitev_ru_sendToSite("news");
	});
	
});

