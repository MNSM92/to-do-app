"use client";

import Image from "next/image";

import React from "react";
import AddTask from "./AddTask.tsx";
import TaskList from "./TaskList.tsx";
import TaskListDone from "./TaskListDone.tsx";
import { TasksProvider } from "./TasksContext.tsx";

export default function Home(): any {
  return (
    <div className="w-full h-full">
      <div className="flex flex-row justify-center w-auto h-auto pt-10">
        <TasksProvider>
          <div>
            <p className="text-2xl text-center font-bold p-4">TODO LIST</p>
            <p className="text-md text-left font-bold">ADD ITEM</p>
            <div className="border-t-2 py-2"></div>
            <AddTask />
            <p className="text-md text-left font-bold pt-2">TODO</p>
            <div className="border-t-2 py-2"></div>
            <TaskList />
            <p className="text-md text-left font-bold pt-2">COMPLETED</p>
            <div className="border-t-2 py-2"></div>
            <TaskListDone />
            <Footer />
          </div>
        </TasksProvider>
      </div>
    </div>
  );
}



const Footer = () => {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} TheChangedCompany. All the rights reserved.
      </p>
    </footer>
  );
};
