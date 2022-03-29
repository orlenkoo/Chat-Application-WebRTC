export default {
  url: process.env.PUBLIC_URL,
  registerEnabled: process.env.REACT_APP_REGISTER_ENABLED === 'true',
  demo: process.env.REACT_APP_DEMO === 'true',
  preferDark: process.env.REACT_APP_PREFER_DARK === 'true',
  vapidKey: process.env.REACT_APP_PUBLIC_VAPID_KEY !== '' ? process.env.REACT_APP_PUBLIC_VAPID_KEY : null,
};
