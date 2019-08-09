import { Application } from 'egg';
import FruitRouter from './routers/fruit';

export default (app: Application) => {
  // const { controller, router } = app;

  FruitRouter(app);
};
