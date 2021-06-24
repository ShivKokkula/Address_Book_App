window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#full-name');
    const nameError = document.querySelector('.error-text');
    name.addEventListener('input', function(){
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name.value)) {
            nameError.textContent = "";
        } else if (!name.value || name.value == null || name.value == "" || name.value.length == 0){
            nameError.textContent = "";
        } 
        else {
            nameError.textContent = "Invalid name";
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
        let addressRegex = RegExp('(^[\w](( \w+)|(\w*))*$)|(^\w$');

        if (addressRegex.test(address.value)) {
            addressError.textContent = ""; 
        }else if (!address.value || address.value == null || address.value == "" || address.value.length == 0){
            addressError.textContent = "";
        } else {
            addressError.textContent = "Invalid address";
        }
    });
})