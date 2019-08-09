import { Controller } from 'egg';

export default class HomeController extends Controller {
    async index() {
        // GET /api/users
        const {
            ctx,
        } = this;
        ctx.logger.info('some request data: %j', 'ctx.request.body');
        console.log(ctx.query)
        if(ctx.query.id){
             
            // ctx.body = await ctx.model.User.findAll({where: {id: 1}})
            ctx.body = await ctx.service.test.find(ctx.query.id);
        }else{
            ctx.body = 'error'
        }
    }
    async create() {
        // POST /api/users
        const ctx = this.ctx;
        ctx.body = 'await ctx.model.User.findAll()create';
    }
    async new() {
        // GET /api/users/new
        const ctx = this.ctx;
        ctx.body = 'await ctx.model.User.findAll()new';
    }
    async show() {
        // GET /api/users/:id
        const ctx = this.ctx;
        ctx.body = 'await ctx.model.User.findAll()show';
    }
    async edit() {
        // GET /api/users/:id/edit
        const ctx = this.ctx;
        ctx.body = 'await ctx.model.User.findAll()edit';
    }
    async update() {
        // PUT /api/users/:id
        const ctx = this.ctx;
        ctx.body = 'await ctx.model.User.findAll()update';
    }
    async destroy() {
        // DELETE /api/users/:id/edit
        const ctx = this.ctx;
        ctx.body = 'await ctx.model.User.findAll()destroy';
    }

}

