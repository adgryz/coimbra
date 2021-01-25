import fs from 'fs';
import path from 'path';
import { Socket } from "socket.io";

const initListeners = (socket: Socket) => {
    const listenersPath = path.resolve(__dirname);

    fs.readdir(listenersPath, (err, files) => {
        if (err) {
            process.exit(1);
        }

        files.map((fileName: string) => {
            if (fileName !== "index.ts") {
                const listener = require(path.resolve(__dirname, fileName)).default;
                listener(socket);
            }
        });
    });
};

export default initListeners;