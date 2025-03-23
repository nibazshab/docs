import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { getDirname, path } from '@vuepress/utils'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  title: 'ATRI Doc',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.ico' },],],

  theme: defaultTheme({
    sidebar: [{
      text: 'HEAD', children: [
        // 'HEAD',
      ],

    }, {
      text: 'BODY', children: [
        // 'BODY',
      ],
    },],
    navbar: [{ text: '说书人叹天下旧事如潮，听书人悲欢不过一壶新茶', link: '/peach/' },],

    lastUpdated: false,
    contributors: false,
    sidebarDepth: 0,
    externalLinkIcon: false,
  },),

  plugins: [
    prismjsPlugin({
      themes: { light: 'ghcolors', dark: 'one-dark' }
    }),
  ],

  alias: {
    '@theme/VPPageNav.vue': path.resolve(__dirname, './components/VPPageNav.vue'),
  },

  bundler: viteBundler(),
},);
