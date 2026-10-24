# Portfolio Generator

A web-based portfolio generator built using HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

## About the Project

This project allows users to enter their personal and professional details and generate a portfolio webpage. Users can edit their details and submit feedback.

## Features

- Create a portfolio using a form
- Display generated portfolio details
- Edit details without entering everything again
- Dark mode across the generator pages
- Feedback form
- Store feedback in MongoDB
- Contact form in the personal portfolio page

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB

## Project Files

- `create.html` — Portfolio creation form
- `portfolio.html` — Generated portfolio page
- `feedback.html` — Feedback form
- `index.html` — Personal portfolio page
- `style.css` — Styling
- `script.js` — Client-side JavaScript
- `server.js` — Node.js server and API routes

## How to Run Locally

1. Install Node.js.
2. Clone or download this repository.
3. Open the project folder in a terminal.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Create a `.env` file with your MongoDB connection settings. Never upload this file to GitHub.
6. Start the server using the command configured in `package.json`, for example:

   ```bash
   node server.js
   ```

7. Open `http://localhost:3000` in your browser.

## Security Note

Keep database credentials and other secrets in your local `.env` file. Do not commit secrets to GitHub.

## Author

Irin Mariya
