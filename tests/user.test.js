const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { send } = require('@sendgrid/mail')
const { userOneID,
    userOne,
    userTwoID, 
    userTwo,
    taskOne,
    taskTwo,
    taskThree, 
    configureDB 
} = require('./fixtures/db')

beforeEach(configureDB)

test('Should sign up a new user', async () => {
    const response = await request(app)
    .post('/users')
    .send({
        name : "Omar",
        email : "omarsall@example.com",
        password : "Red12345"
    })
    .expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user : {
            name : "Omar",
            email : "omarsall@example.com"
        },
        token : user.tokens[0].token
    })
})

test('Should log in existing user', async () => {
    const response = await request(app)
    .post('/users/login')
    .send({
        email : userOne.email,
        password : userOne.password
    })
    .expect(200)

    const user = await User.findById(userOneID)

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non existen user', async () => {
    await request(app)
    .post('/users/login')
    .send({
        email : "aoihdawoi",
        password: "adwadad"
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
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

    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name : 'Omar'
        })
        .expect(200)

    const user = await User.findById(userOneID)
    expect(user.name).toBe('Omar')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location : 'Jersey'
        })
        .expect(400)
})