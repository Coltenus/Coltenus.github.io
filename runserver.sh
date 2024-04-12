poetry install
poetry lock
poetry run python manage.py collectstatic --noinput
poetry run python manage.py runserver