import request from 'supertest';
import app from '../../app';

describe('Guests API', () => {
  it('should return a list of guests', async () => {
    const response = await request(app).get('/api/guests');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});