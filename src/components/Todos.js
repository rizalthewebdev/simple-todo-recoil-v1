import React from "react";
import { atom,  useRecoilState } from "recoil";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import useLocalStorage from "../hooks/useLocalStorage";

const Todos = () => {
   const [saveTodos, setSaveTodos] = useLocalStorage("todos", []);

   const todoListState = atom({
      key: "todoListState",
      default: saveTodos,
   });

   const [todoList, setTodo] = useRecoilState(todoListState);


   const deleteTodo = (i) => {
      setTodo((oldTodo) => {
         const newTodo = oldTodo.filter((todo, index) => {
            return index !== i;
         });
         setSaveTodos(newTodo);
         return newTodo;
      });
   };

   const setComplete = (i) => {
      setTodo((oldTodo) => {
         const completedTodo = oldTodo.map((todo, index) => {
            if (index === i) {
               return {
                  ...todo,
                  isComplete: !todo.isComplete,
               };
            } else {
               return todo;
            }
         });
         setSaveTodos(completedTodo);
         return completedTodo;
      });
   };

   return (
      <>
         <div className="w-full flex flex-col items-center bg-gray-100 rounded-2xl shadow-lg shadow-gray-400/70 border border-gray-400/70 divide-y divide-gray-300 relative">
            {todoList.map((todo, index) => (
               <div
                  key={index}
                  className="flex items-center justify-between w-full py-3 px-3"
               >
                  <div className="flex items-center gap-x-3 md:gap-x-5">
                     {todo.isComplete ? (
                        <BsCheckCircleFill
                           fontSize={25}
                           className="text-blue-700 cursor-pointer hover:scale-110"
                           onClick={() => setComplete(index)}
                        />
                     ) : (
                        <BsCheckCircle
                           fontSize={25}
                           className="text-gray-600/80 cursor-pointer hover:scale-110 hover:text-blue-700"
                           onClick={() => setComplete(index)}
                        />
                     )}

                     <p
                        className={`text-lg ${
                           todo.isComplete
                              ? "text-gray-500 line-through"
                              : "text-black "
                        }`}
                     >
                        {todo.todo}
                     </p>
                  </div>
                  <div className="flex items-center gap-x-3">
                     <button
                        className="button"
                        onClick={() => deleteTodo(index)}
                     >
                        Delete
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </>
   );
};

export default Todos;
