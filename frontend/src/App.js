import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerLogin from "./pages/CustomerLogin";
import BankerLogin from "./pages/BankerLogin";
import Transactions from "./pages/Transactions";
import BankerDashboard from "./pages/BankerDashboard";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLogin />} />
        <Route path="/banker-login" element={<BankerLogin />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/banker" element={<BankerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
