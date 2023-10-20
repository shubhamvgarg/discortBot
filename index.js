const { Client, GatewayIntentBits, InteractionResponse } = require('discord.js');
const constants = require('./constants.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const botReply = `Hey There to create image start with: "create"`
client.on('messageCreate', message => {
    if (message.author.bot) return;
   
    if (message.content.startsWith('create'))
    {
        const query = message.content.split('create')[1].replace(' ','%20');
      
        const api_url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${constants.apiKey}`;
        
        getapi(api_url).then((img) =>{
            return message.reply
            ({
                content: `Image URL: ${img}`
            });
        })
        .catch((e) => {
                console.error(`Error in fetching ${e}`);
                return message.reply({
                    content: 'Error fetching the image.'
                });
        });
    }
    if (!message.content.startsWith('create')){

        message.reply({
        content: botReply,
        })
    }
    
    
})

async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    return (data.results[0].urls.full);
}

client.login(constants.token)