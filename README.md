instructions.

# Next.js + Node.js + PostgreSQL + Prisma + Apollo GraphQL Setup

This project is a full-stack application using Next.js for the front end and Node.js with Express and GraphQL for the back end, along with PostgreSQL as the database and Prisma as the ORM.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18 or later)
- PostgreSQL
- Git

## Getting Started

Follow these steps after cloning or downloading the repository:

### 1. Clone the Repository

```bash
git clone https://github.com/gedeonagmas/nearby-restaurant.git
cd nearby-restaurant
```

### 2. Set Up the Backend

#### 2.1. Navigate to the Backend Directory

```bash
cd restaurant-app-backend
```

#### 2.2. Install Dependencies

```bash
npm install
```

#### 2.3. Set Up Environment Variables

Create a `.env` file in the `server` directory. Use the following template and fill in your PostgreSQL connection details:

```env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/nearby"
PORT=4000
```

#### 2.4. Initialize the Database

Run the following command to create the database schema using Prisma:

```bash
npx prisma migrate dev --name init
```

#### 2.5. Seed the Database

To seed the database with initial data

Run the seed script:

```bash
node prisma/seed.js
```

#### 2.6. Start the Server

```bash
npm run dev
```

The server will start at [http://localhost:4000].

### 3. Set Up the Frontend

#### 3.1. Navigate to the Frontend Directory

```bash
cd ../restaurant-app-frontend
```

#### 3.2. Install Dependencies

```bash
npm install
```

#### 3.3. Start the Development Server

```bash
npm run dev
```

The frontend will start at [http://localhost:3000].

### 4. Accessing the Application

- Open your browser and go to [http://localhost:3000] to access the Next.js front end.
- The GraphQL API can be accessed at [http://localhost:4000/graphql].

### 5. Additional Commands

- **Run Tests**: You can run tests for the server using:

  ```bash
  npm test
  ```

- **Build the Frontend**: To build the production version of the Next.js app, run:
  ```bash
  npm run build
  ```

### 6. Troubleshooting

- Ensure that PostgreSQL is running and accessible.
- Make sure the connection string in the `.env` file is correct.
- If you face issues with Prisma migrations, check your database permissions and configurations.

### 7. License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

### Notes

- Replace `<repository-url>` and `<repository-name>` with your actual repository URL and name.
- Adjust the example seed data in `seed.js` according to your data model.
- Ensure the `prisma` directory and `seed.js` file are correctly set up in your project structure.
```
