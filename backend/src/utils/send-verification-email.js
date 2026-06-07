import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async ({
  email,
  name,
  verificationUrl,
}) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Verify Your Email</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
      
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 20px;">
            
            <table
              width="600"
              cellpadding="0"
              cellspacing="0"
              style="
                background:#ffffff;
                border-radius:10px;
                overflow:hidden;
                box-shadow:0 2px 10px rgba(0,0,0,0.1);
              "
            >
              
              <tr>
                <td
                  align="center"
                  style="
                    background:#2563eb;
                    color:#ffffff;
                    padding:30px;
                    font-size:28px;
                    font-weight:bold;
                  "
                >
                  Verify Your Email
                </td>
              </tr>

              <tr>
                <td style="padding:40px;">
                  
                  <h2 style="margin-top:0;">
                    Hello ${name},
                  </h2>

                  <p style="font-size:16px;line-height:1.6;color:#444;">
                    Thank you for registering. Please verify your email
                    address by clicking the button below.
                  </p>

                  <div style="text-align:center;margin:40px 0;">
                    <a
                      href="${verificationUrl}"
                      style="
                        background:#2563eb;
                        color:#ffffff;
                        text-decoration:none;
                        padding:14px 28px;
                        border-radius:6px;
                        display:inline-block;
                        font-size:16px;
                        font-weight:bold;
                      "
                    >
                      Verify Email
                    </a>
                  </div>

                  <p style="font-size:14px;color:#666;">
                    This verification link will expire in 10 minutes.
                  </p>

                  <p style="font-size:14px;color:#666;">
                    If you did not create this account, you can safely
                    ignore this email.
                  </p>

                  <hr style="margin:30px 0;border:none;border-top:1px solid #eee;" />

                  <p style="font-size:12px;color:#999;">
                    If the button doesn't work, copy and paste the
                    following URL into your browser:
                  </p>

                  <p style="font-size:12px;word-break:break-all;color:#2563eb;">
                    ${verificationUrl}
                  </p>

                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email Address",
    html,
  });
};

