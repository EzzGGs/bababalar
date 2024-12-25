const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const logChannel = member.guild.channels.cache.find(channel => channel.name === 'gelen-giden'); // Burada kanalı adıyla buluyoruz
        if (!logChannel) return; // Kanal bulunamazsa işlem yapmıyoruz

        const embed = new MessageEmbed()
            .setTitle('Üye Ayrıldı')
            .setDescription(`${member.user.tag} sunucudan ayrıldı.`)
            .setColor(0xff0000)
            .setTimestamp();

        logChannel.send({ embeds: [embed] });
    },
};
