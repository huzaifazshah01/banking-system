import { useEffect, useState } from "react";
import API from "../services/api";

function BankerDashboard() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const loadCustomers = async () => {
    try {
      const res = await API.get("/banker/customers");
      setCustomers(res.data);
    } catch {
      setError("Access denied or session expired");
    }
  };

  const loadTransactions = async (customer) => {
  setSelectedCustomer(customer);
  setEditName(customer.name);
  setEditEmail(customer.email);

  const res = await API.get(`/banker/transactions/${customer.id}`);
  setTransactions(res.data);
};

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <div className="container">
      <div className="card" style={{ width: "500px" }}>
        <h2>Banker Dashboard</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <h3>Customers</h3>

        {customers.length === 0 && <p>No customers found</p>}

        <ul>
          {customers.map((c) => (
            <li
              key={c.id}
              style={{ cursor: "pointer", marginBottom: "6px" }}
              onClick={() => loadTransactions(c)}
            >
              {c.name} ({c.email})
            </li>
          ))}
        </ul>
      {selectedCustomer && (
        <>
          <h3>Edit Customer</h3>

          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Name"
          />

          <input
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Email"
          />

          <button
            onClick={async () => {
              await API.put(`/banker/customers/${selectedCustomer.id}`, {
                name: editName,
                email: editEmail
              });
              alert("Customer updated");
              loadCustomers();
            }}
          >
            Update Customer
          </button>
        </>
      )}

        {selectedCustomer && (
          <>
            <h3 style={{ marginTop: "16px" }}>
              Transactions — {selectedCustomer.name}
            </h3>

            {transactions.length === 0 && <p>No transactions</p>}

            <ul>
              {transactions.map((t) => (
                <li key={t.id}>
                  {t.type.toUpperCase()} ₹{t.amount} → ₹{t.balance}
                </li>
              ))}
            </ul>
          </>
        )}

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

export default BankerDashboard;
