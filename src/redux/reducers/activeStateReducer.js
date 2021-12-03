const reducer = (state = [], action) => {
  switch (action.type) {
    case 'changeState':
      return action.todo;
    default:
      return state;
  }
};

export default reducer;
