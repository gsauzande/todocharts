import React from "react";
import { Card } from "react-bootstrap";
import "./SimpleCard.module.css";

type Props = {
  title: string;
  content: React.ReactNode;
  scrollable?: boolean;
};

export default function SimpleCard({ content, scrollable, title }: Props) {
  const renderContent = () => {
    if (scrollable) {
      return <div className="scrollable">{content}</div>;
    }
    return <div>{content}</div>;
  };

  return (
    <Card className="card top-border-highlight">
      <h1 className="card-small-title">{title}</h1>
      {renderContent()}
    </Card>
  );
}
