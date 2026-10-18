# Test2yc — GitHub Pages + MySQL AJAX Starter

Full-stack starter with a static GitHub Pages frontend, REST/AJAX API, and MySQL database.

## Architecture

GitHub Pages → HTTPS Fetch/AJAX → Node.js/Express API → MySQL 8

## Development

1. Copy `backend/.env.example` to `backend/.env`.
2. Install backend dependencies: `cd backend && npm install`.
3. Start MySQL with `docker compose -f docker-compose.mysql.yml up -d mysql`.
4. Initialize the schema from `database/mysql/schema.sql`.
5. Start the API: `npm start` from `backend/`.
6. Open `docs/index.html` or deploy `docs/` with GitHub Pages.

Never put MySQL credentials in the GitHub Pages frontend.
