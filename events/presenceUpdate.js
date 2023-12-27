const { Events } = require('discord.js');

module.exports = {
	name: Events.PresenceUpdate,
	async execute(oldPresence, newPresence) {

        const usr = newPresence.user.id;
        const channel = newPresence.client.channels.cache.get('1187714910080221184');

        let content = `a wild ${newPresence.user.tag} hopped on!`;
        if(oldPresence != null){
            if(oldPresence.status === newPresence.status){
                return;
            }
            content = `${newPresence.user.tag}'s status changed from ${oldPresence.status} to ${newPresence.status}`;
        }
        await channel.send(content);
        await newPresence.client.users.send(usr, content);
	},
};