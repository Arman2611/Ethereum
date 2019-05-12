var signinBtn = document.getElementById('signin-btn');
var signupBtn = document.getElementById('signup-btn');

var formsContainer = document.getElementById('forms-container');
var exitForm = document.getElementById('exit-form');
var forms = document.getElementsByTagName('form');

var signinForm = document.getElementById('signin-form');
var adminForm = document.getElementById('admin-form');
var signupForm = document.getElementById('signup-form');

var toUserForm = document.getElementById('toUserForm');
var toAdminForm = document.getElementById('toAdminForm');

function showFormsContainer (formId) {
	showSingleForm(formId);
	formsContainer.style.display = 'flex';
}
function hideFormsContainer () {
	formsContainer.style.display = 'none';
	hideAllForms();
}

signinBtn.onclick = function () {
	showFormsContainer(signinForm);
}
signupBtn.onclick = function () {
	showFormsContainer(signupForm);
}
toAdminForm.onclick = function () {
	hideAllForms();
	showFormsContainer(adminForm);
}
toUserForm.onclick = function () {
	hideAllForms();
	showFormsContainer(signinForm);
}

exitForm.onclick = hideFormsContainer;

function showSingleForm (formId) {
	formId.style.display = 'flex';
}
function hideAllForms () {
	for (var i = 0; i < forms.length; i++) {
		forms[i].style.display = 'none';
	}
}
