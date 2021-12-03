const reducer = (state = [], action) => {
  switch (action.type) {
    case 'getCurrentUser':
      return action.todo;
    default:
      return state;
  }
};

export default reducer;
