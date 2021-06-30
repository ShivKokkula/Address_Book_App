let addressBookList;
window.addEventListener('DOMContentLoaded',(event) => {
    addressBookList = getContactDetailsFromStorage();
    document.querySelector('.contact-count').textContent = addressBookList.length;
    createInnerHTML();
});

const getContactDetailsFromStorage = () =>{
    return localStorage.getItem('AddressBookContacts') ? 
            JSON.parse(localStorage.getItem('AddressBookContacts')) : [];
}

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
                <img name = "${addressBookData._id}" src="../assets/bin.png" alt="delete" class="delete" id="1" onclick="remove(this)">
                <img name = "${addressBookData._id}" src="../assets/edit.PNG" alt="edit" class="edit" id="2" onclick="update(this)">
            </td>
        </tr>`;
    }

    document.querySelector('#table-display').innerHTML = innerhtml;
}