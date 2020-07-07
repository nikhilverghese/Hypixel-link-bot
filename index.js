const Discord = require('discord.js');
const fetch = require("node-fetch");
const client = new Discord.Client();
const prefix = '/'
const prefixEx = '!'
// 721178149924241412
let guildName;
let roleGuildmaster = role => role.name === 'Guildmaster';
let username;
let statusUrl = 'https://api.slothpixel.me/api/players/'
var guildMasterName;
let guildid;
let guildRank;


client.once('ready', () => {
    console.log("connected!")
    
});

//linkmc
client.on('message', msg=> {
    if(msg.content.startsWith(prefix + "linkmc")) {
        username = msg.content.replace(/\/linkmc /g, "");
        //console.log(username)
        let rank;
        let rankid;
        var plusColor = "+";
        var bracket = "]";
        let strRank;
        let userUUID;
        fetch(statusUrl + username)
            .then(res => res.json())
            .then(data => rank = data)           
            .then(() => {
                userUUID = JSON.stringify(rank.uuid).replace(/\"/g, "");
                let guildtemp;
                let guildstr;
                let guildObj;
                fetch(guildUrl + '5d50ef0477ce8487d641bbe3')
                    .then(res => res.json())
                    .then(data => guildtemp = data)
                    .then(() => {
                        guildstr = JSON.stringify(guildtemp.guild.members)
                        guildObj = JSON.parse(guildstr)
                        for(var i = 0; i < guildObj.length; i++){
                            if(guildObj[i].uuid == userUUID) {
                                msg.channel.send('Role set to ' + guildObj[i].rank); 
                                guildRank = guildObj[i].rank

                            }
                            
                        }
                        if (guildRank == 'Rookie') {
                            const role = msg.guild.roles.cache.find(role => role.name === 'Rookie');
                            msg.member.roles.add(role)
                        }
                        if (guildRank == 'Elite') {
                            const role = msg.guild.roles.cache.find(role => role.name === 'Elite');
                            msg.member.roles.add(role)
                        }
                        if (guildRank == 'Veteran') {
                            const role = msg.guild.roles.cache.find(role => role.name === 'Veteran');
                            msg.member.roles.add(role)
                        }
                        if (guildRank == 'Helper') {
                            const role = msg.guild.roles.cache.find(role => role.name === 'Helper');
                            msg.member.roles.add(role)
                        }
                        if (guildRank == 'Officer') {
                            const role = msg.guild.roles.cache.find(role => role.name === 'Officer');
                            msg.member.roles.add(role)
                        }
                    })

            })
            .then(() => {
                strRank = JSON.stringify(rank.rank)
                console.log(strRank)
                if (strRank == "\"HELPER\"") {
                    msg.member.setNickname('[HELPER] ' + username)
                    msg.reply('Account linked')

                }
                if (strRank == "\"MVP_PLUS_PLUS\"") {
                    msg.member.setNickname('[MVP++] ' + username)
                    msg.reply('Account linked')
                }
                if (strRank == "\"MVP_PLUS\"") { 
                    msg.member.setNickname("[MVP+] " + username);
                    const role = msg.guild.roles.cache.find(role => role.name === 'Mvp');
                    msg.member.roles.add(role)
                    msg.reply('Account linked')
                    
                }
                if (strRank == "\"MVP\"") {   
                    msg.member.setNickname("[MVP] " + username) 
                    const role = msg.guild.roles.cache.find(role => role.name === 'Mvp');
                    msg.member.roles.add(role)
                    msg.reply('Account linked')
                    
                }
                if (strRank == "\"VIP_PLUS\"") {   
                    msg.member.setNickname("[VIP+] " + username)
                    const role = msg.guild.roles.cache.find(role => role.name === 'Vip');
                    msg.member.roles.add(role)
                    msg.reply('Account linked')
                }
                if (strRank == "\"VIP\"") {                    
                    msg.member.setNickname("[VIP] " + username)  
                    const role = msg.guild.roles.cache.find(role => role.name === 'Vip');
                    msg.member.roles.add(role) 
                    msg.reply('Account linked')                
                }
                if (strRank == "null") {
                    msg.member.setNickname(username);
                    msg.reply('Account linked')
                } 
                
            })
    }
});
//status
client.on('message', msg=> {
    if(msg.content.startsWith(prefix + 'status')) {
    console.log(msg.content)
    username = msg.content.replace(/\/status /g, "");
    console.log(username)
    let isOnline;
    let getStatus;
    let statusEmbed = new Discord.MessageEmbed().setTitle('Status')
        fetch(statusUrl + username)
            .then(res => res.json())
            .then(data => isOnline = data)
            .then(() => {
                getStatus = isOnline.online
                console.log(getStatus)
                var strStatus = JSON.stringify(getStatus)
                console.log(strStatus)
                if (strStatus == "true") {
                    statusEmbed = new Discord.MessageEmbed().setTitle('Status').addFields(
                        { name: 'Hypixel Status', value: username + ' is online',})
                        msg.channel.send(statusEmbed)
                } 
                if (strStatus == "false") {
                    statusEmbed = new Discord.MessageEmbed().setTitle('Status').addFields(
                        { name: 'Hypixel Status', value: username + ' is offline',})
                        msg.channel.send(statusEmbed)
                } 
            })
            
    }
    
})
client.login(process.env.token);

