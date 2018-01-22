const expect = require('expect');

const {Users} = require('./users');

describe('Users test', () => {

   it('should add a new user', () => {

      var users = new Users();
      var user = {id: '123', name: 'Thiago', room: 'Room 1'};
      var resUser = users.addUser(user.id, user.name, user.room);

      var tam = users.users.length;
      expect(tam).toBe(1);
      expect(users.users[0].name).toBe('Thiago');
      expect(users.users).toEqual([user]);

   });

});
