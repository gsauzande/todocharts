import React from "react";
import { Badge } from "react-bootstrap";

type Props = {
  title: string;
  onClick: (hashtag: string) => void;
};
export const HashtagBadge = ({ title, onClick }: Props) => {
  return (
    <>
      <Badge
        variant="info"
        pill
        style={{ cursor: "pointer" }}
        onClick={() => onClick(title)}
      >
        {`#${title}`}
      </Badge>
      &nbsp;
    </>
  );
};
