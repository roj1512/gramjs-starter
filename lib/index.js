"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const readline_1 = require("readline");
const read = readline_1.createInterface({
    input: process.stdin,
    output: process.stdout,
});
async function start(client, options) {
    let authRequested = false;
    await client.start({
        phoneNumber: () => new Promise((r) => {
            authRequested = true;
            read.question("Phone number: ", r);
        }),
        phoneCode: () => new Promise((r) => read.question("Phone code: ", r)),
        password: (hint) => new Promise((r) => read.question(`${hint ? "Hint: " + hint + "\n" : ""}Password: `, r)),
        onError: (err) => {
            console.log(`Error starting client: ${err}`);
            if (options.exitOnError) {
                process.exit(1);
            }
        },
    });
    if (authRequested) {
        client.sendMessage("me", {
            message: client.session.save(),
        });
        console.log("String session sent to saved messages.");
    }
}
exports.start = start;
