// GET /api/tasks/list

import { TaskList } from "../../../interfaces";
import prisma from "../../../lib/prisma";

// Required fields in query: token
export default async function handle(req, res) {
  // const baseUrl = "https://graph.microsoft.com/v1.0/me/todo/lists";
  // const token = req.query.token;

  // const returnData = await fetch(baseUrl, {
  //   headers: { Authorization: `Bearer ${token}` },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     data.value.map(async (taskList: TaskList) => {
  //       await prisma.taskList
  //         .create({
  //           data: {
  //             id: taskList.id,
  //             creatorId: 1,
  //             displayName: taskList.displayName,
  //             isOwner: taskList.isOwner,
  //             isShared: taskList.isShared,
  //             title: taskList.title,
  //             wellknownListName: taskList.wellknownListName,
  //           },
  //         })
  //         .then((taskList) => {
  //           console.log("saved task list");
  //           res.json(taskList);
  //         })
  //         .catch((error) => console.error("failed to save task list", error));
  //     });
  //     return data;
  //   })
  //   .catch((err) => res.json(err.body));
  await prisma.taskList
    .findMany()
    .then((taskLists) => res.json(taskLists))
    .catch((err) => res.json(err));
}
