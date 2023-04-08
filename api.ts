import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Alex',
            email: 'Alex@prisma.io',
            posts: {
                create: {
                    title: 'Aprendendo Typescript 2',
                    content: `Estou começando a aprender TSC hoje dia ${Date.now()} 2`
                },
            },
        },
    })
    //console.log(user)
}

async function postCreate(){
    const newPost = await prisma.post.create({
        data: {
            title: 'My fist Publication',
            content: 'Hellow its my fist publication on this social media',
            published: true,
            authorId: 1
        }
    })
    console.log(newPost);
}

async function postUpd(){
    const updPost = await prisma.post.update({
        where: {
            id: 4
        },
        data: {
            title: 'My first Publication'
        }
    })
}

async function postUpdAll(){
    const updAllPost = await prisma.post.updateMany({
        where:{
            published: false
        },
        data:{
            published: true
        }
    })
}


async function getAll(){
    const userWithPost = await prisma.user.findMany({
        include: {
            posts: true,
        },
    })

    console.dir(userWithPost, { depth: null })
}
// main()
getAll()
// postCreate()
// postUpd()
// postUpdAll()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })