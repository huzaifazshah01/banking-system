import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerLogin from "./src/pages/CustomerLogin";
import BankerLogin from "./src/pages/BankerLogin";
import Transactions from "./src/pages/Transactions";
import BankerDashboard from "./src/pages/BankerDashboard";

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
