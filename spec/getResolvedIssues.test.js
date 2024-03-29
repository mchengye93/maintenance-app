/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server/index');

describe('Test Suite: Get Resolved Issues', () => {
  test('It properly fetches all resolved issues by categoryId=1',
    async done => request(app)
      .get('/api/issues/resolved/category?categoryId=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const firstIssue = body[0];
        const { id } = firstIssue;
        const roomId = firstIssue.room_id;
        const categoryId = firstIssue.category_id;
        const subcategoryId = firstIssue.subcategory_id;
        const dateIssued = firstIssue.date_issued;
        const dateReceived = firstIssue.date_received;
        const dateResolved = firstIssue.date_resolved;

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

        expect(dateReceived).toBeDefined();
        expect(typeof dateReceived).toBe('string');

        expect(dateResolved).toBeDefined();
        expect(typeof dateResolved).toBe('string');

        done();
      }));

  test('For resolved issue dateReceived >= dateIssue',
    async done => request(app)
      .get('/api/issues/resolved/category?categoryId=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const firstIssue = body[0];

        const dateIssued = firstIssue.date_issued;
        const dateReceived = firstIssue.date_received;


        const dateDifference = new Date(dateReceived) - new Date(dateIssued);

        expect(dateIssued).toBeDefined();
        expect(typeof dateIssued).toBe('string');

        expect(dateReceived).toBeDefined();
        expect(typeof dateReceived).toBe('string');

        expect(dateDifference).toBeGreaterThanOrEqual(0);

        done();
      }));

  test('For resolved issue dateResolved >= dateReceived',
    async done => request(app)
      .get('/api/issues/resolved/category?categoryId=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const firstIssue = body[0];


        const dateReceived = firstIssue.date_received;
        const dateResolved = firstIssue.date_resolved;

        const dateDifference = new Date(dateResolved) - new Date(dateReceived);


        expect(dateReceived).toBeDefined();
        expect(typeof dateReceived).toBe('string');

        expect(dateResolved).toBeDefined();
        expect(typeof dateResolved).toBe('string');

        expect(dateDifference).toBeGreaterThanOrEqual(0);

        done();
      }));
});
