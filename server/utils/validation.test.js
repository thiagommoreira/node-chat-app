var {isRealString} = require('./validation.js');
const expect = require('expect');

describe('isRealString test', () => {

   it('should reject non-string values', () => {

      var res = isRealString(1234);
      expect(res).toBe(false);

   });

   it('should reject string with only spaces', () => {
      var res = isRealString('   ');
      expect(res).toBe(false);
   });

   it('should allow string with non-space char',() => {
      var res = isRealString('test');
      expect(res).toBe(true);
   });

});
