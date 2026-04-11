// import Cart from "../models/Cart.js";

// // ✅ GET CART
// export const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.json({
//         items: [],
//         customer: {},
//         orderMode: "single",
//         deliveryType: "pickup",
//         totals: {
//           printingCost: 0,
//           gst: 0,
//           totalWithDelivery: 0
//         }
//       });
//     }

//     res.json(cart);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// // // ✅ ADD TO CART
// // export const addToCart = async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const data = req.body;

// //     let cart = await Cart.findOne({ userId });

// //     if (!cart) {
// //       cart = new Cart({
// //         userId,
// //         ...data
// //       });
// //     } else {
// //       cart.items.push(...data.items);
// //       cart.customer = data.customer;
// //       cart.orderMode = data.orderMode;
// //       cart.deliveryType = data.deliveryType;
// //       cart.totals = data.totals;
// //     }

// //     await cart.save();

// //     res.json({
// //       success: true,
// //       message: "Item added to cart",
// //       cart
// //     });

// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// export const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     let data = req.body;

//     // 🔥 STEP 1: CLEAN ITEMS SAFELY
//     if (data.items && Array.isArray(data.items)) {
//       data.items = data.items.map(item => {
//         let files = item.files;

//         // if files is string → convert
//         if (typeof files === "string") {
//           try {
//             files = JSON.parse(files);
//           } catch (err) {
//             files = [];
//           }
//         }

//         // EXTRA SAFETY: if files is undefined/null
//         if (!Array.isArray(files)) {
//           files = [];
//         }

//         return {
//           ...item,
//           files
//         };
//       });
//     } else {
//       data.items = [];
//     }

