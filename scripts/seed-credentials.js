const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const schools = await prisma.school.findMany();

    for (const school of schools) {
        const username = school.slug; // Default username is the slug
        const password = "password123"; // Default password for setup
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.school.update({
            where: { id: school.id },
            data: {
                username: username,
                password: hashedPassword,
            },
        });

        console.log(`Updated credentials for ${school.name}:`);
        console.log(`  Username: ${username}`);
        console.log(`  Password: ${password}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
