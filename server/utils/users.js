class Users {

   constructor() {
      this.users = [];
   }

   addUser(id, name, room) {
      let user = {id, name, room};
      this.users.push(user);
      return user;

   }

   removeUser(id) {

       var newArray = this.users.filter((user) => user.id !== id);
       this.users = newArray;
       return newArray;

   }

   getUser(id) {
      // var ret;
      // this.users.forEach((user) => {
      //    if(user.id === id) {
      //       ret = user;
      //    }
      // });
      //
      // return ret;

      return this.users.filter((user) => user.id === id)[0];

   }

   getUserList(room) {
      var users = this.users.filter((user) => {
         return user.room === room;
      });
      var namesArray = users.map((user) => {
         return user.name
      });

      return namesArray;
   }

}

module.exports = {Users};
