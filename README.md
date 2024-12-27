# Linear to Discord Webhook Integration

![Linear App](https://webassets.linear.app/images/ornj730p/production/3d9cae3a4a0c62b88d5754852648ef38e72d3cf3-2160x1327.png?w=1440&q=95&auto=format&dpr=2)

A Node.js application that forwards Linear issue updates to Discord using webhooks. Get real-time notifications for issue creation, updates, and deletions.

## Features
- Real-time issue tracking
- Rich Discord embeds with color coding
- Priority and state visualization
- Project and milestone tracking
- Detailed issue information

## Prerequisites
- Node.js
- npm
- Discord webhook URL
- Linear webhook setup

## Installation

```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
npm install express axios dotenv

# Create .env file
cp .env.example .env
```

## Configuration
1. Create a webhook URL in your Discord server
2. Add the URL to your `.env` file:
   ```
   DISCORD_WEBHOOK_URL=your_webhook_url_here
   ```
3. Set up a webhook in Linear pointing to your server's endpoint

## Usage
```bash
# Start the server
node index.js
```

The server will start on port 5050 (or your specified PORT in .env).

## License
MIT

## Contributing
Pull requests are welcome. For major changes, please open an issue first.