const fs = require('fs');

const init = (client, guild) => {
    for(let [memberId, member] of guild.members.cache){
        let roles = [];
        for(let [roleId,] of member.roles.cache){
            roles.push(roleId);
        }
        client.userRoles.set(memberId, roles);
    }
    flushRolesToJson(client);
}

const addRole = (user, role)=>{
    const client = user.client;
    user.roles.add(role);

    client.userRoles.get(user.id).push(role.id);
    flushRolesToJson(client);
}

const removeRole = (user, role)=>{

    const client = user.client;
    user.roles.remove(role);

    for(let i in client.userRoles.get(user.id)){
        client.userRoles.get(user.id).splice(i, 1);
        break;
    }
    
    flushRolesToJson(client);
}

const flushRolesToJson = (client)=>{
    let userRoles = [];
    for(let [memberId, roles] of client.userRoles){
        const newRecord = {
            id: memberId,
            memberRoles: roles,
        };
        userRoles.push(newRecord);
    }
    const data = JSON.stringify(userRoles);
    fs.writeFile('roles.json', data,
        (err) => {
        if (err)
            console.log(err);
    });
}

module.exports = {init, addRole, removeRole, flushRolesToJson};