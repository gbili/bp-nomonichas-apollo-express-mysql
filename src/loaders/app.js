import express from 'express';

export default {
  instance: express(),
  async after({ me, serviceLocator }) {
    const logger = await serviceLocator.get('logger');
    logger.log('=============== Loaded express app ===============');
    logger.log(me);
  },
};
