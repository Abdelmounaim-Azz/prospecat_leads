FROM python

WORKDIR /app

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY src/ .

CMD ["python", "./Email_API.py"]