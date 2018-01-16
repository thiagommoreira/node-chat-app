var users = [];

function addUser(user) {

  users.push(user);

};

function removeUser(user) {
  users.pop(user);
};

function userExists(user) {
  return users.includes(user);
};

module.exports = {
  addUser, removeUser, userExists, users
}