//     // 🔥 STEP 2: SAFE TOTALS
//     const totals = {
//       printingCost: Number(data.totalPrintingCost) || 0,
//       gst: Number(data.totalGst) || 0,
//       totalWithDelivery: Number(data.totalWithDelivery) || 0,
//     };

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({
//         userId,
//         items: data.items,
//         customer: data.customer || {},
//         orderMode: data.orderMode || "single",
//         deliveryType: data.deliveryType || "pickup",
//         totals
//       });
//     } else {
//       // 🔥 IMPORTANT: replace clean data only
//       cart.items = data.items;
//       cart.customer = data.customer || {};
//       cart.orderMode = data.orderMode || "single";
//       cart.deliveryType = data.deliveryType || "pickup";
//       cart.totals = totals;
//     }

//     await cart.save();

//     res.json({
//       success: true,
//       message: "Cart saved successfully",
//       cart
//     });

//   } catch (error) {
//     console.error("🔥 ADD TO CART ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ UPDATE ITEM
// export const updateCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;
//     const { copies } = req.body;

//     const cart = await Cart.findOne({ userId });

//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const item = cart.items.find(i => i._id.toString() === id);

//     if (!item) return res.status(404).json({ message: "Item not found" });

//     item.copies = copies;

//     await cart.save();

//     res.json({
//       success: true,
//       message: "Item updated",
//       cart
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ DELETE ITEM
// export const deleteCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const cart = await Cart.findOne({ userId });

//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter(
//       item => item._id.toString() !== id
//     );

//     await cart.save();

//     res.json({
//       success: true,
//       message: "Item removed",
//       cart
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ CLEAR CART
// export const clearCart = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     await Cart.findOneAndDelete({ userId });

//     res.json({
//       success: true,
//       message: "Cart cleared"
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };






// import Cart from "../models/Cart.js";

// // ✅ GET CART
// export const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.json({
//         items: [],
//         customer: {},
//         orderMode: "single",
//         deliveryType: "pickup",
//         totals: {
//           printingCost: 0,
//           gst: 0,
//           totalWithDelivery: 0
//         }
//       });
//     }

//     res.json(cart);

//   } catch (error) {
//     console.error("GET CART ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ ADD/SAVE TO CART
// export const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const data = req.body;

//     console.log("Received data:", JSON.stringify(data, null, 2));

//     // ✅ Clean and validate items
//     const cleanedItems = (data.items || []).map(item => ({
//       pages: Number(item.pages) || 0,
//       copies: Number(item.copies) || 1,
//       paperSize: item.paperSize || 'A4',
//       paperType: item.paperType || '70gsm_normal',
//       printColor: item.printColor || 'bw',
//       printSide: item.printSide || 'double',
//       bindingType: item.bindingType || 'perfect_glue',
//       lamination: item.lamination || 'none',
//       instructions: item.instructions || '',
//       // ✅ Ensure files is an array of objects, not strings
//       files: Array.isArray(item.files) 
//         ? item.files.map(file => ({
//             name: file.name || '',
//             size: Number(file.size) || 0,
//             type: file.type || '',
//             status: file.status || 'done',
//             url: file.url || ''
//           }))
//         : []
//     }));

//     // ✅ Prepare totals
//     const totals = {
//       printingCost: Number(data.totalPrintingCost) || 0,
//       gst: Number(data.totalGst) || 0,
//       totalWithDelivery: Number(data.totalWithDelivery) || 0,
//     };

//     // ✅ Prepare customer data
//     const customer = {
//       name: data.customer?.name || '',
//       phone: data.customer?.phone || '',
//       address: data.customer?.address || '',
//       pincode: data.customer?.pincode || '',
//       city: data.customer?.city || '',
//       state: data.customer?.state || ''
//     };

//     // ✅ Find or create cart
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       // Create new cart
//       cart = new Cart({
//         userId,
//         items: cleanedItems,
//         customer,
//         orderMode: data.orderMode || "single",
//         deliveryType: data.deliveryType || "pickup",
//         totals
//       });
//     } else {
//       // Update existing cart
//       cart.items = cleanedItems;
//       cart.customer = customer;
//       cart.orderMode = data.orderMode || "single";
//       cart.deliveryType = data.deliveryType || "pickup";
//       cart.totals = totals;
//     }

//     await cart.save();

//     res.json({
//       success: true,
//       message: "Cart saved successfully",
//       cart
//     });

//   } catch (error) {
//     console.error("🔥 ADD TO CART ERROR:", error);
//     res.status(500).json({ 
//       message: error.message,
//       stack: error.stack 
//     });
//   }
// };

// // ✅ UPDATE ITEM QUANTITY
// export const updateCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;
//     const { copies } = req.body;

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // Find item by _id
//     const item = cart.items.find(i => i._id.toString() === id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     item.copies = copies;
//     await cart.save();

//     res.json({
//       success: true,
//       message: "Item updated",
//       cart
//     });

//   } catch (error) {
//     console.error("UPDATE ITEM ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ DELETE ITEM
// export const deleteCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     cart.items = cart.items.filter(item => item._id.toString() !== id);
//     await cart.save();

//     res.json({
//       success: true,
//       message: "Item removed",
//       cart
//     });

//   } catch (error) {
//     console.error("DELETE ITEM ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ CLEAR CART
// export const clearCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await Cart.findOneAndDelete({ userId });

//     res.json({
//       success: true,
//       message: "Cart cleared"
//     });

//   } catch (error) {
//     console.error("CLEAR CART ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };





// import Cart from "../models/Cart.js";

// // ✅ GET CART
// export const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.json({
//         items: [],
//         customer: {},
//         orderMode: "single",
//         deliveryType: "pickup",
//         totals: {
//           printingCost: 0,
//           gst: 0,
//           totalWithDelivery: 0
//         }
//       });
//     }

//     res.json(cart);
//   } catch (error) {
//     console.error("GET CART ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ ADD TO CART - APPENDS NEW ITEMS
// export const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const data = req.body;

//     // console.log("Received data:", JSON.stringify(data, null, 2));

//     // ✅ Clean and validate items
//     const newItems = (data.items || []).map(item => ({
//       pages: Number(item.pages) || 0,
//       copies: Number(item.copies) || 1,
//       paperSize: item.paperSize || 'A4',
//       paperType: item.paperType || '70gsm_normal',
//       printColor: item.printColor || 'bw',
//       printSide: item.printSide || 'double',
//       bindingType: item.bindingType || 'perfect_glue',
//       lamination: item.lamination || 'none',
//       instructions: item.instructions || '',
//       files: Array.isArray(item.files) 
//         ? item.files.map(file => ({
//             name: file.name || '',
//             size: Number(file.size) || 0,
//             type: file.type || '',
//             status: file.status || 'done',
//             url: file.url || ''
//           }))
//         : []
//     }));

//     // ✅ Prepare customer data (only update if provided)
//     const customer = data.customer ? {
//       name: data.customer.name || '',
//       phone: data.customer.phone || '',
//       address: data.customer.address || '',
//       pincode: data.customer.pincode || '',
//       city: data.customer.city || '',
//       state: data.customer.state || ''
//     } : {};

//     // ✅ Find existing cart
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       // Create new cart with items
//       cart = new Cart({
//         userId,
//         items: newItems,
//         customer,
//         orderMode: data.orderMode || "single",
//         deliveryType: data.deliveryType || "pickup",
//         totals: {
//           printingCost: Number(data.totalPrintingCost) || 0,
//           gst: Number(data.totalGst) || 0,
//           totalWithDelivery: Number(data.totalWithDelivery) || 0
//         }
//       });
//     } else {
//       // ✅ APPEND new items to existing cart (don't replace)
//       cart.items.push(...newItems);
      
//       // ✅ Update customer info if provided (only update fields that have values)
//       if (customer.name) cart.customer.name = customer.name;
//       if (customer.phone) cart.customer.phone = customer.phone;
//       if (customer.address) cart.customer.address = customer.address;
//       if (customer.pincode) cart.customer.pincode = customer.pincode;
//       if (customer.city) cart.customer.city = customer.city;
//       if (customer.state) cart.customer.state = customer.state;
      
//       // ✅ Update delivery type and order mode if provided
//       if (data.deliveryType) cart.deliveryType = data.deliveryType;
//       if (data.orderMode) cart.orderMode = data.orderMode;
      
//       // ✅ Update totals (add to existing totals or recalculate)
//       cart.totals.printingCost += Number(data.totalPrintingCost) || 0;
//       cart.totals.gst += Number(data.totalGst) || 0;
//       cart.totals.totalWithDelivery += Number(data.totalWithDelivery) || 0;
//     }

//     await cart.save();

//     res.json({
//       success: true,
//       message: "Item(s) added to cart",
//       cart
//     });

//   } catch (error) {
//     console.error("🔥 ADD TO CART ERROR:", error);
//     res.status(500).json({ 
//       message: error.message,
//       stack: error.stack 
//     });
//   }
// };

// // ✅ REPLACE CART (for bulk replacement)
// export const replaceCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const data = req.body;

//     const cleanedItems = (data.items || []).map(item => ({
//       pages: Number(item.pages) || 0,
//       copies: Number(item.copies) || 1,
//       paperSize: item.paperSize || 'A4',
//       paperType: item.paperType || '70gsm_normal',
//       printColor: item.printColor || 'bw',
//       printSide: item.printSide || 'double',
//       bindingType: item.bindingType || 'perfect_glue',
//       lamination: item.lamination || 'none',
//       instructions: item.instructions || '',
//       files: Array.isArray(item.files) 
//         ? item.files.map(file => ({
//             name: file.name || '',
//             size: Number(file.size) || 0,
//             type: file.type || '',
//             status: file.status || 'done',
//             url: file.url || ''
//           }))
//         : []
//     }));

//     const customer = {
//       name: data.customer?.name || '',
//       phone: data.customer?.phone || '',
//       address: data.customer?.address || '',
//       pincode: data.customer?.pincode || '',
//       city: data.customer?.city || '',
//       state: data.customer?.state || ''
//     };

//     const totals = {
//       printingCost: Number(data.totalPrintingCost) || 0,
//       gst: Number(data.totalGst) || 0,
//       totalWithDelivery: Number(data.totalWithDelivery) || 0,
//     };

//     const cart = await Cart.findOneAndUpdate(
//       { userId },
//       {
//         userId,
//         items: cleanedItems,
//         customer,
//         orderMode: data.orderMode || "single",
//         deliveryType: data.deliveryType || "pickup",
//         totals
//       },
//       { upsert: true, new: true }
//     );

//     res.json({
//       success: true,
//       message: "Cart replaced successfully",
//       cart
//     });

//   } catch (error) {
//     console.error("REPLACE CART ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ UPDATE ITEM QUANTITY
// export const updateCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;
//     const { copies } = req.body;

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // Find item by _id
//     const item = cart.items.id(id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     // Calculate difference for totals update
//     const oldCopies = item.copies;
//     const pricePerCopy = item.totalPrice / oldCopies || 0;
    
//     item.copies = copies;
    
//     // Recalculate totals
//     if (pricePerCopy > 0) {
//       const difference = (copies - oldCopies) * pricePerCopy;
//       cart.totals.totalWithDelivery += difference;
//       cart.totals.printingCost += difference;
//       cart.totals.gst = cart.totals.printingCost * 0.05;
//     }
    
//     await cart.save();

//     res.json({
//       success: true,
//       message: "Item updated",
//       cart
//     });

//   } catch (error) {
//     console.error("UPDATE ITEM ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ DELETE ITEM
// export const deleteCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // Find the item to get its price for totals adjustment
//     const itemToRemove = cart.items.id(id);
    
//     if (itemToRemove) {
//       // Subtract item's cost from totals
//       cart.totals.printingCost -= itemToRemove.totalPrice || 0;
//       cart.totals.gst = cart.totals.printingCost * 0.05;
//       cart.totals.totalWithDelivery = cart.totals.printingCost + cart.totals.gst;
//     }
    
//     // Remove the item
//     cart.items.pull(id);
//     await cart.save();

//     res.json({
//       success: true,
//       message: "Item removed",
//       cart
//     });

//   } catch (error) {
//     console.error("DELETE ITEM ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ CLEAR CART
// export const clearCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await Cart.findOneAndDelete({ userId });

//     res.json({
//       success: true,
//       message: "Cart cleared"
//     });

//   } catch (error) {
//     console.error("CLEAR CART ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };





// import Cart from "../models/Cart.js";

// // ✅ GET CART - Include all fields
// export const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.json({
//         items: [],
//         customer: {
//           name: '',
//           phone: '',
//           address: '',
//           pincode: '',
//           city: '',
//           state: '',
//           landmark: '',      // ✅ ADDED
//           addressType: 'Home' // ✅ ADDED
//         },
//         orderMode: "single",
//         deliveryType: "pickup",
//         deliveryPartner: null,  // ✅ ADDED
//         deliveryCharge: 0,      // ✅ ADDED
//         totals: {
//           printingCost: 0,
//           gst: 0,
//           totalWithDelivery: 0
//         }
//       });
//     }

//     // Ensure all fields are present in response
//     const cartResponse = cart.toObject();
//     if (!cartResponse.customer.landmark) cartResponse.customer.landmark = '';
//     if (!cartResponse.customer.addressType) cartResponse.customer.addressType = 'Home';
//     if (cartResponse.deliveryPartner === undefined) cartResponse.deliveryPartner = null;
//     if (cartResponse.deliveryCharge === undefined) cartResponse.deliveryCharge = 0;
    
//     res.json(cartResponse);
//   } catch (error) {
//     console.error("GET CART ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ ADD TO CART - Include all fields
// export const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const data = req.body;

//     // Clean and validate items
//     const newItems = (data.items || []).map(item => ({
//       pages: Number(item.pages) || 0,
//       copies: Number(item.copies) || 1,
//       paperSize: item.paperSize || 'A4',
//       paperType: item.paperType || '70gsm_normal',
//       printColor: item.printColor || 'bw',
//       printSide: item.printSide || 'double',
//       bindingType: item.bindingType || 'perfect_glue',
//       lamination: item.lamination || 'none',
//       instructions: item.instructions || '',
//       files: Array.isArray(item.files) 
//         ? item.files.map(file => ({
//             name: file.name || '',
//             size: Number(file.size) || 0,
//             type: file.type || '',
//             status: file.status || 'done',
//             url: file.url || ''
//           }))
//         : []
//     }));

//     // ✅ Include ALL customer fields
//     const customer = data.customer ? {
//       name: data.customer.name || '',
//       phone: data.customer.phone || '',
//       address: data.customer.address || '',
//       pincode: data.customer.pincode || '',
//       city: data.customer.city || '',
//       state: data.customer.state || '',
//       landmark: data.customer.landmark || '',      // ✅ ADDED
//       addressType: data.customer.addressType || 'Home'  // ✅ ADDED
//     } : {};

//     // Find existing cart
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       // Create new cart with all fields
//       cart = new Cart({
//         userId,
//         items: newItems,
//         customer,
//         orderMode: data.orderMode || "single",
//         deliveryType: data.deliveryType || "pickup",
//         deliveryPartner: data.deliveryPartner || null,  // ✅ ADDED
//         deliveryCharge: data.deliveryCharge || 0,       // ✅ ADDED
//         totals: {
//           printingCost: Number(data.totalPrintingCost) || 0,
//           gst: Number(data.totalGst) || 0,
//           totalWithDelivery: Number(data.totalWithDelivery) || 0
//         }
//       });
//     } else {
//       // APPEND new items to existing cart
//       cart.items.push(...newItems);
      
//       // ✅ Update ALL customer fields if provided
//       if (customer.name) cart.customer.name = customer.name;
//       if (customer.phone) cart.customer.phone = customer.phone;
//       if (customer.address) cart.customer.address = customer.address;
//       if (customer.pincode) cart.customer.pincode = customer.pincode;
//       if (customer.city) cart.customer.city = customer.city;
//       if (customer.state) cart.customer.state = customer.state;
//       if (customer.landmark !== undefined) cart.customer.landmark = customer.landmark;  // ✅ ADDED
//       if (customer.addressType) cart.customer.addressType = customer.addressType;        // ✅ ADDED
      
//       // Update delivery type and order mode if provided
//       if (data.deliveryType) cart.deliveryType = data.deliveryType;
//       if (data.orderMode) cart.orderMode = data.orderMode;
//       if (data.deliveryPartner !== undefined) cart.deliveryPartner = data.deliveryPartner;  // ✅ ADDED
//       if (data.deliveryCharge !== undefined) cart.deliveryCharge = data.deliveryCharge;     // ✅ ADDED
      
//       // Update totals (add to existing totals or recalculate)
//       cart.totals.printingCost += Number(data.totalPrintingCost) || 0;
//       cart.totals.gst += Number(data.totalGst) || 0;
//       cart.totals.totalWithDelivery += Number(data.totalWithDelivery) || 0;
//     }

//     await cart.save();

//     res.json({
//       success: true,
//       message: "Item(s) added to cart",
//       cart
//     });

//   } catch (error) {
//     console.error("🔥 ADD TO CART ERROR:", error);
//     res.status(500).json({ 
//       message: error.message,
//       stack: error.stack 
//     });
//   }
// };

// // ✅ NEW FUNCTION: UPDATE CART ADDRESS
// export const updateCartAddress = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { address, pincode, city, state, landmark, addressType } = req.body;

//     console.log('=== UPDATE CART ADDRESS ===');
//     console.log('User ID:', userId);
//     console.log('Address data:', { address, pincode, city, state, landmark, addressType });

//     // Find cart
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Cart not found" 
//       });
//     }

//     // Initialize customer object if it doesn't exist
//     if (!cart.customer) {
//       cart.customer = {};
//     }

//     // Update only the fields that are provided
//     if (address !== undefined) cart.customer.address = address;
//     if (pincode !== undefined) cart.customer.pincode = pincode;
//     if (city !== undefined) cart.customer.city = city;
//     if (state !== undefined) cart.customer.state = state;
//     if (landmark !== undefined) cart.customer.landmark = landmark;
//     if (addressType !== undefined) cart.customer.addressType = addressType;

//     await cart.save();

//     console.log('✅ Cart address updated successfully');

//     res.json({
//       success: true,
//       message: "Delivery address updated successfully",
//       cart: cart
//     });

//   } catch (error) {
//     console.error("UPDATE CART ADDRESS ERROR:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message || "Failed to update address" 
//     });
//   }
// };

// // ✅ NEW FUNCTION: UPDATE DELIVERY PARTNER
// export const updateDeliveryPartner = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { deliveryPartner, deliveryCharge } = req.body;

//     console.log('=== UPDATE DELIVERY PARTNER ===');
//     console.log('User ID:', userId);
//     console.log('Delivery Partner:', deliveryPartner);
//     console.log('Delivery Charge:', deliveryCharge);

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Cart not found" 
//       });
//     }

//     if (deliveryPartner !== undefined) cart.deliveryPartner = deliveryPartner;
//     if (deliveryCharge !== undefined) cart.deliveryCharge = deliveryCharge;

//     await cart.save();

//     console.log('✅ Delivery partner updated successfully');

//     res.json({
//       success: true,
//       message: "Delivery partner updated successfully",
//       cart: cart
//     });

//   } catch (error) {
//     console.error("UPDATE DELIVERY PARTNER ERROR:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message || "Failed to update delivery partner" 
//     });
//   }
// };

// // ✅ REPLACE CART - Include all fields
// export const replaceCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const data = req.body;

//     const cleanedItems = (data.items || []).map(item => ({
//       pages: Number(item.pages) || 0,
//       copies: Number(item.copies) || 1,
//       paperSize: item.paperSize || 'A4',
//       paperType: item.paperType || '70gsm_normal',
//       printColor: item.printColor || 'bw',
//       printSide: item.printSide || 'double',
//       bindingType: item.bindingType || 'perfect_glue',
//       lamination: item.lamination || 'none',
//       instructions: item.instructions || '',
//       files: Array.isArray(item.files) 
//         ? item.files.map(file => ({
//             name: file.name || '',
//             size: Number(file.size) || 0,
//             type: file.type || '',
//             status: file.status || 'done',
//             url: file.url || ''
//           }))
//         : []
//     }));

//     const customer = {
//       name: data.customer?.name || '',
//       phone: data.customer?.phone || '',
//       address: data.customer?.address || '',
//       pincode: data.customer?.pincode || '',
//       city: data.customer?.city || '',
//       state: data.customer?.state || '',
//       landmark: data.customer?.landmark || '',      // ✅ ADDED
//       addressType: data.customer?.addressType || 'Home'  // ✅ ADDED
//     };

//     const totals = {
//       printingCost: Number(data.totalPrintingCost) || 0,
//       gst: Number(data.totalGst) || 0,
//       totalWithDelivery: Number(data.totalWithDelivery) || 0,
//     };

//     const cart = await Cart.findOneAndUpdate(
//       { userId },
//       {
//         userId,
//         items: cleanedItems,
//         customer,
//         orderMode: data.orderMode || "single",
//         deliveryType: data.deliveryType || "pickup",
//         deliveryPartner: data.deliveryPartner || null,  // ✅ ADDED
//         deliveryCharge: data.deliveryCharge || 0,       // ✅ ADDED
//         totals
//       },
//       { upsert: true, new: true }
//     );

//     res.json({
//       success: true,
//       message: "Cart replaced successfully",
//       cart
//     });

//   } catch (error) {
//     console.error("REPLACE CART ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ UPDATE ITEM QUANTITY
// export const updateCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;
//     const { copies } = req.body;

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const item = cart.items.id(id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }
    
//     item.copies = copies;
//     await cart.save();

//     res.json({
//       success: true,
//       message: "Item updated",
//       cart
//     });

//   } catch (error) {
//     console.error("UPDATE ITEM ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ DELETE ITEM
// export const deleteCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }
    
//     cart.items.pull(id);
//     await cart.save();

//     res.json({
//       success: true,
//       message: "Item removed",
//       cart
//     });

//   } catch (error) {
//     console.error("DELETE ITEM ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ CLEAR CART
// export const clearCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await Cart.findOneAndDelete({ userId });

//     res.json({
//       success: true,
//       message: "Cart cleared"
//     });

//   } catch (error) {
//     console.error("CLEAR CART ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };






import Cart from "../models/Cart.js";

// Helper function to calculate item amount (matching frontend calculation)
const calculateItemAmount = (item) => {
  const totalPages = item.pages * item.copies;
  
  // Calculate printing cost
  let printingCost = 0;
  if (item.printColor === 'color') {
    printingCost = totalPages * 3;
  } else {
    printingCost = totalPages * 1;  // B&W: ₹1 per page
  }
  
  // Calculate binding cost
  let bindingCost = 0;
  if (item.bindingType === 'perfect_glue') bindingCost = 50 * item.copies;
  if (item.bindingType === 'spiral') bindingCost = 30 * item.copies;
  if (item.bindingType === 'hardcover') bindingCost = 150 * item.copies;
  
  // Calculate GST (5%)
  const subtotal = printingCost + bindingCost;
  const gst = subtotal * 0.05;
  const amount = subtotal + gst;
  
  console.log(`📊 Calculating amount for item: ${item.pages}p × ${item.copies}c`);
  console.log(`   Printing: ₹${printingCost}, Binding: ₹${bindingCost}`);
  console.log(`   Subtotal: ₹${subtotal}, GST: ₹${gst}`);
  console.log(`   Total Amount: ₹${amount.toFixed(2)}`);
  
  return {
    amount: Math.round(amount * 100) / 100,  // Round to 2 decimal places
    unitPrice: item.printColor === 'color' ? 3 : 1
  };
};

// ✅ GET CART - Include all fields
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({
        items: [],
        customer: {
          name: '',
          phone: '',
          address: '',
          pincode: '',
          city: '',
          state: '',
          landmark: '',
          addressType: 'Home'
        },
        orderMode: "single",
        deliveryType: "pickup",
        deliveryPartner: null,
        deliveryCharge: 0,
        totals: {
          printingCost: 0,
          gst: 0,
          totalWithDelivery: 0
        }
      });
    }

    // Ensure all fields are present in response
    const cartResponse = cart.toObject();
    if (!cartResponse.customer.landmark) cartResponse.customer.landmark = '';
    if (!cartResponse.customer.addressType) cartResponse.customer.addressType = 'Home';
    if (cartResponse.deliveryPartner === undefined) cartResponse.deliveryPartner = null;
    if (cartResponse.deliveryCharge === undefined) cartResponse.deliveryCharge = 0;
    
    res.json(cartResponse);
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADD TO CART - Include all fields with amount calculation
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    // Clean and validate items with amount calculation
    const newItems = (data.items || []).map(item => {
      const itemData = {
        pages: Number(item.pages) || 0,
        copies: Number(item.copies) || 1,
        paperSize: item.paperSize || 'A4',
        paperType: item.paperType || '70gsm_normal',
        printColor: item.printColor || 'bw',
        printSide: item.printSide || 'double',
        bindingType: item.bindingType || 'perfect_glue',
        lamination: item.lamination || 'none',
        instructions: item.instructions || '',
        files: Array.isArray(item.files) 
          ? item.files.map(file => ({
              name: file.name || '',
              size: Number(file.size) || 0,
              type: file.type || '',
              status: file.status || 'done',
              url: file.url || ''
            }))
          : []
      };
      
      // ✅ Calculate and add amount
      const { amount, unitPrice } = calculateItemAmount(itemData);
      itemData.amount = amount;
      itemData.unitPrice = unitPrice;
      
      return itemData;
    });

    // Include ALL customer fields
    const customer = data.customer ? {
      name: data.customer.name || '',
      phone: data.customer.phone || '',
      address: data.customer.address || '',
      pincode: data.customer.pincode || '',
      city: data.customer.city || '',
      state: data.customer.state || '',
      landmark: data.customer.landmark || '',
      addressType: data.customer.addressType || 'Home'
    } : {};

    // Find existing cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart with all fields
      cart = new Cart({
        userId,
        items: newItems,
        customer,
        orderMode: data.orderMode || "single",
        deliveryType: data.deliveryType || "pickup",
        deliveryPartner: data.deliveryPartner || null,
        deliveryCharge: data.deliveryCharge || 0,
        totals: {
          printingCost: Number(data.totalPrintingCost) || 0,
          gst: Number(data.totalGst) || 0,
          totalWithDelivery: Number(data.totalWithDelivery) || 0
        }
      });
    } else {
      // APPEND new items to existing cart
      cart.items.push(...newItems);
      
      // Update ALL customer fields if provided
      if (customer.name) cart.customer.name = customer.name;
      if (customer.phone) cart.customer.phone = customer.phone;
      if (customer.address) cart.customer.address = customer.address;
      if (customer.pincode) cart.customer.pincode = customer.pincode;
      if (customer.city) cart.customer.city = customer.city;
      if (customer.state) cart.customer.state = customer.state;
      if (customer.landmark !== undefined) cart.customer.landmark = customer.landmark;
      if (customer.addressType) cart.customer.addressType = customer.addressType;
      
      // Update delivery type and order mode if provided
      if (data.deliveryType) cart.deliveryType = data.deliveryType;
      if (data.orderMode) cart.orderMode = data.orderMode;
      if (data.deliveryPartner !== undefined) cart.deliveryPartner = data.deliveryPartner;
      if (data.deliveryCharge !== undefined) cart.deliveryCharge = data.deliveryCharge;
      
      // Update totals (add to existing totals or recalculate)
      cart.totals.printingCost += Number(data.totalPrintingCost) || 0;
      cart.totals.gst += Number(data.totalGst) || 0;
      cart.totals.totalWithDelivery += Number(data.totalWithDelivery) || 0;
    }

    await cart.save();

    console.log(`✅ Added ${newItems.length} item(s) to cart with amounts:`, 
      newItems.map(i => ({ copies: i.copies, amount: i.amount })));

    res.json({
      success: true,
      message: "Item(s) added to cart",
      cart
    });

  } catch (error) {
    console.error("🔥 ADD TO CART ERROR:", error);
    res.status(500).json({ 
      message: error.message,
      stack: error.stack 
    });
  }
};

