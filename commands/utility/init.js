const { SlashCommandBuilder } = require('discord.js');
const helpers = require('../../helpers');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('init')
		.setDescription('initialize the bot'),
	async execute(interaction) {
        const client = interaction.client;

        for(let [memberId, member] of interaction.guild.members.cache){
            let roles = [];
            for(let [roleId,] of member.roles.cache){
                roles.push(roleId);
            }
            client.userRoles.set(memberId, roles);
        }
        helpers.flushRolesToJson(client);
        await interaction.reply({content: 'Initilization complete!', ephemeral: true});
	},
};