function onToolSelected(toolRef){
	var onToolSelected = toolRef.value;
	alert(onToolSelected);
	return populateActions(onToolSelected);
}

function populateActions(toolType){
	var filePath = "https://raw.githubusercontent.com/Prasant-Sutaria/perfecto_code_samples/master/" + toolType + "_actions.json";
	
	var actionsRef = document.getElementById("actions");
	actions.options.length=0;

	if(actionsRef === 'none'){
		return;
	}

	var actionOption = document.createElement("option");
	actionOption.text = "Select an action";
	actionOption.value = "none";
	actionsRef.add(actionOption);

	fetch(filePath).then(response => {
	  return response.json();
	}).then(actionCodes => {
		for (var actionCodeKey in actionCodes) {
			actionOption = document.createElement("option");
			actionOption.text = actionCodeKey;
			actionOption.value = actionCodes[actionCodeKey];
			actionsRef.add(actionOption);
		}
	}).catch(err => {
	  // Do something for an error here
	});
}

function getCodeSnipet(actionRef){

	var toolType = document.getElementById("tool").value;
	var actionCode = actionRef.value;


	var filePath = "https://raw.githubusercontent.com/Prasant-Sutaria/perfecto_code_samples/master/" + toolType + "_codes.json";
	
	fetch(filePath).then(response => {
	  return response.json();
	}).then(data => {
		var sampleCodes = data[actionCode];
		console.log(sampleCodes);
		var comment = sampleCodes['codeComment'];
		for(var language in sampleCodes){
			switch(language){
				case "codeComment":
				case "existingArticles":
					break;
				default:
					sampleCode = sampleCodes[language];
					populateCode(language,comment,sampleCode);
			}
			
		}
	}).catch(err => {
	  // Do something for an error here
	});
}

function populateCode(language,comment,code){

	if(comment === ""){
		comment = "No Comment available";
	}

	switch(language){
		case "python":
		case "ruby":
			comment = "# ===== " + comment + " =====";
			if(code===""){
				code = "# ===== Code not available ====="
			}
			break;
		default:
			comment = "// ===== " + comment + " =====";
			if(code===""){
				code = "// ===== Code not available ====="
			}
			break;
	}

	var commentElem = document.getElementById(language + "_comment");
	commentElem.innerHTML = comment;

	var codeElem = document.getElementById(language + "_code");
	codeElem.innerHTML = code;

}

function openCode(evt, codeName) {

  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(codeName).style.display = "block";
  evt.currentTarget.className += " active";
}
