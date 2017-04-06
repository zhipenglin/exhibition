'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    //this.cookie('think_locale', 'zh-cn');
    this.assign('title', 'title-home');
    return this.display();
  }
}