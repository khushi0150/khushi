const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport (example for Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Use the service of your choice (e.g., Gmail, Outlook, etc.)
  auth: {
    user: 'your-email@gmail.com',  // Replace with your email
    pass: 'your-email-password',    // Replace with your email password or app password
  },
});

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: 'your-email@gmail.com',   // Sender's email
      to: options.email,              // Recipient's email
      subject: options.subject,       // Subject of the email
      text: options.message,          // The body of the email
    };

    await transporter.sendMail(mailOptions);  // Send the email

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
