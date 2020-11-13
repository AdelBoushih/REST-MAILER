const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyparser.json());

app.get('/' , (req,res) => {
    res.send('Welcome to my API REST Mailer');
})

app.post('/' , async (req,res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
      });

    let mailOptions = {
        from: req.body.address,
        to: process.env.USER,
        subject: req.body.subject,
        html: "<b>Nom: </b> "+req.body.name+"<br/><br/>"+
        "<b>Email: </b> "+req.body.address+"<br/><br/>"+
        "<b>Objet: </b> "+req.body.subject+"<br/><br/>"+
        "<b>Message: </b> "+req.body.message
    };      

    transporter.sendMail(mailOptions, (error,info) => {
        if (error)
            res.json({ message: error });
        else
            res.json('Email sent: ' + info.response);
    });
    
});

app.listen('3000');