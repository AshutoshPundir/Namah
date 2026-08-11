# 🚀 Namah - Chat Application Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

Namah is a one-to-one chat application built with **Node.js**, **Express.js**, and **MongoDB**. This repository contains the backend APIs for authentication, friend management, conversations, and messaging.

##  Features

-  JWT Authentication
-  User Registration & Login
-  Friend Requests
  - Send
  - Accept
  - Reject
  - Cancel
-  Friends List
-  One-to-One Conversations
-  Send & Retrieve Messages

##  Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

##  Folder Structure

```
src/
├── controllers/
├── middleware/
├── models/
├── routes/
└── server.js
```

##  Run Locally

```bash
git clone <repo-url>

npm install

npm run dev
```

Create a `.env` file:

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

##  Next Steps

- Socket.IO
- React Frontend
- Image Sharing
- Group Chats

---

Built by **Ashutosh** 