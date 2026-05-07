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















// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// // ==============================
// // SMTP CONFIG
// // ==============================
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Verify connection
// transporter.verify((error) => {
//   if (error) {
//     console.error("❌ Email config error:", error);
//   } else {
//     console.log("✅ Email server is ready");
//   }
// });

// // ==============================
// // SUBJECT LABELS
// // ==============================
// const subjectLabels = {
//   quote: "Quote Request / Pricing",
//   order: "Order Placement / Tracking",
//   bulk: "Bulk Order / Book Publishing",
//   file: "File Upload / Technical Help",
//   other: "General Query",
// };

// // ==============================
// // ADMIN NOTIFICATION EMAIL
// // ==============================
// export const sendAdminNotification = async (contactData) => {
//   const { name, phone, email, subject, message } = contactData;

//   const subjectLabel = subjectLabels[subject] || "General Query";

//   const emailContent = `
//   <!DOCTYPE html>
//   <html>
//   <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">

//     <table width="100%" style="padding:30px 0;">
//       <tr>
//         <td align="center">

//           <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.1);">

//             <!-- Header -->
//             <tr>
//               <td style="background:#1e40af; padding:20px; text-align:center;">
//                 <h2 style="color:#fff; margin:0;">📩 New Contact Submission</h2>
//               </td>
//             </tr>

//             <!-- Body -->
//             <tr>
//               <td style="padding:25px;">

//                 <p style="font-size:14px; color:#555;">
//                   A new inquiry has been submitted from your website:
//                 </p>

//                 <table width="100%" style="margin-top:15px;">
//                   <tr>
//                     <td><strong>Name:</strong></td>
//                     <td>${name}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Phone:</strong></td>
//                     <td>${phone}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Email:</strong></td>
//                     <td>${email || "Not provided"}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Subject:</strong></td>
//                     <td>${subjectLabel}</td>
//                   </tr>
//                 </table>

//                 <div style="margin-top:20px; padding:15px; background:#f1f5f9; border-left:4px solid #1e40af; border-radius:6px;">
//                   <p><strong>Message:</strong></p>
//                   <p>${message.replace(/\n/g, "<br>")}</p>
//                 </div>

//               </td>
//             </tr>

//             <!-- Footer -->
//             <tr>
//               <td style="background:#111827; color:#ccc; text-align:center; padding:15px; font-size:12px;">
//                 © 2026 Shree Publication | Contact System
//               </td>
//             </tr>

//           </table>

//         </td>
//       </tr>
//     </table>

//   </body>
//   </html>
//   `;

//   try {
//     await transporter.sendMail({
//       from: `"Shree Publication Contact" <${process.env.EMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: `New Contact: ${subjectLabel} from ${name}`,
//       html: emailContent,
//     });

//     console.log("✅ Admin email sent");
//   } catch (error) {
//     console.error("❌ Admin email error:", error);
//   }
// };

// // ==============================
// // AUTO REPLY EMAIL
// // ==============================
// export const sendAutoReply = async (contactData) => {
//   const { name, email, subject, message } = contactData;

//   if (!email) return;

//   const subjectLabel = subjectLabels[subject] || "General Query";

//   const replyContent = `
//   <!DOCTYPE html>
//   <html>
//   <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">

//     <table width="100%" style="padding:30px 0;">
//       <tr>
//         <td align="center">

//           <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.1);">

//             <!-- Header -->
//             <tr>
//               <td style="background:#8B5CF6; padding:25px; text-align:center;">
//                 <h2 style="color:#fff;">Thank You, ${name}! 🙌</h2>
//               </td>
//             </tr>

//             <!-- Body -->
//             <tr>
//               <td style="padding:25px;">

//                 <p>
//                   We’ve received your request regarding 
//                   <strong>${subjectLabel}</strong>.
//                 </p>

//                 <p>
//                   Our team will respond within 
//                   <strong>1–2 hours</strong>.
//                 </p>

