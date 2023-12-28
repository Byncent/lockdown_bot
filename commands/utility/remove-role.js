const { SlashCommandBuilder} = require('discord.js');
const helpers = require('../../helpers');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-role')
		.setDescription('remove role from this user')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('remove role from this usere')
            .setRequired(true))
		.addRoleOption(option =>
			option.setName('role')
			.setDescription('the role to be removed')
			.setRequired(true)),
	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const member = interaction.options.getMember('target');
		if (!member.roles.cache.some(r => r.name === role.name)) {
			await interaction.reply({ content: `${member.nickname} does not has role ${role.name} u silly!`, ephemeral: true });
			return;
		}
		helpers.removeRole(member, role);
		await interaction.reply({ content: `Role ${role.name} has been removed from user ${member.nickname}`, ephemeral: true });
	},
};