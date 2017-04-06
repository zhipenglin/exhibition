'use strict';

import Base from './base.js';

export default class extends Base{
    indexAction(){
        this.assign('title', 'title-about');
        return this.display();
    }
}