//                 <div style="margin:20px 0; padding:15px; background:#f9fafb; border-radius:8px;">
//                   <strong>Your Message:</strong>
//                   <p>
//                     ${message.substring(0, 200)}
//                     ${message.length > 200 ? "..." : ""}
//                   </p>
//                 </div>

//                 <div style="text-align:center; margin:25px 0;">
//                   <a href="https://wa.me/917230001405" 
//                      style="background:#25D366; color:white; padding:12px 20px; border-radius:6px; text-decoration:none;">
//                      💬 Chat on WhatsApp
//                   </a>
//                 </div>

//                 <p>
//                   For urgent queries: <strong>+91 72300 01405</strong>
//                 </p>

//               </td>
//             </tr>

//             <!-- Footer -->
//             <tr>
//               <td style="background:#111827; color:#ccc; text-align:center; padding:15px; font-size:12px;">
//                 © 2026 Shree Education and Publication  
//                 <br/>
//                 This is an automated email. Please do not reply.
//               </td>
//             </tr>

//           </table>

//         </td>
//       </tr>
//     </table>

//   </body>
//   </html>
//   `;

//   try {
//     await transporter.sendMail({
//       from: `"Shree Publication" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: `We've received your inquiry - ${subjectLabel}`,
//       html: replyContent,
//     });

//     console.log("✅ Auto reply sent");
//   } catch (error) {
//     console.error("❌ Auto reply error:", error);
//   }
// };


// // ... (keep all your existing code exactly as is) ...

// // ==============================
// // ORDER NOTIFICATION TO ADMIN
// // ==============================
// export const sendOrderNotificationToAdmin = async (orderData) => {
//   const {
//     orderId,
//     customerName,
//     customerEmail,
//     customerPhone,
//     items,
//     totalAmount,
   
    
//     createdAt,
//     shippingAddress,
//     paymentMethod,
//     notes,
//   } = orderData;

//   // Build items table HTML
//   const itemsHtml = items.map(item => `
//     <tr style="border-bottom:1px solid #e5e7eb;">
//       <td style="padding:10px;">${item.name}${item.description ? `<br/><small style="color:#666;">${item.description}</small>` : ''}</td>
//       <td style="padding:10px; text-align:center;">${item.quantity}</td>
//       <td style="padding:10px; text-align:right;">₹${item.price.toFixed(2)}</td>
//       <td style="padding:10px; text-align:right;">₹${(item.quantity * item.price).toFixed(2)}</td>
      
//     </tr>
//   `).join('');

//   const totalHtml = `
//     <tr style="border-top:2px solid #1e3a8a;">
//       <td colspan="3" style="padding:10px; text-align:right; font-weight:bold;">Total:</td>
//       <td style="padding:10px; text-align:right; font-weight:bold; color:#1e3a8a;">₹${totalAmount.toFixed(2)}</td>
//     </tr>
//   `;

//   const emailHtml = `
//     <!DOCTYPE html>
//     <html>
//     <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">
//       <table width="100%" style="padding:30px 0;">
//         <tr><td align="center">
//           <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.1);">
//             <!-- Header -->
//             <tr style="background:#1e40af;">
//               <td style="padding:20px; text-align:center;">
//                 <h2 style="color:#fff; margin:0;">🛒 New Order Received</h2>
//               </td>
//             </tr>
//             <!-- Body -->
//             <tr>
//               <td style="padding:25px;">
//                 <p><strong>Order ID:</strong> #${orderId}</p>
//                 <p><strong>Date:</strong> ${new Date(createdAt).toLocaleString()}</p>
//                 <p><strong>Customer:</strong> ${customerName}</p>
              
//                 <p><strong>Phone:</strong> ${customerPhone || 'Not provided'}</p>
               
