# Portfolio Website

A full-stack Portfolio Website that allows users to create and showcase their personal portfolios. Users can enter their personal information, education, skills, achievements, hobbies and projects, and view the information in an elegant portfolio layout.

The website features an Antique Art Gallery-inspired design with a sophisticated colour palette, responsive layouts and dark mode.

## Features

- **Home Page:** Welcoming landing page with navigation to portfolio creation and feedback.
- **Create Portfolio:** Form to enter personal details, contact information, education, skills, achievements, hobbies and projects.
- **Dynamic Portfolio Generation:** Automatically displays the submitted information in a structured portfolio.
- **Profile Image:** Allows users to upload and preview a profile image.
- **Repeatable Fields:** Users can add multiple education entries, skills, achievements, hobbies and projects.
- **Dark Mode:** Toggle between light and dark themes.
- **Feedback System:** Users can submit a rating and comments.
- **MongoDB Integration:** Stores portfolio information and feedback in separate database collections.
- **Responsive Design:** Provides a user-friendly experience across different screen sizes.

## Pages

1. **Home Page (`index.html`)** – Introduction and navigation.
2. **Create Portfolio (`create.html`)** – Form for entering portfolio information.
3. **Generated Portfolio (`portfolio.html`)** – Displays the submitted portfolio.
4. **Feedback Page (`feedback.html`)** – Collects user ratings and feedback.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive design |
| JavaScript | Dynamic functionality and interactions |
| Node.js | Backend runtime |
| Express.js | Server and API development |
| MongoDB Atlas | Cloud database |
| Mongoose | Database modelling and interaction |
| Multer | File-upload dependency |

## Project Structure

```text
portfolio/
│
├── public/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── create.js
│   │   ├── portfolio.js
│   │   └── feedback.js
│   │
│   ├── uploads/
│   ├── index.html
│   ├── create.html
│   ├── portfolio.html
│   └── feedback.html
│
├── models/
│   ├── Portfolio.js
│   └── Feedback.js
│
├── server.js
├── package.json
├── package-lock.json
├── .env
└── .gitignore
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Irinmariyaa/portfolio-generator.git
```

### 2. Navigate to the Project Folder

```bash
cd portfolio-generator
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root project folder and add your MongoDB Atlas connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

Replace the placeholder with your own MongoDB connection string.

### 5. Start the Server

```bash
npm run dev
```

Alternatively:

```bash
node server.js
```

### 6. Open the Website

Visit:

```text
http://localhost:3000
```

## Database Collections

The application uses MongoDB Atlas to store information.

- **portfolios:** Stores users' portfolio details.
- **feedbacks:** Stores submitted ratings and comments.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/status` | Checks server status |
| POST | `/api/portfolios` | Saves a new portfolio |
| GET | `/api/portfolios/:id` | Retrieves a portfolio |
| POST | `/api/feedback` | Saves user feedback |

## Design

The website follows an Antique Art Gallery-inspired visual theme, featuring:

- Porcelain ivory backgrounds
- Muted blue-green and eucalyptus accents
- Antique bronze details
- Deep teal typography
- Elegant serif headings
- Subtle borders and decorative elements
- Light and dark viewing modes

## Security

- MongoDB connection details are stored in environment variables.
- `.env` and `node_modules` are excluded using `.gitignore`.
- Database credentials should never be uploaded to GitHub.

## Project Purpose

This project was developed as part of a first-semester web development mini-project to demonstrate the practical application of frontend development, backend programming, database integration and full-stack web development.

---

**Developed by:** Irin Mariya Santhosh

**Project:** Portfolio Website
