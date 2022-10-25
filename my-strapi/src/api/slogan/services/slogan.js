'use strict';

/**
 * slogan service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::slogan.slogan');
