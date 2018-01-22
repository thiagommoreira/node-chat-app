const expect = require('expect');

const {Users} = require('./users');

describe('Users test', () => {

   var users;

   beforeEach(() => {
      users = new Users();
      users.users = [{
         id: '1',
         name: 'Mike',
         room: 'Node Course'
      },{
         id: '2',
         name: 'Thiago',
         room: 'React Course'
      },{
         id: '3',
         name: 'Jonas',
         room: 'Node Course'
      }];
   });

   it('should add a new user', () => {

      var users = new Users();
      var user = {id: '123', name: 'Thiago', room: 'Room 1'};
      var resUser = users.addUser(user.id, user.name, user.room);

      var tam = users.users.length;
      expect(tam).toBe(1);
      expect(users.users[0].name).toBe('Thiago');
      expect(users.users).toEqual([user]);

   });

   it('should remove a user', () => {

      var novo = users.removeUser('1');
      expect(novo.length).toBe(2);
      expect(novo[0].name).toBe('Thiago');

   });

   it('should not remove user', () => {
      var novo = users.removeUser('12323');
      expect(novo.length).toBe(3);
      expect(novo).toEqual(users.users);
   });

   it('should find user', () => {
      var user = users.getUser('1');
      //console.log(user);
      expect(user.name).toBe('Mike');
      expect(user).toEqual(users.users[0]);
   });

   it('should not find an user', () => {

      var user = users.getUser('324');
      expect(user).toBe(undefined);

   });

   it('should return node course list', () => {

      var list = users.getUserList('Node Course');
      expect(list.length).toBe(2);
      expect(list[1]).toBe('Jonas');
      expect(list).toEqual(['Mike', 'Jonas']);


   });

});
