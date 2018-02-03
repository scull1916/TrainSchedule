$(document).ready(function()
{

//Declare variables


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCG8y5UZNbUynL0lvV50GLFJJ41t0UDgWA",
    authDomain: "trainschedule-71276.firebaseapp.com",
    databaseURL: "https://trainschedule-71276.firebaseio.com",
    projectId: "trainschedule-71276",
    storageBucket: "trainschedule-71276.appspot.com",
    messagingSenderId: "105596656887"
  };

  firebase.initializeApp(config);

  //Variable to reference the database
  var database = firebase.database();

  //Initial values
  var trainName = "";
  var destination = "";
  var firstTrain = 0;
  var frequency = 0;
  var first2Now = "";
  var trainCount = 0;
  var minLeft = 0;
  var nextTrain = "";
  




//Build functions

$("#addTrain").on("click", function(event)
{
	event.preventDefault();

	//Grab input values entered into the form
	trainName = $("#TrainName").val().trim();
	destination = $("#Destination").val().trim();

	//Formats user input with moment.js
	firstTrain = moment($("#FirstTrain").val().trim(), "HH:MM").format("X");
	frequency = $("#Frequency").val().trim();
	
	//Create a local object to hold train data
	newTrain = 
	{
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,
		nextTrain: nextTrain,
		minTill: minLeft
		
	};

	


	//Push data into Firebase project
	database.ref().push(newTrain);
	

	//Log content to the console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrain);
	console.log(newTrain.frequency);
	console.log(newTrain.nextTrain);
	console.log(newTrain.minTill);

	//Clear the entry form text boxes
	$("#TrainName").val("");
	$("#Destination").val("");
	$("#FirstTrain").val("");
	$("#Frequency").val("");
})

	//Create a Firebase event to add train to the database and a new row to the HTML to display:
	//this essentially pulls the data living in the Firebase project into the app so that it can
	//be added to the UI
	database.ref().on("child_added", function(childsnapshot, prevChildKey)
	{
		console.log(childsnapshot.val());

		//Store data into variables
		var addedTrain = childsnapshot.val().name;
		var destined = childsnapshot.val().destination;
		var trainOne = childsnapshot.val().firstTrain;
		var freQ = childsnapshot.val().frequency;


		console.log(addedTrain);
		console.log(destined);
		console.log(trainOne);
		console.log(freQ);


		//Determine the arrival of the next train
		// var interval = moment().diff(moment.unix(trainOne, "X"), "hours");
		// console.log("next train: " + interval);
		
		//Calculate the duration in minutes between the current time and the first train
		first2Now = moment().diff(moment.unix(firstTrain, "X"), "hh:mm");



		//Determine how many minutes remain until the next train arrives

		//Determine the number of trains that have run since the first train
		trainCount = first2Now % Frequency;

		//Determine the minutes until the next train arrives
		minLeft = frequency - trainCount;

		//Determine the time of the next train arrival
		nextTrain = moment().add(moment.unix(minLeft, "X"), "hh:mm");

		//Format the data into a readable format



		//Add train schedule information into HTML
		$("#trainSchedule > tbody").append("<tr><td>" + addedTrain 
			+ "</td><td>" + destined + "</td><td>" + freQ + "</td><td>" + nextTrain 
			+ "</td><td>" + minLeft + "</td></tr>");
		

	});
















	//end of document.ready
})