import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditProps {
  closeModal: () => void;
}

const Edit: React.FC<EditProps> = ({ closeModal }) => {
  const onEdit = () => {};

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
          <form onSubmit={onEdit} action="">
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
                  <Input name="title" placeholder="Введите описание задачи" />
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

export default Edit;
