import { TelegramClient } from "telegram";
export declare function start(client: TelegramClient, options: {
    exitOnError?: boolean;
}): Promise<void>;
