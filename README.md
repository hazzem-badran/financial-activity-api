# Financial Activity App - Backend

A Node.js backend API for managing financial activities and future purchases tracking.

## 🚀 Features

- **Financial Activities Management**: Track income and expenses with categories
- **Future Purchases Planning**: Plan and manage future purchases
- **User-based Data**: Organize data by user ID
- **Real-time Database**: Using NeonDB for reliable data storage
- **Rate Limiting**: Built-in rate limiting with Upstash Redis
- **RESTful API**: Clean and organized API endpoints

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: NeonDB (PostgreSQL)
- **ORM**: Native SQL queries with @neondatabase/serverless
- **Cache/Rate Limiting**: Upstash Redis
- **Environment**: dotenv for configuration
- **Development**: nodemon for hot reloading

## 📦 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd financial-activity-app/backend
```

2. Install dependencies
```bash
npm install
```

3. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=5001
DATABASE_URL=your_neon_database_url
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

4. Start the development server
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── server.js              # Main server file
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── activitiesControllers.js     # Activities business logic
│   └── futurePurchasesControllers.js # Future purchases logic
├── middleware/            # Custom middleware
└── routes/
    ├── activitiesRoute.js          # Activities routes
    └── futurePurchasesRoute.js     # Future purchases routes
```

## 🔌 API Endpoints

### Activities Endpoints

#### Get User Summary
```http
GET /api/activities/summary/:userId
```
Returns financial summary for a specific user.

#### Get User Activities
```http
GET /api/activities/:userId
```
Returns all activities for a specific user, ordered by creation date.

#### Create Activity
```http
POST /api/activities
Content-Type: application/json

{
  "user_id": "string",
  "title": "string",
  "amount": "number",
  "category": "string",
  "type": "income|expense"
}
```

#### Delete Activity
```http
DELETE /api/activities/:id
```

### Future Purchases Endpoints

#### Get User Future Purchases
```http
GET /api/future-purchases/:userId
```
Returns all future purchases for a specific user.

#### Create Future Purchase
```http
POST /api/future-purchases
Content-Type: application/json

{
  "user_id": "string",
  "title": "string",
  "category": "string"
}
```

#### Delete Future Purchase
```http
DELETE /api/future-purchases/:id
```

## 📊 Database Schema

### Activities Table
```sql
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Future Purchases Table
```sql
CREATE TABLE future_purchases (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚦 Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🔒 Security Features

- Rate limiting implemented with Upstash Redis
- Environment variables for sensitive data
- Input validation and error handling
- CORS enabled for cross-origin requests

## 📝 Development Notes

- Uses ES6 modules (`"type": "module"` in package.json)
- Async/await pattern for database operations
- Proper error handling with try-catch blocks
- Consistent API response format
- Descriptive error messages and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

<!-- This project is licensed under the ISC License. -->

## 🐛 Known Issues

- Function name typo in `getFuterePurchasesByUserId` (should be `getFuturePurchasesByUserId`)

## 🔧 Future Enhancements

- Add user authentication and authorization
- Implement data validation middleware
- Add comprehensive logging
- Create automated tests
- Add API documentation with Swagger
- Implement data backup strategies
- Add database migrations system
