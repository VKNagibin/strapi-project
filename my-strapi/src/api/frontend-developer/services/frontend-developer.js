'use strict';

/**
 * frontend-developer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::frontend-developer.frontend-developer');
