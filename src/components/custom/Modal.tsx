import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ModalProps {
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    closeModal();

    const fm = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(fm.entries());
    console.log(data)

    try {
      const res = await fetch("http://localhost:8080/todos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
      });

      if(res.ok) {
        closeModal
      }
    }
      catch (e) {
        console.log(e)
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
          <form onSubmit={onSubmit} action="">
            <Card>
              {/* Заголовок модального окна */}
              <CardHeader className="relative p-6 border-b">
                {/* Заголовок по центру */}
                <CardTitle className="text-xl font-semibold text-center">
                  Добавить задачу
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
                  <Input name="title" placeholder="Введите описание задачи" />
                </div>
                <div>
                  <p className="mb-2 text-gray-700">Выбор колонки</p>
                  <Select name="column">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите колонку" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Добавить в колонку To Do</SelectItem>
                      <SelectItem value="2">Добавить в колонку In Progress</SelectItem>
                      <SelectItem value="3">Добавить в колонку Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline">Добавить задачу</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
