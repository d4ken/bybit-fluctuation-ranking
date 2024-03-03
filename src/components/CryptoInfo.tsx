import React from "react";
import {TickerData} from "types/Ticker";

// type TickerProps = {
//     symbol: string,
//     lastPrice: number
// }

const CryptoInfo: React.FC<TickerData> = (props) => {
         return <div>
             <li>{props.symbol}</li>
             <li>{props.lastPrice}</li>
         </div>
}

export default CryptoInfo;