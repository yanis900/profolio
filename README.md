## Profolio
Profolio is a full-stack MERN application that provides a platform for developers to create and showcase their project portfolios.

## Structure
This repo contains two applications:

A frontend React App (built with Vite)

A backend API server (using Node.js, Express, and MongoDB)

These two applications communicate through HTTP requests and need to be run separately.

## Project Structure

```
ProFolioSept2025/
├── profolio/
│   ├── api/                    # Backend API
│   │   ├── lib/
│   │   │   └── token.js       # JWT token generation
│   │   ├── models/            # MongoDB models
│   │   ├── routes/            # API routes
│   │   └── controllers/       # Route controllers
│   │
│   └── frontend/              # React frontend
│       ├── src/
│       │   ├── components/    # Reusable components
│       │   │   ├── ui/       # shadcn/ui components
│       │   │   ├── BackButton.jsx
│       │   │   ├── EditUserButton.jsx
│       │   │   ├── PublicNavbar.jsx
│       │   │   ├── SearchForm.jsx
│       │   │   ├── UserSearchResults.jsx
│       │   │   ├── ProjectSearchResults.jsx
│       │   │   └── ...
│       │   │
│       │   ├── pages/        # Page components
│       │   │   ├── Login/
│       │   │   ├── Signup/
│       │   │   ├── Search/
│       │   │   ├── Portfolio/
│       │   │   └── Home/
│       │   │
│       │   ├── services/     # API service functions
│       │   ├── index.css     # Global styles & CSS variables
│       │   └── main.jsx      # App entry point
│       │
│       └── package.json
│
└── README.md
```

## Documentation

## Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                   (http://localhost:5173)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │ (JWT Token in Headers)
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (Vite)                        │
│  ┌────────────────┐  ┌───────────────┐  ┌─────────────────────┐ │
│  │    Pages       │  │  Components   │  │   Services Layer    │ │
│  │                │  │               │  │                     │ │
│  │ • Login        │  │ • PublicNav   │  │ • user.js           │ │
│  │ • Signup       │  │ • BackButton  │  │ • projects.js       │ │
│  │ • Search       │  │ • UserView    │  │ • authentication.js │ │
│  │ • Portfolio    │  │ • Projects    │  │                     │ │
│  │ • Home         │  │ • Forms       │  │ (API calls)         │ │
│  └────────────────┘  └───────────────┘  └─────────────────────┘ │
│                                                                 │
│  Styling: Tailwind CSS + shadcn/ui + Bauhaus Color Scheme       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ REST API Calls
                             │ (JSON payloads)
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              EXPRESS.JS API SERVER (Port 3000)                  │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  MIDDLEWARE LAYER                          │ │
│  │  • CORS Handler  • Body Parser  • Token Checker            │ │
│  │  • User Agent Detection  • Error Handlers                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │                                   │
│  ┌──────────────────────────┼─────────────────────────────────┐ │
│  │         ROUTES           │                                 │ │
│  │  /tokens ────────────────┤                                 │ │
│  │  /users ─────────────────┤                                 │ │
│  │  /projects ──────────────┤                                 │ │
│  │  /upload ────────────────┤                                 │ │
│  │  /analytics ─────────────┤                                 │ │
│  └──────────────────────────┼─────────────────────────────────┘ │
│                             │                                   │
│                             ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    CONTROLLERS                             │ │
│  │  • AuthenticationController  • UsersController             │ │
│  │  • ProjectsController  • UploadController                  │ │
│  │  • AnalyticsController                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │                                   │
│                             ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   MONGOOSE MODELS                          │ │
│  │  • User  • Project  • Analytics                            │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Database Queries
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MONGODB DATABASE                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐ │
│  │   users         │  │   projects      │  │    analytics.    │ │
│  │  collection     │  │  collection     │  │    collection    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                             │
                             │ File Storage
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AWS S3 STORAGE                             │
│  • Profile Images  • CVs/Resumes  • Project Thumbnails          │
└─────────────────────────────────────────────────────────────────┘
```
## Data Flow
1. **User Request** → Frontend sends HTTP request to backend API
2. **Authentication** → JWT token validated by middleware
3. **Routing** → Express routes request to appropriate controller
4. **Business Logic** → Controller processes request, interacts with models
5. **Database** → Mongoose queries MongoDB
6. **Response** → JSON data sent back to frontend
7. **UI Update** → React components re-render with new data

## API Endpoints
**Base URL:** `http://localhost:3000`
**Authentication:** Most endpoints require JWT token in header: `Authorization: Bearer <token>`

## Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` |`/tokens` | Login user  | No.           |

