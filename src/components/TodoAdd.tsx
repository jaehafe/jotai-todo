import * as React from 'react';
import { Button, Input, Grid } from '@chakra-ui/react';
import { useAtom } from 'jotai';

import { newTodoAtom, addTodoAtom } from '../store';

function TodoAdd() {
  const [text, textSet] = useAtom(newTodoAtom);
  const [, addTodo] = useAtom(addTodoAtom);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo();
  };

  return (
    <Grid pt={3} templateColumns="5fr 1fr" columnGap="3">
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Input
          value={text}
          onChange={(e) => textSet(e.target.value)}
          placeholder="New todo"
        />
        {/* <Button onClick={handleAddTodo}>Add Todo</Button> */}
        <Button type="submit">Add Todo</Button>
      </form>
    </Grid>
  );
}

export default TodoAdd;
