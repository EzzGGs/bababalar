module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`${client.user.tag} olarak giriş yapıldı!`);
        client.user.setPresence({
            activities: [{ 
                name: 'EzzGGs ', 
                type: 'STREAMING', 
                url: 'https://www.twitch.tv/vizyonn' 
            }],
            status: 'online',
        });
    },
};