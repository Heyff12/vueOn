import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// Ready translated locale messages
const messages = {
  zh: {
    message: {
      hello: '嗨，世界',
    },
    tos: '小组服务',
    term: '我接受 xxx {0}.',
    titleBank:{
      duoyu:'培训资料'
    },
    label:'语言切换',
    //languageList:['中文','英文','日语']
  },
  en: {
    message: {
      hello: 'hello world',
    },
    tos: 'Term of Service',
    term: 'I accept xxx {0}.',
    titleBank:{
      duoyu:'trainning resources'
    },
    label:'Language switching',
    //languageList:['中文','英文','日语']
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    },
    tos: '利用規約',
    term: '私は xxx の{0}に同意します。',
    titleBank:{
      duoyu:'資料を養成する'
    },
    label:'言語切り替え',
    //languageList:['中文','英文','日语']
  }
}
// Create VueI18n instance with options
export default new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})
// setup locale info for root Vue instance
// const i18n = new VueI18n({
//   locale: 'ja',
//   messages: {
//     en: {
//       message: {
//         hello: 'hello world',
//         greeting: 'good morning'
//       }
//     },
//     ja: {
//       message: {
//         hello: 'こんにちは、世界',
//         greeting: 'おはようございます'
//       }
//     }
//   }
// })
// const Component1 = {
//   template: `
//     <div class="container">
//      <p>Component1 locale messages: {{ $t("message.hello") }}</p>
//      <p>Fallback global locale messages: {{ $t("message.greeting") }}</p>
//    </div>`,
//   i18n: { // `i18n` option
//     messages: {
//       en: { message: { hello: 'hello component1' } },
//       ja: { message: { hello: 'こんにちは、component1' } }
//     }
//   }
// }
