# Blue Vending

A Unicorn company selling drinks.

## Setting up the project

### 1. Clone the repository

```bash

git clone https://github.com/Kantavit/vending-machine.git

cd  vending-machine

```

### 2. Frontend Setup

Navigate to the `vending-machine` directory to set up the Next.js application.

```bash

cd vending-machine

pnpm install

cd ..

```

### 3. Backend Setup

Navigate to the `vending-machine-api` directory to set up the FastAPI application.

```bash

cd vending-machine-api

python3 -m  venv  .venv

source .venv/bin/activate

pip install -r  requirements.txt

cd ..

```

### 4. Environment Variables Setup

Before running Docker, you need to set up three environment configuration files.

#### Step 1: Database Setup (Frontend)

Create a file named `.env` in the `vending-machine` directory with the following content:

```env

DATABASE_URL="mysql://{username}:{password}@localhost:3306/vending-machine-db"

DATABASE_USER=user
DATABASE_PASSWORD=password
DATABASE_NAME=vending-machine-db
DATABASE_HOST=database
DATABASE_PORT=3306

```

#### Step 2: Next.js Setup

Copy the example file to `.env.development.local` in the `vending-machine` directory:

```bash

cp vending-machine/.env.example vending-machine/.env.development.local

```

Fill in the `NEXT_PUBLIC_API_URL` (e.g., `http://localhost:8000`).

#### Step 3: FastAPI Setup

Copy the example file to `.env.development.local` in the `vending-machine-api` directory:

```bash

cp vending-machine-api/.env.example vending-machine-api/.env.development.local

```

Fill in the database and redis credentials as per the example in the file.

### 5. Running the Application

From the root project directory, run the following command to start the services with Docker:

```bash

docker compose up -d

```

### 6. Database Seeding

After deploying the Docker containers, you need to seed the database with initial data.

```bash

cd vending-machine

npx prisma db seed

cd ..

```

### 7. Accessing the Application

- **Next.js App**: http://localhost:3000

- **FastAPI Docs**: http://localhost:8000/docs

## Unit Testing with Jest

We test for page loading and component loading to ensure the application works as expected.

To run the tests:

```bash

cd vending-machine

pnpm test

```
