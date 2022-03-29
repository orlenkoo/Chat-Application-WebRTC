if [ -f .env ]; then
    # shellcheck disable=SC2046
    # shellcheck disable=SC2002
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

echo "Stopping docker compose..."
docker-compose down

echo "Setup env..."
cp .env backend/.env
cp .env frontend/.env

echo "Building images..."
docker image build backend -t "$APP_NAME"/backend
docker image build frontend -t "$APP_NAME"/frontend

echo "Starting up..."
docker-compose up -d
