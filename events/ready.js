const { Events } = require('discord.js');
const fs = require('fs');
const helpers = require('../helpers');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);


		fs.access('roles.json', fs.constants.F_OK, (err) => {
			if(err){
				console.log("roles.json does not exist, initilizing");
				helpers.init();
				console.log()
			}
			console.log(err ? 'File does not exist' : 'File exists');
		});

		fs.readFile("roles.json", (error, data) => {
`	`
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