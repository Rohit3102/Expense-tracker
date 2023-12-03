const nodemailer = require('nodemailer')

exports.sendMail = async function (email, res, user, req) {

    const token =  Math.floor(1000 + Math.random() * 9000);
  
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "rsen0537@gmail.com",
            pass: "ldidjomtoykpckdc",
        },
    });
  
    const mailOptions = {
      
        from: "Rohit Pvt. Ltd.<rsen0537@gmail.com>",
        to: email,
        subject: "Password Reset Link",
        // text: "Do not share this link to anyone.",
        html: `<h1>${token}</h1>`,
    };
  
    transport.sendMail(mailOptions, async (err, info) => {
        if (err) return res.send(err);
        console.log(info);

        user.token = token;
        console.log(token);
        
        await user.save();
        res.render("verify",{rohit: req.user, id: user.id});
  
        // return res.send(
  
        //     "<h1 style='text-align:center;color: tomato; margin-top:10%'><span style='font-size:60px;'>✔️</span> <br />Email Sent! Check your inbox , <br/>check spam in case not found in inbox.</h1>"
        // );

    });
  };

//   module.exports = sendmail