const LEGACY_KEY = "inventario-panineria-state"; // "cucina" keeps the original key so existing data isn't lost
const ALLOWED_DEPTS = ["cucina", "cassieri"];

function redisKeyFor(dept) {
  return dept === "cassieri" ? "inventario-panineria-state-cassieri" : LEGACY_KEY;
}

async function redis(command) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    var err = new Error("missing_env");
    err.code = "missing_env";
    throw err;
  }
  const r = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });
  if (!r.ok) {
    throw new Error("redis_http_" + r.status);
  }
  const data = await r.json();
  return data.result;
}

module.exports = async (req, res) => {
  try {
    const dept = ALLOWED_DEPTS.indexOf(req.query && req.query.dept) !== -1 ? req.query.dept : "cucina";
    const key = redisKeyFor(dept);

    if (req.method === "GET") {
      const raw = await redis(["GET", key]);
      const payload = raw ? JSON.parse(raw) : { state: null, updatedAt: 0 };
      res.status(200).json(payload);
      return;
    }

    if (req.method === "POST") {
      const body = typeof req.body === "object" && req.body ? req.body : JSON.parse(req.body || "{}");
      const payload = { state: body.state, updatedAt: Date.now() };
      await redis(["SET", key, JSON.stringify(payload)]);
      res.status(200).json(payload);
      return;
    }

    res.status(405).json({ error: "method_not_allowed" });
  } catch (err) {
    var code = (err && err.code) || "server_error";
    res.status(500).json({ error: code, message: String((err && err.message) || err) });
  }
};
