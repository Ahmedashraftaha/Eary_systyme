const User= require('./userClass');
class UserRepository {
    constructor(database) {
      this.database = database;
    }
  
    async createUser(user) {
      const result = await this.database.query("INSERT INTO users (name, email, password, phone, status, role, token) VALUES (?, ?, ?, ?, ?, ?, ?)", [user.getName(), user.getEmail(), user.getPassword(), user.getPhone(), user.getStatus(), user.getRole(), user.getToken()]);
      user.setId(result.insertId);
      return user;
    }
  
    // async updateUser(user) {
    //   await this.database.query("UPDATE users SET name = ?, email = ?, password = ?, phone = ?, status = ?, role = ?, token = ? WHERE id = ?", [user.getName(), user.getEmail(), user.getPassword(), user.getPhone(), user.getStatus(), user.getRole(), user.getToken(), user.getId()]);
    //   return user;
    // }
    async updateUser(user) {
        let query = "UPDATE users SET ";
        const values = [];
        const fields = [];
        if (user.getName()) {
          fields.push("name = ?");
          values.push(user.getName());
        }
        if (user.getEmail()) {
          fields.push("email = ?");
          values.push(user.getEmail());
        }
        if (user.getPhone()) {
          fields.push("phone = ?");
          values.push(user.getPhone());
        }
        if (user.getStatus()) {
          fields.push("status = ?");
          values.push(user.getStatus());
        }
        if (user.getRole()) {
          fields.push("role = ?");
          values.push(user.getRole());
        }
        if (fields.length === 0) {
          
          return user;
        }
        query += fields.join(", ");
        console.log(fields);
        query += " WHERE id = ?";
        console.log(query);
        values.push(user.getId());
        await this.database.query(query, values);
        return user;
      }
  
    async deleteUser(id) {
      await this.database.query("DELETE FROM users WHERE id = ?", [id]);
    }
  
    async getUserById(id) {
      const results = await this.database.query("SELECT * FROM users WHERE id = ?", [id]);
      if (results.length > 0) {
        const user = new User(results[0].id, results[0].name, results[0].email, results[0].password, results[0].phone, results[0].status, results[0].role, results[0].token);
        return user;
      }
      return null;
    }
  
    async getAllUsers() {
      const results = await this.database.query("SELECT * FROM users");
      const users = [];
      for (let i = 0; i < results.length; i++) {
        const user = new User(results[i].id, results[i].name, results[i].email, results[i].password, results[i].phone, results[i].status, results[i].role, results[i].token);
        users.push(user);
      }
      return users;
    }
     async getUserbyToken(token) {
    const results = await this.database.query("SELECT * FROM users WHERE token = ?", [token]);
    if (results.length > 0) {
        const user = new User(results[0].id, results[0].name, results[0].email, results[0].password, results[0].phone, results[0].status, results[0].role, results[0].token);
        return user;
    }
    return null;
    }
    async getUserByEmail(email) {
      const results = await this.database.query("SELECT * FROM users WHERE email = ?", [email]);
      console.log("reposetri",results);
      if (results.length > 0) {
        const user = new User(results[0].id, results[0].name, results[0].email, results[0].password, results[0].phone, results[0].status, results[0].role, results[0].token);
        return user;
      }
      return null;
    }
  }

 

    module.exports = UserRepository;