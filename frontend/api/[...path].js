export default async function handler(req, res) {
  const backendBase = "http://16.171.206.151:5000";

  const path = req.query.path.join("/");
  const url = `${backendBase}/api/${path}`;

  const response = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      ...(req.headers.authorization && {
        Authorization: req.headers.authorization,
      }),
    },
    body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
  });

  const text = await response.text();
  res.status(response.status).send(text);
}
