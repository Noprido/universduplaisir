const bcrypt = require('bcryptjs');

async function main() {
    const hash = await bcrypt.hash('Toutpuissant7@', 10);
    // const hash = await bcrypt.hash('admin745@', 10);
    console.log(hash);
}

main();