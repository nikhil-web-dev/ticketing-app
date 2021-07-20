import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) throw new Error("Cannot access NATS before connection");

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._client = nats.connect(clusterId, clientId, { url: url });
      this._client.on("connect", () => {
        console.log("connected to nats");
        resolve();
      });
      this._client.on("err", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
