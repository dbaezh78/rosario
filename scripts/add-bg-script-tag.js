const fs = require('fs');
let s = fs.readFileSync('index.html', 'utf8');
const target = '<script src="src/script.js"></script>';
if (!s.includes('src/bg-music.js')) {
    s = s.replace(target, '<script src="src/bg-music.js"></script>\n    <script src="src/script.js"></script>');
    fs.writeFileSync('index.html', s, 'utf8');
    console.log('src/bg-music.js added to index.html');
} else {
    console.log('src/bg-music.js already present in index.html');
}
