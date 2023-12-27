const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tartarus')
		.setDescription('Send this pserson to tartarus!')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('send this person to tartarus!')
            .setRequired(true))
		.addRoleOption(option =>
			option.setName('role')
			.setDescription('testing')
			.setRequired(true)),
	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const member = interaction.options.getMember('target');
		member.roles.add(role);
		console.log(role);
	},
};