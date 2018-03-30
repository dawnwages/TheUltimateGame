$(document).ready(function(){
	var userId = location.search.split("=") || [0,1];
	userId = userId[1];
	$(".nav-links").each(function () {
		if (userId){
			$(this).attr("href", $(this).attr("href") + "?ch=" + userId);
		}
		else {
			$(this).attr("href", $(this).attr("href") + "?ch=1");
		}
	});

	function genGame(){
		
		let randoNumber = $('<section>')
			.attr("class", "randomNumber")
			.append("<div class='panel-heading'><h3> Crystal Points </h3></div><div class='panel-body'><div class='pTwo' id='random-number'>00</div></div>");
		
		let userGuess = $('<section>')
			.attr("id", "user-number")
			.attr("class","userNumber")
			.append("<div class='panel-heading'><h3> Your Points </h3></div><div class='panel-body'><div class='pTwo'>00</div></div>");
	
		let crystalOne = $('<button>')
			.attr("id","crystal-one")
			.attr("class","crystalOne")
			.append("<div class='panel-body'> <img id='crystal-img-one' class='crystalimg' src='images/gem1_blue.png'></div><div id='crystal-caption-one' class='caption'><h6>Rutilated Quartz Point</h6></div>");
	
		let crystalTwo = $('<button>')
			.attr("id","crystal-two")
			.attr("class","crystalTwo")
			.append("<div class='panel-body'> <img id='crystal-img-two' class='crystalimg' src='images/gem2_green.png'></div><div id='crystal-caption-two' class='caption'><h6>Rutilated Quartz Point</h6></div>");
	
		let crystalThree = $('<button>')
			.attr("id","crystal-three")
			.attr("class","crystalThree")
			.append("<div class='panel-body'> <img id='crystal-img-three' class='crystalimg' src='images/gem3_red.png'></div><div id='crystal-caption-three' class='caption'><h6>Rutilated Quartz Point</h6></div>");
	
		let crystalFour = $('<button>')
			.attr("id","crystal-four")
			.attr("class","crystalFour")
			.append("<div class='panel-body'> <img id='crystal-img-four' class='crystalimg' src='images/gem4_white.png'></div><div id='crystal-caption-four' class='caption'><h6>Rutilated Quartz Point</h6></div>");
	
	
	
		let game = $('<div>')
						.height(600)
						.css("background-image", "url(../images/pixelated_bg600.gif)")
						.attr("class", "playgames")
						.append(randoNumber)
						.append(crystalOne)
						.append(crystalTwo)
						.append(userGuess)
						.append(crystalThree)
						.append(crystalFour);
	
		$("#crystalgame").append(game);
						
	
	};

	var randoNumber;
	var userNumber;
	var upperLimit = 100;
	var lowerLimit = 20;
	var randoCrystalOne;
	var randoCrystalTwo;
	var randoCrystalThree;
	var randoCrystalFour;
	var addCrystalValue;
	var totalRounds;
	var totalWins=0;
	var totalLosses=0;
	var crystalPositions = [randoCrystalOne, randoCrystalTwo, randoCrystalThree, randoCrystalFour];
	var randoCrystalNames = [];
	var randoCrystalImgs = [];
	var randoCrystalLinks = [];

	var crystalNames = [
		"blue gem",
		"green gem",
		"red gem",
		"white gem",
	]
	var crystalImgs= [
		"/images/gem1_blue.png",
		"/images/gem2_green.png",
		"/images/gem3_red.png",
		"../images/gem4_white.png",
	]

	var crystalURLs=[
		"/images/gem1_blue.png",
		"/images/gem2_green.png",
		"/images/gem3_red.png",
		"/images/gem4_white.png",
	]
	//what all of the buttons

	//functions for the buttons

	function randoGen(){
		randoNumber = Math.floor((Math.random()*upperLimit) + lowerLimit);
		console.log(randoNumber);
		$("#random-number").text(randoNumber);
		$("#wins .panel-body").text(totalWins);
		$("#losses .panel-body").text(totalLosses);

	};

	function changeCrystalImg(){
		for (var i = 0; i < 4; i++){
			val = Math.floor(Math.random()*crystalNames.length);
			console.log("Random Crystal : " + val);
			console.log("crystal Names length :" + crystalNames.length);
			randoCrystalNames.push(crystalNames[val]);
			randoCrystalImgs.push(crystalImgs[val]);
			randoCrystalLinks.push(crystalURLs[val]);
		}
		console.log(randoCrystalNames);
		console.log(randoCrystalImgs);
	};

	//changeCrystalImg();

	//no random value can be more than a 20 of the upper limit because that makes the game more fun
	function assignCrystals(){
		changeCrystalImg();
		randoCrystalOne = Math.floor((Math.random()*(upperLimit/5)) + 1);
		console.log(randoCrystalOne);

		$("#crystal-one").val(randoCrystalOne);
		$("#crystal-img-one").attr('src', randoCrystalImgs[0]);
		$("#crystal-caption-one").text(randoCrystalNames[0]);

		randoCrystalTwo = Math.floor((Math.random()*(upperLimit/5)) + 1);
		console.log(randoCrystalTwo);

		$("#crystal-two").val(randoCrystalTwo);
		$("#crystal-img-two").attr('src', randoCrystalImgs[1]);
		$("#crystal-caption-two").text(randoCrystalNames[1]);

		randoCrystalThree = Math.floor((Math.random()*(upperLimit/5)) + 1);
		console.log(randoCrystalThree);

		$("#crystal-three").val(randoCrystalThree);
		$("#crystal-img-three").attr('src', randoCrystalImgs[2]);
		$("#crystal-caption-three").text(randoCrystalNames[2]);

		randoCrystalFour = Math.floor((Math.random()*(upperLimit/5)) + 1);
		console.log(randoCrystalFour);				

		$("#crystal-four").val(randoCrystalFour);
		$("#crystal-img-four").attr('src', randoCrystalImgs[3]);
		$("#crystal-caption-four").text(randoCrystalNames[3]);
	};

	//function from the on click that will add the value of the crystal to the base value
	function addCrystal(){
		var addCrystalValue = 0;
		var addCrystalValue = $(this).val();//we want this to be a local variable that will only exist in this loop.
		userNumber = parseInt(userNumber) + parseInt(addCrystalValue);
		console.log(userNumber);
		console.log($(".crystal").val());
		console.log(addCrystalValue);
		$("#user-number .panel-body").text(userNumber);

		if (userNumber < randoNumber){
			return;
		}
		else if ( userNumber == randoNumber){
			alert("Winner Winner Chicken Dinner!");
			totalWins = totalWins +1;
			totalRounds = totalRounds +1;
			startGame();
		}
		else{
			alert("You've gone over!");
			totalRounds = totalRounds +1;
			totalLosses = totalLosses +1;
			console.log(totalLosses);
			startGame();
		}
	};

	
	function startGame(){
		randoNumber=00;
		userNumber=00;
		randoCrystalNames = [];
		randoCrystalImgs = [];
		randoCrystalLinks = [];
		console.log(userNumber);
		$("#random-number .panel-body, #user-number .panel-body, #crystalgame").empty();
		
		genGame();
		randoGen();
		assignCrystals();
		changeCrystalImg();
		console.log(randoCrystalNames);
	};

	
	startGame();

	//buttons
	$(document).on("click", ".crystal", addCrystal);


}); //end of document.ready 

