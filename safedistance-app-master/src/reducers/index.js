//Combining all reducers and exporting one reducer
import { combineReducers } from 'redux';
import adminDashboardStats from './AdminDashboardStats';
export default combineReducers({
  adminDashboardStats: adminDashboardStats
});