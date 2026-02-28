const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const schools = [
    "Borman Elementary",
    "Cross Oaks Elementary",
    "Evers Park Elementary",
    "Ginnings Elementary",
    "Hawk Elementary",
    "Hodge Elementary",
    "Houston Elementary",
    "McNair Elementary",
    "Nelson Elementary",
    "Newton Rayzor Elementary",
    "Paloma Creek Elementary",
    "Providence Elementary",
    "Pecan Creek Elementary",
    "Rivera Elementary",
    "Sandbrock Ranch Elementary",
    "Savannah Elementary",
    "Shultz Elementary",
    "Stephens Elementary",
    "Union Park Elementary",
    "WS Ryan Elementary"
];

async function main() {
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(`Starting to seed ${schools.length} schools...`);

    for (const name of schools) {
        const slug = name
            .toLowerCase()
            .replace(/ /g, '')
            .replace(/[^\w]/g, '');

        const username = slug;

        await prisma.school.upsert({
            where: { slug: slug },
            update: {
                name: name,
                username: username,
                password: hashedPassword,
                location: "Denton, TX",
            },
            create: {
                name: name,
                slug: slug,
                username: username,
                password: hashedPassword,
                location: "Denton, TX",
                targetAmount: 1000,
                raisedAmount: 0,
            },
        });

        console.log(`Upserted: ${name} (${slug})`);
    }

    console.log('Seeding completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
