// websocket.js
import { WebSocketServer } from 'ws';

let wss = null;

export const setupWebSocketServer = (server) => {
  console.log('Creating WebSocket server...');
  
  // Create WebSocket server - let it handle upgrades automatically
  wss = new WebSocketServer({ 
    server,
    // Don't handle upgrades manually
    noServer: false
  });
  
  wss.on('connection', (ws, req) => {
    console.log('✅ New WebSocket connection established');
    
    // Get orderId from URL query parameters
    const url = new URL(req.url, `http://${req.headers.host}`);
    const orderId = url.searchParams.get('orderId');
    
    console.log('Connection URL:', req.url);
    console.log('Order ID from query:', orderId);
    
    if (orderId) {
      ws.orderId = orderId;
      console.log(`✅ WebSocket connected for order: ${orderId}`);
      
      // Send initial connection confirmation
      const connectMsg = JSON.stringify({
        type: 'CONNECTED',
        orderId: orderId,
        message: 'Connected to real-time updates',
        timestamp: new Date().toISOString()
      });
      ws.send(connectMsg);
      console.log('Sent connection confirmation');
    } else {
      console.log('⚠️ No orderId provided in WebSocket connection');
      ws.close();
      return;
    }
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        console.log('WebSocket message received:', data);
        
        if (data.type === 'SUBSCRIBE' && data.orderId) {
          ws.orderId = data.orderId;
          console.log(`📡 Client subscribed to order: ${data.orderId}`);
          
          // Send subscription confirmation
          ws.send(JSON.stringify({
            type: 'SUBSCRIBED',
            orderId: data.orderId,
            message: 'Successfully subscribed to order updates'
          }));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('WebSocket disconnected for order:', ws.orderId);
    });
    
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });
  
  console.log('✅ WebSocket server setup complete');
  return wss;
};

// Function to broadcast order status updates
export const broadcastOrderUpdate = (orderId, newStatus) => {
  console.log(`📢 broadcastOrderUpdate called for order: ${orderId}, status: ${newStatus}`);
  
  if (!wss) {
    console.log('❌ WebSocket server not initialized');
    return;
  }
  
  console.log('Connected clients count:', wss.clients.size);
  
  const message = JSON.stringify({
    type: 'ORDER_STATUS_UPDATED',
    orderId: orderId,
    status: newStatus,
    timestamp: new Date().toISOString()
  });
  
  let clientsNotified = 0;
  
  wss.clients.forEach((client) => {
    if (client.orderId === orderId && client.readyState === WebSocket.OPEN) {
      client.send(message);
      clientsNotified++;
      console.log(`✅ Sent update to client for order: ${orderId}`);
    }
  });
  
  console.log(`📡 Broadcasted order update to ${clientsNotified} clients for order: ${orderId}`);
};