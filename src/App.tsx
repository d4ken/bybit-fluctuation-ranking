import React, {useEffect, useState} from 'react';
import './App.css';
import {TickerData} from "types/Ticker";

const App = () => {
    let tickerArray: TickerData[] = [{
        symbol: "",
        lastPrice: 0
    }, {
        symbol: "",
        lastPrice: 0
    }];

    const [ticker, setTicker] = useState<TickerData[]>(tickerArray);
    let symbols = ["BTCUSDT", "ETHUSDT"]

    useEffect(() => {
        const endpoint = "wss://stream.bybit.com/v5/public/spot"
        const ws = new WebSocket(endpoint);
        const apiCall = {"op": "subscribe", "args": ["tickers.BTCUSDT", "tickers.ETHUSDT"]};
        ws.onopen = () => {
            console.log('"open" event!');
            console.log('WebSocket Client Connected');
            setInterval(() => {
            }, 3000);
            ws.send(JSON.stringify(apiCall));
        };

        //  購読した値を取得
        ws.onmessage = (event) => {
            const json = JSON.parse(event.data);
            try {
                if (json.data !== undefined) {
                    if (json.data.symbol === symbols[0]) {
                        let lastPrice = Number(json.data.lastPrice)
                        const tmp = [...tickerArray];
                        tmp[0].symbol = json.data.symbol;
                        tmp[0].lastPrice = lastPrice;
                        setTicker(() => tmp);
                    }
                    if (json.data.symbol === symbols[1]) {
                        let lastPrice = Number(json.data.lastPrice)
                        const tmp = [...tickerArray];
                        tmp[1].symbol = json.data.symbol;
                        tmp[1].lastPrice = lastPrice;
                        setTicker(() => tmp);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
    }, [])

    return (
        <main>
            <div>
                <ul>
                    <li>
                        {ticker[0].symbol}
                    </li>
                    <li>
                        last : {ticker[0].lastPrice}
                    </li>

                    <li>
                        {ticker[1].symbol}
                    </li>
                    <li>
                        last : {ticker[1].lastPrice}
                    </li>
                </ul>
            </div>
        </main>
    );
}

export default App;