//Use event delegation to create the event listeners
//Pretty much just make the row with the

const portNumber = 4852
const baseUrl = `http://flip3.engr.oregonstate.edu:` + portNumber + `/`

const makeHeaderRows = function() {
  //Creates header row of the table
}


const makeTable = function(allRows){
  //Iterate over the rows
    //Add the tableData cells each with data
    //Add the buttons
}

const makeRow = function(row) {
  // Use the data in the row to create the tableData cells
}

const makeCell = function(data) {
  //Create a table data cells
  //Add on any atributes (class and such)
}

const table = document.getElementById('workoutTable');
table.addEventListener('click', function(event){
  let target = event.target; // Grab the element that actually sends the event

  // If update button send a put request to the server

  //If its a delete button send a delete request to the server

  // Delete the table
  // Make the table again
});

const onUpdate = function(updateData){}
const onDelete = function(id){}
