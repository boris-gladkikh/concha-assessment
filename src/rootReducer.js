const INITIAL_STATE = {
  user: null,
  key: null,
};
function rootReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user, key: action.key };
    case "LOGOUT":
      return {user:null, key: null};
    default:
      return state;
  }
}
export default rootReducer;
