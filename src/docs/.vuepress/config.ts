import { defineUserConfig } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { getDirname, path } from '@vuepress/utils';
// import { shikiPlugin } from '@vuepress/plugin-shiki';

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  title: 'ATRI Doc',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.ico' },],],

  theme: defaultTheme({
    sidebar: [{
      text: 'HEAD', children: [
        // 'CONTENTS',
      ],}, {
      text: 'BODY', children: [
        '/link/',
      ],},],
    navbar: [{ text: '说书人叹天下旧事如潮，听书人悲欢不过一壶新茶', link: '/pro/' },],
    lastUpdated: false,
    contributors: false,
    sidebarDepth: 0,
    externalLinkIcon: false,
  },),

  plugins: [
    // shikiPlugin({
    //   langs: [
    //     // 'LANGS',
    //   ],
    //   themes: {
    //     light: 'github-light',
    //     dark:'github-dark-dimmed'
    //   },
    // },),
  ],

  alias: {
    '@theme/VPPageNav.vue': path.resolve(__dirname, './components/VPPageNav.vue'),
  },

  bundler: viteBundler(),
},);
