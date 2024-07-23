// App.jsx
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "./thirdweb.svg";
import { client } from "./client";
import ContentCard from "./components/ContentCard";
import ConnectButtonAuth from "./components/ConnectButtonAuth";
import { useActiveAccount } from "thirdweb/react";
import { useEffect } from "react";
import { useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
function MainComponent() {
  const navigate = useNavigate();
  const acc = useActiveAccount();

  useEffect(() => {
    if (acc?.address) {
      navigate("/Home");
    }
  }, [acc?.address, navigate]);

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <ContentCard content="Fully customize your auth flow using prebuilt components or easy to use functions.">
        <ConnectButtonAuth />
      </ContentCard>
    </main>
  );
}

export function App() {
  return (

      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Shop" element={<Shop/>}/>
      </Routes>
  );
}

export default App;
