// GET /api/tasks/list
// Required fields in query: token
export default async function handle(req, res) {
  const baseUrl = "https://graph.microsoft.com/v1.0/me/todo/lists";
  const token = req.query.token;

  const returnData = await fetch(baseUrl, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => res.json(err.body));
  res.json(returnData);
}
