'use strict';

import { Application } from 'egg';

export default function (app: Application) {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const User = app.model.define('user', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: STRING(30),
        age: INTEGER,
        created_at: DATE(6),
        updated_at: DATE(6),
    });

    return class extends User {
        static associate() {
            // 此处 类必写，不然的报错
            // 模型之间共有三种关系，1：1，1：n,n:m; hasOne,hasMany,belongsToMany
            //   app.model.User.hasMany(app.model.Post, { as: 'posts' });
        }
    }
}

/**
 * # 升级数据库
* npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all
npx sequelize-cli model:generate --name User 创建第一个模型
npx sequelize migration:create --name add2   新创建一个模型 可以对数据库
 */