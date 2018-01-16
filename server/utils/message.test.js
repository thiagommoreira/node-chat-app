var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate the correct message object', () => {
    let res = generateMessage('Thiago', 'texto exemplo');
    expect(res.from).toBe('Thiago');
    expect(res.text).toBe('texto exemplo');
    expect(typeof res.createdAt).toBe('number');
    expect(res.createdAt).toBeGreaterThan(0);

  });

});
