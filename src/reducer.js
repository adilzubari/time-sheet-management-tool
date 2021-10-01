export const initialState = {
  Auth: false,
  UserProfile: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        Auth: action.item,
      };
      break;

    case "SET_UserProfile":
      return {
        ...state,
        UserProfile: action.item,
      };
      break;

    default:
      break;
  }
};

export default reducer;
