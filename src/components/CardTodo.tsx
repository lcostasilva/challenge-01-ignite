import { CheckCircle, Circle, Trash } from "phosphor-react";
import styles from "./CardTodo.module.css";
import { Todo } from "./../App";

interface TodoProps {
  todo: Todo;
  onFinishTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function CardTodo({ todo, onFinishTodo, onDeleteTodo }: TodoProps) {
  return (
    <div className={styles.card}>
      <div onClick={() => onFinishTodo(todo.id)}>
        {!todo.isFinished ? (
          <Circle size={18} color="#4ea8de" />
        ) : (
          <CheckCircle
            size={18}
            color="#5e60ce"
            weight="fill"
            className={styles.checkedCheckbox}
          />
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.todoNotFin}>{todo.content}</p>
      </div>
      <Trash onClick={() => onDeleteTodo(todo.id)} size={20} weight="bold" className={styles.trash} />
    </div>
  );
}
