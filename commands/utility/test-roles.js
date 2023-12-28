const { SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test-roles')
		.setDescription('assign test roles to this user')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('assign test role to this user')
            .setRequired(true)),
	async execute(interaction) {
		const testRoles = ['test role', 'citizen'];


		const member = interaction.options.getMember('target');
		const roles = interaction.guild.roles.cache;
		for(let testRole of testRoles){
			member.roles.add([...roles.values()].find(role => role.name === testRole));
		}
		await interaction.reply({ content: `test roles has been added to user ${member.nickname}`, ephemeral: true });
	},
};