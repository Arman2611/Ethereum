var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');

var server = http.createServer(function (req, res) {
	var q = url.parse(req.url, true);
	var filename = "." + q.pathname;
	console.log(req.url);
	if (q.pathname == "/") {
		res.writeHead(302, {'Location': '/index.html'});
		return res.end();	
	} else if (q.search) {
		if (q.search == "?giveMeAdminName") {
			fs.readFile('./admin/admin.json', function (err, data) {
				if (err) throw err;
				var adminData = JSON.parse(data);
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write(adminData.fullname);
				return res.end();
			})
		} else if (q.search == "?giveMeUserData") {
			fs.readFile('./admin/users.json', function (err, data) {
				if (err) throw err;
				var userData = JSON.parse(data);
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.write(JSON.stringify(userData));
				return res.end();
			});
		} else if (q.search == "?giveMeProfileName") {
			fs.readFile('./profile/profile.json', function (err, data) {
				if (err) throw err;
				var profileData = JSON.parse(data);
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write(profileData.name);
				return res.end();
			})
		} else if (q.search == "?giveMeProfileData") {
			fs.readFile('./profile/profile.json', function (err, data) {
				if (err) throw err;
				var profileData = JSON.parse(data);
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.write(JSON.stringify(profileData));
				return res.end();
			});
		} else if (q.search == "?logOut") {
			res.writeHead(302, {'Location': '/index.html'});
			return res.end();	
		} else if (q.search == "?giveMeLoggedData") {
			fs.readFile('./login/log.txt', function (err, data) {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write(data);
				return res.end();
			});
		} else if (q.search) {
			if (q.query.form == "add-user" || q.query.form == "user-signup") {
				console.log(q.query);
				var username = q.query.username;
				var password = q.query.password;
				var fullname = q.query.fullname;
				var country = q.query.country;
				fs.readFile('./admin/users.json', function (err, data) {
					if (err) throw err;
					var userData = JSON.parse(data);
					var newUserId;
					function setIdForNewUser () {
						var lastUserId = userData.users[userData.users.length-1].id;
						var lastUserIdInteger = parseInt(lastUserId);
						var newUserIdInteger = lastUserIdInteger + 1;
						var newUserIdText = newUserIdInteger.toString(); 
						var tt = '00' + newUserIdText;
						newUserId = tt[tt.length-3] + tt[tt.length-2] + tt[tt.length-1];
					}
					setIdForNewUser();
					var newUserData = {"id": newUserId, "login": username, "name": fullname, "country": country};
					console.log(newUserData);
					userData.users.push(newUserData);
					//Add new user's data in users.json
					fs.writeFile('./admin/users.json', JSON.stringify(userData, null, 4), function () {
						if (err) throw err;
					});
					//Get content of passwords.json
					fs.readFile('./admin/passwords.json', function (err, data) {
						if (err) throw err;
						var passwordsData = JSON.parse(data);
						var newPasswordsData = {"login": username, "password": password};
						passwordsData.users.push(newPasswordsData);
						//Add new user's login and password in passwords.json
						fs.writeFile('./admin/passwords.json', JSON.stringify(passwordsData, null, 4), function () {
							if (err) throw err;
						});
					});
					res.writeHead(302, {'Location': '/index.html'});
					return res.end();
				});
			} else if (q.query.form == "admin-signin") {
				var username = q.query.username;
				var password = q.query.password;
				fs.readFile('./admin/admin.json', function (err, data) {
					if (err) throw err;
					var adminData = JSON.parse(data);
					if (username == adminData.username && password == adminData.password) {
						res.writeHead(302, {'Location': '/admin.html'});
						return res.end();
					} else {
						fs.writeFile('./login/log.txt', 'admin', function () {
							if (err) throw err;
						});
						res.writeHead(302, {'Location': '/login.html'});
						return res.end();
					};
				});	
			} else if (q.query.form == "user-signin") {
				var username = q.query.username;
				var password = q.query.password;
				fs.readFile('./admin/passwords.json', function (err, data) {
					if (err) throw err;
					var userData = JSON.parse(data);
					for (let i = 0; i < userData.users.length; i++) {
						if (username == userData.users[i].login) {
							if (password == userData.users[i].password) {								
								fs.readFile('./admin/users.json', function (err, database) {
									var dataBase = JSON.parse(database);
									var profileData = {};
									profileData.id = dataBase.users[i].id;
									profileData.login = dataBase.users[i].login;
									profileData.name = dataBase.users[i].name;
									profileData.country = dataBase.users[i].country;
									fs.writeFile('./profile/profile.json', JSON.stringify(profileData, null, 4), function () {
										if (err) throw err;
									});
									res.writeHead(302, {'Location': '/profile.html'});
									return res.end();
								});	
								return;							
							} else {
								fs.writeFile('./login/log.txt', 'user', function () {
									if (err) throw err;
								});
								res.writeHead(302, {'Location': '/login.html'});
								return res.end();
							};
						};
					};
					fs.writeFile('./login/log.txt', 'user', function () {
						if (err) throw err;
					});
					res.writeHead(302, {'Location': '/login.html'});
					return res.end();
				});	
			};
		};
	} else {
		fs.readFile(filename, function(err, data) {
			var reqExtension = mime.getType(filename);
			if (err) {
				res.writeHead(404, {'Content-Type': 'text/html'});
				return res.end("404 Not Found");
			}
			res.writeHead(200, {'Content-Type': reqExtension});
			res.write(data);
			return res.end();
		});
	};	
});

server.listen(8080);