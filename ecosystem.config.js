module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/src/index.js',
      instances: 0,
      exec_mode: 'cluster',
    },
  ],
};
