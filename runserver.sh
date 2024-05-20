killall python
poetry install
poetry lock
poetry run python manage.py migrate
poetry run python manage.py runserver &
API_SERVER_PID=$!
cd pages
npm install
npm run dev
kill -9 $API_SERVER_PID