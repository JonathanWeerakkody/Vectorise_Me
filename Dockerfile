# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# --- Install specific vtracer v0.6.4 ---
# Define the specific download URL provided by the user
ARG VTRACER_DOWNLOAD_URL=https://github.com/visioncortex/vtracer/releases/download/0.6.4/vtracer-x86_64-unknown-linux-musl.tar.gz

# Install dependencies needed for downloading/extracting tar.gz, then install vtracer
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      curl \
      tar \
      gzip \
      ca-certificates \
    && echo "Downloading specific vtracer v0.6.4 from ${VTRACER_DOWNLOAD_URL}..." \
    # Download the specific tar.gz file using the defined URL
    && curl -sSL "${VTRACER_DOWNLOAD_URL}" -o /tmp/vtracer-release.tar.gz \
    # Create a temporary directory for extraction
    && mkdir -p /tmp/vtracer_extracted \
    # Extract the tar.gz archive into the directory
    && tar -xzf /tmp/vtracer-release.tar.gz -C /tmp/vtracer_extracted \
    # Move the executable (still assuming it's named 'vtracer' inside)
    && mv /tmp/vtracer_extracted/vtracer /usr/local/bin/vtracer \
    # Make it executable
    && chmod +x /usr/local/bin/vtracer \
    # Clean up temporary files and directories
    && rm -rf /tmp/vtracer-release.tar.gz /tmp/vtracer_extracted \
    # Verify installation
    && echo "vtracer installed:" $(vtracer --version) \
    # Clean up apt cache
    && rm -rf /var/lib/apt/lists/*
# --- End vtracer Install ---

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies using npm ci
RUN npm ci --only=production

# Bundle app source
COPY . .

# Make port 3000 available
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "server.js" ]
