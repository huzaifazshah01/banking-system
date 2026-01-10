import { useEffect, useState } from "react";
import API from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  const load = async () => {
    const res = await API.get("/transactions");
    setTransactions(res.data.transactions);
    setBalance(res.data.balance);
  };

  useEffect(() => {
    load();
  }, []);

  const deposit = async () => {
    await API.post("/transactions/deposit", { amount });
    setAmount("");
    load();
  };

 const withdraw = async () => {
  try {
    await API.post("/transactions/withdraw", { amount });
    setAmount("");
    load();
  } catch (err) {
    if (err.response && err.response.status === 400) {
      alert(err.response.data.message); 
    } else {
      alert("Something went wrong");
    }
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="card">
        <h2>My Account</h2>

        <p><strong>Balance:</strong> ₹{balance}</p>

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={deposit}>Deposit</button>
        <button onClick={withdraw} style={{ marginTop: "8px", background: "#dc2626" }}>
          Withdraw
        </button>

        <ul style={{ marginTop: "16px" }}>
          {transactions.map((t) => (
            <li key={t.id}>
              {t.type.toUpperCase()} ₹{t.amount} → ₹{t.balance}
            </li>
          ))}
        </ul>

        <button
          onClick={logout}
          style={{ marginTop: "16px", background: "#6b7280" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Transactions;
