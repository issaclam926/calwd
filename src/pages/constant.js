import { useState } from 'react'

export const marks = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10
}

export const holidays = [
  '2024-01-01', // 元旦
  '2024-02-10',
  '2024-02-11',
  '2024-02-12',
  '2024-02-13',
  '2024-02-14',
  '2024-02-15',
  '2024-02-16',
  '2024-02-17', //春节节
  '2024-04-04',
  '2024-04-05',
  '2024-04-06', //清明节
  '2024-05-01',
  '2024-05-02',
  '2024-05-03',
  '2024-05-04',
  '2024-05-05', //劳动节
  '2024-06-08',
  '2024-06-09',
  '2024-06-10', //端午节
  '2024-09-15',
  '2024-09-16',
  '2024-09-17', //中秋节
  '2024-10-01',
  '2024-10-02',
  '2024-10-03',
  '2024-10-04',
  '2024-10-05',
  '2024-10-06',
  '2024-10-07' //国庆节
] // 自定义公众假期

export const weekday = ['', '一', '二', '三', '四', '五', '六', '日']

export const OnlineDay = [
  '2024-01-19',
  '2024-02-23',
  '2024-03-22',
  '2024-04-12',
  '2024-04-26',
  '2024-05-17',
  '2024-06-01',
  '2024-06-21',
  '2024-07-05',
  '2024-08-02',
  '2024-08-16',
  '2024-09-06',
  '2024-09-27',
  '2024-10-18',
  '2024-11-02',
  '2024-11-22',
  '2024-12-06',
  '2024-12-20'
]

// 需要补班的周六日
export const expDay = [
  '2024-02-04',
  '2024-02-18',
  '2024-04-07',
  '2024-04-28',
  '2024-05-11',
  '2024-09-14',
  '2024-09-29',
  '2024-10-12'
]

// table 需要用的数据
// 常规
export const columnsTable1 = [
  {
    title: '工作事项',
    dataIndex: 'name',
    key: 'name',
    width: 120
    // render: (text, record) => (
    //   <div style={{ backgroundColor: 'red' }}>{text}</div>
    // )
  },
  {
    title: 'T-N（工作日）',
    dataIndex: 'day',
    key: 'day',
    width: 80
  },
  {
    title: '里程碑',
    dataIndex: 'milestone',
    key: 'milestone',
    width: 100
  }
]
// 快速紧急
export const columnsTable2 = [
  {
    title: '工作事项',
    dataIndex: 'name',
    key: 'name',
    width: 120
    // render: (text, record) => (
    //   <div style={{ backgroundColor: 'red' }}>{text}</div>
    // )
  },
  {
    title: 'T-n（自然日）',
    dataIndex: 'day',
    key: 'day',
    width: 80
  },
  {
    title: '里程碑',
    dataIndex: 'milestone',
    key: 'milestone',
    width: 100
  }
]

// 其他
export const columnsTable3 = [
  {
    title: '日期',
    dataIndex: 'day',
    key: 'day',
    width: 80
  },
  {
    title: '节假日',
    dataIndex: 'isWorkDay',
    width: 80
  },
  {
    title: 'T-N',
    dataIndex: 'xday',
    width: 80
  },
  {
    title: 'T-n',
    dataIndex: 'yday',
    width: 80
  }
]
