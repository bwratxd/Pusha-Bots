const pusha = require('./src/configs/token.json');
const GB = require('./guardMain')
const DB = require('./databaseMain');

GB.gMain()
GB.connect()
DB.dMain().then(pusha => {
  DB.fetchCmdDatabase()
  DB.dağıtıcıOn()
  DB.On()
})
// Database Backup
setInterval(() => {
  DB.databaseBackup()
}, 1000*60*60*1);

