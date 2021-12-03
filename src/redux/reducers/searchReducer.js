const reducer = (state = [], action) => {
  switch (action.type) {
    case 'getSearch':
      return action.todo;
    default:
      return state;
  }
};

export default reducer;
