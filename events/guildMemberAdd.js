const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const logChannel = member.guild.channels.cache.find(channel => channel.name === 'gelen-giden'); // Burada kanalı adıyla buluyoruz
        if (!logChannel) return; // Kanal bulunamazsa işlem yapmıyoruz

        const embed = new MessageEmbed()
            .setTitle('Yeni Üye Katıldı')
            .setDescription(`${member.user.tag} sunucuya katıldı!`)
            .setColor(0x00ff00)
            .setTimestamp();

        logChannel.send({ embeds: [embed] });
    },
};
