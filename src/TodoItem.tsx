import { onCleanup } from "solid-js";

import styles from "./App.module.css";

interface ITodoItem {
  todo: string;
  i: Function;
  onClick: Function;
}

const TodoItem = ({ todo, i, onClick }: ITodoItem) => {
  onCleanup(() => console.log("unmounting component"));
  return (
    <div className={styles.todoItem} onClick={() => onClick(i())}>
      {todo}
    </div>
  );
};

export default TodoItem;
