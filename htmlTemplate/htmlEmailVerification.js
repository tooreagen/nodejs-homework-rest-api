const htmlEmailVerification = (verificationToken) => {
  const { HOST } = process.env;
  return `
  <html>
  <body style="background-color: rgb(255, 153, 58);">
    <div style="padding: 20px;">
      <h2>Click to verify your mail</h2>
      <a href="${HOST}/api/users/verify/${verificationToken}" style="padding: 10px 30px; text-decoration: none; font-size: 28px; background-color: rgb(255, 11, 11); color: white;">E-mail verification</a>
    </div>
  </body>
  </html>
    `;
};

module.exports = { htmlEmailVerification };
