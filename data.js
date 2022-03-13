const fs = require('fs');

const data = JSON.parse(fs.readFileSync(__dirname + '/apps.json', { encoding: 'utf-8' }));

module.exports = {
    data,
}
