const settings = {
  IS_PROD: process.env.NODE_ENV === 'production',
  API_ROOT: process.env.API_ROOT
};

export default settings;
