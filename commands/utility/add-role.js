const { SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-role')
		.setDescription('assign role to this user')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('assign role to this user')
            .setRequired(true))
		.addRoleOption(option =>
			option.setName('role')
			.setDescription('the role to be assigned')
			.setRequired(true)),
	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const member = interaction.options.getMember('target');
		if (member.roles.cache.some(r => r.name === role.name)) {
			await interaction.reply({ content: `${member.nickname} already has role ${role.name} u silly!`, ephemeral: true });
			return;
		}
		member.roles.add(role);
		await interaction.reply({ content: `Role ${role.name} has been added to user ${member.nickname}`, ephemeral: true });
	},
};