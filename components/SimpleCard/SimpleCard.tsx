import React from "react";
import { Card } from "react-bootstrap";
import styles from "./SimpleCard.module.css";

type Props = {
  title: string;
  content: React.ReactNode;
  scrollable?: boolean;
};

export default function SimpleCard({ content, scrollable, title }: Props) {
  const renderContent = () => {
    if (scrollable) {
      return <div className={styles.scrollable}>{content}</div>;
    }
    return <div>{content}</div>;
  };

  return (
    <Card className={`${styles.card} ${styles.topBorderHighlight}`}>
      <h1 className={styles.cardSmallTitle}>{title}</h1>
      {renderContent()}
    </Card>
  );
}
