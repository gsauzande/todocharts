import React from "react";
import { Card, Spinner } from "react-bootstrap";
import styles from "./SimpleCard.module.css";

type Props = {
  title: string;
  content: React.ReactNode;
  scrollable?: boolean;
  isLoading?: boolean;
};

export default function SimpleCard({
  content,
  scrollable,
  title,
  isLoading,
}: Props) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
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
