'use strict';

/**
 * backend-developer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::backend-developer.backend-developer');
