# ThePERCH

A full-stack vacation rental marketplace platform where users can list properties, search listings, and leave reviews.

## Features

- User authentication (signup/login)
- Create, edit, and delete property listings
- Image upload with Cloudinary
- Interactive maps with location geocoding
- Search and filter listings
- Review and rating system
- Responsive design

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** EJS, Bootstrap 5
- **APIs:** Cloudinary (images), Mapbox (maps)
- **Authentication:** Passport.js

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

## Installation

1. Clone the repository
```bash
git clone https://github.com/Niraj-There/The-PERCH.git
cd The-PERCH
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file with required variables
```env
ATLAS_DB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_token
SECRET=your_session_secret
```

4. (Optional) Seed the database
```bash
node init/index.js
```

5. Run the application
```bash
node app.js
```

Access at `http://localhost:3000`

## Usage

- Visit `/signup` to create an account
- Login and click "Add your PERCH" to create a listing
- Browse listings on the home page
- Use the search bar to filter by location, country, or price
- Click on any listing to view details and leave a review

## Environment Setup

**Get API credentials:**
- MongoDB Atlas: [cloud.mongodb.com](https://cloud.mongodb.com)
- Cloudinary: [cloudinary.com/console](https://cloudinary.com/console)
- Mapbox: [account.mapbox.com](https://account.mapbox.com)

## Project Structure

```
├── Controllers/       # Route controllers
├── models/           # Database models
├── Routes/           # API routes
├── views/            # EJS templates
├── public/           # Static files
└── app.js            # Main application file
```

## License

ISC

## Author

Niraj There - [GitHub](https://github.com/Niraj-There)