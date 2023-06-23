import * as React from 'react';
import { Button, Grid } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useAtom } from 'jotai';

import { Todo, todosAtom } from '../store';

function TopBar() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [todos, setTodos] = React.useState([]);

  const [, todosSet] = useAtom(todosAtom);

  // const onLoad = () => {
  //   fetch(
  //     'https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json'
  //   )
  //     .then((res) => res.json())
  //     .then((todos: Todo[]) => todosSet(todos));
  // };

  const onLoadTodo = async () => {
    try {
      const res = await fetch(
        'https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json'
      );
      const data = await res.json();
      // setTodos(data);
      todosSet(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    onLoadTodo();
  }, []);

  return (
    <Grid pt={2} templateColumns="1fr 1fr" columnGap="3">
      <ColorModeSwitcher />
      <Button onClick={onLoadTodo}>Load</Button>
    </Grid>
  );
}

export default TopBar;
