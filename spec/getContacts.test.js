/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server/index');

describe('Test Suite: Get Contacts', () => {
  test('It properly fetches all contacts',
    async done => request(app)
      .get('/api/contacts')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const firstContact = body[0];
        const { id } = firstContact;
        const categoryId = firstContact.category_id;
        const { name } = firstContact;
        const { phone } = firstContact;
        const { email } = firstContact;


        expect(id).toBeDefined();
        expect(typeof id).toBe('number');


        expect(categoryId).toBeDefined();
        expect(typeof categoryId).toBe('number');

        expect(name).toBeDefined();
        expect(typeof name).toBe('string');

        expect(phone).toBeDefined();
        expect(typeof phone).toBe('string');


        expect(email).toBeDefined();
        expect(typeof email).toBe('string');

        done();
      }));

  test('Get contact by categoryId=1',
    async done => request(app)
      .get('/api/contacts/categoryId?categoryId=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const firstContact = body[0];
        const { id } = firstContact;
        const categoryId = firstContact.category_id;
        const { name } = firstContact;
        const { phone } = firstContact;
        const { email } = firstContact;


        expect(id).toBeDefined();
        expect(typeof id).toBe('number');


        expect(categoryId).toBeDefined();
        expect(typeof categoryId).toBe('number');
        expect(categoryId).toBe(1);

        expect(name).toBeDefined();
        expect(typeof name).toBe('string');

        expect(phone).toBeDefined();
        expect(typeof phone).toBe('string');


        expect(email).toBeDefined();
        expect(typeof email).toBe('string');

        done();
      }));

  test('Check for contacts of wrong paramenter',
    async done => request(app)
      .get('/api/contacts/categoryId?catId=10')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({ body }) => {
        expect(body).toHaveProperty('error');
        done();
      }));
});
