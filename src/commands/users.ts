import { setUser } from "../config";
import { createUser, getUserByName } from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("Username is required");
    }

    setUser(args[0]);
    console.log("User set");
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("Username is required");
    }

    if (await getUserByName(args[0])) {
        throw new Error("User already exists");
    }

    const newUser = await createUser(args[0]);
    setUser(newUser.name);
    console.log("User was created:");
    console.log(`id: ${newUser.id}`);
    console.log(`created at: ${newUser.createdAt}`);
    console.log(`updated at: ${newUser.updatedAt}`);
    console.log(`name: ${newUser.name}`);
}
