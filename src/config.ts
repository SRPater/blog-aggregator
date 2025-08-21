import fs from "fs";
import os from "os";
import path from "path";

type Config = {
    dbUrl: string,
    currentUserName: string,
};

export function setUser(username: string): void {
    const config = readConfig();
    config.currentUserName = username;
    writeConfig(config);
}

export function readConfig(): Config {
    const fileContent = fs.readFileSync(
        getConfigFilePath(),
        { encoding: "utf-8" },
    );
    const rawConfig = JSON.parse(fileContent);
    return validateConfig(rawConfig);
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
    const jsonConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    };
    const json: string = JSON.stringify(jsonConfig);
    fs.writeFileSync(getConfigFilePath(), json);
}

function validateConfig(rawConfig: any): Config {
    if (!rawConfig.db_url || !rawConfig.current_user_name) {
        throw new Error("Error!");
    }

    if (typeof rawConfig.db_url !== "string" || typeof rawConfig.current_user_name !== "string") {
        throw new Error("Error!");
    }

    return {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    };
}
