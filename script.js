//Use event delegation to create the event listeners
//Pretty much just make the row with the

const portNumber = 4852
const baseUrl = `http://flip3.engr.oregonstate.edu:` + portNumber + `/`

const deleteTable = function() {
    //Deletes the workoutTable
    var old_thead = document.querySelector('thead');

    var old_tbody = document.querySelector('tbody');
    var new_tbody = document.createElement('tbody');

    // Replaces the original tbody with a newly created empty tbody
    old_thead.parentNode.removeChild(old_thead);
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}

const makeTable = function(dataTable){

  // Start with the header row
  makeHeaderRow();

  //Iterate over the rows
  console.log(dataTable.results.length)
  for (var i=0; i < dataTable.results.length; i++) {
    // Create the row
    makeRow(dataTable.results[i]);
  }
    //Add the tableData cells each with data
    //Add the buttons
}

const makeHeaderRow = function() {
  //Creates header row of the table
  var workoutTable = document.getElementById('workoutTable');

  // Create the table head element
  var header = workoutTable.createTHead();

  // A list of the header cell contents
  var headerData = ['id', 'Name', 'Reps', 'Weight', 'Date',
                    'Units', 'Update Button', 'Delete Button']

  // Create a row in the table head
  var row = header.insertRow(0);

  // Loops through the headerdata array and creates a cell for each
  for (var i=0; i < headerData.length; i++) {
    var th = document.createElement('th');
    //console.log(headerData[i]);
    th.innerHTML = headerData[i];
    //console.log(th)
    row.append(th);
  };

  // Create the body of the table
  workoutTable.createTBody();
}

const makeRow = function(row, headerRow = false) {
  // Use the data in the row to create the tableData cells
  console.log(row);
  var {id, name, reps, weight, lbs, date } = row;

  var tableBody = document.querySelector('tbody');

  var new_row = tableBody.insertRow();

  console.log(row.date);
  console.log(typeof(row.date));

  for(const property in row) {
    var td = document.createElement('td');

    if (property == 'lbs') {
      if (row[property] == 1) {
        td.innerHTML = 'lbs';
      } else {
        td.innerHTML = 'Kg';
      }
    } else {
      td.innerHTML = row[property];
    };

    new_row.append(td);
  };

  var buttonUpdate = document.createElement('td');
  buttonUpdate.innerHTML = "<button type='button'>Update</button>";
  new_row.append(buttonUpdate);

  var buttonDelete = document.createElement('td');
  buttonDelete.innerHTML = "<button type'button'>Delete</button>";
  new_row.append(buttonDelete);

  //for( var i=0; i < row)
};

const getData = function() {
  //asynchronous call to send the request, and retreive data from the server
  //Will be a get request to the database
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.open('GET', baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        console.log(response);
        resolve( response );
      } else {
        console.log('Error in network request: ' + req.statusText);
      }
    });
    req.send();
  })
};

//Submit the add form and rebuild the table
document.querySelector('#addButton').onclick = async function(event) {
  //event listener for the add form button
  let target = event.target;
  event.preventDefault();

  var inputName = document.getElementById('inputName').value;
  var inputReps = document.getElementById('inputReps').value;
  var inputWeight = document.getElementById('inputWeight').value;
  var inputUnits = document.querySelector('input[name="units"]:checked').value
  var inputDate = document.getElementById('inputDate').value;

  console.log(inputName);
  console.log(inputReps);
  console.log(inputWeight);
  console.log(inputUnits);
  console.log(inputDate);

  var req = new XMLHttpRequest();
  var payload = { name:inputName, reps:inputReps, weight:inputWeight,
                  lbs:inputUnits, date:inputDate};

  req.open('POST', baseUrl, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if(req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log(response);
    } else {
      console.log('Error in the network request ' + req.statusText);
    }});

  req.send(JSON.stringify(payload));



  console.log('Button stuff');
  // Send the query to the database to get all data
  let dataTable = await getData();
  deleteTable();
  makeTable(dataTable);
};

// Update or delete the row
document.querySelector('#workoutTable').onclick = async function(event) {
  //event listener for the update or delete buttons
  let target = event.target;

  //Send the delete request
  // if (target.tagName == 'btn') {
  //   var req = new XMLHttpRequest();
  //   var payload = { id:null };
  //   payload.id = target.parentNode.parentNode.firstChild.value;
  //
  //   req.open('DELETE', 'baseUrl', true);
  //   req.setRequestHeader('content-type', 'application.json');
  //   req.addEventListener('load', function(){
  //     if (req.status >= soo && req.status < 400) {
  //       var response = JSON.parse(req.respnseText);
  //       console.log(response);
  //     } else {
  //       console.log("Error in network request: " + req.statusText);
  //     }
  //   });
  //   req.send(JSON.stringify(payload));
  //   event.preventDefault();
  // }

  //Send the update request
    //Open the popup form for the update request

  // Send the query to the database to get all data and build the table
  let dataTable = await getData();
  deleteTable();
  console.log('Button pressed');
  makeTable(dataTable);
};

const table = document.getElementById('workoutTable');
table.addEventListener('click', function(event){
  let target = event.target; // Grab the element that actually sends the event

  // If update button send a put request to the server

  //If its a delete button send a delete request to the server

  // Delete the table
  // Make the table again
});

// Runs as soon as the page loads, intial get request
const pageLoad = async function() {

  let dataTable = await getData();
  console.log('made it here')

  console.log(dataTable);
  makeTable(dataTable);
};

pageLoad();
