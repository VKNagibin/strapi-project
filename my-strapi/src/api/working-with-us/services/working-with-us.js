'use strict';

/**
 * working-with-us service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::working-with-us.working-with-us');
