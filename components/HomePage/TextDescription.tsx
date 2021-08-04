import React from "react";
import style from "./TextDescription.module.css";

export const TextDescription = () => {
  return (
    <div className={`${style.textContainer} mt-5`}>
      <h1>
        Get an insight into your
        <br /> Microsoft To Do lists
      </h1>
      <p className={`${style.subtext} mt-3`}>
        Todocharts provides you with analytics about your <br />
        Microsoft To Do tasks and helps you keep track your productivity
      </p>
    </div>
  );
};
