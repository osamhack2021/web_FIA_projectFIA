FROM python:3.8
ENV PYTHONBUFFERED 1
WORKDIR /usr/src/app
COPY . .
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
WORKDIR ./api_server
CMD ["python", "manage.py", "runserver", "0:8000"]
EXPOSE 443
