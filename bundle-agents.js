import fs from 'fs';
import path from 'path';

const agentsDir = './.agents';
const outputDir = './src/logic';
const outputFile = path.join(outputDir, 'agents-bundle.js');

function readFiles(dir, baseDir = '') {
    const results = [];
    const list = fs.readdirSync(dir);
    
    for (const file of list) {
        const filePath = path.join(dir, file);
        const relativePath = path.join(baseDir, file).replace(/\\/g, '/');
        const stat = fs.statSync(filePath);
        
        if (stat && stat.isDirectory()) {
            results.push(...readFiles(filePath, relativePath));
        } else {
            const content = fs.readFileSync(filePath, 'utf8');
            results.push({
                path: '.agents/' + relativePath,
                content: content
            });
        }
    }
    return results;
}

try {
    const bundle = readFiles(agentsDir);
    const outputContent = `export const agentBundle = ${JSON.stringify(bundle, null, 2)};`;
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputFile, outputContent);
    console.log('✅ Antigravity Agent Bundle başarıyla oluşturuldu!');
} catch (err) {
    console.error('❌ Bundle hatası:', err);
}
