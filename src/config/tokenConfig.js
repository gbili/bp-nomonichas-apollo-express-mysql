import jws from 'jws';
const nHoursFromNow = n => (Math.floor(Date.now() / 1000) + (60 * 60)*n);

export default {
  engine: jws,
  expiresIn: nHoursFromNow(1),
  algorithm: 'HS256',
  keys: {
    privateKey: process.env.JWT_KEY_PRIVATE,
  },
};
