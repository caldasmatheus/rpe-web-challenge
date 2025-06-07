FROM cypress/included:14.4.1
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
CMD ["npx", "cypress", "run"]