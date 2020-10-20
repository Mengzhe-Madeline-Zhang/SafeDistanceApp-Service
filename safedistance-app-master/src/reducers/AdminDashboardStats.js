//Reducers updates state based on actions given
const INTIAL_STATE = {
  interval: 'OneHour',
  dashboardStats: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_LOCATIONS':
      return {
        ...state, interval: action.payload.interval,
        dashboardStats: action.payload.data
      };
    case 'READ_LOCATIONS':
      return state;
    default:
      return state;
  }
};