//                 ${shippingAddress ? `<p><strong>Shipping Address:</strong><br/>${shippingAddress.replace(/\n/g, '<br/>')}</p>` : ''}
//                 ${notes ? `<p><strong>Order Notes:</strong><br/>${notes.replace(/\n/g, '<br/>')}</p>` : ''}
//                 <h3>Order Items</h3>
//                 <table width="100%" style="border-collapse:collapse;">
//                   <thead>
//                     <tr style="background:#f1f5f9;">
//                       <th style="padding:10px; text-align:left;">Product</th>
//                       <th style="padding:10px; text-align:center;">Qty</th>
//                       <th style="padding:10px; text-align:right;">Unit Price</th>
//                       <th style="padding:10px; text-align:right;">Subtotal</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     ${itemsHtml}
//                     ${totalHtml}
//                   </tbody>
//                 </table>
//                 <div style="margin-top:30px; text-align:center;">
//                   <a href="${process.env.ADMIN_DASHBOARD_URL}/orders/${orderId}" 
//                      style="background:#1e40af; color:white; padding:12px 25px; text-decoration:none; border-radius:6px;">
//                     View Order in Admin Panel
//                   </a>
//                 </div>
//               </td>
//             </tr>
//             <!-- Footer -->
//             <tr style="background:#111827;">
//               <td style="color:#ccc; text-align:center; padding:15px; font-size:12px;">
//                 © 2026 Shree Publication | Automated Order Notification
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//     </table>
//     </body>
//     </html>
//   `;

//   try {
//     await transporter.sendMail({
//       from: `"Shree Publication Orders" <${process.env.EMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: `📦 New Order #${orderId} from ${customerName}`,
//       html: emailHtml,
//     });
//     console.log(`✅ Admin order notification sent for order ${orderId}`);
//   } catch (error) {
//     console.error(`❌ Admin order email error for order ${orderId}:`, error);
//     // Don't throw – order creation should not fail because of email
//   }
// };

// // ==============================
// // ORDER CONFIRMATION TO CUSTOMER
// // ==============================
// export const sendOrderConfirmationToCustomer = async (orderData) => {
//   const {
//     orderId,
//     customerName,
//     customerEmail,
//     items,
//     totalAmount,
//     createdAt,
//     paymentMethod,
//     estimatedDelivery,
//   } = orderData;

//   // Build items table HTML
//   const itemsHtml = items.map(item => `
//     <tr style="border-bottom:1px solid #e5e7eb;">
//       <td style="padding:10px;">${item.name}</td>
//       <td style="padding:10px; text-align:center;">${item.quantity}</td>
//       <td style="padding:10px; text-align:right;">₹${item.price.toFixed(2)}</td>
//       <td style="padding:10px; text-align:right;">₹${(item.quantity * item.price).toFixed(2)}</td>
//     </td>
//   `).join('');

//   const totalHtml = `
//     <tr style="border-top:2px solid #8B5CF6;">
//       <td colspan="3" style="padding:10px; text-align:right; font-weight:bold;">Total:</td>
//       <td style="padding:10px; text-align:right; font-weight:bold; color:#8B5CF6;">₹${totalAmount.toFixed(2)}</td>
//     </tr>
//   `;

