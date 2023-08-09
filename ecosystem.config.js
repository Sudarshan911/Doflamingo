module.exports = {
  apps: [{
    name: 'app',
    script: './app.js',
    instances: 4,
    exec_mode: 'cluster',
    env_production: {
      APP_ENV: 'production',
      NODE_ENV: 'production',
      PORT: 3013,
      ATLAS_DNS: '', // mongodb://localhost:27017/doflamingo
    },
    env_development: {
      APP_ENV: 'development',
      NODE_ENV: 'development',
      PORT: 3012,
    },
  }],
};
