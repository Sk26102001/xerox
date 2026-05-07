// import Razorpay from 'razorpay';
// import dotenv from 'dotenv';

// // dotenv.config();

// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// export default razorpayInstance;


// config/razorpay.js
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

// ✅ UNCOMMENT THIS - It's necessary!
dotenv.config();

// ✅ Add validation to ensure keys are loaded
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error('❌ Razorpay keys are missing! Check your .env file');
    console.error('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? '✓ Present' : '✗ Missing');
    console.error('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? '✓ Present' : '✗ Missing');
    throw new Error('Razorpay keys are not configured properly');
}

// console.log('✅ Razorpay configured successfully');


const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export default razorpayInstance;