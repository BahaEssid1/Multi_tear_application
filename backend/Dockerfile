############################
# STAGE 1 — BUILDER
############################
FROM python:3.11-alpine AS builder

# Prevent Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    build-base \
    libpq-dev \
    gcc \
    musl-dev \
    postgresql-dev

# Upgrade pip
RUN pip install --upgrade pip

# Copy only requirements first (better Docker cache)
COPY requirements.txt .

# Install dependencies into a custom directory
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Copy application source
COPY . .


############################
# STAGE 2 — PRODUCTION
############################
FROM python:3.11-alpine

WORKDIR /app

# Install runtime dependency only
RUN apk add --no-cache libpq wget

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy installed Python packages from builder
COPY --from=builder /install /usr/local

# Copy application source code
COPY --from=builder /app /app

# Define application port (DB vars will come from docker-compose)
ENV APP_PORT=8000

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 8000

# Healthcheck
# HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=40s \
#     CMD wget --no-verbose --tries=1 --spider http://localhost:${APP_PORT}/health || exit 1

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=5 \
    CMD wget --quiet --tries=1 --spider http://localhost:${APP_PORT}/health || exit 1
# Start application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]