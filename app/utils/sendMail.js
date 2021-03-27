'use strict';
const nodemailer = require('nodemailer');
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
function sendMail(mongodb,content) {
    var collection = mongodb.collection('email');
    collection.find({}).toArray((err,res)=>{
        var mails = res.map(function (value) {
            return value.email;
        })
        sendOneMail(mails,content);
    })
}
function sendOneMail (email,content) {
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.163.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "buduofish@163.com", // generated ethereal user
                pass: "KQASUUVROMENOGKQ"  // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"布多鱼" <buduofish@163.com>', // sender address
            to: email, // list of receivers
            subject: '教务通知', // Subject line
            text: 'Hello world?', // plain text body
            html: content // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

}

module.exports = {
    sendMail: sendMail
}
// getContent("http://jw.scut.edu.cn/zhinan/cms/article/view.do?type=posts&id=ff80808176d1aa5f017857464a88006a",function (value) {
//     nodemailer.createTestAccount((err, account) => {

//         // create reusable transporter object using the default SMTP transport
//         let transporter = nodemailer.createTransport({
//             host: 'smtp.163.com',
//             port: 465,
//             secure: true, // true for 465, false for other ports
//             auth: {
//                 user: "buduofish@163.com", // generated ethereal user
//                 pass: "KQASUUVROMENOGKQ"  // generated ethereal password
//             }
//         });
    
//         // setup email data with unicode symbols
//         let mailOptions = {
//             from: '"布多鱼" <buduofish@163.com>', // sender address
//             to: ['ermaotie@163.com'], // list of receivers
//             subject: 'Hello ✔', // Subject line
//             text: 'Hello world?', // plain text body
//             html: value // html body
//         };
    
//         // send mail with defined transport object
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             console.log('Message sent: %s', info.messageId);
//             // Preview only available when sending through an Ethereal account
//             // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
//             // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
//             // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//         });
//     });
// })
