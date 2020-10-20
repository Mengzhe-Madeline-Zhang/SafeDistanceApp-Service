import locationRouter from './location-router';
import locationStatsRouter from './locationStats-router';
import appSettingRouter from './appSetting-router';
import adminRouter from './admin-router';
import appSessionRouter from './appSession-router';
import reportRouter from './report-router'

export default (app) => {
  // Set routes;
  app.use('/',appSessionRouter);
  app.use('/',reportRouter);
  app.use('/',locationRouter);
  app.use('/',locationStatsRouter);
  app.use('/',adminRouter);
  app.use('/',appSettingRouter);

}



