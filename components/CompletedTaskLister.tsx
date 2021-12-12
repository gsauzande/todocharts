import React from "react";
import moment from "moment";
import { Task } from "../interfaces";
import SimpleCard from "./SimpleCard/SimpleCard";

type Props = {
  tasks: Task[];
  isLoading: boolean;
};
export const CompletedTaskLister = ({ tasks, isLoading }: Props) => {
  const groupTasks = (): [] => {
    let finalObj: any = {};

    tasks?.forEach((task) => {
      if (task.completedDateTime?.dateTime) {
        const date = task.completedDateTime?.dateTime.split("T")[0];
        if (finalObj[date]) {
          finalObj[date].push(task);
        } else {
          finalObj[date] = [task];
        }
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
          <b>{moment(date).format("dddd, MMMM Do YYYY")}</b>
        </div>
        {groupedTasks[date].map((task: Task) => {
          return (
            <div className="task-text" key={task.id}>
              ✅ &nbsp; {task.title}
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
      title="Completed tasks(ordered by completion date)"
      scrollable={true}
    />
  );
};
