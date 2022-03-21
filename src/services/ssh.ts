import { Client, type ClientChannel } from "ssh2";
import { Observable, of } from "rxjs";
import type { ConnectionProfile } from "./connection-storage";

/**
 * Perform SSH connections.
 */
export class SSH {
  private connected = false;
  private readonly conn = new Client();
  private stream: ClientChannel | undefined;
  private dataObservable: Observable<string> = of();

  constructor(private readonly connectionInfo: ConnectionProfile) {}

  /**
   * Connect to an SSH server.
   *
   * @returns The stdout stream.
   */
  public connect(): Observable<string> {
    this.dataObservable = new Observable((subscriber) => {
      this.conn
        .on("ready", () => {
          this.conn.shell((err, stream) => {
            if (err) subscriber.error(err);

            stream
              .on("close", () => {
                this.conn.end();
                subscriber.complete();
              })
              .on("data", (data: string) => {
                console.log(data, typeof data);
                subscriber.next(data);
              });

            this.stream = stream;
            this.connected = true;
          });
        })
        .on("banner", (message) => {
          subscriber.next(message);
        })
        .on("close", (hadError) => {
          console.log("close event", hadError);
        })
        .on("end", () => {
          console.log("end event");
        })
        .on("error", (err) => {
          console.log("error event", err);
        })
        .on(
          "keyboard-interactive",
          (name, instructions, lang, prompts, finish) => {
            console.log(
              "keyboard-interactive event",
              name,
              instructions,
              lang,
              prompts,
              finish
            );
          }
        )
        .on("greeting", (greeting) => {
          console.log("greeting event", greeting);
        })
        .on("timeout", () => {
          console.log("timeout event");
        })
        .connect({
          host: this.connectionInfo.host,
          port: this.connectionInfo.port,
          username: this.connectionInfo.username,
          password: this.connectionInfo.password,
        });
    });

    return this.dataObservable;
  }

  /**
   * Disconnect from the SSH server.
   */
  public async disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        if (this.stream) {
          this.stream.end();
        }

        this.conn.end();
        this.connected = false;
        resolve();
      } else {
        reject("not connected");
      }
    });
  }

  /**
   * Execute a command on the SSH server.
   *
   * @param command The command to execute on the server.
   */
  public async exec(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        if (this.stream) {
          this.stream.write(command, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          reject("stream does not exist");
        }
      } else {
        reject("not connected");
      }
    });
  }
}