// ✅ UPDATE CART ADDRESS
export const updateCartAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, pincode, city, state, landmark, addressType } = req.body;

    console.log('=== UPDATE CART ADDRESS ===');
    console.log('User ID:', userId);
    console.log('Address data:', { address, pincode, city, state, landmark, addressType });

    // Find cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: "Cart not found" 
      });
    }

    // Initialize customer object if it doesn't exist
    if (!cart.customer) {
      cart.customer = {};
    }

    // Update only the fields that are provided
    if (address !== undefined) cart.customer.address = address;
    if (pincode !== undefined) cart.customer.pincode = pincode;
    if (city !== undefined) cart.customer.city = city;
    if (state !== undefined) cart.customer.state = state;
    if (landmark !== undefined) cart.customer.landmark = landmark;
    if (addressType !== undefined) cart.customer.addressType = addressType;

    await cart.save();

    console.log('✅ Cart address updated successfully');

    res.json({
      success: true,
      message: "Delivery address updated successfully",
      cart: cart
    });

  } catch (error) {
    console.error("UPDATE CART ADDRESS ERROR:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to update address" 
    });
  }
};

// ✅ UPDATE DELIVERY PARTNER
export const updateDeliveryPartner = async (req, res) => {
  try {
    const userId = req.user.id;
    const { deliveryPartner, deliveryCharge } = req.body;

    console.log('=== UPDATE DELIVERY PARTNER ===');
    console.log('User ID:', userId);
    console.log('Delivery Partner:', deliveryPartner);
    console.log('Delivery Charge:', deliveryCharge);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: "Cart not found" 
      });
    }

    if (deliveryPartner !== undefined) cart.deliveryPartner = deliveryPartner;
    if (deliveryCharge !== undefined) cart.deliveryCharge = deliveryCharge;

    await cart.save();

    console.log('✅ Delivery partner updated successfully');

    res.json({
      success: true,
      message: "Delivery partner updated successfully",
      cart: cart
    });

  } catch (error) {
    console.error("UPDATE DELIVERY PARTNER ERROR:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to update delivery partner" 
    });
  }
};

