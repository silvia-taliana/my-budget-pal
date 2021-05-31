import React from "react";
import loading from "./assets/Dollar-black-coin.gif";
import "./loading.css";

function Loading() {
    return (
        <div className="spinner" id="loadingSymbol">
            <img src={loading} alt="Loading" />
        </div>
    )
};

export default Loading;