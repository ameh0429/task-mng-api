const logger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  
  // Log the incoming request
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  
  // Log request body for POST/PUT requests
  if ((req.method === 'POST' || req.method === 'PUT') && req.body) {
    console.log(`[${timestamp}] Request Body:`, JSON.stringify(req.body, null, 2));
  }

  // Override res.json to log response
  const originalJson = res.json;
  res.json = function(data) {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    
    // Log error responses
    if (res.statusCode >= 400) {
      console.log(`[${timestamp}] Error Response:`, JSON.stringify(data, null, 2));
    }
    
    return originalJson.call(this, data);
  };

  // Override res.send to log response for non-JSON responses
  const originalSend = res.send;
  res.send = function(data) {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    return originalSend.call(this, data);
  };

  next();
};

export default logger;