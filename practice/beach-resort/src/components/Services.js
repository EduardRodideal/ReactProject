import React from "react";
import { Title } from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
import { Service } from "./Service";

export const Services = () => {
  const initialServices = [
    {
      icon: <FaCocktail />,
      title: "free Cocktails",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?"
    },
    {
      icon: <FaHiking />,
      title: "Endless Hiking",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?"
    },
    {
      icon: <FaShuttleVan />,
      title: "Free Shuttle",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?"
    },
    {
      icon: <FaBeer />,
      title: "Strongest Beer",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?"
    }
  ];

  return (
    <section className="services">
      <Title title="services" />
      <Service services={initialServices} />
    </section>
  );
};
