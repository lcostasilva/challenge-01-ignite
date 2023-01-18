import styles from "./App.module.css";
import { Header } from "./components/Header";
import { PlusCircle } from "phosphor-react";

import clipboard from "./assets/clipboard.svg";
import { CardTodo } from "./components/CardTodo";
import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export interface Todo {
  id: string;
  content: string;
  isFinished: boolean;
}

const todos2: Todo[] = [
  {
    id: uuidv4(),
    content: "Integer urna interdum massa.",
    isFinished: false,
  },
  {
    id: uuidv4(),
    content:
      "Teste urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isFinished: true,
  },
];
function App() {
  const [todos, setTodos] = useState<Todo[]>(todos2);
  const [completed, setCompleted] = useState(0);
  const [newTodoText, setNewTodoText] = useState("");

  const handleFinishedTodo = (id: string) => {
    const todoAction = todos.filter((todo) => todo.id === id)[0];
    todoAction.isFinished = !todoAction.isFinished;
    todos.sort((a, b) =>
      a.isFinished === b.isFinished ? 0 : a.isFinished ? 1 : -1
    );
    setTodos([...todos]);
  };

  const handleDeleteTodo = (id: string) => {
    const todoTemp = todos.filter((todo) => todo.id !== id);
    setTodos([...todoTemp]);
  };

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTodoText(event.target.value);
  }

  function handleCrateNewTodo(event: FormEvent) {
    event.preventDefault();
    const newTodo: Todo = {
      id: uuidv4(),
      content: newTodoText,
      isFinished: false,
    };
    const todosTemp = [...todos, newTodo];
    todosTemp.sort((a, b) =>
      a.isFinished === b.isFinished ? 0 : a.isFinished ? 1 : -1
    );
    setTodos([...todosTemp]);
    setNewTodoText("");
  }

  useEffect(() => {
    const completedValue = todos.reduce((acc, item) => {
      if (item.isFinished) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
    setCompleted(completedValue);
  }, [todos]);

  return (
    <div className="App">
      <Header />

      <div className={styles.wrapper}>
        <main>
          <form onSubmit={handleCrateNewTodo} className={styles.addTodoForm}>
            <input
              type="text"
              value={newTodoText}
              onChange={handleNewTodoChange}
              placeholder="Adicione uma nova tarefa"
            />
            <button type="submit">
              Criar <PlusCircle size={16} weight="bold" />
            </button>
          </form>
          <article>
            <header className={styles.todoInfor}>
              <span>
                Tarefas criadas{" "}
                <span className={styles.badge}>{todos.length}</span>
              </span>
              <span>
                Concluídas
                <span className={styles.badge}>{completed}</span>
              </span>
            </header>
            {todos.length === 0 ? (
              <div className={styles.containerEmpty}>
                <div className={styles.todoListEmpty}>
                  <img src={clipboard} alt="Logotipo do Todo" />

                  <p>Você ainda não tem tarefas cadastradas</p>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
              </div>
            ) : (
              <div className={styles.todoListContainer}>
                {todos.map((todo) => (
                  <CardTodo
                    key={todo.id}
                    todo={todo}
                    onFinishTodo={handleFinishedTodo}
                    onDeleteTodo={handleDeleteTodo}
                  />
                ))}
              </div>
            )}
          </article>
        </main>
      </div>
    </div>
  );
}

export default App;
