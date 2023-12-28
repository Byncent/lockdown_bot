const fs = require('fs');

const addRole = (user, role)=>{
    user.roles.add(role);
}

const removeRole = (user, role)=>{
    user.roles.remove(role);
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

module.exports = {addRole, removeRole, flushRolesToJson};