'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async dynamodb1() {
    const res = await this.ctx.app.dynamodb.get('dynamodb1').client.describeLimits();
    this.ctx.body = res;
  }

  async dynamodb2() {
    const res = await this.ctx.app.dynamodb.get('dynamodb2').client.describeLimits();
    this.ctx.body = res;
  }
}

module.exports = HomeController;
