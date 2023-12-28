const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tartarus')
		.setDescription('Send this pserson to tartarus!')
		.addUserOption(option =>
            option
            .setName('target')
            .setDescription('remove all roles from this usere')
            .setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		const roles = interaction.guild.roles.cache;

		for(let [, role] of member.roles.cache){
			if(role.name == '@everyone'){
				continue;
			}
			member.roles.remove(role);
		}

		console.log(member.roles);
		member.roles.add([...roles.values()].find(role => role.name === 'tartarused'));
		await interaction.reply({ content: `${member.nickname} has been sent to tartarus!`, ephemeral: true });
	},
};