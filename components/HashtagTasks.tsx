import React, { useMemo } from "react";
import { Task } from "../interfaces";
import { HashtagBadge } from "./HashtagBadge";
import SimpleCard from "./SimpleCard/SimpleCard";

type Props = {
  taskList: Task[];
};
export const HashtagTasks = ({ taskList }: Props) => {
  const getHashtags = (inputText) => {
    const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    const matches = [];
    let match;

    while ((match = regex.exec(inputText))) {
      matches.push(match[1]);
    }

    return matches;
  };
  const hashtags = useMemo(
    () => [
      ...Array.from(
        new Set(taskList.map((task) => getHashtags(task.title)).flat())
      ),
    ],
    [taskList]
  );
  const filterOnHashtag = (hashtag: string) => {
    console.warn("clicked", hashtag);
  };

  return (
    <SimpleCard
      content={
        <>
          {hashtags.map((hashtag, index) => (
            <HashtagBadge
              title={hashtag}
              onClick={filterOnHashtag}
              key={index}
            />
          ))}
        </>
      }
      title="Task list"
      scrollable={true}
    />
  );
};
