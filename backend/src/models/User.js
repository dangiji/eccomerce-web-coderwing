// User Model
class User {
  constructor(firstName, lastName, email, password, phone) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.createdAt = new Date();
  }
}

module.exports = User;
