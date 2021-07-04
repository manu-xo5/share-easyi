import React from "react";

function Instructions() {
  return (
    <section className="instruction">
      <p>Instructions:</p>
      <ol className="instruction__list">
        <li>Click on avator</li>
        <li>Choose one or more files (folder not supported)</li>
        <li>Done!</li>
      </ol>
    </section>
  );
}

export default Instructions;
