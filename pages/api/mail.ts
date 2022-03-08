const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

export default async (req: any, res: any) => {
  try {
    const { from, to } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL,
        pass: process.env.NEXT_PUBLIC_PASSWORD,
      },
    });
    transporter.use(
      "compile",
      hbs({
        viewEngine: "express-handlebars",
        viewPath: __dirname + "../../../../../views/layouts/",
      })
    );
    const mailOptions = {
      from: "bhanujggandhi@gmail.com",
      to,
      subject: `MESSAGE: ${from} sent you a text`,
      // text:
      //   `You are receiving this because ${from} sent you a text.\n\n` +
      //   "Please click on the following link, or paste this into your browser to start the chat:\n\n" +
      //   "https://chat.bhanujgandhi.me" +
      //   "\n\n",
      template: "main",
      context: {
        sender: from,
      },
    };
    await transporter.sendMail(mailOptions);

    res.status(200).send({ success: 1, message: "Email sent" });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      success: 0,
      message: err,
    });
  }
};
