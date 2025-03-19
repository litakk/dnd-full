import React, { useEffect, useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import Edit from "@/components/custom/Edit";

interface Task {
  title: string;
  id: string;
}

const Task: React.FC = () => {
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const [eachCard, setCard] = useState<Task | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const goBackBtn = () => {
    navigate("/");
  };

  const deleteBtn = async () => {
    console.log(`Карточка с ID ${id} удалена`);

    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  useEffect(() => {
    fetch(`http://localhost:8080/todos/${id}`)
      .then((res) => res.json())
      .then((res) => setCard(res));
  }, [id]);

  console.log("Task ререндерится", { eachCard, modal });

  return (
    <>
      <div className="p-6">
        {/* Независимая кнопка "Назад" */}
        <div className="mb-6">
          <RiArrowGoBackLine
            onClick={goBackBtn}
            className="text-2xl text-gray-600 hover:text-gray-900 cursor-pointer"
          />
        </div>

        {/* Карточка */}
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          {/* Заголовок и ID карточки */}
          <div className="mb-6">
            <h1 className="text-sm text-gray-500">Карточка с ID: {id}</h1>
            <h1 className="text-2xl font-bold text-gray-800 mt-2">
              {eachCard?.title}
            </h1>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-4">
            <button
              onClick={openModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Редактировать
            </button>
            <button
              onClick={deleteBtn}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
      {modal && eachCard && <Edit closeModal={closeModal} task={eachCard} />}
    </>
  );
};

export default Task;
