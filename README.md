# Movie Ticket Booking Website

This project is a **Movie Ticket Booking System** built using the MERN stack with React Vite and TypeScript. It includes features for both **users** and **admins**:

---

## Features

### **User Side (Client)**

- **Authentication**: Users can register and log in securely.
- **Movie Selection**: View available movies with details such as title, poster, rating, and cast.
- **Seat Selection**: Choose preferred seats for a selected movie.
- **Ticket Booking**: Book tickets for movies and receive confirmation.
- **Profile Management**: View and manage booked tickets in the user profile.

### **Admin Side (Admin)**

- **Movie Management**: 
  - Add new movies with details:
    - Title
    - Rating
    - Release Date
    - Poster Images
    - Cast and Crew (with photos and names)
- **Screen Management**: 
  - Create and manage screens or theatres.
- **Schedule Management**: 
  - Map movies to screens to create schedules for showtimes.

---

## Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

---

## Installation and Setup

### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

### **Repository Structure**
The repository is organized as follows:
```
project-root/
│
├── client/      # User-side frontend
├── admin/       # Admin-side frontend
└── server/      # Backend
```

---

### **Setup Instructions**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. **Install Dependencies**:
   - Navigate to each folder (`client`, `admin`, `server`) and run:
     ```bash
     npm install
     ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the `server` directory with the following variables:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     PORT=5000
     ```

4. **Run the Project**:
   - **Client**:
     ```bash
     cd client
     npm run dev
     ```
   - **Admin**:
     ```bash
     cd admin
     npm run dev
     ```
   - **Server**:
     ```bash
     cd server
     npm run start:dev
     ```

5. **Access the Application**:
   - **Client**: [http://localhost:3000](http://localhost:3000)
   - **Admin**: [http://localhost:3001](http://localhost:3001)
   - **Server API**: [http://localhost:5000](http://localhost:5000)

---

## Project Workflow

### **User Workflow**
1. Log in or register to the platform.
2. Browse through the list of available movies.
3. Select a movie, view details, and choose a seat.
4. Book tickets and view them in the profile section.

### **Admin Workflow**
1. Log in as an admin.
2. Add new movies with detailed information.
3. Create screens or theatres.
4. Map movies to screens and schedule showtimes.

---

## Scripts

| Command                 | Directory   | Description                            |
|-------------------------|-------------|----------------------------------------|
| `npm run dev`           | `client`    | Runs the user-side frontend.           |
| `npm run dev`           | `admin`     | Runs the admin-side frontend.          |
| `npm run start:dev`     | `server`    | Starts the backend server in dev mode. |

---

## Contribution

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Added feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or issues, feel free to reach out to the project maintainers.

