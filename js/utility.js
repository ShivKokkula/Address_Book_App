const checkFullName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-z ]{2,}$');
    if (!nameRegex.test(name)) throw 'Name is incorrect';
}

const checkPhoneNum = (phoneNum) => {
    let phoneNumRegex1 = RegExp('[5-9]{1}[0-9]{9}');
    let phoneNumRegex2 = RegExp('[5-9]{1}[0-9]{11}');
    let phoneNumRegex3 = RegExp('[+]{1}[5-9]{1}[0-9]{11}');
    
    if (!phoneNumRegex3.test(phoneNum.value) && phoneNum.value.length == 13) {
        throw 'Invalid 13 digit Phone number';
    } else if (!phoneNumRegex2.test(phoneNum.value) && phoneNum.value.length == 12){
        throw 'Invalid 12 digit number';
    } else if (!phoneNumRegex1.test(phoneNum.value) && phoneNum.value.length == 10){
        throw 'Invalid 10 digit Phone number';
    } else if (phoneNum.value.length < 10 || phoneNum.value.length == 11){
        throw 'Invalid Phone number';
    } else {
        setTextvalue('.error-tel',"");
    }
}

const checkAddress = (address) => {
    let addressRegex = RegExp('^[A-Z]{1}[a-z ]{2,}$');
    if (!addressRegex.test(address)) {
        throw 'Invalid address';
    }
}