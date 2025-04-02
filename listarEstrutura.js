const fs = require('fs');
const path = require('path');

function listFiles(dir, prefix = '') {
    const files = fs.readdirSync(dir);
    let output = '';

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        output += `${prefix}${file}\n`;
        if (stats.isDirectory()) {
            output += listFiles(filePath, prefix + '|  ');
        }
    });

    return output;
}

const estrutura = listFiles('./');
fs.writeFileSync('estrutura.txt', estrutura);
console.log('Arquivo estrutura.txt criado!');
