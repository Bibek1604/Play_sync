# Multiplayer Game Platform Backend - API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Table of Contents
1. [Authentication Module](#authentication-module)
2. [Category Module](#category-module)
3. [Game Module](#game-module)
4. [Chat Module](#chat-module)
5. [Leaderboard Module](#leaderboard-module)

---

## 🔐 Authentication Module

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

### Refresh Token
**POST** `/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "your_refresh_token"
}
```

### Logout
**POST** `/auth/logout`

**Request Body:**
```json
{
  "refreshToken": "your_refresh_token"
}
```

---

## 📁 Category Module

### Create Category (Admin Only)
**POST** `/categories`
- **Auth Required:** Yes
- **Admin Only:** Yes

**Request Body:**
```json
{
  "name": "Action Games",
  "type": "online",
  "image": "https://example.com/image.jpg",
  "description": "Fast-paced action games"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "category_id",
    "name": "Action Games",
    "type": "online",
    "image": "https://example.com/image.jpg",
    "description": "Fast-paced action games",
    "isActive": true,
    "createdBy": "admin_user_id",
    "createdAt": "2026-01-12T...",
    "updatedAt": "2026-01-12T..."
  }
}
```

### Get All Categories
**GET** `/categories`
- **Auth Required:** No

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "category_id",
      "name": "Action Games",
      "type": "online",
      "image": "https://example.com/image.jpg",
      "description": "Fast-paced action games",
      "isActive": true
    }
  ]
}
```

### Update Category (Admin Only)
**PUT** `/categories/:id`
- **Auth Required:** Yes
- **Admin Only:** Yes

**Request Body:**
```json
{
  "name": "Updated Name",
  "isActive": false
}
```

### Delete Category (Admin Only)
**DELETE** `/categories/:id`
- **Auth Required:** Yes
- **Admin Only:** Yes

---

## 🎮 Game Module

### Create Game (Admin Only)
**POST** `/games`
- **Auth Required:** Yes
- **Admin Only:** Yes

**Request Body:**
```json
{
  "name": "Battle Royale",
  "image": "https://example.com/game.jpg",
  "categoryId": "category_mongo_id",
  "gameType": "online",
  "gameMode": "multiplayer",
  "requiredPlayers": 10,
  "location": "global",
  "pricingType": "free",
  "price": 0
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "gameId": "GAME-abc12345",
    "name": "Battle Royale",
    "image": "https://example.com/game.jpg",
    "categoryId": "category_mongo_id",
    "gameType": "online",
    "gameMode": "multiplayer",
    "requiredPlayers": 10,
    "joinedPlayers": 0,
    "players": [],
    "location": "global",
    "pricingType": "free",
    "price": 0,
    "status": "open",
    "createdBy": "admin_user_id"
  }
}
```

### Get All Games
**GET** `/games`
- **Auth Required:** Yes

### Get Games by Category
**GET** `/games/category?categoryId=<category_id>`
- **Auth Required:** Yes

### Get Game by ID
**GET** `/games/:gameId`
- **Auth Required:** Yes

### Update Game (Admin Only)
**PUT** `/games/:gameId`
- **Auth Required:** Yes
- **Admin Only:** Yes

**Request Body:**
```json
{
  "name": "Updated Game Name",
  "status": "started"
}
```

### Delete Game (Admin Only)
**DELETE** `/games/:gameId`
- **Auth Required:** Yes
- **Admin Only:** Yes

### Join Game
**POST** `/games/:gameId/join`
- **Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "data": {
    "gameId": "GAME-abc12345",
    "joinedPlayers": 1,
    "status": "open",
    "players": ["user_id_1"]
  }
}
```

**Features:**
- Prevents duplicate joins
- Auto-updates status to "full" when requiredPlayers reached
- Transaction-safe operation

### Leave Game
**POST** `/games/:gameId/leave`
- **Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "data": {
    "gameId": "GAME-abc12345",
    "joinedPlayers": 0,
    "status": "open",
    "players": []
  }
}
```

**Features:**
- Auto-updates status to "open" if was "full"
- Transaction-safe operation

---

## 💬 Chat Module

### Send Message
**POST** `/chat/:gameId`
- **Auth Required:** Yes
- **Player Must Have Joined Game:** Yes

**Request Body:**
```json
{
  "message": "Hello everyone!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "message_id",
    "gameId": "GAME-abc12345",
    "senderId": "user_id",
    "message": "Hello everyone!",
    "createdAt": "2026-01-12T..."
  }
}
```

### Get Messages
**GET** `/chat/:gameId`
- **Auth Required:** Yes
- **Player Must Have Joined Game:** Yes

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "message_id",
      "gameId": "GAME-abc12345",
      "senderId": {
        "_id": "user_id",
        "fullName": "John Doe",
        "email": "john@example.com"
      },
      "message": "Hello everyone!",
      "createdAt": "2026-01-12T..."
    }
  ]
}
```

