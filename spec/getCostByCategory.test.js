/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server/index');

describe('Test Suite: Get Cost By Category', () => {
  test('It properly fetches all cost by category of two months',
    async done => request(app)
      .get('/api/cost/category')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(10);
        done();
      }));
});
