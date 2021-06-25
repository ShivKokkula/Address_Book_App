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
});

const save = () =>{
    try {
        let addressBookContact = createAddressBookContact();
        createandUpdateStorage(addressBookContact);
        window.location.replace('../home.html');
        //document.getElementById("demo").innerHTML = addressBookContact.pop().toString();
    } catch (e) {
        console.log(e)
        return;
    }
}

const createAddressBookContact = () => {
    let AddressBookContact = new AddressBookData();
    try {
        AddressBookContact.name = document.querySelector('#full-name').value;
    } catch (e) {
        setTextvalue('.error-text',e);
        throw e;
    }
    
    AddressBookContact.phoneNum = document.querySelector('#phone-number').value;
    AddressBookContact.address = document.querySelector('#address').value;
    AddressBookContact.city = document.querySelector('#city').value;
    AddressBookContact.state = document.querySelector('#state').value;
    AddressBookContact.zipcode = document.querySelector('#zipcode').value;
    alert(AddressBookContact.toString());
    return AddressBookContact;
} 
function createandUpdateStorage(addressBookContact) {
    let addressBookContactList = JSON.parse(localStorage.getItem('AddressBookContacts'));

    if (addressBookContactList != undefined) {
        addressBookContactList.push(addressBookContact);
    } else {
        addressBookContactList = [addressBookContact];
    }
    alert(addressBookContactList.pop().toString());
    localStorage.setItem('AddressBookContacts',JSON.stringify(addressBookContactList));
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