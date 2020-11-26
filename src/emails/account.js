const sgMail = require('@sendgrid/mail')
const { text } = require('express')
const sendGridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendGridAPIKey)



const sendWelcomeEmail= function(email,name){
    sgMail.send({
        to: email,
        from: 'prithvirajpatil2511@gmail.com',
        subject: 'Thanks for joining in !',
        text: `Welcome to Task Manager ${name} . Let me know how you get along the app . `
    })
}

const sendExitEmail=(email,name)=>{
    sgMail.send({
        to: email,
        from: 'prithvirajpatil2511@gmail.com',
        subject: 'Sorry to see you go !',
        text: `Your account has been deleted ${name}. Help us to know the reason behind deleting account. We would like to see you soon ${name}. Thank you !`
    })
}

module.exports={
    sendWelcomeEmail,
    sendExitEmail
}