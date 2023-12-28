const { Events } = require('discord.js');
const fs = require('fs');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		fs.readFile("roles.json", (error, data) => {

			if (error) {
				// logging the error
				console.error(error);
			
				throw error;
			}

			const userRoles = JSON.parse(data);

			for(let userRole of userRoles){
				client.userRoles.set(userRole.id, userRole.memberRoles);
			}

			console.log(`roles loaded!`);
		});
	},
};