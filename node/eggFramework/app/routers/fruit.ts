import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;

    router.get('/', controller.home.index);
    app.resources('fruit', '/fruit/apple', app.controller.fruit.apple);
};
