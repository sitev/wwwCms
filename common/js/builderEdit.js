$(document).ready(function() {
	
	$("#tabSites").click(function() {
		$("#btnEditSite").prop("disabled", false);
		$("#btnDeleteSite").prop("disabled", false);
	});
	
	$("#tabPages").click(function() {
		$("#btnEdit").prop("disabled", false);
		$("#btnDelete").prop("disabled", false);
		$("#btnBottom").prop("disabled", false);
		$("#btnTop").prop("disabled", false);

		var index = $("#tabPages tbody tr.info").index();
		
		var module = $("#tabPages tbody tr").eq(index).find('td').eq(2).text();
		if (module == "Просто текст") $("#btnEditContent").prop("disabled", false);
		else $("#btnEditContent").prop("disabled", true);
	});
	
	$("#tabMenu").click(function() {
		$("#btnAddChild").prop("disabled", false);
		$("#btnEditItem").prop("disabled", false);
		$("#btnDeleteItem").prop("disabled", false);
		$("#btnBottomItem").prop("disabled", false);
		$("#btnTopItem").prop("disabled", false);

		var index = $("#tabMenu tbody tr.info").index();
	});
	
	$("#tabWidgets").click(function() {
		$("#btnEditWidget").prop("disabled", false);
		$("#btnDeleteWidget").prop("disabled", false);
		$("#btnBottomWidget").prop("disabled", false);
		$("#btnTopWidget").prop("disabled", false);
		
		
		var index = $("#tabWidgets tbody tr.info").index();
		
		var type = $("#tabWidgets tbody tr").eq(index).find('td').eq(2).text();
		if (type == "Просто текст") $("#btnEditWidgetContent").prop("disabled", false);
		else $("#btnEditWidgetContent").prop("disabled", true);
	});
	
	$("#btnCreate").click(function() {
		var edtURL = $("#edtURL").val();
		edtURL = edtURL + ".place.sitev.ru";
		var edtName = $("#edtName").val();
		var edtAbout = $("#edtAbout").val();
	
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/createSite?cmd=ajax",
			cache: false,
			data: ({url: edtURL, name: edtName, about: edtAbout}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						location.reload();
						/*
						var index = $(this).find("index").text();
						$("#tabSites").append("<tr><td>" + index + "</td><td><a href='//" + edtURL + "'>" + edtURL + "</a></td><td>" + edtName + "</td><td>" + edtAbout + "</td></tr>");
						*/
					}
				});
			}
		});
	});
	
	$("#btnEditSite").click(function() {
		var elem = $("#" + this.id);
		var table = elem.data('table');
		var index = $("#" + table + " tbody tr.info").index();

		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/getUrlByIndex?cmd=ajax",
			cache: false,
			data: ({index: index}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						var url = $(this).find("url").text();
						window.location.assign(url);
					}
				});
			}
		});
	});
	
	$("#btnDeleteSite").click(function() {
		var elem = $("#" + this.id);
		var table = elem.data('table');
		var index = $("#" + table + " tbody tr.info").index();

		var url = $("#" + table + " tbody tr").eq(index).find('td').eq(1).text();
		var name = $("#" + table + " tbody tr").eq(index).find('td').eq(2).text();
		var about = $("#" + table + " tbody tr").eq(index).find('td').eq(3).text();

		$("#hidDeleteSiteTable").val(table);
		$("#hidDeleteSiteIndex").val(index);
		$("#edtDeleteURL").val(url);
		$("#edtDeleteName").val(name);
		$("#edtDeleteAbout").val(about);
		
		$("#hidDeleteSiteId").val(0);
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/getSiteIdByIndex?cmd=ajax",
			cache: false,
			data: ({index: index}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						var siteId = $(this).find("siteId").text();
						$("#hidDeleteSiteId").val(siteId);
					}
				});
			}
		});
	});
	
	$("#btnDeleteSiteFinish").click(function() {
		var table = $("#hidDeleteSiteTable").val();
		var index = $("#hidDeleteSiteIndex").val();
		var siteId = $("#hidDeleteSiteId").val();
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/deleteSite?cmd=ajax",
			cache: false,
			data: ({siteId: siteId}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						//$("#" + table + " tbody tr").eq(index).remove();
						location.reload();
					}
				});
			}
		});
	});
	
	$("#btnAccept").click(function() {
		var siteId = $("#hidSiteId").val();
		var name = $("#edtName").val();
		var about = $("#edtAbout").val();
		var caption = $("#edtCaption").val();
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/accept?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, name: name, about: about, caption: caption}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						location.reload();
					}
				});
			}
		});
	});
	
	$("#btnAcceptDesign").click(function() {
		var siteId = $("#hidSiteId").val();
		var design = $("[name=edtDesign]:checked").val();
		var theme = $("[name=edtTheme]:checked").val();
		var layout = $("[name=layout]:checked").val();
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/acceptDesign?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, design: design, theme: theme, layout: layout}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						location.reload();
						alert(111);
					}
				});
			}
		});
	});
	
	
	$("#btnAddPage").click(function() {
		var siteId = $("#hidSiteId").val();
		var url = $("#edtURLpage").val();
		var moduleId = $("#moduleId").val();
		var isMainPage = $("#cbxMainPage").val();
		if (isMainPage == "on") isMainPage = "1"; else isMainPage = "0";
		alert(isMainPage);
		var title = $("#edtTitle").val();
		var description = $("#edtDescription").val();
		var keywords = $("#edtKeywords2").val();
		alert(keywords);
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/addPage?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, url: url, moduleId: moduleId, isMainPage: isMainPage, title: title, description: description, keywords: keywords}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						var index = $(this).find("index").text();
						var moduleName = $(this).find("moduleName").text();
						window.location.assign("/builder/edit/" + siteId + "/pages");
						/*
						alert(222);
						$("#tabPages").append("<tr><td>" + index + "</td><td>" + url + "</td><td>" + moduleName + "</td><td>" + isMainPage + "</td><td>" + 
							title + "</td><td>" + description + "</td><td>" + keywords + "</td><td><a href='#' data-toggle='modal' data-target='#modRemovePage' data-pageid='" + 
							pageId + "' data-url='" + url + "' data-title='" + title + "'><i class='glyphicon glyphicon-remove'></i></a></td></tr>");
						*/
					}
				});
			}
		});
		
	});
	
	$("#moduleId").change(function() {
		var moduleId = $("#moduleId").val();
		if (moduleId > 1) {
			$.ajax({
				global: false,
				type: "POST",
				url: "/builder/getModuleUrl?cmd=ajax",
				cache: false,
				data: ({moduleId: moduleId}),
				dataType: "xml", 
				success: function(xml) {
					$(xml).find("note").each(function() {
						var result = $(this).find("result").text();
						if (result == "1") {
							var moduleUrl = $(this).find("moduleUrl").text();
							$("#edtURLpage").val(moduleUrl);
						}
					});
				}
			});
		}
	});
	
	$("#btnEdit").click(function() {
		var siteId = $("#hidSiteId").val();
		
		var elem = $("#" + this.id);
		var table = elem.data('table');
		alert(table);
		var index = $("#" + table + " tbody tr.info").index();
		$("#hidPageIndex").val(index);
		
		var url = $("#" + table + " tbody tr").eq(index).find('td').eq(1).text();
		var module = $("#" + table + " tbody tr").eq(index).find('td').eq(2).text();
		var isMainPage = $("#" + table + " tbody tr").eq(index).find('td').eq(3).text();
		var title = $("#" + table + " tbody tr").eq(index).find('td').eq(4).text();
		var description = $("#" + table + " tbody tr").eq(index).find('td').eq(5).text();
		var keywords = $("#" + table + " tbody tr").eq(index).find('td').eq(6).text();
		
		$("#edtEditURLpage").val(url);
		$("#selEditModuleId option:contains('" + module + "')").attr('selected', 'true');
		
		$("#cbxEditMainPage").prop('checked', true);
		$("#edtEditTitlePage").val(title);
		$("#edtEditDescriptionPage").val(description);
		$("#edtEditKeywordsPage").val(keywords);
		
	});
	
	$("#btnEditContent").click(function() {
		var siteId = $("#hidSiteId").val();
		var elem = $("#" + this.id);
		var table = elem.data('table');
		var pageIndex = $("#" + table + " tbody tr.info").index();
		
		alert(location.href);

		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/getPageId?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, pageIndex: pageIndex}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						var pageId = $(this).find("pageId").text();
						alert(pageId);
						location.assign("/builder/editContent/" + siteId + "/" + pageId);
					}
				});
			}
		});
		//location.assign("/builder/edit/" + siteId + "/pages");
	});
	
	$("#btnTop").click(function() {
		var siteId = $("#hidSiteId").val();
		var index1 = $("#tabPages tbody tr.info").index();
		var index2 = index1 - 1; 
		if (index2 < 0) return;

		var tr1 = $("#tabPages tbody tr").eq(index1);
		var tr2 = $("#tabPages tbody tr").eq(index2);
		tr1.insertBefore(tr2);
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/moveTableRow?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, index1: index1, index2: index2}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
					}
				});
			}
		});
	});
	
	$("#btnBottom").click(function() {
		var siteId = $("#hidSiteId").val();
		var index1 = $("#tabPages tbody tr.info").index();
		var size = $("#tabPages tbody tr").size();
		var index2 = index1 + 1; 
		if (index2 >= size) return;

		var tr1 = $("#tabPages tbody tr").eq(index1);
		var tr2 = $("#tabPages tbody tr").eq(index2);
		tr1.insertAfter(tr2);
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/moveTableRow?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, index1: index1, index2: index2}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
					}
				});
			}
		});
	});
	
	
	$("#btnSaveContent").click(function() {
		var text = $("#sitev_ru_summernote").code();
alert(text);
		var elem = $("#" + this.id);
		var siteId = elem.data('siteid');
		var pageId = elem.data('pageid');
		
		alert(siteId);
		alert(pageId);
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/saveContent?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, pageId: pageId, text: text}),
			dataType: "xml", 
			success: function(xml) {
				alert(1);
				$(xml).find("note").each(function() {
					alert(2);
					var result = $(this).find("result").text();
					if (result == "1") {
						location.assign("/builder/edit/" + siteId + "/pages");
					}
				});
			}
		});
	});
	
	$("#btnCancelContent").click(function() {
		var elem = $("#" + this.id);
		var siteId = elem.data('siteid');
		location.assign("/builder/edit/" + siteId + "/pages");
	});
	
	$("#btnEditPage").click(function() {
		var siteId = $("#hidSiteId").val();
		var pageIndex = $("#hidPageIndex").val();
		var url = $("#edtEditURLpage").val();
		var moduleId = $("#selEditModuleId").val();
		var isMainPage = $("#cbxMainPage").val();
		if (isMainPage == "on") isMainPage = "1"; else isMainPage = "0";
		var title = $("#edtEditTitlePage").val();
		var description = $("#edtEditDescriptionPage").val();
		var keywords = $("#edtEditKeywordsPage").val();

		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/editPage?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, pageIndex: pageIndex, url: url, moduleId: moduleId, isMainPage: isMainPage, title: title, description: description, keywords: keywords}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						var index = $(this).find("index").text();
						var moduleName = $(this).find("moduleName").text();
						window.location.assign("/builder/edit/" + siteId + "/pages");
					}
				});
			}
		});
		
	});
	
	$("#btnDelete").click(function() {
		var siteId = $("#hidSiteId").val();
		
		var elem = $("#" + this.id);
		var table = elem.data('table');
		var index = $("#" + table + " tbody tr.info").index();
		$("#hidPageIndex").val(index);
		
		var url = $("#" + table + " tbody tr").eq(index).find('td').eq(1).text();
		var module = $("#" + table + " tbody tr").eq(index).find('td').eq(2).text();
		var title = $("#" + table + " tbody tr").eq(index).find('td').eq(4).text();
		var description = $("#" + table + " tbody tr").eq(index).find('td').eq(5).text();
		
		$("#edtDeleteURLpage").val(url);
		$("#selDeleteModuleId option:contains('" + module + "')").attr('selected', 'true');
		
		$("#edtDeleteTitlePage").val(title);
		$("#edtDeleteDescriptionPage").val(description);
	});
	
	$("#btnDeletePage").click(function() {
		var siteId = $("#hidSiteId").val();
		var pageIndex = $("#hidPageIndex").val();

		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/deletePage?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, pageIndex: pageIndex}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						window.location.assign("/builder/edit/" + siteId + "/pages");
					}
				});
			}
		});
		
	});
	
	
	$("#modRemovePage").on("show.bs.modal", function (event) {
		var elem = $(event.relatedTarget);
		var index = elem.data('index');
		var pageId = elem.data('pageid');
		var url = elem.data('url');
		var title = elem.data('title');
		
		$("#hidRemovePageId").val(pageId);
		$("#hidRemoveIndex").val(pageId);
		$("#edtRemoveURL").val(url);
		$("#edtRemoveName").val(title);
	});
	
	$("#btnRemovePage").click(function() {
		var siteId = $("#hidSiteId").val();
		var pageId = $("#hidRemovePageId").val();
		var index = $("#hidRemoveIndex").val();
		
	
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/deletePage?cmd=ajax",
			cache: false,
			data: ({pageId: pageId, index: index}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						$('#tabPages').find('tr#' + pageId).remove();
						
						var index = 1;
						$('#tabPages').find('tr').each(function(){
							var val = $(this).find('td:first').html();
							if (val !== undefined) {
								$(this).find('td:first').html(index);
								index++;
							}
						});
					}
				});
			}
		});
	});
	
	$("#btnAddChild").click(function() {
		var siteId = $("#hidSiteId").val();
		var name = $("#edtName").val();
		var url = $("#edtURL").val();
		
		var elem = $("#" + this.id);
		var table = elem.data('table');
		var index = $("#" + table + " tbody tr.info").index();
		$("#hidMenuItemIndex").val(index);
		
		var parent = $("#" + table + " tbody tr").eq(index).find('td').eq(0).text();
		$("#edtParentName").val(parent);
	});
	
	$("#btnAddItem").click(function() {
		var siteId = $("#hidSiteId").val();
		var name = $("#edtName").val();
		var url = $("#edtURL").val();
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/addMenuItem?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, name: name, url: url}),
			dataType: "xml", 
			success: function(xml) {
				alert(1);
				$(xml).find("note").each(function() {
					alert(2);
					var result = $(this).find("result").text();
					if (result == "1") {
						alert(3);
						window.location.assign("/builder/edit/" + siteId + "/menu");
					}
				});
			}
		});
		
	});
	
	$("#btnAddChildItem").click(function() {
		var siteId = $("#hidSiteId").val();
		var itemIndex = $("#hidMenuItemIndex").val();
		var name = $("#edtChildName").val();
		var url = $("#edtChildURL").val();
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/addChildMenuItem?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, itemIndex: itemIndex, name: name, url: url}),
			dataType: "xml", 
			success: function(xml) {
				alert(1);
				$(xml).find("note").each(function() {
					alert(2);
					var result = $(this).find("result").text();
					if (result == "1") {
						alert(3);
						window.location.assign("/builder/edit/" + siteId + "/menu");
					}
				});
			}
		});
	});
	
	$("#btnEditItem").click(function() {
		var siteId = $("#hidSiteId").val();
		
		var elem = $("#" + this.id);
		var table = elem.data('table');
		var index = $("#" + table + " tbody tr.info").index();
		$("#hidMenuItemIndex").val(index);
		
		alert(index);
		
		var name = $("#" + table + " tbody tr").eq(index).find('td').eq(0).text();
		var url = $("#" + table + " tbody tr").eq(index).find('td').eq(1).text();
		
		$("#edtEditItemName").val(name);
		$("#edtEditItemURL").val(url);
	});
	
	$("#btnEditItemFinish").click(function() {
		var siteId = $("#hidSiteId").val();
		var itemIndex = $("#hidMenuItemIndex").val();
		var name = $("#edtEditItemName").val();
		var url = $("#edtEditItemURL").val();

		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/editMenuItem?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, itemIndex: itemIndex, name: name, url: url}),
			dataType: "xml", 
			success: function(xml) {
				alert(1);
				$(xml).find("note").each(function() {
					alert(2);
					var result = $(this).find("result").text();
					if (result == "1") {
						alert(3);
						window.location.assign("/builder/edit/" + siteId + "/menu");
					}
				});
			}
		});
		
	});
	
	$("#btnDeleteItem").click(function() {
		var siteId = $("#hidSiteId").val();
		
		var elem = $("#" + this.id);
		var table = elem.data('table');
		var index = $("#" + table + " tbody tr.info").index();
		$("#hidMenuItemIndex").val(index);
		
		alert(index);
		
		var name = $("#" + table + " tbody tr").eq(index).find('td').eq(0).text();
		var url = $("#" + table + " tbody tr").eq(index).find('td').eq(1).text();
		
		$("#edtDeleteItemName").val(name);
		$("#edtDeleteItemURL").val(url);
	});
	
	$("#btnDeleteItemFinish").click(function() {
		var siteId = $("#hidSiteId").val();
		var itemIndex = $("#hidMenuItemIndex").val();

		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/deleteMenuItem?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, itemIndex: itemIndex}),
			dataType: "xml", 
			success: function(xml) {
				alert(1);
				$(xml).find("note").each(function() {
					alert(2);
					var result = $(this).find("result").text();
					if (result == "1") {
						alert(3);
						window.location.assign("/builder/edit/" + siteId + "/menu");
					}
				});
			}
		});
		
	});
	
	$("#btnTopItem").click(function() {
		var siteId = $("#hidSiteId").val();
		var index1 = $("#tabMenu tbody tr.info").index();
		var index2 = index1 - 1; 
		if (index2 < 0) return;

		var tr1 = $("#tabMenu tbody tr").eq(index1);
		var tr2 = $("#tabMenu tbody tr").eq(index2);
		tr1.insertBefore(tr2);
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/itemMoveTableRow?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, index1: index1, index2: index2}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
					}
				});
			}
		});
	});
	
	$("#btnBottomItem").click(function() {
		var siteId = $("#hidSiteId").val();
		var index1 = $("#tabMenu tbody tr.info").index();
		var size = $("#tabMenu tbody tr").size();
		var index2 = index1 + 1; 
		if (index2 >= size) return;

		var tr1 = $("#tabMenu tbody tr").eq(index1);
		var tr2 = $("#tabMenu tbody tr").eq(index2);
		tr1.insertAfter(tr2);
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/itemMoveTableRow?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, index1: index1, index2: index2}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
					}
				});
			}
		});
	});
	
	$("#btnAddWidgetFinish").click(function() {
		var siteId = $("#hidSiteId").val();
		var type = $("#widgetType").val();
		var location = $("#location").val();
		alert(location);
		var name = $("#edtName").val();
		var about = $("#edtAbout").val();
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/addWidget?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, type: type, location: location, name: name, about: about}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						var index = $(this).find("index").text();
						var moduleName = $(this).find("moduleName").text();
						window.location.assign("/builder/edit/" + siteId + "/widgets");
					}
				});
			}
		});
	});
	
	$("#btnEditWidget").click(function() {
		var siteId = $("#hidSiteId").val();
		
		var elem = $("#" + this.id);
		var table = elem.data('table');
		var index = $("#" + table + " tbody tr.info").index();
		$("#hidWidgetIndex").val(index);
		
	
		var location = $("#" + table + " tbody tr").eq(index).find('td').eq(1).text();
		var type = $("#" + table + " tbody tr").eq(index).find('td').eq(2).text();
		var name = $("#" + table + " tbody tr").eq(index).find('td').eq(3).text();
		var about = $("#" + table + " tbody tr").eq(index).find('td').eq(4).text();
		
		$("#selEditLocation option[value='" + location + "']").attr('selected', 'true');
		$("#selEditType option:contains('" + type + "')").attr('selected', 'true');
		
		$("#edtEditName").val(name);
		$("#edtEditAbout").val(about);
	});
	
	$("#btnEditWidgetFinish").click(function() {
		var siteId = $("#hidSiteId").val();
		var widgetIndex = $("#hidWidgetIndex").val();
		
		var location = $("#selEditLocation").val();
		var type = $("#selEditType").val();
		var name = $("#edtEditName").val();
		var about = $("#edtEditAbout").val();

		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/editWidget?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, widgetIndex: widgetIndex, type: type, location: location, name: name, about: about}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						window.location.assign("/builder/edit/" + siteId + "/widgets");
					}
				});
			}
		});
		
	});
	
	$("#btnEditWidgetContent").click(function() {
		var siteId = $("#hidSiteId").val();
		var elem = $("#" + this.id);
		var table = elem.data('table');
		var widgetIndex = $("#" + table + " tbody tr.info").index();
		
		alert(location.href);

		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/getWidgetId?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, widgetIndex: widgetIndex}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						var widgetId = $(this).find("widgetId").text();
						location.assign("/builder/editWidgetContent/" + siteId + "/" + widgetId);
					}
				});
			}
		});
	});
	
	$("#btnSaveWidgetContent").click(function() {
		var text = $("#sitev_ru_summernote").code();
		var elem = $("#" + this.id);
		var siteId = elem.data('siteid');
		var widgetId = elem.data('widgetid');
		
		alert(siteId);
		alert(widgetId);
		
		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/saveWidgetContent?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, widgetId: widgetId, text: text}),
			dataType: "xml", 
			success: function(xml) {
				alert(111);
				$(xml).find("note").each(function() {
					alert(2);
					var result = $(this).find("result").text();
					if (result == "1") {
						alert(3);
						location.assign("/builder/edit/" + siteId + "/widgets");
					}
				});
			}
		});
	});
	
	$("#btnCancelWidgetContent").click(function() {
		var elem = $("#" + this.id);
		var siteId = elem.data('siteid');
		location.assign("/builder/edit/" + siteId + "/widgets");
	});
	
	$("#btnDeleteWidget").click(function() {
		var siteId = $("#hidSiteId").val();
		
		var elem = $("#" + this.id);
		var table = elem.data('table');
		var index = $("#" + table + " tbody tr.info").index();
		$("#hidWidgetIndex").val(index);
		
		var location = $("#" + table + " tbody tr").eq(index).find('td').eq(1).text();
		var type = $("#" + table + " tbody tr").eq(index).find('td').eq(2).text();
		var name = $("#" + table + " tbody tr").eq(index).find('td').eq(3).text();
		var about = $("#" + table + " tbody tr").eq(index).find('td').eq(4).text();
		
		$("#edtDeleteWidgetType").val(type);
		$("#edtDeleteWidgetLocation").val(location);
		$("#edtDeleteWidgetName").val(name);
		$("#edtDeleteWidgetAbout").val(about);
	});
	
	$("#btnDeleteWidgetFinish").click(function() {
		var siteId = $("#hidSiteId").val();
		var widgetIndex = $("#hidWidgetIndex").val();

		$.ajax({
			global: false,
			type: "POST",
			url: "/builder/deleteWidget?cmd=ajax",
			cache: false,
			data: ({siteId: siteId, widgetIndex: widgetIndex}),
			dataType: "xml", 
			success: function(xml) {
				$(xml).find("note").each(function() {
					var result = $(this).find("result").text();
					if (result == "1") {
						window.location.assign("/builder/edit/" + siteId + "/widgets");
					}
				});
			}
		});
		
	});
	

	$('table tbody tr').on('click', function() {
		$('table tr').removeClass('info');
		$(this).addClass('info');
	});
	
});



