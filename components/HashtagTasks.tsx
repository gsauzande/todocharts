import React from "react";
import { Task } from "../interfaces";
import SimpleCard from "./SimpleCard/SimpleCard";

type Props = {
  taskList: Task[];
};
export const HashtagTasks = ({}: Props) => {
  return (
    <SimpleCard
      content={<p>Show all hashtags found in tasks</p>}
      title="Task list"
      scrollable={true}
    />
  );
};
