const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to : 'omarsallamala@gmail.com',
//     from : 'omarsallamala@gmail.com',
//     subject : 'This is my first creation',
//     text : 'I hope this one actually gets to you.'
// })


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to : email,
        from : 'omarsallamala@gmail.com',
        subject : 'Thanks for joining',
        text : `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendFarewellEmail = (email, name) => {
    sgMail.send({
        to : email,
        from : 'omarsallamala@gmail.com',
        subject : 'Sorry to see you go!',
        text : `Goodbye, ${name}. We're sad to see you go. Is there anything we could have done to keep you with us?`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendFarewellEmail
}