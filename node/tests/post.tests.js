const request = require('supertest');
const app = require('../server');

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .post('/posts/create')
            .send({
                title: 'Test Post',
                body: 'This is a test post'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('post');
    });

    it('should fetch all posts', async () => {
        const res = await request(app)
            .get('/posts');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('posts');
        expect(res.body.posts).toHaveLength(1);
    });

    it('should fetch a single post', async () => {
        const res = await request(app)
            .get('/posts/1');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('post');
    });

    it('should update a post', async () => {
        const res = await request(app)
            .patch('/posts/1')
            .send({
                title: 'Updated Post',
                body: 'This is an updated post'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('post');
    });

    it('should delete a post', async () => {
        const res = await request(app)
            .delete('/posts/1');

        expect(res.statusCode).toEqual(204);
    });
});
