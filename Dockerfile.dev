# Step 1: Use an official Node.js image as a base image
FROM node:16
# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the container
COPY package*.json ./

# Install all dependencies inside the container using npm
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Copy wait-for-it.sh file 
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Give execution permission 
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Expose port 3000 on the container so that it can be accessed from outside
EXPOSE 3000

ENTRYPOINT ["wait-for-it.sh", "blog-db:3306", "--"]

# Define the command to run the app (start the server with node index.js)
# ...
CMD ["npm", "start"]

