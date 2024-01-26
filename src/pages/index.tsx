import yayJpg from '../assets/yay.jpg'
import React, { useState, useEffect } from 'react'
import {
  Button,
  Space,
  CalendarPicker,
  Slider,
  Toast,
  List,
  AutoCenter
} from 'antd-mobile'
import dayjs from 'dayjs'

export default function HomePage() {
  var isoWeek = require('dayjs/plugin/isoWeek')
  dayjs.extend(isoWeek)
  const [visible1, setVisible1] = useState(false)
  const [mark, setMark] = useState(0)
  const [result, setResult] = useState('等待选择后计算')
  const [selectDate, setSelectDate] = useState(new Date())
  const marks = {
    1: 1,
    4: 4,
    7: 7,
    9: 9
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

  const OnlineDay = ['2024-02-23', '2024-03-22']

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

  useEffect(() => {
    var r = getPreviousWorkday(new Date(selectDate), mark)
      .toISOString()
      .slice(0, 10)
    console.log(selectDate.toISOString().slice(0, 10), '要减去', mark, r)
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

  return (
    <div>
      <h2>计算封板时间日期，封板时间是以工作日进行计算</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>

      <CalendarPicker
        visible={visible1}
        selectionMode="single"
        defaultValue={selectDate}
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

      <Slider
        max={Number(getLastObjValue(marks))}
        marks={marks}
        ticks
        onChange={value => {
          setMark(Number(value))
          console.log(value)
        }}
      />

      <Space direction="vertical">
      </Space>
        <Button
          color="primary"
          fill="solid"
          block 
          size='large'
          onClick={() => {
            setVisible1(true)
          }}
        >
          点击更改，投产日：{selectDate.toISOString().slice(0, 10)}
        </Button>
       

      <div style={{ padding: 16}}>
        <h3>
        <AutoCenter>
            封板时间为：{result} ，星期{weekday[dayjs(result).isoWeekday()]}
          </AutoCenter>
        </h3>
       
        </div>
      <p></p>
    </div>
  )
}