//   const emailHtml = `
//     <!DOCTYPE html>
//     <html>
//     <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">
//       <table width="100%" style="padding:30px 0;">
//         <tr><td align="center">
//           <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.1);">
//             <!-- Header -->
//             <tr style="background:#8B5CF6;">
//               <td style="padding:25px; text-align:center;">
//                 <h2 style="color:#fff; margin:0;">Thank You, ${customerName}! 🙌</h2>
//                 <p style="color:#fff; margin:5px 0 0;">Your order has been placed successfully</p>
//               </td>
//             </tr>
//             <!-- Body -->
//             <tr>
//               <td style="padding:25px;">
//                 <p>Hello <strong>${customerName}</strong>,</p>
//                 <p>We have received your order and it is now being processed. Here are the details:</p>
//                 <p><strong>Order ID:</strong> #${orderId}</p>
//                 <p><strong>Order Date:</strong> ${new Date(createdAt).toLocaleString()}</p>
//                 <p><strong>Payment Method:</strong> ${paymentMethod}</p>
//                 ${estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>` : ''}
//                 <h3>Order Items</h3>
//                 <table width="100%" style="border-collapse:collapse;">
//                   <thead>
//                     <tr style="background:#f1f5f9;">
//                       <th style="padding:10px; text-align:left;">Product</th>
//                       <th style="padding:10px; text-align:center;">Qty</th>
//                       <th style="padding:10px; text-align:right;">Unit Price</th>
//                       <th style="padding:10px; text-align:right;">Subtotal</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     ${itemsHtml}
//                     ${totalHtml}
//                   </tbody>
//                 </table>
//                 <div style="margin:20px 0; padding:15px; background:#f1f5f9; border-radius:8px;">
//                   <p><strong>Need help?</strong> Contact us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a> or call +91 72300 01405</p>
//                   <p>You can track your order status <a href="${process.env.ADMIN_DASHBOARD_URL}/track-order/${orderId}">here</a>.</p>
//                 </div>
//                 <div style="text-align:center; margin:25px 0;">
//                   <a href="https://wa.me/917230001405" 
//                      style="background:#25D366; color:white; padding:12px 20px; text-decoration:none; border-radius:6px;">
//                      💬 Chat on WhatsApp
//                   </a>
//                 </div>
//               </td>
//             </tr>
//             <!-- Footer -->
//             <tr style="background:#111827;">
//               <td style="color:#ccc; text-align:center; padding:15px; font-size:12px;">
//                 © 2026 Shree Publication | Order Confirmation<br/>
//                 This is an automated email – please do not reply directly.
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//     </table>
//     </body>
//     </html>
//   `;

//   if (!customerEmail) {
//     console.warn(`⚠️ No customer email provided for order ${orderId}`);
//     return;
//   }

//   try {
//     await transporter.sendMail({
//       from: `"Shree Publication" <${process.env.EMAIL_USER}>`,
//       to: customerEmail,
//       subject: `Order Confirmation #${orderId} – Thank You!`,
//       html: emailHtml,
//     });
//     console.log(`✅ Order confirmation sent to ${customerEmail} for order ${orderId}`);
//   } catch (error) {
//     console.error(`❌ Customer order email error for order ${orderId}:`, error);
//   }
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

  const emailContent = `...`; // unchanged, omitted for brevity

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
  // unchanged, omitted for brevity
};

