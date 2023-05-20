const db = require("../db/dbConnection");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("./userClass");
class AuthModel {
  static async authenticateUser(email, password) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email = "${email}"`, (err, res) => {
        if (err) return reject(err);
        else {
          if (res.length > 0) {
            const {
              id,
              name,
              email,
              password: hashedPassword,
              phone,
              status,
              role,
              token,
            } = res[0];
            bcrypt.compare(password, hashedPassword, (err, result) => {
              if (err) return reject(err);
              else if (result) {
                return resolve(
                  new User(
                    id,
                    name,
                    email,
                    hashedPassword,
                    phone,
                    status,
                    role,
                    token
                  )
                );
              } else {
                return reject("Incorrect password");
              }
            });
          } else {
           
            return reject("Email not found");
          }
        }
      });
    });
  }
  
  static async createToken(id) {
    return new Promise((resolve, reject) => {
      const token = crypto.randomBytes(16).toString("hex");
      db.query(
        `UPDATE users SET token = "${token}" WHERE id = ${id}`,
        (err, res) => {
          if (err) return reject(err);
          else return resolve(token);
        }
      );
    });
  }
  static async deleteToken(id) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET token = NULL WHERE id = ${id}`, (err, res) => {
        if (err) return reject(err);
        else return resolve("Logged out successfully");
      });
    });
  }
  static async getUserByToken(token) {
    return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE token = "${token}"`, (err, res) => {
        if (err) return reject(err);
        else {
          if (res.length > 0) {
            const { id, name, email, password, phone, status, role, token } =
              res[0]; // {'id_question' : 11 , 'answer_index' : 1 , } = obj =>{..,..,..}
            return resolve( // {'id_question' : 11 , 'answer_index' : 1 , }
            //         {'id_question' : 11 , 'answer_index' : 1 , }
              new User(id, name, email, password, phone, status, role, token)
            );
          } else {
            return reject("Invalid token");
          }
        }
      });
    });
  }
  static async logout(id) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET token = NULL WHERE id = ${id}`, (err, res) => {
        if (err) return reject(err);
        else return resolve("Logged out successfully");
      });
    });
  }
}

module.exports = AuthModel;
