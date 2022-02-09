import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { modalAddTodoState } from "../atoms/addTodoState";
import { addInputState } from "../atoms/addTodoState";
import useLocalStorage from "../hooks/useLocalStorage";

const AddTodo = () => {
   const [saveTodos, setSaveTodos] = useLocalStorage("todos", []);

   const todoListState = atom({
      key: "todoListState",
      default: saveTodos,
   });

   const [isOpen, setIsOpen] = useRecoilState(modalAddTodoState);
   const [newTodo, setNewTodo] = useRecoilState(addInputState);
   const setTodoList = useSetRecoilState(todoListState);

   const addNewTodo = async (e) => {
      e.preventDefault();
      if (!newTodo.length) return;
      const newTodoList = {
         todo: newTodo,
         isComplete: false,
      };
      setTodoList((oldTodo) => {
         const addTodo = [...oldTodo, newTodoList];

         setSaveTodos(addTodo)
         return addTodo;
      });
      setNewTodo("");
      setIsOpen(false);
   };

   const cancelAdd = (e) => {
      e.preventDefault();
      if (newTodo.length) setNewTodo("");
      setIsOpen(false);
   };

   return (
      <Transition.Root show={isOpen} as={Fragment}>
         <Dialog
            as="div"
            className="fixed z-50 inset-0 pt-8"
            onClose={setIsOpen}
         >
            <div className="flex items-center justify-center h-screen">
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <Dialog.Overlay className="fixed inset-0 bg-zinc-800/80 transition-opacity" />
               </Transition.Child>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
               >
                  <div className="w-full md:w-8/12 lg:w-5/12 h-2/5 bg-gray-300 md:rounded-2xl z-[100]">
                     <div className="flex flex-col h-full justify-between">
                        <h3 className="text-2xl w-full text-center py-4 bg-blue-600 md:rounded-t-2xl text-white">
                           Add New Todo
                        </h3>
                        <div className="flex justify-center w-full">
                           <input
                              type="text"
                              placeholder="What you want to do today ?"
                              className="md:w-2/4 w-3/4 py-3 px-4 rounded-lg shadow-lg placeholder:text-gray-500"
                              onChange={(e) => setNewTodo(e.target.value)}
                              value={newTodo}
                           />
                        </div>
                        <div className="flex justify-end items-center gap-5 mr-10 mb-5">
                           <button className="button" onClick={addNewTodo}>
                              Add Todo
                           </button>
                           <button
                              className="button bg-transparent text-blue-600 hover:bg-blue-200"
                              onClick={cancelAdd}
                           >
                              Cancel
                           </button>
                        </div>
                     </div>
                  </div>
               </Transition.Child>
            </div>
         </Dialog>
      </Transition.Root>
   );
};

export default AddTodo;
