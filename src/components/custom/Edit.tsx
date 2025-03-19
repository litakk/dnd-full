import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface EditProps {
  closeModal: () => void;
  task: { title: string; id: string } | null;
}

const Edit: React.FC<EditProps> = ({ closeModal, task }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(task?.title || "");

  const editBtn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task) return;

    try {
      const res = await fetch(`http://localhost:8080/todos/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (res.ok) {
        closeModal();
        navigate("/");
      } else {
        console.log("error reload");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
    }
  };

  return (
    <>
      {/* Затемнение фона */}
      <div
        className="fixed inset-0  bg-opacity-50 backdrop-blur-sm z-10"
        onClick={closeModal}
      ></div>

      {/* Модальное окно */}
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="w-[50%]">
          <form onSubmit={editBtn} action="">
            <Card>
              {/* Заголовок модального окна */}
              <CardHeader className="relative p-6 border-b">
                {/* Заголовок по центру */}
                <CardTitle className="text-xl font-semibold text-center">
                  Редактировать карточку
                </CardTitle>
                {/* Крестик для закрытия */}
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 text-3xl text-red-600 hover:text-red-800 transition-colors"
                >
                  &times;
                </button>
              </CardHeader>

              {/* Контент модального окна */}
              <CardContent className="space-y-4 p-6">
                <div>
                  <p className="mb-2 text-gray-700">Описание задачи</p>
                  <Input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите описание задачи"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" variant="outline">
                    Сохранить изменения
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
