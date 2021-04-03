const nodemailer = require("nodemailer");

export default async (req: any, res: any) => {
  try {
    const { from, to } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: "bhanujggandhi@gmail.com",
      to,
      subject: `Texter: ${from} sent you a text`,
      html:
        `You are receiving this because ${from} sent you a text.\n\n` +
        "Please click on the following link, or paste this into your browser to start the chat:\n\n" +
        "https://whatsapp-next.vercel.app/" +
        "\n\n",
    };
    await transporter.sendMail(mailOptions);

    res.status(200).send({ success: 1, message: "Email sent" });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      success: 0,
      message: err,
      cred: { e: process.env.EMAIL, p: process.env.PASSWORD },
    });
  }
};
