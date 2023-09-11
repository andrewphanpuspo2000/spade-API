import nodemailer from "nodemailer";

export const accountVerificationEmail = async (obj) => {
  const { email, fName, link } = obj;
  //1.smtp config
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: false,
    port: +process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: `"BROS MERCHANT" <${process.env.SMTP_USERNAME}> `, // sender address
    to: email, // list of receivers
    subject: "Account activation required", // Subject line
    text: `Hello ${fName}, please activate your account. Link: ${link}`, // plain text body
    html: `
      <b>Hello ${fName},</b>
      <p>Please click the link:</p><a>${link}</a>
  
  
      <p>Kind Regards,</p>
      <p>Spade Team</p>
      `, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
