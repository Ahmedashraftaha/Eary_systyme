class Admin {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async createUser(user) {
      const createdUser = await this.userRepository.createUser(user);
      return createdUser;
    }
  
    async updateUser(user) {
      const updatedUser = await this.userRepository.updateUser(user);
      return updatedUser;
    }
  
    async deleteUser(id) {
      await this.userRepository.deleteUser(id);
    }
  
    async getUserById(id) {
      const user = await this.userRepository.getUserById(id);
      return user;
    }
  
    async getAllUsers() {
      const users = await this.userRepository.getAllUsers();
      return users;
    }
    
    async getUserByToken(token) {
      const user = await this.userRepository.getUserByToken(token);
      return user;
    }
    async getUserByEmail(email){
      const user = await this.userRepository.getUserByEmail(email);
      return user;

    }

  }