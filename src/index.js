const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();

app.use(express.json());

app.post('/linear-webhook', async (req, res) => {
    const { action, data } = req.body;

    const stateColors = {
        backlog: '#bec2c8',
        inProgress: '#f2c94c',
        done: '#27ae60',
        canceled: '#eb5757'
    };

    const priorityIcons = {
        0: '⚪',
        1: '🔵',
        2: '🟡',
        3: '🔴',
        4: '⚡'
    };

    const priorityLabels = {
        0: 'No priority',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Urgent'
    };

    const timestamp = new Date(data.createdAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    let description = '';
    switch (action) {
        case 'create':
            description = `📝 New issue created in **${data.team.name}**`;
            break;
        case 'update':
            description = `🔄 Issue updated in **${data.team.name}**`;
            break;
        case 'delete':
            description = `🗑️ Issue deleted from **${data.team.name}**`;
            break;
    }

    let discordMessage = {
        embeds: [{
            title: `${data.identifier}: ${data.title}`,
            color: parseInt(stateColors[data.state.type]?.slice(1) || '7506394', 16),
            description: description,
            fields: [
                {
                    name: '📊 Status',
                    value: `${data.state.name}`,
                    inline: true
                },
                {
                    name: '⭐ Priority',
                    value: `${priorityIcons[data.priority]} ${priorityLabels[data.priority]}`,
                    inline: true
                },
                {
                    name: '👥 Team',
                    value: data.team.name,
                    inline: true
                },
                {
                    name: '📋 Project',
                    value: data.project.name,
                    inline: true
                },
                {
                    name: '🎯 Milestone',
                    value: data.milestone?.name || 'No milestone',
                    inline: true
                }
            ],
            footer: {
                text: `Updated at ${timestamp}`
            },
            url: data.url
        }]
    };

    if (data.description && data.description.trim()) {
        discordMessage.embeds[0].fields.push({
            name: '📝 Description',
            value: data.description.substring(0, 1024),
            inline: false
        });
    }

    try {
        await axios.post(process.env.DISCORD_WEBHOOK_URL, discordMessage);
        res.status(200).send('Notification sent to Discord');
    } catch (error) {
        console.error('Error sending to Discord:', error.response?.data || error.message);
        res.status(500).send('Failed to send notification');
    }
});

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
