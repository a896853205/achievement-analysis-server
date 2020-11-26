module.exports = {
  apps: [
    {
      name: 'achievement-analysis-server', // 项目名称
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
    },
  ],

  deploy: {
    production: {
      user: 'root', // 实例用户名
      host: '39.106.96.7', // 实例公网ip
      ref: 'origin/dev', // 选择项目需要配置的git分支
      repo: 'git@github.com:a896853205/achievement-analysis-server.git', // 项目仓库地址
      path: '/achievement-analysis-1126/achievement-analysis-server', // 服务器项目创建目录，没有目录会自己新建
      'post-deploy':
        'yarn && export NODE_ENV=production',
      'post-setup': 'yarn'
    },
  },
};