class User {
    constructor(id, name, email, password, phone, status, role, token) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.phone = phone;
      this.status = status|| '0';
      this.role = role || '0';
      this.token = token;
    }
  
    getId() {
      return this.id;
    }
  
    setId(id) {
      this.id = id;
    }
  
    getName() {
      return this.name;
    }
  
    setName(name) {
      this.name = name;
    }
  
    getEmail() {
      return this.email;
    }
  
    setEmail(email) {
      this.email = email;
    }
  
    getPassword() {
      return this.password;
    }
  
    setPassword(password) {
      this.password = password;
    }
  
    getPhone() {
      return this.phone;
    }
  
    setPhone(phone) {
      this.phone = phone;
    }
  
    getStatus() {
      return this.status;
    }
  
    setStatus(status) {
      this.status = status;
    }
  
    getRole() {
      return this.role;
    }
  
    setRole(role) {
      this.role = role;
    }
  
    getToken() {
      return this.token;
    }
  
    setToken(token) {
      this.token = token;
    }
  }
  
  module.exports = User;