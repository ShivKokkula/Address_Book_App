class AddressBookData{
    get id(){
        return this._id;
    }
    set id(id){
        let idRegex = RegExp('^[1-9]\d$');
        if (idRegex.test(id)) 
            this._id = id;
        else throw 'ID is incorrect';
    }
    get name(){
        return this._name;
    }
    set name(name){
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name)) 
            this._name = name;
        else throw 'Name is incorrect';
    }

    get phoneNum(){
        return this._phoneNum;
    }
    set phoneNum(phoneNum){
        this._phoneNum = phoneNum;
    }

    get address(){
        return this._address;
    }
    set address(address){
        this._address = address;
    }

    get city(){
        return this._city;
    }
    set city(city){
        this._city = city;
    }

    get state(){
        return this._state;
    }
    set state(state){
        this._state = state;
    }

    get zipcode(){
        return this._zipcode;
    }
    set zipcode(zipcode){
        this._zipcode = zipcode;
    }

    toString(){
        return "id = " + this.id + " name = " + this.name + "Phone num = " + this.phoneNum +
         " address = " + this.address + " city = " + this.city + " state = " + this.state +
         " zipcode = " + this.zipcode;
    }
}