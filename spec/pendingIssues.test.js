const request = require('supertest');
const app = require('../server/index');


describe('Test Suite: Get Pending Issue', () => {
  test('It properly fetches all pending issues',
    async done => request(app)
      .get('/api/issues/pending')
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

  test('It properly fetches all pending issues by categoryId=1',
    async done => request(app)
      .get('/api/issues/pending/category?categoryId=1')
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
        expect(categoryId).toBe(1);

        expect(subcategoryId).toBeDefined();
        expect(typeof subcategoryId).toBe('number');

        expect(dateIssued).toBeDefined();
        expect(typeof dateIssued).toBe('string');


        done();
      }));


  test('Return Error when given wrong paramenter id=1',
    async done => request(app)
      .get('/api/issues/pending/category?id=1')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({ body }) => {
        done();
      }));
  test('Return Error when given no paramenter input',
    async done => request(app)
      .get('/api/issues/pending/category')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({ body }) => {
        done();
      }));
});
