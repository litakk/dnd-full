import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useContext, useEffect, useState } from "react";
import { TaskCard } from "./Task";
import { TaskType } from "@/types";
import { ReloadCTX } from "@/contexts/reload";
import Modal from "./Modal";



interface ColumnProps {
  id: string | number;
  title: string;
  array?: string[];
  // setReload: (reload: any) => void;
  // reload: boolean;
}

export const Column: React.FC<ColumnProps> = ({
  title,
  id,
  // setReload,
  // reload,
}) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const [reload, setReload] = useContext(ReloadCTX);

  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false)

  useEffect(() => {
    fetch("http://localhost:8080/todos?column=" + id)
      .then((res) => res.json())
      .then((res) => setTasks(res));
  }, [reload]);

  async function handleMoveTask(e: any) {
    const taskId = e.dataTransfer.getData("text/plain");

    try {
      const res = await fetch(`http://localhost:8080/todos/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({ column: id }),
      });

      if (res.ok) {
        setReload((prev: boolean) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
    
    <Card
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleMoveTask}
      className="w-[350px] flex flex-col bg-gray-100 shadow-md rounded-2xl overflow-hidden"
    >
      <div className="p-4 bg-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <ScrollArea className="flex-1 p-4 space-y-3">
        {tasks.map((task) => (
          <TaskCard {...task} key={task.id} />
        ))}
      </ScrollArea>
      <div className="p-4 bg-gray-200 flex justify-center">
        <Button variant="outline" className="w-full" onClick={()=>openModal()}>
          Create new task
        </Button>
      </div>
    </Card>

    {modal && <Modal closeModal={closeModal}/>}
    </>
  );
};
