let isUpdate = false;
let addressBookDataObj = {};

window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#full-name');
    const nameError = document.querySelector('.error-text');
    name.addEventListener('input', function(){
        try {
            (new AddressBookData()).name = name.value;
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }
        if (!name.value || name.value == null || name.value == "" || name.value.length == 0){
            nameError.textContent = "";
        }
    });

    const phoneNum = document.querySelector('#phone-number');
    const phoneNumError = document.querySelector('.error-tel');

    phoneNum.addEventListener('input',function(){
        let phoneNumRegex1 = RegExp('[5-9]{1}[0-9]{9}');
        let phoneNumRegex2 = RegExp('[5-9]{1}[0-9]{11}');
        let phoneNumRegex3 = RegExp('[+]{1}[5-9]{1}[0-9]{11}');

        if (phoneNumRegex3.test(phoneNum.value) && phoneNum.value.length == 13) {
            phoneNumError.textContent = "";
        } else if(phoneNumRegex2.test(phoneNum.value) && phoneNum.value.length == 12){
            phoneNumError.textContent = "";
        } else if(phoneNumRegex1.test(phoneNum.value) && phoneNum.value.length == 10){
            phoneNumError.textContent = "";
        } else if (!phoneNum.value || phoneNum.value == null || phoneNum.value == "" || phoneNum.value.length == 0){
            phoneNumError.textContent = "";
        }  
        else {
            phoneNumError.textContent = "Invalid Phone number"
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.error-address');

    address.addEventListener('input',function(){
        let addressRegex = RegExp('[5-9]{1}[0-9]{9}');

        if (addressRegex.test(address.value)) {
            addressError.textContent = ""; 
        }else if (!address.value || address.value == null || address.value == "" || address.value.length == 0){
            addressError.textContent = "";
        } else {
            addressError.textContent = "Invalid address";
        }
    });

    checkForUpdate();
});

const save = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObjt()
        createandUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
}

const setAddressBookObjt = () => {
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
        let addBookData = addressBookContactList.find(contact => contact._id == addressBookDataObj._id);
        if (!addBookData) {
            addressBookContactList.push(createAddressBookContactData());
        } else {
            const index = addressBookContactList.map(contact => contact._id).indexOf(addBookData._id);
            addressBookContactList.splice(index,1,createAddressBookContactData(addBookData._id));
        }
    } else {
        addressBookContactList = [createAddressBookContactData()];
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