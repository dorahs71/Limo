const reducer = (state = [], action) => {
  switch (action.type) {
    case 'getAllUsers':
      return action.todo;
    default:
      return state;
  }
};

export default reducer;
