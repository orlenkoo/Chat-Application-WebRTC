echo "Stopping docker compose..."
docker-compose down

echo "Setup env..."
cp .env backend/.env
cp .env frontend/.env

echo "Starting up..."
docker-compose up -d
