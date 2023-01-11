import * as React from "react";
import moment from "moment";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import { Task } from "../../../interfaces";
import styles from "../index.module.css";

type Props = {
  loading: boolean;
  tasks: Task[];
};

export const DailyCompletedTasks = ({ loading, tasks }: Props) => {
  const getTasksCompletedToday = (): Task[] =>
    tasks.filter((task) => {
      if (!task.completedDateTime) return false;
      return moment
        .utc(task.completedDateTime.dateTime)
        .local()
        .isSame(moment().format().length.toString(), "day");
    });

  return (
    <SimpleCard
      isLoading={loading}
      content={
        <span className={styles.cardText}>
          {getTasksCompletedToday().length}
        </span>
      }
      title="Total completed tasks today"
    />
  );
};
