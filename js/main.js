let isUpdate = false;
let addressBookDataObj = {};

window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#full-name');
    name.addEventListener('input', function(){
        if (!name.value || name.value == null || name.value == "" || name.value.length == 0){
            setTextvalue('.error-text',"");
            return;
        }
        try {
            checkFullName(name.value);
            setTextvalue('.error-text',"");
        } catch (e) {
            setTextvalue('.error-text',e);
        }
    });

    const phoneNum = document.querySelector('#phone-number');
    phoneNum.addEventListener('input',function(){
        try {
            checkPhoneNum(phoneNum.value);
            setTextvalue('.error-tel',"");
        } catch (e) {
            setTextvalue('.error-tel',e);
        }
    });

    const address = document.querySelector('#address');
    address.addEventListener('input',function(){
        try {
            checkAddress(address);
            setTextvalue('.error-address',"");
        } catch (e) {
            setTextvalue('.error-address',e);
        }
        if (!address.value || address.value == null || address.value == "" || address.value.length == 0){
            setTextvalue('.error-address',e);
        } 
    });

    checkForUpdate();
});

const save = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObjt();
        if (site_properties.use_local_storage.match("true")) {
            createandUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        } else {
            createOrUpdateAddressBook();
        }
        
    } catch (e) {
        return;
    }
}
const createOrUpdateAddressBook = () => {
    let postURL = site_properties.server_url;
    let methodCall = "POST";
    if (isUpdate) {
        methodCall = "PUT";
        postURL = postURL + addressBookDataObj.id.toString();
    }
    makeServiceCall(methodCall, postURL, true, addressBookDataObj)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        });
}

const setAddressBookObjt = () => {
    if(!isUpdate) addressBookDataObj.id = createNewContactId();
    addressBookDataObj._name = document.querySelector('#full-name').value;
    addressBookDataObj._phoneNum = document.querySelector('#phone-number').value;
    addressBookDataObj._address = document.querySelector('#address').value;
    addressBookDataObj._city = document.querySelector('#city').value;
    addressBookDataObj._state = document.querySelector('#state').value;
    addressBookDataObj._zipcode = document.querySelector('#zipcode').value;
}
 
function createandUpdateStorage() {
    let addressBookContactList = JSON.parse(localStorage.getItem('AddressBookContacts'));
    if (addressBookContactList) {
        let addBookData = addressBookContactList.find(contact => contact.id == addressBookDataObj.id);
        if (!addBookData) {
            addressBookContactList.push(addressBookDataObj);
        } else {
            const index = addressBookContactList.map(contact => contact.id).indexOf(addBookData.id);
            addressBookContactList.splice(index,1,addressBookDataObj);
        }
    } else {
        addressBookContactList = [addressBookDataObj];
    }

    alert(addressBookContactList.toString());
    localStorage.setItem('AddressBookContacts',JSON.stringify(addressBookContactList));
} 

const createAddressBookContactData =(id) => {
    let addBookData = new AddressBookData();
    if (!id) {
        addBookData.id = createNewContactId();
    } else {
        addBookData.id = id;
    }
    setAddressBookDate(addBookData);
    return addBookData;
}

const createNewContactId = () => {
    let contactID = localStorage.getItem('ContactID');
    contactID = !contactID ? 1 : (parseInt(contactID) + 1).toString();
    localStorage.setItem('ContactID',contactID);
    return contactID;
}

const setAddressBookDate = (addBookData) =>{
    try {
        addBookData.name = addressBookDataObj._name;
    } catch (e) {
        setTextvalue('.error-text',e);
        throw e;
    }
    addBookData.phoneNum = addressBookDataObj._phoneNum;
    addBookData.address = addressBookDataObj._address;
    addBookData.city = addressBookDataObj._city;
    addBookData.state = addressBookDataObj._state;
    addBookData.zipcode = addressBookDataObj._zipcode;
}

const checkForUpdate = () =>{
    const addressBookDataJSON = localStorage.getItem('editcontact');
    isUpdate = addressBookDataJSON ? true : false;
    if(!isUpdate) return;
    addressBookDataObj = JSON.parse(addressBookDataJSON);
    setForm();
}
const resetForm = () => {
    setValue('#full-name', '');
    setValue('#phone-number','');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zipcode', '');
}

const setForm = () => {
    setValue('#full-name', addressBookDataObj._name);
    setValue('#phone-number', addressBookDataObj._phoneNum);
    setValue('#address', addressBookDataObj._address);
    setValue('#city', addressBookDataObj._city);
    setValue('#state', addressBookDataObj._state);
    setValue('#zipcode', addressBookDataObj._zipcode);
}

const reset = () =>{
    setValue('#full-name','');
    setValue('#phone-number','');
    setValue('#address','');
    setValue('#city','mumbai');
    setValue('#state','maharashtra');
    setValue('#zipcode','');
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value  = value;
}

const setTextvalue = (id,value) =>{
    const element = document.querySelector(id);
    element.textContent = value;
}