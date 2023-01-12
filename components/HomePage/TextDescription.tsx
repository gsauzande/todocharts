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
        Improve team efficiency and achieve more with <br />
        Todocharts real-time analytics for Microsoft To Do
      </p>
    </div>
  );
};
