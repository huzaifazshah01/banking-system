export default async function handler(req, res) {
  const backendUrl = "http://16.171.206.151:5000";

  const url = backendUrl + req.url.replace("/api", "");

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

  const data = await response.text();
  res.status(response.status).send(data);
}
