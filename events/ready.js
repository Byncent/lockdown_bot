const { Events } = require('discord.js');
const fs = require('fs');
const helpers = require('../helpers');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		await console.log(`Ready! Logged in as ${client.user.tag}`);
		let guild;

		//kinda hacky since it's a test project
		for(let [, guildObj] of client.guilds.cache){
			guild = guildObj;
		}

		await fs.access('roles.json', fs.constants.F_OK, (err) => {
			if(err){
				helpers.init(client, guild);
			}else{
				const userRoles = require('../roles.json');
				for(let userRole of userRoles){
					client.userRoles.set(userRole.id, userRole.memberRoles);
				}
			}
		});
	},
};