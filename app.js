const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

app.use(cors());
app.use(bodyparser.json());

app.post('/' , async (req,res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'boushihadel96@gmail.com',
            pass: 'AdelBoushih96'
        }
      });

    let mailOptions = {
        from: req.body.from,
        to: 'boushihadel96@gmail.com',
        subject: req.body.subject,
        text: req.body.message
    };      

    try{
            await transporter.sendMail(mailOptions, (info) => {
                res.json('Email sent: ' + info.response);
        });

    }catch(err){
        res.json({ message: err });
    }
    
});

app.listen('3000');