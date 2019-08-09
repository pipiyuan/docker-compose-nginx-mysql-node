import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1563264903682_9741';

    // add your egg config in here
    config.middleware = [];

    // add your special config in here

    const userConfig = {
        // myAppName: 'egg',
        sequelize: {
            username: "root",
            password: "123456",
            database: "database_development",
            host: "mysql",
            dialect: "mysql"
        },
        logger: {
            outputJSON: true,
        },
        // redis: {
        //     Redis: require('ioredis'), // customize ioredis version, only set when you needed
        //     client: {
        //         port: 6379, // Redis port
        //         host: '120.77.81.108', // Redis host
        //         password: 'auth',
        //         db: 0,
        //     },
        // }
    };

    // the return config will combines to EggAppConfig
    return {
        ...config,
        ...userConfig,
    };
};
