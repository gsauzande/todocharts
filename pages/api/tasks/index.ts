// GET /api/tasks
// Required fields in query: taskListId

import { Task } from "../../../interfaces";
import prisma from "../../../lib/prisma";

// Required fields in query: token
export default async function handle(req, res) {
  console.warn("here");
  // const tasks = await prisma.task.findMany();
  // if (tasks) {
  //   res.json(tasks);
  // }

  const baseUrl = "https://graph.microsoft.com/v1.0/me/todo/lists/";
  // todo/lists/${todoList.id}/tasks?$count=true
  const token = req.query.token;
  const taskListId = req.query.taskListId;
  const url = baseUrl + `${taskListId}/tasks`;
  // const data = await getTasks(url, token);

  await prisma.task
    .findMany({ where: { taskListId: taskListId } })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => res.json(err));
  // saveTasks(data, taskListId);
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

const saveTasks = (tasks: Task[], taskListId: string) => {
  if (!tasks) return;
  tasks.forEach(async (task) => {
    await prisma.task
      .createMany({
        data: {
          id: task.id,
          importance: task.importance,
          isReminderOn: task.isReminderOn,
          status: task.status,
          title: task.title,
          taskListId: taskListId,
          createdDateTime: task.createdDateTime,
          lastModifiedDateTime: task.lastModifiedDateTime,
          dueDateTime: task.dueDateTime?.dateTime,
          completedDateTime: task.completedDateTime?.dateTime,
          body: task.body.content,
        },
      })
      .then((_task) => {
        console.warn("saved task");
      })
      .catch((error) => console.error("failed to save task", error));
  });
};
