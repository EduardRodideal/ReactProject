import React from "react";

export const Service = ({ services }) => {
  return (
    <div className="services-center">
      {services.map((item, index) => {
        return (
          <article key={index} className="service">
            <span>{item.icon}</span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
          </article>
        );
      })}
    </div>
  );
};
