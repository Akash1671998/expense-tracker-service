const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_TYPE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_ACCESS,
      },
    });

    await transporter.sendMail({
      from: `"Expense Tracker" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
    });
    await transporter.verify();
    console.log("✅ Email server se connection successful hai");

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
