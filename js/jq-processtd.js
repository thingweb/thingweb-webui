function processTD(name) {
	var json = document.getElementById('tdJSON').value;
	var td = JSON.parse(json);

	// add jquery UI tab
	var num_tabs = $("div#tabs ul li").length + 1;
	$("div#tabs ul").append(
		"<li><a href='#tab" + num_tabs + "'>" + name + "</a></li>"
	);
	var c = document.createElement("div");
	c.id="tab" + num_tabs;
	$("div#tabs").append(
		c
		// "<div id='tab" + num_tabs + "'>#" + num_tabs + "</div>"
	);
	$("div#tabs").tabs("refresh");
	var index = $('#tabs ul').index($('#tab' + num_tabs));
	$("#tabs").tabs("option", "active", index);


	// append information to tab
	var interactions = td.interactions; // is array

	{
		var hp = document.createElement('h1');
		var tp = document.createTextNode(td.metadata.name);
		hp.appendChild(tp);
		c.appendChild(hp);
		// TODO add protocol & encoding

		var table = document.createElement('table');

		// ==============
		// Property

		var thP = document.createElement('th');
		var tdHP = document.createElement('td');
		tdHP.appendChild(document.createTextNode("Properties"));
		tdHP.colspan = 4;
		thP.appendChild(tdHP);
		table.appendChild(thP);

		var isProperties = false;

		for (var i=0; i < interactions.length; i++){
			var interaction = interactions[i];

			// Property
			if(interaction["@type"] == "Property") {
				isProperties = true;
				var tr = document.createElement('tr');

				tr.appendChild(document.createTextNode(interaction.name));
				// text input
				var t = document.createElement("input");
				t.type = "text";
				t.readonly = interaction.writable;
				var td1 = document.createElement('td');
				td1.appendChild(t);
				tr.appendChild(td1);

				// GET Button
				var bGet = document.createElement("button");
				bGet.type = "button";
				bGet.value = interaction.name;
				bGet.appendChild(document.createTextNode("GET"));
				//bGet.onclick = funcName;
				bGet.onclick = function(){
					alert("call GET for " + this.value);
				};
				//c.appendChild(bGet);
				var td2 = document.createElement('td');
				td2.appendChild(bGet);
				tr.appendChild(td2);

				// PUT Button
				if(interaction.writable) {
					var bPut = document.createElement("button");
					bPut.type = "button";
					bPut.value = interaction.name;
					bPut.appendChild(document.createTextNode("PUT"));
					bPut.onclick = function(){
						alert("call PUT for " + this.value);
					};
					// c.appendChild(bPut);
					var td3 = document.createElement('td');
					td3.appendChild(bPut);
					tr.appendChild(td3);
				}

				// TODO Observe
				table.appendChild(tr);

			}
		}
		if(!isProperties) {
			var tr = document.createElement('tr');
			tr.appendChild(document.createTextNode("-- none --"));
			table.appendChild(tr);
		}


		// ==============
		// Action

		var thA = document.createElement('th');
		var tdHA = document.createElement('td');
		tdHA.appendChild(document.createTextNode("Actions"));
		tdHA.colspan = 4;
		thA.appendChild(tdHA);
		table.appendChild(thA);

		var isActions = false;

		for (var i=0; i < interactions.length; i++){
			var interaction = interactions[i];

			// Action
			if(interaction["@type"] == "Action") {
				isActions = true;
				var tr = document.createElement('tr');

				tr.appendChild(document.createTextNode(interaction.name));
				// text input
				var t = document.createElement("input");
				t.type = "text";
				t.readonly = interaction.writable;
				var td1 = document.createElement('td');
				td1.appendChild(t);
				tr.appendChild(td1);

				// Action Button
				var bGet = document.createElement("button");
				bGet.type = "button";
				bGet.value = interaction.name;
				bGet.appendChild(document.createTextNode("Start"));
				//bGet.onclick = funcName;
				bGet.onclick = function(){
					alert("start Action for " + this.value);
				};
				var td2 = document.createElement('td');
				td2.appendChild(bGet);
				tr.appendChild(td2);

				table.appendChild(tr);

			}
		}

		if(!isActions) {
			var tr = document.createElement('tr');
			tr.appendChild(document.createTextNode("-- none --"));
			table.appendChild(tr);
		}


		// ==============
		// Events

		var thE = document.createElement('th');
		var tdHE = document.createElement('td');
		tdHE.appendChild(document.createTextNode("Events (TODO)"));
		tdHE.colspan = 4;
		thE.appendChild(tdHE);
		table.appendChild(thE);

		var isEvents = false;

		for (var i=0; i < interactions.length; i++){
			var interaction = interactions[i];

			// Action
			if(interaction["@type"] == "Event") {
				isEvents = true;
				var tr = document.createElement('tr');

				tr.appendChild(document.createTextNode(interaction.name));
				// text input
				var t = document.createElement("input");
				t.type = "text";
				t.readonly = interaction.writable;
				var td1 = document.createElement('td');
				td1.appendChild(t);
				tr.appendChild(td1);

				table.appendChild(tr);

			}
		}

		if(!isEvents) {
			var tr = document.createElement('tr');
			tr.appendChild(document.createTextNode("-- none --"));
			table.appendChild(tr);
		}


		c.appendChild(table);
	}


	c.appendChild(document.createElement("br"));
	c.appendChild(document.createTextNode("Processed TD at " + new Date().toLocaleTimeString()));
}

function readJSONFile() {
	var file = document.getElementById('jsonInput').files[0];
	if(file == null || file === undefined) {
		alert("No JSON File selected");
		return;
	}
	var reader = new FileReader();

	reader.onload = function(event) {
		var buffer = event.target.result;
		document.getElementById('tdJSON').value = buffer;

		processTD(file.name);
	};

	reader.onerror = function(event) {
		var msg = "File could not be read! Code " + event.target.error.code;
		console.error(msg);
		alert(msg);
	};

	reader.readAsText(file);
}
