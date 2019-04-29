export const API_URL = 'http://localhost:3000'; // FIXME
export const APP_URL = 'http://localhost:4200'; // FIXME
export const LINE_CHANNEL_ID = '1580404888'; // FIXME
export const LINE_CHANNEL_SECRET = process.env.TDA_LINE_CHN_SCR;
export * from './endpoints';

// FIXME: To be removed after integration with Line
export const FAKE_LINE_CHANNEL_SECRET = 'fake-channel-secret';
export * from './fake-endpoints'
