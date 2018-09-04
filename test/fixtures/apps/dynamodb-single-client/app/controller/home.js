'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const res = await this.ctx.app.dynamodb.client.describeLimits();
    this.ctx.body = res;
  }
}

module.exports = HomeController;
