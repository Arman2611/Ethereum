var userList = document.getElementById('user-list');
var adminNameField = document.getElementById('admin-name');
var navElements = document.getElementsByClassName('nav-element');
var contentPage = document.getElementsByClassName('content-page');


//Add eventlisteners on nav elements
for (let i = 0; i < navElements.length; i++) {
	navElements[i].addEventListener('click', function () {
		enterThisTab(i);
		showContentPage(i);
	});
};

//To add class 'nav-active' to the nav element we clicked on
function enterThisTab (i) {
	for (var j = 0; j < navElements.length; j++) {
		navElements[j].classList.remove("nav-active");
	};
	navElements[i].classList.add("nav-active");
}

//To show content corresponding to the current nav element
function showContentPage (i) {
	for (var j = 0; j < navElements.length; j++) {
		contentPage[j].style.display = 'none';
	};
	contentPage[i].style.display = 'block';
};


var newUser = document.getElementById('new-user');
var addUserMenu = document.getElementById('add-user-menu');
var exitFormIcon = document.getElementById('exit-form');

newUser.onclick = function () {
	addUserMenu.style.display = "flex";
};

exitFormIcon.onclick = function () {
	addUserMenu.style.display = "none";
};


function drawAdminName (username) {
	adminNameField.innerHTML = username;
};

//Request to get Admin's full name and show it in page header
function giveMeAdminName () {
	var request = new XMLHttpRequest();
	request.open("GET", "http://localhost:8080/node1.js?"+'giveMeAdminName');
	request.send();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.responseText != "") {
			var adminName = request.responseText;
			drawAdminName(adminName);
		};
	};
}

giveMeAdminName();

function drawUserData (username, userId, userLogin, userCountry) {
	userList.innerHTML += `
				<section class="user-cell">
					<h3>${username}</h3>
					<span class="user-id">${userId}</span>
					<span class="user-login">${userLogin}</span>
					<span class="user-country">${userCountry}</span>
				</section>
	`;
};

function giveMeUserData () {
	var request = new XMLHttpRequest();
	request.open("GET", "http://localhost:8080/node1.js?"+'giveMeUserData');
	request.send();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.responseText != "") {
			console.log(request.responseText);
			var userData = JSON.parse(request.responseText);
			console.log(userData);
			for (i in userData.users) {
				drawUserData(userData.users[i].name, userData.users[i].id,
				userData.users[i].login, userData.users[i].country);
			};
		};
	};
};

giveMeUserData();