// ==============================
// ORDER NOTIFICATION TO ADMIN (updated with delivery & discount)
// ==============================
export const sendOrderNotificationToAdmin = async (orderData) => {
  const {
    orderId,
    customerName,
    customerEmail,
    customerPhone,
    items,
    totalAmount,        // final amount after all adjustments (included delivery & after discount)
    subtotal,           // original items subtotal (before discount, before delivery)
    deliveryCharge,
    discountAmount,
    createdAt,
    shippingAddress,
    paymentMethod,
    notes,
  } = orderData;

  // Build items table HTML
  const itemsHtml = items.map(item => `
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:10px;">${item.name}${item.description ? `<br/><small style="color:#666;">${item.description}</small>` : ''}</td>
      <td style="padding:10px; text-align:center;">${item.quantity}</td>
      <td style="padding:10px; text-align:right;">₹${item.price.toFixed(2)}</td>
      <td style="padding:10px; text-align:right;">₹${(item.quantity * item.price).toFixed(2)}</td>
    </tr>
  `).join('');

  const breakdownHtml = `
    <tr style="border-top:1px solid #e5e7eb;">
      <td colspan="3" style="padding:8px; text-align:right; font-weight:bold;">Subtotal (items):</td>
      <td style="padding:8px; text-align:right;">₹${(subtotal || 0).toFixed(2)}</td>
    </tr>
    ${discountAmount && discountAmount > 0 ? `
    <tr>
      <td colspan="3" style="padding:8px; text-align:right; font-weight:bold;">Discount:</td>
      <td style="padding:8px; text-align:right; color:#16a34a;">-₹${discountAmount.toFixed(2)}</td>
    </tr>` : ''}
    ${deliveryCharge && deliveryCharge > 0 ? `
    <tr>
      <td colspan="3" style="padding:8px; text-align:right; font-weight:bold;">Delivery Charge:</td>
      <td style="padding:8px; text-align:right;">₹${deliveryCharge.toFixed(2)}</td>
    </tr>` : ''}
    <tr style="border-top:2px solid #1e3a8a;">
      <td colspan="3" style="padding:10px; text-align:right; font-weight:bold;">Total Amount:</td>
      <td style="padding:10px; text-align:right; font-weight:bold; color:#1e3a8a;">₹${totalAmount.toFixed(2)}</td>
    </tr>
  `;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">
      <table width="100%" style="padding:30px 0;">
        <tr><td align="center">
          <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr style="background:#1e40af;">
              <td style="padding:20px; text-align:center;">
                <h2 style="color:#fff; margin:0;">🛒 New Order Received</h2>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:25px;">
                <p><strong>Order ID:</strong> #${orderId}</p>
                <p><strong>Date:</strong> ${new Date(createdAt).toLocaleString()}</p>
                <p><strong>Customer:</strong> ${customerName}</p>
                <p><strong>Phone:</strong> ${customerPhone || 'Not provided'}</p>
                ${shippingAddress ? `<p><strong>Shipping Address:</strong><br/>${shippingAddress.replace(/\n/g, '<br/>')}</p>` : ''}
                ${notes ? `<p><strong>Order Notes:</strong><br/>${notes.replace(/\n/g, '<br/>')}</p>` : ''}
                <h3>Order Items</h3>
                <table width="100%" style="border-collapse:collapse;">
                  <thead>
                    <tr style="background:#f1f5f9;">
                      <th style="padding:10px; text-align:left;">Product</th>
                      <th style="padding:10px; text-align:center;">Qty</th>
                      <th style="padding:10px; text-align:right;">Unit Price</th>
                      <th style="padding:10px; text-align:right;">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                    ${breakdownHtml}
                  </tbody>
                </table>
                <div style="margin-top:30px; text-align:center;">
                  <a href="${process.env.ADMIN_DASHBOARD_URL}/orders/${orderId}" 
                     style="background:#1e40af; color:white; padding:12px 25px; text-decoration:none; border-radius:6px;">
                    View Order in Admin Panel
                  </a>
                </div>
              </td>
            </tr>
            <!-- Footer -->
            <tr style="background:#111827;">
              <td style="color:#ccc; text-align:center; padding:15px; font-size:12px;">
                © 2026 Shree Publication | Automated Order Notification
              <table>
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
      from: `"Shree Publication Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📦 New Order #${orderId} from ${customerName}`,
      html: emailHtml,
    });
    console.log(`✅ Admin order notification sent for order ${orderId}`);
  } catch (error) {
    console.error(`❌ Admin order email error for order ${orderId}:`, error);
  }
};

