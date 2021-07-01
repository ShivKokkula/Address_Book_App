const checkFullName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if (!nameRegex.test(name)) throw 'Name is incorrect';
}

const checkPhoneNum = (phoneNum) => {
    // let phoneNumRegex1 = RegExp('[5-9]{1}[0-9]{9}');
    // let phoneNumRegex2 = RegExp('[5-9]{1}[0-9]{11}');
    // let phoneNumRegex3 = RegExp('[+]{1}[5-9]{1}[0-9]{11}');
    
    // if (!phoneNumRegex3.test(phoneNum.value) && phoneNum.value.length == 13) {
    //     throw 'Name is incorrect';
    // } else if (!phoneNumRegex2.test(phoneNum.value) && phoneNum.value.length == 12){
    //     throw 'Name is incorrect';
    // } else if (!phoneNumRegex1.test(phoneNum.value) && phoneNum.value.length == 10){
    //     throw 'Name is incorrect';
    // } else if (!phoneNum.value || phoneNum.value == null || phoneNum.value == "" || phoneNum.value.length == 0){
    //     throw 'Name is incorrect';
    // } else {
    //     throw 'Invalid Phone number';
    // }
}

const checkAddress = (address) => {
    // let addressRegex = RegExp('[5-9]{1}[0-9]{9}');
    // if (!addressRegex.test(address)) {
    //     throw 'Invalid address';
    // }else if (!(!address.value || address.value == null || address.value == "" || address.value.length == 0)){
    //     throw 'Invalid address';
    // }
}