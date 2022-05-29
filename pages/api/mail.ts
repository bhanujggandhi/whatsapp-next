const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_CLIENT_ID,
  process.env.NEXT_PUBLIC_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.NEXT_PUBLIC_REFRESH_TOKEN,
});

export default async (req: any, res: any) => {
  try {
    const { from, to, name } = req.body;
    const accessToken = await oauth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      // port: 465,
      // secure: true,
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.NEXT_PUBLIC_EMAIL,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        refreshToken: process.env.NEXT_PUBLIC_REFRESH_TOKEN,
        accessToken,
      },
    });
    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error: any, success: any) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });
    const mailOptions = {
      from: "bhanujggandhi@gmail.com",
      to,
      subject: `MESSAGE: ${from} sent you a text`,
      html: `
      <html
  style="
    width: 100%;
    font-family: lato, 'helvetica neue', helvetica, arial, sans-serif;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    padding: 0;
    margin: 0;
  "
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <style>
      @media only screen and (max-width: 600px) { p, ul li, ol li, a {
      line-height: 150% !important; } h1, h2, h3, h1 a, h2 a, h3 a {
      line-height: 120% !important; } h1 { font-size: 30px !important;
      text-align: center; } h2 { font-size: 26px !important; text-align: center;
      } h3 { font-size: 20px !important; text-align: center; } .es-header-body
      h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size: 30px
      !important; } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body
      h2 a { font-size: 26px !important; } .es-header-body h3 a,
      .es-content-body h3 a, .es-footer-body h3 a { font-size: 20px !important;
      } .es-menu td a { font-size: 16px !important; } .es-header-body p,
      .es-header-body ul li, .es-header-body ol li, .es-header-body a {
      font-size: 16px !important; } .es-content-body p, .es-content-body ul li,
      .es-content-body ol li, .es-content-body a { font-size: 16px !important; }
      .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li,
      .es-footer-body a { font-size: 16px !important; } .es-infoblock p,
      .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:
      12px !important; } *[class="gmail-fix"] { display: none !important; }
      .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:
      center !important; } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2,
      .es-m-txt-r h3 { text-align: right !important; } .es-m-txt-l, .es-m-txt-l
      h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align: left !important; }
      .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display: inline
      !important; } .es-button-border { display: block !important; }
      a.es-button, button.es-button { font-size: 20px !important; display: block
      !important; border-width: 15px 25px 15px 25px !important; } .es-btn-fw {
      border-width: 10px 0px !important; text-align: center !important; }
      .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right {
      width: 100% !important; } .es-content table, .es-header table, .es-footer
      table, .es-content, .es-footer, .es-header { width: 100% !important;
      max-width: 600px !important; } .es-adapt-td { display: block !important;
      width: 100% !important; } .adapt-img { width: 100% !important; height:
      auto !important; } .es-m-p0 { padding: 0px !important; } .es-m-p0r {
      padding-right: 0px !important; } .es-m-p0l { padding-left: 0px !important;
      } .es-m-p0t { padding-top: 0px !important; } .es-m-p0b { padding-bottom: 0
      !important; } .es-m-p20b { padding-bottom: 20px !important; }
      .es-mobile-hidden, .es-hidden { display: none !important; }
      tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width: auto
      !important; overflow: visible !important; float: none !important;
      max-height: inherit !important; line-height: inherit !important; }
      tr.es-desk-hidden { display: table-row !important; } table.es-desk-hidden
      { display: table !important; } td.es-desk-menu-hidden { display:
      table-cell !important; } .es-menu td { width: 1% !important; }
      table.es-table-not-adapt, .esd-block-html table { width: auto !important;
      } table.es-social { display: inline-block !important; } table.es-social td
      { display: inline-block !important; } }
    </style>
    <title></title>
    <!--[if (mso 16)]>
      <style type="text/css">
        a {
          text-decoration: none;
        }
      </style>
    <![endif]-->
    <!--[if gte mso 9
      ]><style>
        sup {
          font-size: 100% !important;
        }
      </style><!
    [endif]-->
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
  </head>

  <body
    style="
      width: 100%;
      font-family: lato, 'helvetica neue', helvetica, arial, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      padding: 0;
      margin: 0;
    "
  >
    <div class="es-wrapper-color" style="background-color: #f4f4f4">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#f4f4f4"></v:fill>
        </v:background>
      <![endif]-->
      <table
        class="es-wrapper"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="
          border-collapse: collapse;
          border-spacing: 0px;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-position: center top;
        "
        height="100%"
      >
        <tbody>
          <tr class="gmail-fix" height="0" style="border-collapse: collapse">
            <td style="padding: 0; margin: 0">
              <table
                width="600"
                cellspacing="0"
                cellpadding="0"
                border="0"
                align="center"
                style="border-collapse: collapse; border-spacing: 0px"
              >
                <tbody>
                  <tr style="border-collapse: collapse">
                    <td
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="
                        padding: 0;
                        margin: 0;
                        line-height: 1px;
                        min-width: 600px;
                      "
                      height="0"
                    >
                      <img
                        src="https://tlr.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png"
                        style="
                          border: 0;
                          outline: none;
                          text-decoration: none;
                          -ms-interpolation-mode: bicubic;
                          display: block;
                          max-height: 0px;
                          min-height: 0px;
                          min-width: 600px;
                          width: 600px;
                        "
                        alt=""
                        width="600"
                        height="1"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr style="border-collapse: collapse">
            <td
              class="esd-email-paddings"
              valign="top"
              style="padding: 0; margin: 0"
            >
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content esd-header-popover"
                align="center"
                style="
                  border-collapse: collapse;
                  border-spacing: 0px;
                  width: 100%;
                  table-layout: fixed;
                "
                width="100%"
              >
                <tbody>
                  <tr style="border-collapse: collapse">
                    <td
                      class="esd-stripe"
                      esd-custom-block-id="7962"
                      align="center"
                      style="padding: 0; margin: 0"
                    >
                      <table
                        class="es-content-body"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: transparent;
                        "
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                        bgcolor="transparent"
                      ></table>
                      <table
                        class="es-header"
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0px;
                          width: 100%;
                          background-color: #ffa73b;
                          background-repeat: repeat;
                          background-position: center top;
                          table-layout: fixed;
                        "
                        width="100%"
                        bgcolor="#ffa73b"
                      >
                        <tbody>
                          <tr style="border-collapse: collapse">
                            <td
                              class="esd-stripe"
                              esd-custom-block-id="6339"
                              align="center"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                class="es-header-body"
                                width="600"
                                cellspacing="0"
                                cellpadding="0"
                                align="center"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                "
                                bgcolor="transparent"
                              >
                                <tbody>
                                  <tr style="border-collapse: collapse">
                                    <td
                                      class="esd-structure es-p20t es-p10b es-p10r es-p10l"
                                      align="left"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-bottom: 10px;
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-top: 20px;
                                      "
                                    >
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tbody>
                                          <tr style="border-collapse: collapse">
                                            <td
                                              class="esd-container-frame"
                                              width="580"
                                              valign="top"
                                              align="center"
                                              style="padding: 0; margin: 0"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                style="
                                                  border-collapse: collapse;
                                                  border-spacing: 0px;
                                                "
                                              >
                                                <tbody>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-image es-p25t es-p25b es-p10r es-p10l"
                                                      align="center"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-left: 10px;
                                                        padding-right: 10px;
                                                        padding-top: 25px;
                                                        padding-bottom: 25px;
                                                        font-size: 0;
                                                      "
                                                    >
                                                      <a
                                                        href="https://chat.bhanujgandhi.me"
                                                        target="_blank"
                                                        style="
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          text-decoration: underline;
                                                          color: #111111;
                                                          font-size: 14px;
                                                        "
                                                      ><img
                                                          src="https://tlr.stripocdn.email/content/guids/CABINET_3df254a10a99df5e44cb27b842c2c69e/images/7331519201751184.png"
                                                          alt=""
                                                          style="
                                                            border: 0;
                                                            outline: none;
                                                            text-decoration: none;
                                                            -ms-interpolation-mode: bicubic;
                                                            display: block;
                                                          "
                                                          width="40"
                                                        /></a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="es-content"
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0px;
                          width: 100%;
                          table-layout: fixed;
                        "
                        width="100%"
                      >
                        <tbody>
                          <tr style="border-collapse: collapse">
                            <td
                              class="esd-stripe"
                              style="
                                padding: 0;
                                margin: 0;
                                background-color: #ffa73b;
                              "
                              esd-custom-block-id="6340"
                              bgcolor="#ffa73b"
                              align="center"
                            >
                              <table
                                class="es-content-body"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                "
                                width="600"
                                cellspacing="0"
                                cellpadding="0"
                                align="center"
                                bgcolor="transparent"
                              >
                                <tbody>
                                  <tr style="border-collapse: collapse">
                                    <td
                                      class="esd-structure"
                                      align="left"
                                      style="padding: 0; margin: 0"
                                    >
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tbody>
                                          <tr style="border-collapse: collapse">
                                            <td
                                              class="esd-container-frame"
                                              width="600"
                                              valign="top"
                                              align="center"
                                              style="padding: 0; margin: 0"
                                            >
                                              <table
                                                style="
                                                  border-spacing: 0px;
                                                  background-color: #ffffff;
                                                  border-radius: 4px;
                                                  border-collapse: separate;
                                                "
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                bgcolor="#ffffff"
                                              >
                                                <tbody>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-text es-p35t es-p5b es-p30r es-p30l"
                                                      align="center"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-bottom: 5px;
                                                        padding-left: 30px;
                                                        padding-right: 30px;
                                                        padding-top: 35px;
                                                      "
                                                    >
                                                      <h1
                                                        style="
                                                          margin: 0;
                                                          line-height: 120%;
                                                          font-family: lato,
                                                            'helvetica neue',
                                                            helvetica, arial,
                                                            sans-serif;
                                                          font-size: 48px;
                                                          font-style: normal;
                                                          font-weight: normal;
                                                          color: #111111;
                                                        "
                                                      >
                                                        Hey, ${
                                                          name
                                                            ? name.split(" ")[0]
                                                            : "you"
                                                        }
                                                      </h1>
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-spacer es-p5t es-p5b es-p20r es-p20l"
                                                      bgcolor="#ffffff"
                                                      align="center"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-top: 5px;
                                                        padding-bottom: 5px;
                                                        padding-left: 20px;
                                                        padding-right: 20px;
                                                        font-size: 0;
                                                      "
                                                    >
                                                      <table
                                                        width="100%"
                                                        height="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                        style="
                                                          border-collapse: collapse;
                                                          border-spacing: 0px;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr
                                                            style="
                                                              border-collapse: collapse;
                                                            "
                                                          >
                                                            <td
                                                              style="
                                                                padding: 0;
                                                                border-bottom: 1px
                                                                  solid #ffffff;
                                                                background: rgba(
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    0
                                                                  )
                                                                  none repeat
                                                                  scroll 0% 0%;
                                                                height: 1px;
                                                                width: 100%;
                                                                margin: 0px;
                                                              "
                                                              width="100%"
                                                              height="1"
                                                            ></td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="es-content"
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0px;
                          width: 100%;
                          table-layout: fixed;
                        "
                        width="100%"
                      >
                        <tbody>
                          <tr style="border-collapse: collapse">
                            <td
                              class="esd-stripe"
                              align="center"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                class="es-content-body"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                "
                                width="600"
                                cellspacing="0"
                                cellpadding="0"
                                align="center"
                                bgcolor="transparent"
                              >
                                <tbody>
                                  <tr style="border-collapse: collapse">
                                    <td
                                      class="esd-structure"
                                      align="left"
                                      style="padding: 0; margin: 0"
                                    >
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tbody>
                                          <tr style="border-collapse: collapse">
                                            <td
                                              class="esd-container-frame"
                                              width="600"
                                              valign="top"
                                              align="center"
                                              style="padding: 0; margin: 0"
                                            >
                                              <table
                                                style="
                                                  border-spacing: 0px;
                                                  border-radius: 4px;
                                                  border-collapse: separate;
                                                  background-color: #ffffff;
                                                "
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                bgcolor="#ffffff"
                                              >
                                                <tbody>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-text es-p20t es-p20b es-p30r es-p30l es-m-txt-l"
                                                      bgcolor="#ffffff"
                                                      align="left"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-top: 20px;
                                                        padding-bottom: 20px;
                                                        padding-left: 30px;
                                                        padding-right: 30px;
                                                      "
                                                    >
                                                      <p
                                                        style="
                                                          margin: 0;
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          font-family: lato,
                                                            'helvetica neue',
                                                            helvetica, arial,
                                                            sans-serif;
                                                          line-height: 150%;
                                                          color: #666666;
                                                          font-size: 18px;
                                                        "
                                                      >
                                                        ${from}
                                                        has sent you a message.
                                                        You don't appear to have
                                                        created an account on
                                                        our app yet. Please
                                                        click the button below
                                                        to see what your friends
                                                        are saying.
                                                      </p>
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-button es-p35t es-p35b es-p10r es-p10l"
                                                      align="center"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-left: 10px;
                                                        padding-right: 10px;
                                                        padding-top: 35px;
                                                        padding-bottom: 35px;
                                                      "
                                                    >
                                                      <span
                                                        class="es-button-border"
                                                        style="
                                                          border-style: solid
                                                            solid solid solid;
                                                          border-color: #ffa73b
                                                            #ffa73b #ffa73b
                                                            #ffa73b;
                                                          background: 1px;
                                                          border-width: 1px 1px
                                                            1px 1px;
                                                          display: inline-block;
                                                          border-radius: 2px;
                                                          width: auto;
                                                        "
                                                      ><a
                                                          href="https://chat.bhanujgandhi.me"
                                                          class="es-button es-button-1646725031414"
                                                          target="_blank"
                                                          style="
                                                            -webkit-text-size-adjust: none;
                                                            -ms-text-size-adjust: none;
                                                            border-style: solid;
                                                            border-color: #ffa73b;
                                                            display: inline-block;
                                                            background: #ffa73b;
                                                            border-radius: 2px;
                                                            font-size: 20px;
                                                            font-family: helvetica,
                                                              'helvetica neue',
                                                              arial, verdana,
                                                              sans-serif;
                                                            font-weight: normal;
                                                            font-style: normal;
                                                            line-height: 120%;
                                                            color: #ffffff;
                                                            width: auto;
                                                            text-align: center;
                                                            border-width: 15px
                                                              30px;
                                                            text-decoration: none;
                                                          "
                                                        >Create Account</a></span>
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-text es-p20t es-p30r es-p30l es-m-txt-l"
                                                      align="left"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-top: 20px;
                                                        padding-left: 30px;
                                                        padding-right: 30px;
                                                      "
                                                    >
                                                      <p
                                                        style="
                                                          margin: 0;
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          font-family: lato,
                                                            'helvetica neue',
                                                            helvetica, arial,
                                                            sans-serif;
                                                          line-height: 150%;
                                                          color: #666666;
                                                          font-size: 18px;
                                                        "
                                                      >
                                                        We wish you the best
                                                        messaging experience.
                                                      </p>
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-text es-p20t es-p30r es-p30l es-m-txt-l"
                                                      align="left"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-top: 20px;
                                                        padding-left: 30px;
                                                        padding-right: 30px;
                                                      "
                                                    >
                                                      <p
                                                        style="
                                                          margin: 0;
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          font-family: lato,
                                                            'helvetica neue',
                                                            helvetica, arial,
                                                            sans-serif;
                                                          line-height: 150%;
                                                          color: #666666;
                                                          font-size: 18px;
                                                        "
                                                      >
                                                        If you have any
                                                        questions, just reply to
                                                        this email—we're always
                                                        happy to help out.
                                                      </p>
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-text es-p20t es-p40b es-p30r es-p30l es-m-txt-l"
                                                      align="left"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-top: 20px;
                                                        padding-left: 30px;
                                                        padding-right: 30px;
                                                        padding-bottom: 40px;
                                                      "
                                                    >
                                                      <p
                                                        style="
                                                          margin: 0;
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          font-family: lato,
                                                            'helvetica neue',
                                                            helvetica, arial,
                                                            sans-serif;
                                                          line-height: 150%;
                                                          color: #666666;
                                                          font-size: 18px;
                                                        "
                                                      >
                                                        Cheers!🍺
                                                      </p>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="es-content"
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0px;
                          width: 100%;
                          table-layout: fixed;
                        "
                        width="100%"
                      >
                        <tbody>
                          <tr style="border-collapse: collapse">
                            <td
                              class="esd-stripe"
                              align="center"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                class="es-content-body"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                "
                                width="600"
                                cellspacing="0"
                                cellpadding="0"
                                align="center"
                                bgcolor="transparent"
                              >
                                <tbody>
                                  <tr style="border-collapse: collapse">
                                    <td
                                      class="esd-structure"
                                      align="left"
                                      style="padding: 0; margin: 0"
                                    >
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tbody>
                                          <tr style="border-collapse: collapse">
                                            <td
                                              class="esd-container-frame"
                                              width="600"
                                              valign="top"
                                              align="center"
                                              style="padding: 0; margin: 0"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                style="
                                                  border-collapse: collapse;
                                                  border-spacing: 0px;
                                                "
                                              >
                                                <tbody>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-spacer es-p10t es-p20b es-p20r es-p20l"
                                                      align="center"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-top: 10px;
                                                        padding-bottom: 20px;
                                                        padding-left: 20px;
                                                        padding-right: 20px;
                                                        font-size: 0;
                                                      "
                                                    >
                                                      <table
                                                        width="100%"
                                                        height="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                        style="
                                                          border-collapse: collapse;
                                                          border-spacing: 0px;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr
                                                            style="
                                                              border-collapse: collapse;
                                                            "
                                                          >
                                                            <td
                                                              style="
                                                                padding: 0;
                                                                border-bottom: 1px
                                                                  solid #f4f4f4;
                                                                background: rgba(
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    0
                                                                  )
                                                                  none repeat
                                                                  scroll 0% 0%;
                                                                height: 1px;
                                                                width: 100%;
                                                                margin: 0px;
                                                              "
                                                              width="100%"
                                                              height="1"
                                                            ></td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="es-content"
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0px;
                          width: 100%;
                          table-layout: fixed;
                        "
                        width="100%"
                      >
                        <tbody>
                          <tr style="border-collapse: collapse">
                            <td
                              class="esd-stripe"
                              esd-custom-block-id="6341"
                              align="center"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                class="es-content-body"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                "
                                width="600"
                                cellspacing="0"
                                cellpadding="0"
                                align="center"
                                bgcolor="transparent"
                              >
                                <tbody>
                                  <tr style="border-collapse: collapse">
                                    <td
                                      class="esd-structure"
                                      align="left"
                                      style="padding: 0; margin: 0"
                                    >
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tbody>
                                          <tr style="border-collapse: collapse">
                                            <td
                                              class="esd-container-frame"
                                              width="600"
                                              valign="top"
                                              align="center"
                                              style="padding: 0; margin: 0"
                                            >
                                              <table
                                                style="
                                                  border-spacing: 0px;
                                                  background-color: #ffecd1;
                                                  border-radius: 4px;
                                                  border-collapse: separate;
                                                "
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                bgcolor="#ffecd1"
                                              >
                                                <tbody>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-text es-p30t es-p30r es-p30l"
                                                      align="center"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-top: 30px;
                                                        padding-left: 30px;
                                                        padding-right: 30px;
                                                      "
                                                    >
                                                      <h3
                                                        style="
                                                          margin: 0;
                                                          line-height: 120%;
                                                          font-family: lato,
                                                            'helvetica neue',
                                                            helvetica, arial,
                                                            sans-serif;
                                                          font-size: 20px;
                                                          font-style: normal;
                                                          font-weight: normal;
                                                          color: #111111;
                                                        "
                                                      >
                                                        Need more help?
                                                      </h3>
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-text es-p30b es-p30r es-p30l"
                                                      esdev-links-color="#ffa73b"
                                                      align="center"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-bottom: 30px;
                                                        padding-left: 30px;
                                                        padding-right: 30px;
                                                      "
                                                    >
                                                      <a
                                                        target="_blank"
                                                        href="mailto:bhanujggandhi@gmail.com"
                                                        style="
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          text-decoration: underline;
                                                          font-size: 18px;
                                                          color: #ffa73b;
                                                        "
                                                      >We’re here, ready to talk</a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        class="es-footer"
                        align="center"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0px;
                          width: 100%;
                          background-color: transparent;
                          background-repeat: repeat;
                          background-position: center top;
                          table-layout: fixed;
                        "
                        width="100%"
                        bgcolor="transparent"
                      >
                        <tbody>
                          <tr style="border-collapse: collapse">
                            <td
                              class="esd-stripe"
                              esd-custom-block-id="6342"
                              align="center"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                class="es-footer-body"
                                width="600"
                                cellspacing="0"
                                cellpadding="0"
                                align="center"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                "
                                bgcolor="transparent"
                              >
                                <tbody>
                                  <tr style="border-collapse: collapse">
                                    <td
                                      class="esd-structure es-p30t es-p30b es-p30r es-p30l"
                                      align="left"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-top: 30px;
                                        padding-bottom: 30px;
                                        padding-left: 30px;
                                        padding-right: 30px;
                                      "
                                    >
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tbody>
                                          <tr style="border-collapse: collapse">
                                            <td
                                              class="esd-container-frame"
                                              width="540"
                                              valign="top"
                                              align="center"
                                              style="padding: 0; margin: 0"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                style="
                                                  border-collapse: collapse;
                                                  border-spacing: 0px;
                                                "
                                              >
                                                <tbody>
                                                  <tr
                                                    style="
                                                      border-collapse: collapse;
                                                    "
                                                  >
                                                    <td
                                                      class="esd-block-text"
                                                      align="left"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                      "
                                                    >
                                                      <p
                                                        style="
                                                          margin: 0;
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          font-family: lato,
                                                            'helvetica neue',
                                                            helvetica, arial,
                                                            sans-serif;
                                                          line-height: 150%;
                                                          color: #666666;
                                                          font-size: 14px;
                                                        "
                                                      >
                                                        <br />
                                                      </p>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
      `,
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
