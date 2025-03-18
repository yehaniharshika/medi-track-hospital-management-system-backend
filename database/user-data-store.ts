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

export async function resetPassword(username: string, newPassword: string) {
    try {
        // Find user by username
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        await prisma.user.update({
            where: { username },
            data: { password: hashedPassword },
        });

        return { message: "Password reset successfully" };
    } catch (error) {
        console.error("Error resetting password:", error);
        throw new Error("Password reset failed");
    }
}