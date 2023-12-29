const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('untartarus')
		.setDescription('Grant this person freedom!')
		.addUserOption(option =>
            option
            .setName('target')
            .setDescription('Set this person free!')
            .setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		const roles = interaction.guild.roles.cache;

		if (!member.roles.cache.some(r => r.name === 'tartarused')) {
			await interaction.reply({ content: `${member.nickname} need not to be freeed from tartarus u silly!`, ephemeral: true });
			return;
		}

		console.log(member.roles);
		member.roles.remove([...roles.values()].find(role => role.name === 'tartarused'));

        const userRoles = require('../../roles.json');
        for(let userRole of userRoles){
            if(userRole.id === member.id){
                for(const memberRoleId of userRole.memberRoles){
                    member.roles.add([...roles.values()].find(role => ((role.id === memberRoleId ) && (role.name != '@everyone'))));
                }
                break;
            }
        }
		await interaction.reply({ content: `freedom has been granted to ${member.nickname}!`, ephemeral: true });
	},
};