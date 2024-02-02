import WebSocket from "ws";
import axios from "axios";

const ws = new WebSocket("wss://rpc10.n3.nspcc.ru:10331/ws");

const block_added = {
    jsonrpc: "2.0",
    method: "subscribe",
    params: ["block_added"],
    id: 1,
};

ws.on("open", async function open() {
    ws.send(JSON.stringify(block_added));
});

let n = 0;
ws.on("message", async function message(data: string) {
    n++;

    if (n === 1) {
        console.log(`Subscribed. Listening for messages..`);
    } else {
        console.log("Message received: %s", JSON.parse(data).params[0]);
        console.log("New block: %s", JSON.parse(data).params[0].index);
        
        await listTokensPriceFromFlamingo();
    }
});

const listTokensPriceFromFlamingo = async () => {
    const url = "https://api.flamingo.finance/token-info/prices";

    const response = await axios.get(url);

    console.log(response.data);
};