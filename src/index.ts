import { createInterface } from "readline";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

const read = createInterface({
    input: process.stdin,
    output: process.stdout,
});

export async function start(
    client: TelegramClient,
    options: {
        exitOnError?: boolean;
    }
): Promise<void> {
    let authRequested = false;

    await client.start({
        phoneNumber: () =>
            new Promise((r) => {
                authRequested = true;
                read.question("Phone number: ", r);
            }),
        phoneCode: () => new Promise((r) => read.question("Phone code: ", r)),
        password: (hint) =>
            new Promise((r) =>
                read.question(
                    `${hint ? "Hint: " + hint + "\n" : ""}Password: `,
                    r
                )
            ),
        onError: (err) => {
            console.log(`Error starting client: ${err}`);

            if (options.exitOnError) {
                process.exit(1);
            }
        },
    });

    

    if (authRequested) {
        client.sendMessage("me", {
            message: (client.session as StringSession).save(),
        });
        console.log("String session sent to saved messages.")
    }
}
