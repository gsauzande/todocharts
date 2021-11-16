import React from "react";
import moment from "moment";
import { Task } from "../interfaces";
import SimpleCard from "./SimpleCard/SimpleCard";
import { Spinner } from "react-bootstrap";

type Props = {
  tasks: Task[];
  isLoading: boolean;
};
export const TaskLister = ({ tasks, isLoading }: Props) => {
  const groupTasks = (): [] => {
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
    const sortedDates = Object.keys(groupedTasks).sort(function (a, b) {
      return new Date(b).getTime() - new Date(a).getTime();
    });
    return sortedDates.map((date) => (
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
    ));
  };
  return (
    <SimpleCard
      isLoading={isLoading}
      content={renderGroupedTasks()}
      title="Task list(ordered by creation date)"
      scrollable={true}
    />
  );
};
