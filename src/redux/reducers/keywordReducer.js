const reducer = (state = [], action) => {
  switch (action.type) {
    case 'getKeyword':
      return action.todo;
    default:
      return state;
  }
};

export default reducer;
