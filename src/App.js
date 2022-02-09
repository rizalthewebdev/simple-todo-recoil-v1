import React from "react";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { BsPlusLg } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { modalAddTodoState} from "./atoms/addTodoState";

const App = () => {
   const dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ];

   const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];
   const date = new Date();
   let day = date.getDay();
   let numberOfDate = date.getDate();
   let month = date.getMonth();

   const theDate = `${dayOfWeek[day]}, ${numberOfDate} ${monthNames[month]}`;
   const setOpenModal = useSetRecoilState(modalAddTodoState);

   return (
      <div className="w-screen h-screen bg-gray-300 flex flex-col items-center justify-start">
         <h1 className="text-center py-10 text-blue-700 tracking-wide text-2xl md:text-3xl">
            Todo List With React &#38; Recoil
         </h1>
         <div className="w-10/12 md:w-8/12 lg:w-6/12 flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-between w-full">
               <h5 className="text-lg">{theDate}</h5>
               <div
                  className="fixed bottom-10 right-10 md:static flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white cursor-pointer shadow-lg"
                  onClick={() => setOpenModal(true)}
               >
                  <BsPlusLg fontSize={16} />
               </div>
            </div>
            <Todos />
            <AddTodo />
         </div>
      </div>
   );
};

export default App;
