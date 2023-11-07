FROM python:3.9

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY requirements-prod.txt .
RUN pip install --no-cache-dir -r requirements-prod.txt
COPY . .

EXPOSE 8000

RUN curl https://ollama.ai/install.sh | sh

# Create entrypoint to serve llama2 using ollama in backend
RUN echo "#!/bin/sh" >> entrypoint.sh
RUN echo "ollama serve &" >> entrypoint.sh
RUN echo "ollama run llama2 &" >> entrypoint.sh
RUN echo "uvicorn src.main:app --host 0.0.0.0 --port 8000" >> entrypoint.sh

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
