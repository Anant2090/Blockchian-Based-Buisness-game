import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThirdwebProvider, useActiveAccount } from "thirdweb/react";
import ContentCard from "./components/ContentCard";
import ConnectButtonAuth from "./components/ConnectButtonAuth";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
// const acc=useActiveAccount()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
