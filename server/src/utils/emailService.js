// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // Subject label mapping
// const subjectLabels = {
//   quote: 'Quote Request / Pricing',
//   order: 'Order Placement / Tracking',
//   bulk: 'Bulk Order / Book Publishing',
//   file: 'File Upload / Technical Help',
//   other: 'General Query'
// };

// export const sendAdminNotification = async (contactData) => {
//   const { name, phone, email, subject, subjectLabel, message } = contactData;
  
//   const emailContent = `
//     <h2>New Contact Form Submission</h2>
//     <p><strong>Name:</strong> ${name}</p>
//     <p><strong>Phone:</strong> ${phone}</p>
//     <p><strong>Email:</strong> ${email || 'Not provided'}</p>
//     <p><strong>Subject:</strong> ${subjectLabel}</p>
//     <p><strong>Message:</strong></p>
//     <p>${message.replace(/\n/g, '<br>')}</p>
//     <hr>
//     <p><small>Submitted from Shree Publication website</small></p>
//   `;

//   await transporter.sendMail({
//     from: `"Shree Publication Contact" <${process.env.EMAIL_USER}>`,
//     to: process.env.ADMIN_EMAIL,
//     subject: `New Contact: ${subjectLabel} from ${name}`,
//     html: emailContent
//   });
// };

// export const sendAutoReply = async (contactData) => {
//   const { name, email, subjectLabel, message } = contactData;
  
//   if (!email) return; // Skip auto-reply if no email provided

//   const replyContent = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//       <h2 style="color: #8B5CF6;">Thank you for contacting Shree Publication!</h2>
//       <p>Dear ${name},</p>
//       <p>We have received your inquiry regarding <strong>${subjectLabel}</strong> and will get back to you within 1-2 hours during business hours (Mon-Sat, 10 AM - 7 PM).</p>
      
//       <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
//         <p style="margin: 0;"><strong>Your message summary:</strong></p>
//         <p style="margin: 10px 0 0 0;">${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
//       </div>
      
//       <p>For urgent matters, please reach us on WhatsApp: <strong>+91 72300 01405</strong></p>
//       <p>Best regards,<br><strong>Shree Education and Publication Team</strong></p>
      
//       <hr style="margin: 30px 0; border-color: #e5e7eb;">
//       <p style="font-size: 12px; color: #6b7280;">This is an automated response. Please do not reply to this email.</p>
//     </div>
//   `;

//   await transporter.sendMail({
//     from: `"Shree Publication" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: `We've received your inquiry - ${subjectLabel}`,
//     html: replyContent
//   });
// };



import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ==============================
// SMTP CONFIG
// ==============================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email config error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

// ==============================
// SUBJECT LABELS
// ==============================
const subjectLabels = {
  quote: "Quote Request / Pricing",
  order: "Order Placement / Tracking",
  bulk: "Bulk Order / Book Publishing",
  file: "File Upload / Technical Help",
  other: "General Query",
};

// ==============================
// ADMIN NOTIFICATION EMAIL
// ==============================
export const sendAdminNotification = async (contactData) => {
  const { name, phone, email, subject, message } = contactData;

  const subjectLabel = subjectLabels[subject] || "General Query";

  const emailContent = `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">

    <table width="100%" style="padding:30px 0;">
      <tr>
        <td align="center">

          <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <tr>
              <td style="background:#1e40af; padding:20px; text-align:center;">
                <h2 style="color:#fff; margin:0;">📩 New Contact Submission</h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:25px;">

                <p style="font-size:14px; color:#555;">
                  A new inquiry has been submitted from your website:
                </p>

                <table width="100%" style="margin-top:15px;">
                  <tr>
                    <td><strong>Name:</strong></td>
                    <td>${name}</td>
                  </tr>
                  <tr>
                    <td><strong>Phone:</strong></td>
                    <td>${phone}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>${email || "Not provided"}</td>
                  </tr>
                  <tr>
                    <td><strong>Subject:</strong></td>
                    <td>${subjectLabel}</td>
                  </tr>
                </table>

                <div style="margin-top:20px; padding:15px; background:#f1f5f9; border-left:4px solid #1e40af; border-radius:6px;">
                  <p><strong>Message:</strong></p>
                  <p>${message.replace(/\n/g, "<br>")}</p>
                </div>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#111827; color:#ccc; text-align:center; padding:15px; font-size:12px;">
                © 2026 Shree Publication | Contact System
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Shree Publication Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${subjectLabel} from ${name}`,
      html: emailContent,
    });

    console.log("✅ Admin email sent");
  } catch (error) {
    console.error("❌ Admin email error:", error);
  }
};

// ==============================
// AUTO REPLY EMAIL
// ==============================
export const sendAutoReply = async (contactData) => {
  const { name, email, subject, message } = contactData;

  if (!email) return;

  const subjectLabel = subjectLabels[subject] || "General Query";

  const replyContent = `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">

    <table width="100%" style="padding:30px 0;">
      <tr>
        <td align="center">

          <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <tr>
              <td style="background:#8B5CF6; padding:25px; text-align:center;">
                <h2 style="color:#fff;">Thank You, ${name}! 🙌</h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:25px;">

                <p>
                  We’ve received your request regarding 
                  <strong>${subjectLabel}</strong>.
                </p>

                <p>
                  Our team will respond within 
                  <strong>1–2 hours</strong>.
                </p>

                <div style="margin:20px 0; padding:15px; background:#f9fafb; border-radius:8px;">
                  <strong>Your Message:</strong>
                  <p>
                    ${message.substring(0, 200)}
                    ${message.length > 200 ? "..." : ""}
                  </p>
                </div>

                <div style="text-align:center; margin:25px 0;">
                  <a href="https://wa.me/917230001405" 
                     style="background:#25D366; color:white; padding:12px 20px; border-radius:6px; text-decoration:none;">
                     💬 Chat on WhatsApp
                  </a>
                </div>

                <p>
                  For urgent queries: <strong>+91 72300 01405</strong>
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#111827; color:#ccc; text-align:center; padding:15px; font-size:12px;">
                © 2026 Shree Education and Publication  
                <br/>
                This is an automated email. Please do not reply.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Shree Publication" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We've received your inquiry - ${subjectLabel}`,
      html: replyContent,
    });

    console.log("✅ Auto reply sent");
  } catch (error) {
    console.error("❌ Auto reply error:", error);
  }
};