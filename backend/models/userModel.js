// Simulating database storage (replace with MongoDB/PostgreSQL queries when using a real DB)
const users = [];

const User = {
  findByContactOrUsername: (identifier) => {
    return users.find(u => u.username === identifier || u.contact === identifier);
  },
  
  create: (userData) => {
    users.push(userData);
    return userData;
  }
};

module.exports = User;