import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from "axios";

function App() {
  useEffect(() => {
    const ws = new WebSocket("wss://rpc10.n3.nspcc.ru:10331/ws");

    const block_added = {
        jsonrpc: "2.0",
        method: "subscribe",
        params: ["block_added"],
        id: 1,
    };

    ws.onopen = () => ws.send(JSON.stringify(block_added));

    let n = 0;

    ws.onmessage = async (event) => {
        n++;

        if (n === 1) {
            console.log(`Subscribed. Listening for messages..`);
        } else {
          console.log(event.data)

          console.log("Message received: %s", JSON.parse(event.data).params[0]);
            console.log("New block: %s", JSON.parse(event.data).params[0].index);
            
            await listTokensPriceFromFlamingo();
        }
    };

    const listTokensPriceFromFlamingo = async () => {
        const url = "https://api.flamingo.finance/token-info/prices";

        const response = await axios.get(url);

        console.log(response.data);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
