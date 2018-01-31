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




//Build functions

$("#addTrain").on("click", function(event)
{
	event.preventDefault();

	//Grab input values entered into the form
	trainName = $("#TrainName").val().trim();
	destination = $("#Destination").val().trim();
	firstTrain = $("#FirstTrain").val().trim();
	frequency = $("#Frequency").val().trim();

	//Create a local object to hold employee data
	var newTrain = 
	{
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	};

	console.log(newTrain);


	//Push data into Firebase project
	database.ref().push(newTrain);
	
})

//Firebase watcher and initial loader
database.ref().on("value", function(snapshot)
{
	//Log the data in the snapshot
	console.log(snapshot.val().trainName);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().firstTrain);
	console.log(snapshot.val().frequency);
	console.log(snapshot.val().joinDate);
})
















	//end of document.ready
})