## Users
| Method | Endpoint                     | Description                 | Auth Required |
|--------|------------------------------|-----------------------------|---------------|
| `POST` | `/users`                     | Register new user           | No            |
| `GET`  | `/users`                     | Get current user profile    | Yes           |
| `GET`  | `/users/email?email=<email>` | Get user by email           | No            |
| `GET`  | `/users/portfolio/:slug`     | Get user by portfolio slug  | No            |
| `PUT`  | `/users/edit`                | Update user profile         | Yes           |
| `PUT`  | `/users/visibility`          | Toggle profile visibility   | Yes           |
| `GET`  | `/users/search?name=<name>`  | Search users by name        | No            |
| `GET`  | `/users/badge/:slug`         | Get user achievement badges | No            |
| `POST` | `/users/email/:slug`         | Send email to user          | No            |

## Projects
| Method   | Endpoint                       | Description             | Auth Required |
|----------|--------------------------------|-------------------------|---------------|
| `PUT`    | `/projects/new`                | Create new project      | Yes           |
| `PUT`    | `/projects/edit/:id`           | Update project          | Yes           |
| `DELETE` | `/projects/delete-one/:id`     | Delete project          | Yes           |
| `GET`    | `/projects/search?tags=<tags>` | Search projects by tags | No            |

## Uploads (multipart/form-data)
| Method | Endpoint                | Description                    | Auth Required |
|--------|-------------------------|--------------------------------|---------------|
| `PUT`  | `/upload/profile-image` | Upload profile image to S3     | Yes           |
| `POST` | `/upload/cv`            | Upload CV to S3                | Yes           |
| `POST` | `/upload/thumbnail/:id` | Upload project thumbnail to S3 | Yes           |

## Analytics
| Method | Endpoint                 | Description           | Auth Required |
|--------|--------------------------|-----------------------|---------------|
| `PUT`  | `/analytics/view/:slug`  | Record portfolio view | Yes           |
| `GET`  | `/analytics/view/:slug`  | Get view statistics   | Yes           |
| `PUT`  | `/analytics/email/:slug` | Record email sent     | Yes           |
| `GET`  | `/analytics/email/:slug` | Get email statistics  | Yes           |

## Common Response Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Key Features
# Authentication
- JWT-based authentication with 365-day token expiration (suitable for development)
- Secure password hashing with bcrypt
- Token stored in localStorage
# User Profiles
- Customizable profile information (name, bio, job title, location)
- Profile picture support
- Social links (LinkedIn, GitHub, personal website)
- "Open to work" status indicator
# Projects
- Add, edit, and delete projects
- Project states: In Progress, Completed, Archived
- Tag-based categorisation
- GitHub repository links
- Project descriptions and tech stack listings
# Search Functionality
- Search users by name
- Search projects by tags
- Real-time search results
# Portfolio View
- Tabbed interface for Portfolio and Analytics
- Projects grid layout
- Profile statistics visualisation
- GitHub contribution integration

## Tech Stack
# Frontend
- **React** - UI framework
- **React Router** - Client-side routing
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library built on Radix UI
- **Lucide React** - Icon library

# Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication (365-day token expiration)
- **bcrypt** - Password hashing

## Quickstart
## Install Node.js
If you haven't already, make sure you have node and NVM installed.

1. Install Node Version Manager (NVM)
```
Bash:

brew install nvm
Then follow the instructions to update your ~/.zshrc.
```

2. Open a new terminal

3. Install the latest version of Node.js, (20.5.0 at time of writing).
```
Bash:

nvm install 20
```

## Set up your project
1. Have one team member fork this repository

2. Rename the fork to profolio-<team name>

3. Every team member clone the fork to their local machine

4. Install dependencies for both the frontend and api applications:
```
Bash:

cd frontend
npm install
cd ../api
npm install
```

5. Install an ESLint plugin for your editor, for example ESLint for VSCode

6. Install MongoDB
```
Bash:

brew tap mongodb/brew
brew install mongodb-community@6.0
```

* Note: If you see a message that says If you need to have mongodb-community@6.0 first in your PATH, run:, follow the instruction. Restart your terminal after this.

7. Start MongoDB
```
Bash:

brew services start mongodb-community@6.0
```

## Setting up environment variables
We need to create two .env files, one in the frontend and one in the api.

## Frontend
Create a file frontend/.env with the following contents:

VITE_BACKEND_URL="http://localhost:3000"

## Backend
Create a file api/.env with the following contents:

MONGODB_URL="mongodb://0.0.0.0/profolio"
NODE_ENV="development"
JWT_SECRET="secret"

* Note: The MONGODB_URL now points to a database named profolio.

## How to run the server and use the app
1. Start the server application (in the api directory) in dev mode:
```
Bash:

cd api
npm run dev
```

2. Start the front end application (in the frontend directory)

In a new terminal session...
```
Bash

cd frontend
npm run dev
```

You should now be able to open your browser and go to http://localhost:5173/signup to create a new user.

Then, after signing up, you should be able to log in by going to http://localhost:5173/login.

After logging in, you can begin to add, view, and manage your portfolio projects via the application.
