import request from 'supertest'
import {app} from './index'

describe('Test the root path', () => {
  test('It should response the GET method', async (done) => {
    const response : any = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    done();
  });
});