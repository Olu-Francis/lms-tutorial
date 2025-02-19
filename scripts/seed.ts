const { PrismaClient } = require("@prisma/client");

const database =  new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Python Programming"},
                { name: "Fundamental of programming"},
                { name: "Object Oriented Programming"},
                { name: "Database and Backend Integration"},
                { name: "Debugging Excercise"},
            ]
        });

        console.log("Success");
    } catch (error) {
        console.log("There was an error seeding the database categories", error);
    } finally{
        await database.$disconnect();
    }
}

main();
