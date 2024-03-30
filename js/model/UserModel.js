export default class UserModel {
    constructor() {
        this.email = "";
        this.password = "";
        this.gender = "";
        this.birthdate = "";
    }

    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }

    checkPassword(password) {
        return this.password === password;
    }
    setPassword(password) {
        this.password = password;
    }

    getGender() {
        return this.gender;
    }
    setGender(gender) {
        this.gender = gender;
    }

    getBirthdate() {
        return this.birthdate;
    }
    setBirthdate(birthdate) {
        this.birthdate = birthdate;
    }
}