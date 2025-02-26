import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import User from "../model/User";

const prisma = new PrismaClient();

export async function createUser(user : User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const addedUser = await prisma.user.create({
        data: {
            name : user.name,
            username : user.username,
            password : hashedPassword,
            role : user.role
        },
    });
    console.log("User created:", addedUser);
}

export async function verifyUserCredentials(verifyUser: User) {
    const userInDB = await prisma.user.findUnique({
        where: { username: verifyUser.username },
    });
    if (!userInDB) {
        return false;
    }

    return await bcrypt.compare(verifyUser.password, userInDB.password);
}