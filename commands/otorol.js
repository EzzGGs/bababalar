const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('otorol')
        .setDescription('Sunucuya yeni katılanlara otomatik rol verir.')
        .addRoleOption(option => 
            option.setName('rol')
                .setDescription('Otomatik verilecek rolü seçin')
                .setRequired(true)
        ),
    async execute(interaction) {
        const role = interaction.options.getRole('rol');

        // Yetki kontrolü: Kullanıcı admin mi?
        if (!interaction.member.permissions.has('Administrator')) {
            return interaction.reply({ content: 'Bu komutu kullanma yetkiniz yok.', ephemeral: true });
        }

        // Sunucuya yeni kullanıcı katıldığında tetiklenir
        const guild = interaction.guild;
        if (!guild) {
            return interaction.reply({ content: 'Bu komut yalnızca bir sunucuda kullanılabilir.', ephemeral: true });
        }

        guild.members.fetch().then(members => {
            members.forEach(async member => {
                if (!member.roles.cache.has(role.id)) {
                    try {
                        await member.roles.add(role);
                        console.log(`${member.user.tag} kullanıcısına otomatik rol verildi: ${role.name}`);
                    } catch (error) {
                        console.error(`Rol verilemedi: ${error}`);
                    }
                }
            });
        });

        // Embed ile sonuç mesajı
        const embed = {
            color: 0x00ff00,
            title: 'Oto Rol Ayarlandı',
            description: `Yeni katılanlara otomatik olarak şu rol verilecek: ${role.name}`,
        };

        interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
