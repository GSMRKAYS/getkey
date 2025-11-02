// By Lucas
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const query = require('samp-query');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const ALLOWED_ROLE_IDS = ['1404435319641870396', '1432738776194486393'];


const SAMP_OPTIONS = {
  host: '160.191.77.60',
  port: 8290,
  timeout: 1000
};

client.once('ready', () => {
  console.log(`[GV-RP] Da Bat Bot Thanh Cong: ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.content === '!ip') {
      const embed = new EmbedBuilder()
      .setTitle('IP SERVER')
      .setDescription('**>> IP:** ``160.191.77.60:8290``')
      .setColor('#FF0000')
      .setFooter({ text: 'Love For Everyone[!]' })
      .setTimestamp();

    message.channel.send({
      embeds: [embed]
    });
  }

  if (message.content.startsWith('!tb')) {
    const hasAllowedRole = message.member.roles.cache.some(role =>
      ALLOWED_ROLE_IDS.includes(role.id)
    );

    if (!hasAllowedRole) {
      return message.reply('```[!] Ban khong duoc phep su dung lenh nay.```');
    }
    const noidung = message.content.slice(4).trim();

    if (!noidung) {
      return message.reply('```[!] Noi Dung Khong Hop Le.```');
    }

    const embed = new EmbedBuilder()
      .setTitle('THONG BAO NEWS')
      .setDescription(noidung)
      .setColor('#FF0000')
      .setFooter({ text: 'FROM TEAM ADMIN' })
      .setTimestamp();

    message.channel.send({
      content: '@everyone',
      embeds: [embed]
    });
      message.delete();
  }
if (message.content === '!players') {
    query(SAMP_OPTIONS, (error, response) => {
      if (error) {
        return message.reply('```[!] Khong the connect voi server!```');
      }

      const players = response.players;

      if (!players || players.length === 0) {
        return message.reply('```[!] Khong co nguoi choi nao online.```');
      }

      const playerLines = players.map(player =>
        `**Name:** ${player.name} - **ID:** ${player.id} - **Ping:** ${player.ping}`
      );

      const embed = new EmbedBuilder()
        .setTitle(`PLAYER LIST (PLAYER: ${players.length})`)
        .setDescription(playerLines.join('\n'))
        .setColor('#FF0000')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    });
  }
if (message.content === '!server') {
    query(SAMP_OPTIONS, (error, response) => {
      const isOnline = !error;
      const maxplayers = response.maxplayers || 0;
      const players = response.players ? response.players.length : 0;
      const serverName = response.hostname || 'Server Offline';
      const serverIP = `${SAMP_OPTIONS.host}:${SAMP_OPTIONS.port}`;

      const embed = new EmbedBuilder()
        .setTitle('SERVER STATUS')
        .setDescription(`
          **Status:** ${isOnline ? 'Online' : 'Offline'}
**Players:** ${players}/${maxplayers}
**Server Name:** ${serverName}
**IP:** ${serverIP}
        `)
        .setColor(isOnline ? '#5CE65C' : '#FF0000')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    });
  }
});


client.login('MTQzMjQwNDk3Mzc1MjE1NjIzMQ.GiicPR._0va5j6lHNY5Ik89KS7IC_bp0_bAEZdU99m1yo');