import React, { useContext } from "react";
import { TimeContext } from "../../../context";
import { MonthView } from "./MonthView";
import { TasksForDay } from "./TasksForDay";
import {YearView} from "./YearView";
import {DecadeView} from "./DecadeView";
import {FormTask} from "./FormTask";

export const Calendar = () => {
  const { isMonth, isYear, isDecade } = useContext(TimeContext);
  return (
    <>
      {isMonth && <MonthView />}
      {isYear && <YearView />}
      {isDecade && <DecadeView />}
      <TasksForDay />
      <FormTask />
    </>
  );
};
