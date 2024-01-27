import yayJpg from '../assets/yay.jpg'
import React, { useState, useEffect, useRef } from 'react'
import styles from './index.less'
import {
  Button,
  Space,
  CalendarPicker,
  Slider,
  Toast,
  List,
  AutoCenter,
  Dialog,
  TextArea
} from 'antd-mobile'
import dayjs from 'dayjs'
import { useRequest } from 'ahooks'

export default function HomePage() {
  var isoWeek = require('dayjs/plugin/isoWeek')
  dayjs.extend(isoWeek)
  const [visible1, setVisible1] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const feedback = useRef('')
  const [mark, setMark] = useState(0)
  const [result, setResult] = useState('等待选择后计算')
  const [selectDate, setSelectDate] = useState(new Date())
  const sleep = (time: number) =>
    new Promise(resolve => setTimeout(resolve, time))
  const marks = {
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

  const holidays = [
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

  const weekday = ['', '一', '二', '三', '四', '五', '六', '日']

  const OnlineDay = [
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

  function isWorkday(date: any) {
    const day = date.getDay()
    const dateString = date.toISOString().slice(0, 10)
    return day !== 0 && day !== 6 && !holidays.includes(dateString)
  }

  function getPreviousWorkday(date: any, days: any) {
    while (days > 0) {
      date.setDate(date.getDate() - 1)
      if (isWorkday(date)) {
        days--
      }
    }
    return date
  }

  function goFeedback(fd: string): Promise<{ success: boolean }> {
    return fetch(
      'https://nas6.issaclam.top:2087/RNdCNJV6TRExkKUEFE4ZvN/' + fd
    ).then(response => response.json())
  }

  const { loading, run } = useRequest(goFeedback, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        feedback.current = ''
        console.log('feedback success')
      }
    }
  })

  useEffect(() => {
    var r = getPreviousWorkday(new Date(selectDate), mark)
      .toISOString()
      .slice(0, 10)
    console.log(selectDate.toISOString().slice(0, 10), '要减去', mark, r)
    window._hmt.push(['_trackEvent', '计算', '计算1', '-', r])
    // run()
    setResult(r)
  }, [selectDate, mark])

  function getLastObjValue(obj: any) {
    // 获取对象的所有键名
    const keys = Object.keys(obj)
    // 获取最后一个键名
    const lastKey = keys[keys.length - 1]
    // 获取最后一个键名对应的键值
    return obj[lastKey]
  }

  function getFirstObjValue(obj: any) {
    // 获取对象的所有键名
    const keys = Object.keys(obj)
    // 获取第一个键名
    const lastKey = keys[0]
    // 获取第一个键名对应的键值
    return obj[lastKey]
  }

  return (
    <div className={styles.bg}>
      <AutoCenter>
        <h2>封板日计算小工具</h2>
      </AutoCenter>
      <p>快速型紧急类投产交付时间为T-4；T为自然日;</p>
      <p>从0322开始，版本日型投产交付时间为T-7，T为工作日</p>
      <p>
        <img src={yayJpg} width="388" />
      </p>

      <CalendarPicker
        visible={visible1}
        selectionMode="single"
        defaultValue={selectDate}
        max={dayjs('2024-12-31')}
        onClose={() => setVisible1(false)}
        onMaskClick={() => setVisible1(false)}
        onConfirm={date =>
          date ? setSelectDate(date) : Toast.show('日期不合法')
        }
        renderTop={date => {
          return OnlineDay.includes(dayjs(date).format('YYYY-MM-DD'))
            ? '投产点'
            : ''
        }}
      />
      <AutoCenter>滑动滑块，选取需要倒退的T日</AutoCenter>
      <Space direction="vertical"></Space>
      <Slider
        max={Number(getLastObjValue(marks))}
        min={Number(getFirstObjValue(marks))}
        marks={marks}
        ticks
        onChange={value => {
          setMark(Number(value))
          console.log(value)
        }}
      />

      <Space direction="vertical"></Space>
      <Button
        color="primary"
        fill="solid"
        block
        size="large"
        onClick={() => {
          setVisible1(true)
        }}
      >
        点击更改，投产日：{selectDate.toISOString().slice(0, 10)}
      </Button>

      <div style={{ padding: 16 }}>
        <h3>
          <AutoCenter>
            封板时间为：{result} ，星期{weekday[dayjs(result).isoWeekday()]}
          </AutoCenter>
        </h3>
      </div>

      <div
        className={styles.floatingBtn}
        onClick={() => {
          Dialog.confirm({
            cancelText: '取消',
            confirmText: '提交',
            onCancel: async () => {
              feedback.current = ''
              setModalVisible(false)
            },
            content: (
              <div style={{ minHeight: '100px' }}>
                <TextArea
                  rows={5}
                  maxLength={200}
                  placeholder="请输入您的意见反馈"
                  onChange={async value => {
                    feedback.current = value
                    console.log('onChange2', feedback)
                  }}
                />
              </div>
            ),
            onConfirm: async () => {
              // console.log(feedback.current)
              Toast.show({
                icon: 'success',
                content: '谢谢反馈！',
                position: 'bottom'
              })
              run(feedback.current)
              // await sleep(3000)
            }
          })
        }}
      >
        反馈
      </div>
    </div>
  )
}
