const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tartarus')
		.setDescription('Send this pserson to tartarus!')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('send this person to tartarus!')
            .setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
        
	},
};