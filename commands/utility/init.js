const { SlashCommandBuilder } = require('discord.js');
const helpers = require('../../helpers');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('init')
		.setDescription('initialize the bot'),
	async execute(interaction) {
        helpers.init(interaction.client, interaction.guild);
        await interaction.reply({content: 'Initilization complete!', ephemeral: true});
	},
};