var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate the correct message object', () => {
    let res = generateMessage('Thiago', 'texto exemplo');
    expect(res.from).toBe('Thiago');
    expect(res.text).toBe('texto exemplo');
    expect(typeof res.createdAt).toBe('number');
    expect(res.createdAt).toBeGreaterThan(0);

  });

});

describe('generateLocationMessage', () => {

it('should generate the correct location', () => {

  let res = generateLocationMessage('Thiago',1,2);
  expect(res.from).toBe('Thiago');
  expect(typeof res.createdAt).toBe('number');
  expect(res.url).toBe('https://www.google.com/maps?q=1,2');

});

});
