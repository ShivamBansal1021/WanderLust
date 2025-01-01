# WanderLust

WanderLust is a Node.js-based web application for managing and browsing listings. This includes travel destinations and accommodations. The application leverages modern web technologies for seamless user experiences.

## Features
- User authentication and session management using Passport.js.
- Dynamic listing creation and editing with data validation.
- Cloudinary integration for image hosting.
- MongoDB as the database for storing application data.
- EJS templating for server-side rendering.
- Flash messages for user feedback.

## Access the Website
You can access the hosted version of WanderLust at:
[WanderLust Website](https://wanderlust-h3bi.onrender.com/listings)

## Folder Structure
- **`index.js`**: Application entry point.
- **`controllers`**: Handles application logic for different routes.
- **`routes`**: Defines API endpoints.
- **`models`**: Database schemas and models.
- **`views`**: EJS templates for rendering pages.
- **`public`**: Static files (CSS, JS, images).
- **`utils`**: Utility functions.
- **`middleware.js`**: Middleware definitions.

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Cloudinary
- Passport.js
- EJS

## Prerequisites (For Local Setup)
Ensure you have the following installed (if running locally):
- Node.js (version 20.14.0)

## Installation (For Local Setup)
1. Clone the repository:
   ```bash
   git clone https://github.com/ShivamBansal1021/WanderLust.git
   ```
2. Navigate to the project directory:
   ```bash
   cd WanderLust
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Setup (For Local Setup)
1. Create a `.env` file in the project root with the following variables:
   ```env
   ATLASDB_URL=<your-mongoAtlas-url>
   CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUD_API_KEY=<your-cloudinary-api-key>
   CLOUD_API_SECRET=<your-cloudinary-api-secret>
   SECRET=<your-session-secret>
   ```
2. Run the application:
   ```bash
   node index.js
   ```
   

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.


## Author
Shivam Bansal

