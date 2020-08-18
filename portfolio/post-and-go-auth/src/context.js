import React, { useState, createContext, useEffect } from "react";
import { firebase } from "./firebase";
import jwtDecode from "jwt-decode";

export const TimeContext = createContext();

export const TimeContextProvider = ({ children }) => {
  //holds the date of the calendar
  const [date, setDate] = useState(new Date());
  //helps for date to be updated
  const [check, setCheck] = useState(0);
  //if true shows the month in Calendar
  const [isMonth, setIsMonth] = useState(true);
  //if true shows the year in Calendar
  const [isYear, setIsYear] = useState(false);
  //if true shows the decade in Calendar
  const [isDecade, setIsDecade] = useState(false);
  //handle Add Description in FormTask
  const [description, setDescription] = useState("");

  //if true shows that tasks are loading from the firebase
  const [loading, setLoading] = useState(true);
  //holds each day of the month that has a task
  const [dayWidthTask, setDayWidthTask] = useState([]);

  const [show, setShow] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  //holds clock in FormTask
  const [hour, setHour] = useState("07:00");
  //holds title in FormTask
  const [title, setTitle] = useState("");
  //holds invitation in FormTask
  const [invitation, setInvitation] = useState("");
  //holds location in FormTask
  const [location, setLocation] = useState("");
  //use this for controlling commits in firebase
  const [commit, setCommit] = useState(false);
  //used for controlling appearance of FormTaskModal
  const [isModal, setIsModal] = useState(false);

  //holds the value of calendar in TaskForm
  const selectedDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() < 10
      ? "0" + (date.getMonth() + 1)
      : +(date.getMonth() + 1)) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

  //set tasks in FormTask
  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.length !== 0) {
      setCommit(!commit);
      setIsModal(false);
    }
  };

  //add items to firebase
  useEffect(() => {
    //prevent commiting when components mounts
    if (title.length !== 0) {
      const token = localStorage.FBIdToken;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;
      const timeForId = new Date();
      const db = firebase.firestore();
      db.collection("items")
        .add({
          idTask: parseInt(
            "" +
              timeForId.getDate() +
              timeForId.getMonth() +
              timeForId.getFullYear() +
              timeForId.getHours() +
              timeForId.getMinutes() +
              (timeForId.getSeconds() < 10
                ? "0" + timeForId.getSeconds()
                : timeForId.getSeconds())
          ),
          monthYear: "" + date.getMonth() + date.getFullYear(),
          month: date.getMonth(),
          year: date.getFullYear(),
          day: date.getDate(),
          executed: false,
          title: title,
          date: "" + date.getDate() + date.getMonth() + date.getFullYear(),
          hour: hour,
          invitation: invitation,
          location: location,
          description: description,
          userId: userId,
        })
        .then(() => {
          setTitle("");
          setHour("07:00");
          setLocation("");
          setInvitation("");
          setDescription("");
          setCheck(0);
        });
    }
  }, [commit]);

  //custom hook for firestore lisener and for
  //retriving information when date is changed
  const useItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
      const token = localStorage.FBIdToken;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;
      const itemDay =
        "" + date.getDate() + date.getMonth() + date.getFullYear();


      const unsubscribe = firebase
        .firestore()
        .collection("items")
        .where("date", "==", itemDay)
        .where("userId", "==", userId)
        .orderBy("idTask")
        .onSnapshot((snapshot) => {
          const newItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setItems(newItems);
        });
      return () => unsubscribe();
    }, [date, check]);
    return items;
  };

  //read tasks from firebase per month
  useEffect(() => {
    const token = localStorage.FBIdToken;
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;

    const itemMonthYear = "" + date.getMonth() + date.getFullYear();
    let firebaseArray = [];
    let daysHaveTask = [];
    const db = firebase.firestore();
    db.collection("items")
      .where("monthYear", "==", itemMonthYear)
      .where("userId", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          firebaseArray.push(doc.data());
        });
      })
      .then(() => {
        for (let i = 0; i < firebaseArray.length; i++) {
          daysHaveTask.push(firebaseArray[i].day);
        }
        setDayWidthTask(daysHaveTask);
        setLoading(false);
      });
  }, [date, check]);

  const toggleExecution = (id, executed, e) => {
    e.stopPropagation();
    console.log("toggleExecution");
    const db = firebase.firestore();
    db.collection("items").doc(id).update({
      executed: !executed,
    });
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    console.log("deleteTask");
    const db = firebase.firestore();
    db.collection("items").doc(id).delete();
  };

  // const handleTitleClick = (desc,hour,invit,loc,day,month,title,ex) => {
  //   console.log(hour,"the hour of the meeting");
  // }

  return (
    <TimeContext.Provider
      value={{
        date,
        setDate,
        setCheck,
        check,
        isMonth,
        setIsMonth,
        isYear,
        setIsYear,
        isDecade,
        setIsDecade,
        description,
        setDescription,
        handleSubmit,
        useItems,
        loading,
        setLoading,
        dayWidthTask,
        setDayWidthTask,
        toggleExecution,
        deleteTask,
        show,
        setShow,
        showCalendar,
        setShowCalendar,
        hour,
        setHour,
        selectedDate,
        title,
        setTitle,
        invitation,
        setInvitation,
        location,
        setLocation,
        isModal,
        setIsModal,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};
