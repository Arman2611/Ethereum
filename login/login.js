var forms = document.getElementsByTagName('form');
var toUserForm = document.getElementById('toUserForm');
var toAdminForm = document.getElementById('toAdminForm');

var signinForm = document.getElementById('signin-form');
var adminForm = document.getElementById('admin-form');

function showAdminForm () {
	hideAllForms();
	showSingleForm(adminForm);
}
toAdminForm.onclick = showAdminForm;

function showUserForm () {
	hideAllForms();
	showSingleForm(signinForm);
}
toUserForm.onclick = showUserForm;

function showSingleForm (formId) {
	formId.style.display = 'flex';
}
function hideAllForms () {
	for (var i = 0; i < forms.length; i++) {
		forms[i].style.display = 'none';
	}
}


//Request to get log file's data (it shall be 'user' or 'admin' and shows 
//which type of user was trying to enter the last time).
function giveMeLoggedData () {
	var request = new XMLHttpRequest();
	request.open("GET", "http://localhost:8080/node1.js?"+'giveMeLoggedData');
	request.send();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.responseText != "") {
			var logText = request.responseText;
			console.log(logText);
			if (logText == 'user') {
				showUserForm();
			} else if (logText == 'admin') {
				showAdminForm();
			};
		};
	};
}

giveMeLoggedData();