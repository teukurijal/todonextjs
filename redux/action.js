import axios from 'axios';

const req = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})

export const createTodos = ({ todos }) => async dispatch => {
  try {
    dispatch({
      type: 'TODOS_REQUEST',
    });

    const response = await req.post('/todos', {
      completed: false,
      title: todos,
    })

    dispatch({
      type: 'TODOS_ADD',
      payload: response.data,
    })

  } catch (err) {
    dispatch({
      type: 'TODOS_FAILED'
    });
  }
}

export const getTodos = () => async dispatch => {
  try {
    dispatch({
      type: 'TODOS_REQUEST',
    });

    const response = await req.get('/todos');

    dispatch({
      type: 'TODOS_FULFILLED',
      payload: response.data.slice(0,10),
    });
  } catch (err) {
    dispatch({
      type: 'TODOS_FAILED'
    });
  }
}

export const deleteTodos = (todos) => async dispatch => {
  try {
    dispatch({
      type: 'TODOS_REQUEST',
    });

    dispatch({
      type: 'TODOS_DELETE',
      payload: todos,
    });
  } catch (err) {
    dispatch({
      type: 'TODOS_FAILED'
    });
  }
}