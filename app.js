const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyparser.json());

app.post('/' , async (req,res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERSs,
            pass: process.env.PASS
        }
      });

    let mailOptions = {
        from: req.body.from,
        to: process.env.USER,
        subject: req.body.subject,
        text: req.body.message
    };      

    transporter.sendMail(mailOptions, (error,info) => {
        if (error)
            res.json({ message: error });
        else
            res.json('Email sent: ' + info.response);
    });
    
});

app.listen('3000');