# ThePERCH 🏠

A modern property listing and review platform built with Node.js and Express.

## 🚧 Project Status
**This project is currently under development.** Features are being actively added and improved.

## 📖 Overview
ThePERCH is a web application that allows users to browse property listings and leave reviews. The platform provides a seamless experience for discovering and evaluating rental properties.

## ✨ Current Features
- **Property Listings**: Browse and view detailed property information
- **CRUD Operations**: Create, read, update, and delete listings
- **Review System**: Users can add and delete reviews for properties
- **Session Management**: User sessions with flash messaging
- **Responsive Design**: Bootstrap 5 powered UI
- **Data Validation**: Server-side validation using Joi
- **Error Handling**: Comprehensive error management

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating, Bootstrap 5
- **Session Management**: express-session, connect-flash
- **Validation**: Joi schema validation
- **Styling**: Custom CSS with Bootstrap components

## 📁 Project Structure
```
ThePERCH/
├── Routes/           # Express route handlers
├── models/           # Mongoose schemas
├── views/            # EJS templates
├── public/           # Static assets (CSS, JS)
├── utils/            # Utility functions
├── init/             # Database initialization
└── app.js            # Main application file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Niraj-There/The-PERCH.git
   cd The-PERCH
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB service on your local machine

4. Initialize the database (optional):
   ```bash
   node init/index.js
   ```

5. Start the development server:
   ```bash
   node app.js
   ```

6. Open your browser and navigate to `http://localhost:8080`

## 🔧 Configuration
- MongoDB connection: `mongodb://127.0.0.1:27017/THEPERCH`
- Default port: `8080`
- Session settings: 7-day cookie expiration

## 📋 Planned Features
- [ ] User authentication and authorization
- [ ] Image upload functionality
- [ ] Advanced search and filtering
- [ ] User profiles and dashboards
- [ ] Email notifications
- [ ] Payment integration
- [ ] Mobile app companion

## 🤝 Contributing
This project is currently in development. Contributions, suggestions, and feedback are welcome!

## 📄 License
This project is currently private and under development.

## 👨‍💻 Developer
**Niraj There**
- GitHub: [@Niraj-There](https://github.com/Niraj-There)

---

⚠️ **Note**: This is a work-in-progress project. Some features may be incomplete or subject to change.