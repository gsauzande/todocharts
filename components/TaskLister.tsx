import React from "react";
import moment from "moment";
import { Task } from "../interfaces";
import SimpleCard from "./SimpleCard/SimpleCard";

type Props = {
  tasks: Task[];
};
export const TaskLister = ({ tasks }: Props) => {
  const groupTasks = () => {
    let finalObj: any = {};

    tasks?.forEach((task) => {
      const date = task.createdDateTime.split("T")[0];
      if (finalObj[date]) {
        finalObj[date].push(task);
      } else {
        finalObj[date] = [task];
      }
    });

    return finalObj;
  };
  const renderGroupedTasks = () => {
    const groupedTasks = groupTasks();
    return Object.keys(groupedTasks).map((date) => {
      return (
        <div key={date}>
          <div className="task-date">
            <b>{moment(date).format("LL")}</b>
          </div>
          {groupedTasks[date].map((task: Task) => {
            if (task.completedDateTime) {
              return (
                <div className="task-text" key={task.id}>
                  <s key={task.id}>{task.title}</s>
                </div>
              );
            }
            return (
              <div className="task-text" key={task.id}>
                ➖ {task.title}
              </div>
            );
          })}
        </div>
      );
    });
  };
  return (
    <SimpleCard
      content={renderGroupedTasks()}
      title="Task list"
      scrollable={true}
    />
  );
};
