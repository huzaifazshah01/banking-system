// const { v4: uuidv4 } = require("uuid");
// const User = require("../models/userModel");
// const tokens = require("../middleware/tokenStore");

// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password)
//     return res.status(400).json({ message: "Missing credentials" });

//   User.findByEmail(email, (err, results) => {
//     if (err) return res.status(500).json(err);

//     if (results.length === 0)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const user = results[0];

//     if (user.password !== password)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const token = uuidv4(); 
//     tokens.set(token, { id: user.id, role: user.role });

//     res.json({
//       token,
//       role: user.role,
//       userId: user.id
//     });
//   });
// };

const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");
const tokens = require("../middleware/tokenStore");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    const results = await User.findByEmail(email);

    if (!results || results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = uuidv4();
    tokens.set(token, { id: user.id, role: user.role });

    res.json({
      token,
      role: user.role,
      userId: user.id
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
