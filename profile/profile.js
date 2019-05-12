var userList = document.getElementById('user-list');
var profileNameField = document.getElementById('profile-name');
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


function drawProfileName (username) {
	profileNameField.innerHTML = username;
};

//Request to get User's full name and show it in page header
function giveMeProfileName () {
	var request = new XMLHttpRequest();
	request.open("GET", "http://localhost:8080/node1.js?"+'giveMeProfileName');
	request.send();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.responseText != "") {
			var adminName = request.responseText;
			drawProfileName(adminName);
		};
	};
}

giveMeProfileName();

function drawProfileData (username, userId, userLogin, userCountry) {
	userList.innerHTML += `
				<section class="user-cell">
					<h3>${username}</h3>
					<span class="user-id">${userId}</span>
					<span class="user-login">${userLogin}</span>
					<span class="user-country">${userCountry}</span>
				</section>
	`;
};

function giveMeProfileData () {
	var request = new XMLHttpRequest();
	request.open("GET", "http://localhost:8080/node1.js?"+'giveMeProfileData');
	request.send();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.responseText != "") {
			console.log(request.responseText);
			var profileData = JSON.parse(request.responseText);
			console.log(profileData);
			drawProfileData(profileData.name, profileData.id,
			profileData.login, profileData.country);
		};
	};
};

giveMeProfileData();

