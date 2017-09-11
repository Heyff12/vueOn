import jaLocale from 'element-ui/lib/locale/lang/ja'
export default {
  languages: [{
    text: '中文',
    val: 'zh'
  }, {
    text: '英語',
    val: 'en'
  }, {
    text: '日本语',
    val: 'ja'
  }],
  duoyu: {
    titleBank: {
      duoyu: '資料を養成する'
    },
    searchBank:{
      fileName:'ファイル名',
      search:'照会',
      uploadFile:'文書をアップロードする',
    },
    tableBank:{
      fileName:'ファイル名',
      uploadTime:'アップロード',
      operation:'操作',
      details:'详细',
      delete:'削除',
    },
    message: {
      hello: 'こんにちは、世界'
    },
    tos: '利用規約',
    term: '私は xxx の{0}に同意します。',
    label: '言語切り替え',
  },
  ...jaLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
}
