var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
displayTable();

function displayTable() {
  var tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  tableData.forEach(function(rowData) {
    var row = tableBody.insertRow(tableBody.rows.length);
    var cell1 = row.insertCell(0);
    cell1.textContent = rowData.task;

    var cell2 = row.insertCell(1);
    var buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    var counter = document.createElement('span');
    counter.className = 'counter';
    counter.textContent = rowData.plusCounter - rowData.minusCounter;
    
    var plusButton = document.createElement('button');
    plusButton.className = 'plus-button';
    plusButton.textContent = '+';
    plusButton.onclick = function() {
      incrementCounter(row);
    };

    var minusButton = document.createElement('button');
    minusButton.className = 'minus-button';
    minusButton.textContent = '-';
    minusButton.onclick = function() {
      decrementCounter(row);
    };

    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'x';
    deleteButton.onclick = function() {
      deleteRow(row);
    };

    buttonContainer.appendChild(counter);
    buttonContainer.appendChild(plusButton);
    buttonContainer.appendChild(minusButton);
    buttonContainer.appendChild(deleteButton);

    cell2.appendChild(buttonContainer);
  });
}

function addRow() {
  var taskInput = document.getElementById('taskInput');
  var task = taskInput.value.trim();

  if (task !== '') {
    var newRowData = { task: task, plusCounter: 0, minusCounter: 0 };
    tableData.push(newRowData);
    displayTable();
    saveTableData();
    taskInput.value = '';
  }
}

function incrementCounter(row) {
  var rowData = tableData[row.rowIndex - 1];
  rowData.plusCounter++;
  displayTable();
  saveTableData();
}

function decrementCounter(row) {
  var rowData = tableData[row.rowIndex - 1];
  rowData.minusCounter++;
  displayTable();
  saveTableData();
}

function deleteRow(row) {
  tableData.splice(row.rowIndex - 1, 1);
  displayTable();
  saveTableData();
}

function saveTableData() {
  localStorage.setItem('tableData', JSON.stringify(tableData));
}

function incrementCounter(row) {
  var rowData = tableData[row.rowIndex - 1];
  rowData.plusCounter++;
  displayTable();
  updateProgressBar(); // Call the function to update the progress bar
  saveTableData();
}

function updateProgressBar() {
  // Assuming there is only one habit tracker section, you may need to adjust this selector accordingly
  var progressBar = document.querySelector('.Ebarprogress');
  var smallText = document.querySelector('.Ebar-container .smalltext');

  // Assuming the initial value is 75 and the maximum value is 100
  var initialValue = 75;
  var maxValue = 100;

  // Assuming each click of the plus button adds 5 to the progress
  var incrementValue = 5;

  // Calculate the new progress value
  var newProgress = initialValue + incrementValue;

  // Update the progress bar width
  progressBar.style.width = (newProgress / maxValue) * 100 + '%';

  // Update the small text
  smallText.textContent = newProgress + '/' + maxValue;
}
