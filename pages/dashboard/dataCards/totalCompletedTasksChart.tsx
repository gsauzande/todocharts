import * as React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import { Task } from "../../../interfaces";

type Props = {
  loading: boolean;
  tasks: Task[];
};
export const TotalCompletedTasksChart = ({ loading, tasks }: Props) => {
  const getGroupedTasks = () => {
    let finalObj: any = {};

    tasks?.forEach((task) => {
      if (task.completedDateTime) {
        const date = task.completedDateTime.dateTime.split("T")[0];
        if (finalObj[date]) {
          finalObj[date].push(task);
        } else {
          finalObj[date] = [task];
        }
      }
    });

    return finalObj;
  };

  const chartData = () => {
    const groupedTasks = getGroupedTasks();
    const sortedDates = Object.keys(groupedTasks)
      .sort(function (a, b) {
        return new Date(b).getTime() - new Date(a).getTime();
      })
      // Setting the cap at 30 days
      .slice(0, 29);

    return sortedDates.map((date) => ({
      name: date,
      tasks: groupedTasks[date].length,
    }));
  };

  return (
    <SimpleCard
      isLoading={loading}
      content={
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            width={200}
            height={60}
            data={chartData()}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis dataKey="tasks" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="tasks"
              stroke="#08D9D6"
              fill="#08D9D6"
            />
          </AreaChart>
        </ResponsiveContainer>
      }
      title="Total completed tasks(last 30 days)"
    />
  );
};
