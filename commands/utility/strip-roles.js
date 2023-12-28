const { SlashCommandBuilder} = require('discord.js');
const helpers = require('../../helpers');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('strip-roles')
		.setDescription('remove all roles from this user')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('remove all roles from this usere')
            .setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
        let res =  `the following roles:`;

        for(let [, role] of member.roles.cache){
            if(role.name == '@everyone'){
                continue;
            }
            res += '\n' + '- ' + role.name;
            helpers.removeRole(member, role);
        }
        res += `\nhas been removed from user ${member.nickname}`;
		await interaction.reply({ content: res, ephemeral: true });
	},
};