// ✅ REPLACE CART - Include all fields with amount calculation
export const replaceCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const cleanedItems = (data.items || []).map(item => {
      const itemData = {
        pages: Number(item.pages) || 0,
        copies: Number(item.copies) || 1,
        paperSize: item.paperSize || 'A4',
        paperType: item.paperType || '70gsm_normal',
        printColor: item.printColor || 'bw',
        printSide: item.printSide || 'double',
        bindingType: item.bindingType || 'perfect_glue',
        lamination: item.lamination || 'none',
        instructions: item.instructions || '',
        files: Array.isArray(item.files) 
          ? item.files.map(file => ({
              name: file.name || '',
              size: Number(file.size) || 0,
              type: file.type || '',
              status: file.status || 'done',
              url: file.url || ''
            }))
          : []
      };
      
      // ✅ Calculate and add amount
      const { amount, unitPrice } = calculateItemAmount(itemData);
      itemData.amount = amount;
      itemData.unitPrice = unitPrice;
      
      return itemData;
    });

    const customer = {
      name: data.customer?.name || '',
      phone: data.customer?.phone || '',
      address: data.customer?.address || '',
      pincode: data.customer?.pincode || '',
      city: data.customer?.city || '',
      state: data.customer?.state || '',
      landmark: data.customer?.landmark || '',
      addressType: data.customer?.addressType || 'Home'
    };

    const totals = {
      printingCost: Number(data.totalPrintingCost) || 0,
      gst: Number(data.totalGst) || 0,
      totalWithDelivery: Number(data.totalWithDelivery) || 0,
    };

    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        userId,
        items: cleanedItems,
        customer,
        orderMode: data.orderMode || "single",
        deliveryType: data.deliveryType || "pickup",
        deliveryPartner: data.deliveryPartner || null,
        deliveryCharge: data.deliveryCharge || 0,
        totals
      },
      { upsert: true, new: true }
    );

    console.log(`✅ Cart replaced with ${cleanedItems.length} item(s)`);

    res.json({
      success: true,
      message: "Cart replaced successfully",
      cart
    });

  } catch (error) {
    console.error("REPLACE CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE ITEM QUANTITY - WITH AMOUNT RECALCULATION
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { copies } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    // Update copies
    item.copies = copies;
    
    // ✅ Recalculate amount with new quantity
    const { amount, unitPrice } = calculateItemAmount(item);
    item.amount = amount;
    item.unitPrice = unitPrice;
    
    console.log(`📊 Updated item: ${item.pages}p × ${copies}c = ₹${amount}`);
    
    await cart.save();

    res.json({
      success: true,
      message: "Item updated",
      cart
    });

  } catch (error) {
    console.error("UPDATE ITEM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE ITEM
export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    
    cart.items.pull(id);
    await cart.save();

    console.log(`✅ Removed item ${id} from cart`);

    res.json({
      success: true,
      message: "Item removed",
      cart
    });

  } catch (error) {
    console.error("DELETE ITEM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ CLEAR CART
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.findOneAndDelete({ userId });

    console.log(`✅ Cart cleared for user ${userId}`);

    res.json({
      success: true,
      message: "Cart cleared"
    });

  } catch (error) {
    console.error("CLEAR CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};