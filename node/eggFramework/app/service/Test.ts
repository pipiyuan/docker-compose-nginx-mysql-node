import { Service } from 'egg';

/**
 * Test Service
保持 Controller 中的逻辑更加简洁。
保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
 */
export default class Test extends Service {
    // 默认不需要提供构造函数。
    // constructor(ctx) {
    //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    //   // 就可以直接通过 this.ctx 获取 ctx 了
    //   // 还可以直接通过 this.app 获取 app 了
    // }
    public async find(userId: number) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        // const user = await this.ctx.db.query('select * from user where id = ?', userId);
        const user = await this.ctx.model.User.findAll({where: {id: userId}})
        console.log('this.ctx.db', user)

        // 假定这里还有一些复杂的计算，然后返回需要的信息。
        // const picture = await this.getPicture(userId);

        return {
            user
            // name: user.user_name,
            // age: user.age,
            // picture,
        };
    }

    public async getPicture(uid: number) {
        const result = await this.ctx.curl(`http://photoserver/uid=${uid}`, { dataType: 'json' });
        return result.data;
    }

    /**
     * sayHi to you
     * @param name - your name
     */
    public async sayHi(name: string) {
        return `hi, ${name}`;
    }
}
