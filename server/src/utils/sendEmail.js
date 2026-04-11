// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // app password
//   },
// });

// export const sendOtpEmail = async (email, otp) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Reset Password OTP",
//     html: `
//       <h2>Your OTP: ${otp}</h2>
//       <p>This OTP is valid for 5 minutes.</p>
//     `,
//   });
// };





import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use Gmail App Password
  },
});

// Verify transporter on startup
transporter.verify((error) => {
  if (error) {
    console.error("Email config error:", error);
  } else {
    console.log("✅ Email server is ready to send OTPs");
  }
});

export const sendOtpEmail = async (email, otp) => {
  if (!email || !otp) {
    throw new Error("Email & OTP are required");
  }

  const mailOptions = {
    from: `"Book Printers" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Password Reset OTP - Book Printers",
    text: `Your OTP for password reset is: ${otp}. It is valid for 5 minutes.`,

    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f8fafc; font-family: 'Inter', Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8fafc; padding:40px 0;">
          <tr>
            <td align="center">
              <!-- Main Card -->
              <table role="presentation" width="100%" max-width="480" cellspacing="0" cellpadding="0" style="max-width:480px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(90deg, #1e3a8a, #3b82f6); padding:30px 20px; text-align:center;">
                    <h1 style="color:#ffffff; margin:0; font-size:28px; font-weight:700;">
                      Book Printers
                    </h1>
                    <p style="color:#bfdbfe; margin:8px 0 0; font-size:15px;">
                      Where Ideas Ink Themselves
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:40px 30px; text-align:center;">
                    <h2 style="color:#1e2937; margin:0 0 12px; font-size:24px;">
                      Password Reset OTP
                    </h2>
                    
                    <p style="color:#64748b; font-size:16px; line-height:1.5; margin:0 0 30px;">
                      Use the code below to reset your password.<br>
                      This code will expire in <strong>5 minutes</strong>.
                    </p>

                    <!-- OTP Box -->
                    <div style="background-color:#f1f5f9; border:2px dashed #64748b; border-radius:12px; padding:20px; margin:0 auto; max-width:220px;">
                      <p style="margin:0 0 8px; color:#475569; font-size:14px; font-weight:500;">Your OTP</p>
                      <h1 style="margin:0; font-size:32px; font-weight:700; letter-spacing:12px; color:#1e40af;">
                        ${otp}
                      </h1>
                    </div>

                    <p style="margin:30px 0 0; color:#64748b; font-size:14px;">
                      If you didn't request this OTP, please ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color:#0f172a; padding:25px; text-align:center;">
                    <p style="color:#94a3b8; margin:0; font-size:13px;">
                      © 2026 Book Printers • Rajasthan, India
                    </p>
                    <p style="color:#64748b; margin:8px 0 0; font-size:13px;">
                      Need help? <a href="mailto:shreeedupub@gmail.com" style="color:#60a5fa; text-decoration:none;">Contact Support</a>
                    </p>
                  </td>
                </tr>

              </table>

              <!-- Subtle Footer Text -->
              <p style="margin-top:20px; color:#94a3b8; font-size:12px;">
                This is an automated email. Please do not reply.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${email} | Message ID: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw new Error("Failed to send OTP email");
  }
};




// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// // DEBUG (REMOVE AFTER FIX)
// // console.log("EMAIL_USER:", process.env.EMAIL_USER);
// // console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "OK" : "MISSING");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Gmail App Password
//   },
// });

// transporter.verify((error) => {
//   if (error) {
//     console.error("Email config error:", error);
//   } else {
//     console.log("Email server is ready");
//   }
// });

// export const sendOtpEmail = async (email, otp) => {
//   if (!email || !otp) throw new Error("Email & OTP required");

//   const mailOptions = {
//     from: `"Print Shop" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Password Reset OTP",
//     text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
//     html: `
//       <div style="font-family:Arial;padding:20px">
//         <h2>Password Reset OTP</h2>
//         <p>Your OTP is:</p>
//         <h1 style="letter-spacing:5px">${otp}</h1>
//         <p>This OTP is valid for 5 minutes.</p>
//       </div>
//     `,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     // console.log("Email sent:", info.messageId);
//     return info;
//   } catch (err) {
//     console.error("Email error:", err);
//     throw new Error("Email sending failed");
//   }
// };