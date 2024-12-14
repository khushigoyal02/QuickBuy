const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'khushigoyal1028@gmail.com',
      pass: 'jyvenwpiwjkjxfsd',
    },
});

exports.sendRegistrationEmail = async (email, name) => {
    const mailOptions = {
        from: 'khushigoyal1028@gmail.com',
        to: email,
        subject: 'Welcome to QuickBuy!',
        text: `Congratulations ${name} and welcome to QuickBuy! We're thrilled to have you on board. 
        Your account has been successfully created, and you're now part of our growing community.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}