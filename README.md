# Task Manager API
A RESTful API for managing tasks built with Node.js and Express.

## Features
- CRUD operations for tasks
- In-memory data storage
- Status filtering
- Pagination support
- Modern ES6+ JavaScript
- Comprehensive error handling
- Request logging middleware

## Task Entity
Each task has the following properties:
- `id` (UUID) - Unique identifier
- `title` (string) - Task title (required)
- `description` (string) - Task description (optional)
- `status` (enum) - One of: "pending", "in-progress", "completed"
- `createdAt` (timestamp) - Creation timestamp
- `updatedAt` (timestamp) - Last update timestamp

## API Endpoints

### Get All Tasks
```
GET /api/tasks
```
Query parameters:
- `status` - Filter by status (pending, in-progress, completed)
- `page` - Page number for pagination (default: 1)
- `limit` - Number of items per page (default: 10)

Example: `GET /api/tasks?status=completed&page=1&limit=5`

### Get Task by ID
```
GET /api/tasks/:id
```

### Create New Task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task manager API",
  "status": "pending"
}
```

### Update Task
```
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress"
}
```

### Delete Task
```
DELETE /api/tasks/:id
```

## Installation & Setup

1. **Prerequisites**: Ensure you have Node.js installed

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the server**:
   ```bash
   # Production mode
   npm start
   
   # Development mode with auto-restart
   npm run dev
   ```

4. **Server will start on**: `http://localhost:3000`

## Project Structure

```
task-manager-api/
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── logger.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── services/
│   │   └── taskService.js
│   ├── utils/
│   │   └── validation.js
│   └── server.js
├── .gitignore
├── .env
├── package.json
└── README.md
```

## Example Usage

### Create a task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Complete Node.js tutorial", "status": "pending"}'
```

### List all tasks
```bash
curl http://localhost:3000/api/tasks
```

### Filter completed tasks with pagination
```bash
curl "http://localhost:3000/api/tasks?status=completed&page=1&limit=5"
```

### Update a task
```bash
curl -X PUT http://localhost:3000/api/tasks/{task-id} \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### Delete a task
```bash
curl -X DELETE http://localhost:3000/api/tasks/{task-id}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Error Response Format

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```
## Conclusion
The API includes sample data and comprehensive logging so you can immediately test all endpoints. This README provides detailed usage examples with curl commands for testing each endpoint.
The code is production-ready with proper error handling, validation, and follows REST API design principles throughout.

## Future Improvements
- Implement user route and authentication.
- Connect to a database for persistent storage.
- Generate API docs using Swagger UI
- Deploy the API to Render, Railway, Heroku or AWS

## Author
Ameh Mathias Ejeh [LinkedIn](https://www.linkedin.com/in/ameh-mathias-ejeh-7444042b4) • [GitHub](https://github.com/ameh0429
)