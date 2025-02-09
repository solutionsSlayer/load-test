const { PrismaClient, SpaceUserRole } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Nettoyer la base de données existante
    await prisma.todo.deleteMany();
    await prisma.list.deleteMany();
    await prisma.spaceUser.deleteMany();
    await prisma.space.deleteMany();
    await prisma.user.deleteMany();

    console.log('Début du seeding...');

    // 1. Créer un utilisateur admin
    console.log('Création de l\'admin...');
    const hashedPassword = await bcryptjs.hash('password123', 10);
    const admin = await prisma.user.create({
        data: {
            email: 'admin@test.com',
            password: hashedPassword,
            name: 'Admin'
        }
    });
    console.log('Admin créé:', admin.email);

    // 2. Créer plusieurs espaces
    console.log('Création des espaces...');
    const spaces = await Promise.all(
        Array.from({ length: 5 }).map(async (_, i) => {
            const space = await prisma.space.create({
                data: {
                    name: `Espace Test ${i}`,
                    slug: `espace-test-${i}`,
                    ownerId: admin.id
                }
            });

            // Créer des listes pour cet espace
            await Promise.all(
                Array.from({ length: 3 }).map(async (_, j) => {
                    const list = await prisma.list.create({
                        data: {
                            title: `Liste ${j}`,
                            private: false,
                            ownerId: admin.id,
                            spaceId: space.id
                        }
                    });

                    // Créer des todos pour cette liste
                    await Promise.all(
                        Array.from({ length: 5 }).map((_, k) => 
                            prisma.todo.create({
                                data: {
                                    title: `Todo ${k}`,
                                    completedAt: null,
                                    ownerId: admin.id,
                                    listId: list.id
                                }
                            })
                        )
                    );
                })
            );

            return space;
        })
    );
    console.log(`${spaces.length} espaces créés`);

    // 3. Créer des utilisateurs supplémentaires
    console.log('Création des utilisateurs supplémentaires...');
    const users = await Promise.all(
        Array.from({ length: 10 }).map(async (_, i) => {
            const user = await prisma.user.create({
                data: {
                    email: `user${i}@test.com`,
                    password: hashedPassword,
                    name: `User ${i}`
                }
            });

            // Ajouter l'utilisateur à 2 espaces aléatoires
            const randomSpaces = spaces
                .sort(() => Math.random() - 0.5)
                .slice(0, 2);

            await Promise.all(
                randomSpaces.map(space => 
                    prisma.spaceUser.create({
                        data: {
                            role: SpaceUserRole.USER,
                            userId: user.id,
                            spaceId: space.id
                        }
                    })
                )
            );

            return user;
        })
    );
    console.log(`${users.length} utilisateurs créés`);

    console.log('Seeding terminé!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 