# Landmark Tracker

A web application for tracking landmarks, creating visiting plans, and managing visited landmarks.

## Features

- Add, edit, and delete landmarks.
- Mark landmarks as visited or not visited.
- Create visiting plans with selected landmarks.
- View and manage visiting plans.
- Interactive map for selecting landmark locations.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ceng3502-midterm-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   - For production:
     ```bash
     npm start
     ```
   - For development (with live reload):
     ```bash
     npm run dev
     ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### Landmarks
- `GET /api/landmarks`: Retrieve all landmarks.
- `POST /api/landmarks`: Add a new landmark.
- `PUT /api/landmarks/:id`: Update a landmark.
- `DELETE /api/landmarks/:id`: Delete a landmark.

### Visited Landmarks
- `GET /api/visited`: Retrieve all visited landmarks.
- `PUT /api/visited/:id`: Update a visited landmark.
- `DELETE /api/visited/:id`: Delete a visited landmark.

### Visiting Plans
- `GET /api/visiting-plans`: Retrieve all visiting plans.
- `POST /api/visiting-plans`: Create a new visiting plan.
- `DELETE /api/visiting-plans/:id`: Delete a visiting plan.

## Project Structure

```
ceng3502-midterm-project/
├── src/
│   ├── models/
│   │   └── storage.js       # In-memory storage for landmarks and visited landmarks
│   ├── routes/
│   │   ├── landmarks.js     # Routes for managing landmarks
│   │   ├── visited.js       # Routes for managing visited landmarks
│   │   └── visitingPlans.js # Routes for managing visiting plans
│   ├── public/
│   │   └── index.html       # Frontend HTML file
│   └── server.js            # Main server file
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

## Development Notes

- The project uses an in-memory storage system (`storage.js`). For production, consider integrating a database like MongoDB or PostgreSQL.
- The frontend is served from the `public` directory.
- The interactive map uses [Leaflet.js](https://leafletjs.com/).

## License

This project is licensed under the MIT License.