---

## 🏆 Leaderboard Module

### Get Top Players by Score
**GET** `/leaderboard/top?limit=10`
- **Auth Required:** No

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "leaderboard_id",
      "userId": {
        "_id": "user_id",
        "fullName": "John Doe",
        "email": "john@example.com"
      },
      "gamesPlayed": 50,
      "wins": 30,
      "losses": 20,
      "score": 450
    }
  ]
}
```

### Get Top Players by Wins
**GET** `/leaderboard/top/wins?limit=10`
- **Auth Required:** No

### Get My Stats
**GET** `/leaderboard/me`
- **Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "leaderboard_id",
    "userId": "user_id",
    "gamesPlayed": 25,
    "wins": 15,
    "losses": 10,
    "score": 250,
    "rank": 42
  }
}
```

### Get User Stats by ID
**GET** `/leaderboard/user/:userId`
- **Auth Required:** Yes

### Update Player Stats (Admin Only)
**POST** `/leaderboard/update`
- **Auth Required:** Yes
- **Admin Only:** Yes

**Request Body:**
```json
{
  "userId": "user_mongo_id",
  "didWin": true,
  "scoreChange": 15
}
```

---

## 🔒 Middleware & Security Features

### Authentication Middleware
- `auth` - Verifies JWT token and attaches user to request
- `adminOnly` - Restricts access to admin users only

### Game Middleware
- `gameExists` - Validates game exists before proceeding
- `playerJoined` - Ensures user has joined game (for chat/in-game actions)

### Validation
All endpoints have request validation using express-validator:
- Email format validation
- Password minimum length (6 characters)
- Required field validation
- MongoDB ObjectId validation
- Enum value validation

### Error Handling
Global error handler provides consistent error responses:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // validation errors if applicable
}
```

---

## 🎯 Game Status Flow

```
open → full → started → ended
  ↑      ↓
  └──────┘ (when player leaves)
```

- **open**: Game accepting players
- **full**: Required players reached
- **started**: Game in progress
- **ended**: Game completed

---

## 📊 Use Cases

### 1. User Registration & Login
1. Register: `POST /auth/register`
2. Login: `POST /auth/login` → Receive JWT token
3. Use token for all authenticated requests

### 2. Browse & Join Games
1. Get categories: `GET /categories`
2. Get games by category: `GET /games/category?categoryId=xxx`
3. Join game: `POST /games/:gameId/join`
4. Chat with players: `POST /chat/:gameId`
5. View leaderboard: `GET /leaderboard/top`

### 3. Admin: Create Game
1. Login as admin
2. Create category: `POST /categories`
3. Create game: `POST /games`
4. Monitor players joining
5. Update game status: `PUT /games/:gameId`

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   Create `.env` file:
   ```
   JWT_ACCESS_SECRET=your_access_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

3. **Run the server:**
   ```bash
   npm run dev
   ```

4. **Test API:**
   Use Postman, Thunder Client, or curl to test endpoints.

---

## ✅ Features Implemented

- ✅ User authentication (JWT-based)
- ✅ Role-based access control (user/admin)
- ✅ Category CRUD (admin-only)
- ✅ Game CRUD with dynamic status updates
- ✅ Transaction-safe join/leave operations
- ✅ Chat system (only for joined players)
- ✅ Leaderboard with player stats tracking
- ✅ Request validation on all endpoints
- ✅ Error handling and logging
- ✅ Modular, scalable architecture

---

## 🔧 Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** express-validator
- **Real-time:** Socket.io (prepared for WebSocket chat)

---

**Backend is ready for frontend integration!** 🎉
