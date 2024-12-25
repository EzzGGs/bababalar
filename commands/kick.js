const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Belirli bir kullanıcıyı sunucudan atar.')
    .addUserOption(option => option.setName('kullanıcı').setDescription('Atılacak kullanıcı').setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
      return interaction.reply('Bu komutu kullanmak için üye atma iznine sahip olmanız gerekmektedir.');
    }

    const user = interaction.options.getUser('kullanıcı');
    const member = interaction.guild.members.cache.get(user.id);

    if (member) {
      await member.kick();
      const embed = new MessageEmbed()
        .setColor('#ff9900')
        .setTitle('Kullanıcı Atıldı')
        .setDescription(`${user.tag} sunucudan atıldı!`)
        .setTimestamp();
      return interaction.reply({ embeds: [embed] });
    } else {
      return interaction.reply('Kullanıcı bulunamadı.');
    }
  },
};
