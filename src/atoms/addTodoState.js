import { atom } from "recoil";

export const addInputState = atom({
   key: "inputTodo",
   default: "",
});

export const modalAddTodoState = atom({
   key: "modalAdd",
   default: false,
});

export const todoListFilterState = atom({
   key: 'todoListFilterState',
   default: 'Show All',
 });