import * as net from "net";
import * as childProcess from "child_process";

const port = 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = (): void => {
  client.connect({ port: port }, (): void => {
    client.end();
    if (!startedElectron) {
      console.log("starting electron");
      startedElectron = true;
      // fix yarn or npm run
      childProcess.exec("yarn electron .");
    }
  });
};

tryConnection();

client.on("error", (): void => {
  setTimeout(tryConnection, 1000);
});
