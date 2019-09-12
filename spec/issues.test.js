const request = require('supertest');
const app = require('../server/index');

describe('Test Suite: CRUD Issue', () => {
  test('It properly fetches all issues',
    async done => request(app)
      .get('/api/issues')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const firstIssue = body[0];
        const { id } = firstIssue;
        const roomId = firstIssue.room_id;
        const categoryId = firstIssue.category_id;
        const subcategoryId = firstIssue.subcategory_id;
        const dateIssued = firstIssue.date_issued;


        expect(id).toBeDefined();
        expect(typeof id).toBe('number');

        expect(roomId).toBeDefined();
        expect(typeof roomId).toBe('number');

        expect(categoryId).toBeDefined();
        expect(typeof categoryId).toBe('number');

        expect(subcategoryId).toBeDefined();
        expect(typeof subcategoryId).toBe('number');

        expect(dateIssued).toBeDefined();
        expect(typeof dateIssued).toBe('string');


        done();
      }));

  test('It properly fetch issue id=1',
    async done => request(app)
      .get('/api/issue/?issueId=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const firstIssue = body[0];
        const { id } = firstIssue;
        const roomId = firstIssue.room_id;
        const categoryId = firstIssue.category_id;
        const subcategoryId = firstIssue.subcategory_id;
        const dateIssued = firstIssue.date_issued;


        expect(id).toBeDefined();
        expect(typeof id).toBe('number');
        expect(id).toBe(1);

        expect(roomId).toBeDefined();
        expect(typeof roomId).toBe('number');

        expect(categoryId).toBeDefined();
        expect(typeof categoryId).toBe('number');

        expect(subcategoryId).toBeDefined();
        expect(typeof subcategoryId).toBe('number');

        expect(dateIssued).toBeDefined();
        expect(typeof dateIssued).toBe('string');

        done();
      }));
  test('Check if given wrong variable issue id=1',
    async done => request(app)
      .get('/api/issue/?id=1')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({ body }) => {
        console.log(body);
        done();
      }));
});
