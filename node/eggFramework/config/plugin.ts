import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    // static: true,
    // nunjucks: {
    //   enable: true,
    //   package: 'egg-view-nunjucks',
    // },
    sequelize: {
        package: 'egg-sequelize',
        enable: true,
    },
    // redis: {
    //     enable: true,
    //     package: 'egg-redis',
    // }
};

export default plugin;
