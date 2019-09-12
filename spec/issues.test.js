const request = require('supertest');
const app = require('../server/index');

describe('Test Suite: CRUD Issue', () => {
  it('It properly fetches all issues',
    () => request(app)
      .get('/api/issues')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const { id } = body;

        expect(id).toBeDefined();
        expect(typeof id).toBe('number');
      }));
});
