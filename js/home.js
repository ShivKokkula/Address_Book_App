let addressBookList;
window.addEventListener('DOMContentLoaded',(event) => {
    if (site_properties.use_local_storage.match("true")) {
        getAddressBookDataFromStorage();
    } else {
        getAddressBookDataFromServer();
    }
});

const getAddressBookDataFromStorage = () =>{
    addressBookList = localStorage.getItem('AddressBookContacts') ? 
            JSON.parse(localStorage.getItem('AddressBookContacts')) : [];
    processAddressBookDataResponse();
}

const processAddressBookDataResponse = () => {
    document.querySelector('.contact-count').textContent = addressBookList.length;
    createInnerHTML();
    localStorage.removeItem('editcontact');
}

const getAddressBookDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
        .then(responseText => {
            addressBookList = JSON.parse(responseText);
            processAddressBookDataResponse();
        })
        .catch(error => {
            console.log("Get error status: " + JSON.stringify(error));
            addressBookList = [];
            processAddressBookDataResponse();
        });
};

const createInnerHTML = () => {
    const headerHtml = `
    <tr>
        <th>Full Name</th>
        <th>Address</th>
        <th>City</th>
        <th>State</th>
        <th>Zip Code</th>
        <th>Phone Number</th>
        <th>Actions</th>
    </tr>  `;

    if(addressBookList.length == 0) return;

    let innerhtml = `${headerHtml}`;

    for (const addressBookData of addressBookList) {
        innerhtml =`
        ${innerhtml}
        <tr>
            <td>${addressBookData._name}</td>
            <td>${addressBookData._address}</td>
            <td>${addressBookData._city}</td>
            <td>${addressBookData._state}</td>
            <td>${addressBookData._zipcode}</td>
            <td>${addressBookData._phoneNum}</td>
            <td>
                <img id = "${addressBookData.id}" src="../assets/bin.png" alt="delete" class="delete" onclick="remove(this)">
                <img id = "${addressBookData.id}" src="../assets/edit.PNG" alt="edit" class="edit" onclick="update(this)">
            </td>
        </tr>`;
    }

    document.querySelector('#table-display').innerHTML = innerhtml;
}

const remove = (node) => {
    let addBookData = addressBookList.find(contact => contact.id == node.id);
    if(!addBookData) return;
    const index = addressBookList.map(contact => contact.id).indexOf(addBookData.id);
    addressBookList.splice(index,1);
    localStorage.setItem('AddressBookContacts',JSON.stringify(addressBookList));
    document.querySelector('.contact-count').textContent = addressBookList.length;
    createInnerHTML();
}

const update = (node) => {
    let addBookData = addressBookList.find(contact => contact.id == node.id);
    if(!addBookData) return;
    localStorage.setItem('editcontact',JSON.stringify(addBookData));
    window.location.replace(site_properties.adddress_book_form_page);
}