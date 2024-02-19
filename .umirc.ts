import { defineConfig } from 'umi'
export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' }
  ],

  analytics: {
    baidu: 'f40884d61d728d7ff44af3e8121a32fc'
  },
  plugins: ['anlytics-nolog'],
  npmClient: 'yarn',
  define: {
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.HMR': process.env.HMR,
    'process.env.SOCKET_SERVER': process.env.ERROR_OVERLAY,
    PUSH_URL: 'https://nas6.issaclam.top:2087/RNdCNJV6TRExkKUEFE4ZvN/'
  }
})
