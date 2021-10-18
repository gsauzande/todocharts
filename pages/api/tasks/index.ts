// GET /api/tasks
// Required fields in query: taskListId
// Required fields in query: token
export default async function handle(req, res) {
  const baseUrl = "https://graph.microsoft.com/v1.0/me/todo/lists/";
  // todo/lists/${todoList.id}/tasks?$count=true
  const token = req.query.token;
  const taskListId = req.query.taskListId;
  const url = baseUrl + `${taskListId}/tasks`;
  const data = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => res.json(err.body));

  res.json(data);
}