// ==============================
// ORDER CONFIRMATION TO CUSTOMER (updated with delivery & discount)
// ==============================
export const sendOrderConfirmationToCustomer = async (orderData) => {
  const {
    orderId,
    customerName,
    customerEmail,
    items,
    totalAmount,        // final amount (incl. delivery & after discount)
    subtotal,           // original items subtotal
    deliveryCharge,
    discountAmount,
    createdAt,
    paymentMethod,
    estimatedDelivery,
  } = orderData;

  // Build items table HTML
  const itemsHtml = items.map(item => `
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:10px;">${item.name}</td>
      <td style="padding:10px; text-align:center;">${item.quantity}</td>
      <td style="padding:10px; text-align:right;">₹${item.price.toFixed(2)}</td>
      <td style="padding:10px; text-align:right;">₹${(item.quantity * item.price).toFixed(2)}</td>
    </tr>
  `).join('');

  const breakdownHtml = `
    <tr style="border-top:1px solid #e5e7eb;">
      <td colspan="3" style="padding:8px; text-align:right; font-weight:bold;">Subtotal (items):</td>
      <td style="padding:8px; text-align:right;">₹${(subtotal || 0).toFixed(2)}</td>
    </tr>
    ${discountAmount && discountAmount > 0 ? `
    <tr>
      <td colspan="3" style="padding:8px; text-align:right; font-weight:bold;">Discount:</td>
      <td style="padding:8px; text-align:right; color:#16a34a;">-₹${discountAmount.toFixed(2)}</td>
    </tr>` : ''}
    ${deliveryCharge && deliveryCharge > 0 ? `
    <tr>
      <td colspan="3" style="padding:8px; text-align:right; font-weight:bold;">Delivery Charge:</td>
      <td style="padding:8px; text-align:right;">₹${deliveryCharge.toFixed(2)}</td>
    </tr>` : ''}
    <tr style="border-top:2px solid #8B5CF6;">
      <td colspan="3" style="padding:10px; text-align:right; font-weight:bold;">Total Amount:</td>
      <td style="padding:10px; text-align:right; font-weight:bold; color:#8B5CF6;">₹${totalAmount.toFixed(2)}</td>
    </tr>
  `;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">
      <table width="100%" style="padding:30px 0;">
        <tr><td align="center">
          <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr style="background:#8B5CF6;">
              <td style="padding:25px; text-align:center;">
                <h2 style="color:#fff; margin:0;">Thank You, ${customerName}! 🙌</h2>
                <p style="color:#fff; margin:5px 0 0;">Your order has been placed successfully</p>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:25px;">
                <p>Hello <strong>${customerName}</strong>,</p>
                <p>We have received your order and it is now being processed. Here are the details:</p>
                <p><strong>Order ID:</strong> #${orderId}</p>
                <p><strong>Order Date:</strong> ${new Date(createdAt).toLocaleString()}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                ${estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>` : ''}
                <h3>Order Items</h3>
                <table width="100%" style="border-collapse:collapse;">
                  <thead>
                    <tr style="background:#f1f5f9;">
                      <th style="padding:10px; text-align:left;">Product</th>
                      <th style="padding:10px; text-align:center;">Qty</th>
                      <th style="padding:10px; text-align:right;">Unit Price</th>
                      <th style="padding:10px; text-align:right;">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                    ${breakdownHtml}
                  </tbody>
                </table>
                <div style="margin:20px 0; padding:15px; background:#f1f5f9; border-radius:8px;">
                  <p><strong>Need help?</strong> Contact us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a> or call +91 72300 01405</p>
                  <p>You can track your order status <a href="${process.env.ADMIN_DASHBOARD_URL}/track-order/${orderId}">here</a>.</p>
                </div>
                <div style="text-align:center; margin:25px 0;">
                  <a href="https://wa.me/917230001405" 
                     style="background:#25D366; color:white; padding:12px 20px; text-decoration:none; border-radius:6px;">
                     💬 Chat on WhatsApp
                  </a>
                </div>
              </td>
            </tr>
            <!-- Footer -->
            <tr style="background:#111827;">
              <td style="color:#ccc; text-align:center; padding:15px; font-size:12px;">
                © 2026 Shree Publication | Order Confirmation<br/>
                This is an automated email – please do not reply directly.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    </body>
    </html>
  `;

  if (!customerEmail) {
    console.warn(`⚠️ No customer email provided for order ${orderId}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Shree Publication" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `Order Confirmation #${orderId} – Thank You!`,
      html: emailHtml,
    });
    console.log(`✅ Order confirmation sent to ${customerEmail} for order ${orderId}`);
  } catch (error) {
    console.error(`❌ Customer order email error for order ${orderId}:`, error);
  }
};