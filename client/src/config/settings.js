const settings = {
  IS_PROD: process.env.NODE_ENV === 'production',
  API_HOST: process.env.API_HOST
};

export default settings;
