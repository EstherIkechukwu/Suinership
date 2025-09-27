FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app


RUN apt-get update && apt-get install -y \
    libpq-dev gcc \
    && rm -rf /var/lib/apt/lists/*


COPY requirements.txt /app/


RUN pip install --upgrade pip && \
    pip install setuptools && \
    pip install -r requirements.txt


COPY . /app/

EXPOSE 8000

COPY start.sh /app/
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]