// GET /api/tasks/refresh

import { Task, TaskList } from "../../../interfaces";
import prisma from "../../../lib/prisma";

// Required fields in query: token
export default async function handle(req, res) {
  const baseUrl = "https://graph.microsoft.com/v1.0/me/todo/lists";
  const token = req.query.token;

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

  await fetch(baseUrl, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      data.value.map(async (taskList: TaskList) => {
        await prisma.taskList
          .create({
            data: {
              id: taskList.id,
              creatorId: 1,
              displayName: taskList.displayName,
              isOwner: taskList.isOwner,
              isShared: taskList.isShared,
              title: taskList.title,
              wellknownListName: taskList.wellknownListName,
            },
          })
          .then(async (taskList) => {
            const url = baseUrl + `${taskList.id}/tasks`;
            const tasks = await getTasks(url, token);
            saveTasks(tasks, taskList.id);
          })
          .catch((error) => console.error("failed to save task list", error));
      });
      return data;
    })

    .catch((reason) => console.warn("reason", reason));
}
