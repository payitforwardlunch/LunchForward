const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Seeding schools...')

    const providence = await prisma.school.upsert({
        where: { slug: 'providence' },
        update: {},
        create: {
            name: 'Providence Elementary',
            slug: 'providence',
            location: 'Denton, TX',
            description: 'Supporting students at Providence Elementary to clear lunch debt and provide nutritious meals.',
            targetAmount: 2500,
            raisedAmount: 1850,
        },
    })

    const sandburg = await prisma.school.upsert({
        where: { slug: 'sandburg' },
        update: {},
        create: {
            name: 'Sandburg Middle School',
            slug: 'sandburg',
            location: 'Elmhurst, IL',
            description: 'Helping students focus on learning by ensuring no child goes hungry.',
            targetAmount: 5000,
            raisedAmount: 1200,
        },
    })

    console.log({ providence, sandburg })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
