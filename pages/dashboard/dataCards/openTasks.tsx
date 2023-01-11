import * as React from "react";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import { Task } from "../../../interfaces";
import styles from "../index.module.css";

type Props = {
  loading: boolean;
  tasks: Task[];
};
export const OpenTasks = ({ loading, tasks }: Props) => {
  const getOpenTasks = () => {
    return tasks ? tasks.filter((task) => task.status !== "completed") : [];
  };

  return (
    <SimpleCard
      isLoading={loading}
      content={
        <span className={styles.cardText}>
          {getOpenTasks()?.length.toString()}
        </span>
      }
      title="Total open tasks"
    />
  );
};
