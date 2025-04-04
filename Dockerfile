# Use an official Node.js runtime as a parent image (Node 18 LTS is a good choice)
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# --- Install specific vtracer v0.6.4 ---
# Define the specific download URL provided previously
ARG VTRACER_DOWNLOAD_URL=https://github.com/visioncortex/vtracer/releases/download/0.6.4/vtracer-x86_64-unknown-linux-musl.tar.gz

# Install dependencies needed for downloading/extracting tar.gz, then install vtracer
# Also install build-essential and python3 which might be needed by some npm packages (optional but safer)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      curl \
      tar \
      gzip \
      ca-certificates \
      build-essential \
      python3 \
    && echo "Downloading specific vtracer v0.6.4 from ${VTRACER_DOWNLOAD_URL}..." \
    # Download the specific tar.gz file using the defined URL
    && curl -sSL "${VTRACER_DOWNLOAD_URL}" -o /tmp/vtracer-release.tar.gz \
    # Create a temporary directory for extraction
    && mkdir -p /tmp/vtracer_extracted \
    # Extract the tar.gz archive into the directory
    && tar -xzf /tmp/vtracer-release.tar.gz -C /tmp/vtracer_extracted \
    # Move the executable (assuming it's named 'vtracer' inside)
    && mv /tmp/vtracer_extracted/vtracer /usr/local/bin/vtracer \
    # Make it executable
    && chmod +x /usr/local/bin/vtracer \
    # Clean up temporary files and directories
    && rm -rf /tmp/vtracer-release.tar.gz /tmp/vtracer_extracted \
    # Verify installation
    && echo "vtracer installed:" $(vtracer --version || echo "verification failed") \
    # Clean up apt cache
    && rm -rf /var/lib/apt/lists/*
# --- End vtracer Install ---

# Copy package.json and package-lock.json (if available)
# Copy these first to leverage Docker layer caching for dependencies
COPY package*.json ./

# Install only production dependencies using npm ci if package-lock.json exists
# This is generally faster and more reliable for production builds
RUN npm ci --only=production --ignore-scripts

# Copy the rest of your application code
COPY . .

# Make the application port available
EXPOSE 3000

# Define the command to run your application
CMD [ "node", "server.js" ]
