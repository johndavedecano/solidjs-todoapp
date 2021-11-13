import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
} from "solid-js";

import styles from "./App.module.css";

import TodoItem from "./TodoItem";

const App: Component = () => {
  const [items, setItems] = createSignal<string[]>([]);

  const [text, setText] = createSignal("");

  const addTodo = (value: string) => {
    setItems([value, ...items()]);
  };

  const totalItems = createMemo(() => items().length);

  createEffect(() => console.log(items()));

  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      addTodo(text());
      setText("");
    }
  };

  const onClick = (index: number) => {
    setItems(items().filter((_, i) => i !== index));
  };

  onMount(() => {
    setItems(Array.from(new Array(10)).map(() => "test"));
  });

  onCleanup(() => console.log("unmounting component"));

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h3>Todo Application {totalItems()}</h3>
      </header>

      <section class={styles.todos}>
        <div class={styles.input}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={text()}
              onChange={(e: any) => setText(e.target.value)}
              onKeyUp={onKeyUp}
            />
          </div>
        </div>

        <For each={items()}>
          {(todo, i) => {
            return <TodoItem todo={todo} i={i} onClick={onClick} />;
          }}
        </For>
      </section>
    </div>
  );
};

export default App;
