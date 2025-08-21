import {
    type CommandsRegistry,
    registerCommand,
    runCommand,
} from "./commands/commands";
import { handlerLogin } from "./commands/users";

function main() {
    const registry: CommandsRegistry = {}
    registerCommand(registry, "login", handlerLogin);
    
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log("not enough arguments");
        process.exit(1);
    }

    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    try {
        runCommand(registry, cmdName, ...cmdArgs);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error(err);
        }

        process.exit(1);
    }
}

main();
