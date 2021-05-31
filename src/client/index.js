document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5500/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

// document.querySelector('table tbody').addEventListener('click', function(event) {
//     if (event.target.className === "delete-row-btn") {
//         deleteRowById(event.target.dataset.ID);
//     }
//     if (event.target.className === "edit-row-btn") {
//         handleEditRow(event.target.dataset.ID);
//     }
// });

// const updateBtn = document.querySelector('#update-row-btn');

const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const tableSection = document.querySelector('#table');
    tableSection.hidden = false;
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5500/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

// function deleteRowById(ID) {
//     fetch('http://localhost:5000/delete/' + ID, {
//         method: 'DELETE'
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             location.reload();
//         }
//     });
// }

// function handleEditRow(ID) {
//     const updateSection = document.querySelector('#update-row');
//     updateSection.hidden = false;
//     document.querySelector('#update-name-input').dataset.ID = ID;
// }

// updateBtn.onclick = function() {
//     const updateNameInput = document.querySelector('#update-name-input');


//     console.log(updateNameInput);

//     fetch('http://localhost:5000/update', {
//         method: 'PATCH',
//         headers: {
//             'Content-type' : 'application/json'
//         },
//         body: JSON.stringify({
//             ID: updateNameInput.dataset.ID,
//             name: updateNameInput.value
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             location.reload();
//         }
//     })
// }


// const addBtn = document.querySelector('#add-name-btn');

// addBtn.onclick = function () {
//     const nameInput = document.querySelector('#name-input');
//     const name = nameInput.value;
//     nameInput.value = "";

//     fetch('http://localhost:5000/insert', {
//         headers: {
//             'Content-type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({ name : name})
//     })
//     .then(response => response.json())
//     .then(data => insertRowIntoTable(data['data']));
// }

// function insertRowIntoTable(data) {
//     console.log(data);
//     const table = document.querySelector('table tbody');
//     const isTableData = table.querySelector('.no-data');

//     let tableHtml = "<tr>";

//     for (var key in data) {
//         if (data.hasOwnProperty(key)) {
//             if (key === 'dateAdded') {
//                 data[key] = new Date(data[key]).toLocaleString();
//             }
//             tableHtml += `<td>${data[key]}</td>`;
//         }
//     }

//     tableHtml += `<td><button class="delete-row-btn" data-id=${data.ID}>Delete</td>`;
//     tableHtml += `<td><button class="edit-row-btn" data-id=${data.ID}>Edit</td>`;

//     tableHtml += "</tr>";

//     if (isTableData) {
//         table.innerHTML = tableHtml;
//     } else {
//         const newRow = table.insertRow();
//         newRow.innerHTML = tableHtml;
//     }
// }

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ID, name, address}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${address}</td>`;
        // tableHtml += `<td><button class="delete-row-btn" data-id=${ID}>Delete</td>`;
        // tableHtml += `<td><button class="edit-row-btn" data-id=${ID}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;}