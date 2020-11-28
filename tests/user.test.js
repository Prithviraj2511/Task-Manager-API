const request = require('supertest');
const app = require('../src/app')
const User = require('../src/models/user');
const { response } = require('express');
const {userId,userOne,setupDatabase,closeDatabase}=require('./fixtures/db')

beforeEach(setupDatabase)

afterAll(closeDatabase)
test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Prithviraj',
        email: 'prithvirajpatil2511@gmail.com',
        password: '12345678'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'raj@gmail.com',
        password: '12345678'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload an avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profilepic.jpg')
        .expect(200)
    const user = await User.findById(userId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'void'
        })
        .expect(200)
    const user = await User.findById(userId)
    expect(user.name).toEqual('void')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'mumbai'
        })
        .expect(400)

})