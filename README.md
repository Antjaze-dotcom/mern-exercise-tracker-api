# MERN Exersize Tracker (REST API + React UI)

A full-stack MERN application that lets users create, view, update, and delete exercise logs.
This project demonstrates a RESTful API built with Node/Express + MongoDB (Mongoose) and a REACT frontend that consumes the API.

## Features

- Creates a new exersize entry
- View all exersizes
- Edit an existing exersize
- Delete an exersize
- REST API with CRUD endpoints
- React UI with client-side routing

## Teach Stack

**Frontend:** React, Vite, React Router
**Backend:** Node.js, Express
**Database:** MongoDB, Mongoose

## API Endpoints

Base URL (local): `http://localhost:3000`

| Method |      Route       | Description |
|--------|------------------|-------------|
| GET    | `/exercises`     | Get all exercises |
| GET    | `/exercises/:id` | Get one exercise by id |
| POST   | `/exercises`     | Create an exercise |
| PUT    | `/exercises/:id` | Update an exercise |
| DELETE | `/exercises/:id` | Delete an exercise |

### Example Request Body (POST / PUT)

```json
{
  "name": "Bench Press",
  "reps": 8,
  "weight": 185,
  "unit": "lbs",
  "date": "2026-02-25"
}
