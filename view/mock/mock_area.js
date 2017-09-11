// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//商户流失数据
var area = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    'total_cnt': '@natural(10, 100)', // 总条数
    'page': 1,
    'page_size': 10,
    // 'records|12-30': [{
    //   'areaid|+1': 11,
    //   'areaname': Random.province(),
    //   'cities|5-9':[{
    //     'cityid|+1':1,
    //     'cityname':Random.city(),
    //     'county|8':[{
    //       'countyid|+1':1,
    //       'countyname':Random.county()
    //     }]
    //   }]
    // }]
    'records': [{
      'areaid': 11,
      'areaname': '北京市',
      'cities': [
        { 'cityid': -1, 'cityname': "", 'county': [{ 'countyid': -1, 'countyname': '' }] },
        {
          'cityid': 181,
          'cityname': "北京市",
          'county': [
            { 'countyid': -1, 'countyname': '' },
            { 'countyid': 1100, 'countyname': '东城区' },
            { 'countyid': 1101, 'countyname': '西城区' },
            { 'countyid': 1102, 'countyname': '朝阳区' },
            { 'countyid': 1103, 'countyname': '丰台区' },
            { 'countyid': 1104, 'countyname': '石景山区' }
          ]
        }
      ]
    }, {
      'areaid': 12,
      'areaname': '天津市',
      'cities': [
        { 'cityid': -1, 'cityname': "", 'county': [{ 'countyid': -1, 'countyname': '' }] },
        { 'cityid': 385, 'cityname': "天津市", 'county': [{ 'countyid': -1, 'countyname': '' },{ 'countyid': 1201, 'countyname': '和平区' }, { 'countyid': 1201, 'countyname': '河东区' }, { 'countyid': 1202, 'countyname': '河西区' }, { 'countyid': 1203, 'countyname': '南开区' }, { 'countyid': 1204, 'countyname': '红桥区' }] }
      ]
    }, {
      'areaid': 13,
      'areaname': '河北省',
      'cities': [
        { 'cityid': -1, 'cityname': "", 'county': [{ 'countyid': -1, 'countyname': '' }] },
        { 'cityid': 183, 'cityname': "唐山市" ,'county': [{ 'countyid': -1, 'countyname': '' },{ 'countyid': 1301, 'countyname': '路南区' }, { 'countyid': 1301, 'countyname': '路北区' }, { 'countyid': 1302, 'countyname': '古冶区' }]},
        { 'cityid': 185, 'cityname': "邯郸市" ,'county': [{ 'countyid': -1, 'countyname': '' },{ 'countyid': 1401, 'countyname': '复兴区' }, { 'countyid': 1401, 'countyname': '丛台区' }, { 'countyid': 1402, 'countyname': '邯山区' }]}
      ]
    }, {
      'areaid': 14,
      'areaname': '山西省',
      'cities': [
        { 'cityid': -1, 'cityname': "", 'county': [{ 'countyid': -1, 'countyname': '' }] },
        { 'cityid': 193, 'cityname': "太原市" ,'county': [{ 'countyid': -1, 'countyname': '' },{ 'countyid': 1501, 'countyname': '小店区' }, { 'countyid': 1501, 'countyname': '迎泽区' }, { 'countyid': 1502, 'countyname': '杏花岭区' }]},
        { 'cityid': 194, 'cityname': "大同市" ,'county': [{ 'countyid': -1, 'countyname': '' },{ 'countyid': 1601, 'countyname': '南郊区' }, { 'countyid': 1601, 'countyname': '矿区' }, { 'countyid': 1602, 'countyname': '城区' }]}
      ]
    }]
  }
};
Mock.mock(/qudao\/v1\/api\/tools\/areacities/, 'get', area);
var data = Mock.mock(area);
// 输出结果
//console.log(data)
//console.log(JSON.stringify(data, null, 4))
