'use strict';

/**
 * e-mail service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::e-mail.e-mail');
