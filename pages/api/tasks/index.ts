// GET /api/tasks
// Required fields in query: taskListId
// Required fields in query: token
export default async function handle(req, res) {
  const baseUrl = "https://graph.microsoft.com/v1.0/me/todo/lists/";
  // todo/lists/${todoList.id}/tasks?$count=true
  const token = req.query.token;
  const taskListId = req.query.taskListId;
  const url = baseUrl + `${taskListId}/tasks`;
  const data = await getTasks(url, token);

  res.json(data);
}

const getTasks = async (url: string, token: string) => {
  const data = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => err.body);

  const values = data.value ? [...data.value] : [];
  if (data["@odata.nextLink"]) {
    // console.warn(data["@odata.nextLink"]);
    return values.concat(await getTasks(data["@odata.nextLink"], token));
  } else {
    return values;
  }
};
