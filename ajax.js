window.addEventListener('load', onLoad);

function onLoad(){
    // fades out loading screen
	var loading = document.querySelector('#loading');
	loading.classList.add('fadeOut');
	setTimeout(function(){
		document.querySelector('body').removeChild(loading);
	},800);
};

//// CHECKS ENTRY ON KEY UP (or touch)
var heightMatch = window.matchMedia("(max-height: 500px)").matches;
if (heightMatch) {
	window.addEventListener('touchstart', verifyEntry);
}
window.addEventListener('keyup', verifyEntry);

var submit = document.querySelector('#submit');
submit.addEventListener('click', function(){
	getAddress();
	submitEntry();
});


var output = document.querySelector('#output');
output.innerHTML = "Ready!";
output.style.opacity = "0";

var errText = document.querySelector('.errText');
var name, email, postcode, address;

//// GETS ADDRESS FROM GOOGLE MAPS API
function getAddress(){
	var output = document.querySelector('#output');
	var postcode = document.querySelector('#postcode').value;
	if (postcode){
		var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + postcode;

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url , true);

		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4 && xhr.status == 200){
				address = JSON.parse(xhr.responseText).results[0].formatted_address;
				output.innerHTML = address;
			} else if (xhr.readyState == 4 && xhr.status != 200){
				output.innerHTML = "Oops.. Something went wrong";
			} else if (xhr.readyState < 4){
				output.innerHTML = "Loading...";
				output.style.opacity = "1";
			};
		};

		xhr.send();
	} else {
		errText.innerHTML = "Postal code is invalid.";
		errText.style.opacity = "1";

		leftEye.style.left = '4.2em';
		rightEye.style.left = '8.7em';
		leftEye.style.top = rightEye.style.top = '4.5em';
		leftEye.style.transform = rightEye.style.transform = 'scale(1.5)';
	}
};


// Verifies entry format and checks database for duplicates
function verifyEntry(){
	name = document.querySelector('#name').value;
	email = document.querySelector('#email').value;
	phone = document.querySelector('#phone').value;
	postcode = document.querySelector('#postcode').value;

	var string = "name=" + name + "&&email=" + email + "&&phone=" + phone + "&&postcode=" + postcode;
	var xhr2 = new XMLHttpRequest();
	xhr2.open("GET", "verify.php", true);
	// xhr2.setRequestHeader("Content-type","application/x-www-form-urlencoded");

	xhr2.onreadystatechange = function(){
		if (xhr2.readyState == 4 && xhr2.status == 200){
			console.log(xhr2.responseText);
			updateStatusBoxes(JSON.parse(xhr2.responseText));
		};
	};
	if (xhr2){
		xhr2.send(string);
	};
};


// Submits entry to database
function submitEntry(){
	name = document.querySelector('#name').value;
	email = document.querySelector('#email').value;
	phone = document.querySelector('#phone').value;
	postcode = document.querySelector('#postcode').value;

	var string = "name=" + name + "&&email=" + email + "&&phone=" + phone + "&&postcode=" + postcode;
	var xhr3 = new XMLHttpRequest();
	xhr3.open("POST", "submit.php", true);
	xhr3.setRequestHeader("Content-type","application/x-www-form-urlencoded");

	xhr3.onreadystatechange = function(){
		if (xhr3.readyState == 4 && xhr3.status == 200){
			var data = JSON.parse(xhr3.responseText);
			if (data.name && data.email && data.phone && data.postcode){
				showConfirmation();
			};
		};
	};

	xhr3.send(string);
};


// Displays green checkmark if valid
function updateStatusBoxes(data){

	if(data.errText){
		errText.innerHTML = data.errText;
		errText.style.opacity = "1";

		leftEye.style.left = '4.2em';
		rightEye.style.left = '8.7em';
		leftEye.style.top = rightEye.style.top = '4.5em';
		leftEye.style.transform = rightEye.style.transform = 'scale(1.5)';
	} else {
		errText.innerHTML = "Fill in the form below";
		errText.style.opacity = "0";
		leftEye.style.transform = rightEye.style.transform = 'scale(1)';
	};
	
	var nameStatus = document.querySelector('#name-status');
	if (data.name) {
		nameStatus.style.backgroundImage = 'url("images/checked-green.svg")';
	} else {
		nameStatus.style.backgroundImage = 'url("images/checked-grey.svg")';
	}

	var emailStatus = document.querySelector('#email-status');
	if (data.email) {
		emailStatus.style.backgroundImage = 'url("images/checked-green.svg")';
	} else {
		emailStatus.style.backgroundImage = 'url("images/checked-grey.svg")';
	}

	var phoneStatus = document.querySelector('#phone-status');
	if (data.phone) {
		phoneStatus.style.backgroundImage = 'url("images/checked-green.svg")';
	} else {
		phoneStatus.style.backgroundImage = 'url("images/checked-grey.svg")';
	}

	var postcodeStatus = document.querySelector('#postcode-status');
	if (data.postcode) {
		postcodeStatus.style.backgroundImage = 'url("images/checked-green.svg")';
	} else {
		postcodeStatus.style.backgroundImage = 'url("images/checked-grey.svg")';
	}
};

function showConfirmation(){
	var form = document.querySelector('#form');
	// form.innerHTML = name + "</br></br>" + email + "</br></br>" + phone +  "</br></br>" + address +  "</br></br><b>Success!</b>";
	form.style.height = '100px';
	form.innerHTML = "<h2>Success!</h2>";
};


//// Checks if screen width > 1000px
var widthMatch = window.matchMedia("(min-width: 1000px)").matches;
var leftEye = document.querySelector('.left');
var rightEye = document.querySelector('.right');
var startR = startL = {};
startR.top = rightEye.style.top;
startR.left = rightEye.style.left;
startL.top = leftEye.style.top;
startL.left = leftEye.style.left;


if (widthMatch){
	document.addEventListener('click', function(ev){
		if(ev.target.id == 'submit'){
			document.querySelector('#owl').classList.add('bounce');
			setTimeout(function(){
				document.querySelector('#owl').classList.remove('bounce')
			}, 2500);
		} else if (ev.target.tagName.toLowerCase() == 'input'){
			leftEye.style.transform = rightEye.style.transform = 'scale(1)';
			switch(ev.target.id){
				case ("name"): 
					leftEye.style.top = rightEye.style.top = '2.5em';
					leftEye.style.left = '3.5em';
					rightEye.style.left = '8.1em';
					break;
				case ("email"): 
					leftEye.style.top = rightEye.style.top = '3em';
					leftEye.style.left = '3.2em';
					rightEye.style.left = '7.7em';
					break;
				case ("phone"): 
					leftEye.style.top = rightEye.style.top = '4.5em';
					leftEye.style.left = '3em';
					rightEye.style.left = '7.7em';
					break;
				case ("postcode"): 
					leftEye.style.top = rightEye.style.top = '5.5em';
					leftEye.style.left = '3.5em';
					rightEye.style.left = '8em';
					break;

			};

		};
	});
};


