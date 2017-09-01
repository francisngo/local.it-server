const expect = require('chai').expect;
const request = require('request');

it('should load "What\'s good?!"', () => {
  request('http://localhost:3000', (error, response, body) => {
    expect(body).to.equal('What\'s good?!');
  })
})
