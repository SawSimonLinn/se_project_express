# WTWR (What to Wear?): Back End

A robust back-end server built with Express.js for the WTWR application, providing RESTful API endpoints and handling server-side logic efficiently.

![WTWR Backend Architecture](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*3E4w7rCe3eaz6gLlZoe6nQ.png)

## Description

This project serves as the back-end for the WTWR (What to Wear?) application, managing user data, clothing items, and authentication processes. It ensures seamless communication between the front-end interface and the database, delivering a smooth user experience.

## Features

- **User Management:** Handle user registration, login, and profile management.
- **Clothing Item Management:** Add, edit, delete, and retrieve clothing items from the database.
- **Authentication & Authorization:** Secure routes using JWT tokens to ensure data privacy.
- **Error Handling:** Comprehensive error handling for robust application performance.

![API Request Flow](https://datasciencedojo.com/wp-content/uploads/Understanding-REST-API.png.webp)

## Live Demo

Experience the live application here: [WTWR Live Application](https://www.wtwrapp.jumpingcrab.com/)

## Demo Video

For a detailed walkthrough of the application's features, watch the demo video:

[![WTWR Demo Video](https://demirsondaj.com.tr/wp-content/uploads/demo/placeholder.svg)](https://example.com/demo-video.mp4)

## Deployment and System Requirements

To run this project locally, ensure you have the following:

- **Node.js:** Version 14.x or higher
- **npm:** Version 6.x or higher
- **Express.js:** Version 4.x or higher
- **MongoDB:** Version 4.x or higher

**Deployment Instructions:**

1. **Clone the repository:**

```bash
git clone https://github.com/SawSimonLinn/se_project_express.git
cd se_project_express
```

2. Install dependencies:

```bash
npm install
```

3.  Set up environment variables:

    Create a `.env` file in the root directory and add the following:

```bash
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:

```bash
npm start
```

For development with hot-reloading:

```bash
npm run dev
```

### Future Improvements

- Implement Caching: Use Redis to cache frequent database queries, enhancing performance.
- Rate Limiting: Introduce rate limiting using middleware to prevent abuse and ensure fair usage.
- API Documentation: Create comprehensive API documentation using Swagger to assist developers in integrating with the back-end services.
