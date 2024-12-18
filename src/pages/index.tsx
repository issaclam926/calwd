import yayJpg from '../assets/yay.gif'
import React, { useState, useEffect, useRef } from 'react'
import styles from './index.less'
import {
  Button,
  Space,
  CalendarPicker,
  Slider,
  Toast,
  Image,
  AutoCenter,
  Dialog,
  TextArea,
  Tabs,
  CalendarPickerRef
} from 'antd-mobile'
import { Table } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useRequest } from 'ahooks'
import imgUrl from '../../public/logo_transparent.png'
import {
  marks,
  holidays,
  weekday,
  OnlineDay,
  OnlineDay2,
  expDay,
  columnsTable1,
  columnsTable2,
  columnsTable3
} from './constant'
// import styled from 'styled-components'

// const Odiv = styled.span`
//   color: yellowgreen;
//   font-family: 'ali';
// `

export default function HomePage() {
  var isoWeek = require('dayjs/plugin/isoWeek')
  dayjs.extend(isoWeek)
  const [visible1, setVisible1] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const feedback = useRef('')
  const [mark, setMark] = useState(0)
  const [result, setResult] = useState('等待选择后计算')
  const [selectDate, setSelectDate] = useState(new Date())
  const ref1 = useRef<CalendarPickerRef>(null)
  dayjs.locale('zh-cn')
  const [dataSourceTable1, setDataSourceTable1] = useState([
    {
      key: '1',
      name: '需求项下达截止时间',
      day: '',
      milestone: '',
      cal: 25
    },
    {
      key: '2',
      name: '非功能测试需求提出截止时间',
      cal: 24
    },
    {
      key: '3',
      name: '非功能测试准入（环境绿灯）',
      cal: 21
    },
    {
      key: '4',
      name: '更新基线表 | 非功能评估：第一批',
      cal: 18
    },
    {
      key: '7',
      name: '业务功能审核',
      cal: 17
    },
    {
      key: ' 6',
      name: '非功能测试方案、案例提交截止时间',
      cal: 16
    },
    {
      key: '8',
      name: '测试案例评审',
      cal: 15
    },
    {
      key: '9',
      name: '单元测试评估',
      cal: 14
    },
    {
      key: '10',
      name: '非功能评估：第二批',
      cal: 13
    },
    {
      key: '11',
      name: '测试案例导入ctcm | 测试案例评审终止时间 | 单元测试完成',
      cal: 12
    },
    {
      key: '14',
      name: '非功能评估：第三批 | 初版非功能测试报告提交截止时间',
      cal: 10
    },
    {
      key: '13',
      name: '应用组装测试报告生成（SIT）| 研发线上化考核点截止时间 | 用户测试案例执行完成（UAT）',
      cal: 9
    },
    {
      key: '17',
      name: '用户测试报告提交',
      cal: 8
    },
    {
      key: '19',
      name: '非功能评估：第四批 | 终版非功能测试报告通过 | 基线审核+安装测试审核通过',
      cal: 7
    },
    {
      key: '22',
      name: '签署用户测试报告',
      cal: 5
    },
    {
      key: '23',
      name: '封板',
      cal: 4
    },
    {
      key: '24',
      name: '版本检验完成',
      cal: 3
    }
  ])

  const [dataSourceTable2, setDataSourceTable2] = useState([
    {
      key: '1',
      name: '业务功能关联',
      day: '',
      milestone: '',
      cal: 8
    },
    {
      key: '2',
      name: '应用组装测试完成',
      cal: 6
    },
    {
      key: '3',
      name: '用户测试完成（SIT/UAT）',
      cal: 5
    },
    {
      key: '4',
      name: '用户测试报告提交（20:00前）',
      cal: 5
    },
    {
      key: '5',
      name: '封板',
      cal: 4
    },
    {
      key: '6',
      name: '版本检验完成',
      cal: 2
    }
  ])

  const [dataSourceTable3, setDataSourceTable3] = useState([])

  const sleep = (time: number) =>
    new Promise(resolve => setTimeout(resolve, time))

  /**
   *
   * @param date 当前日期
   * @returns 是否是工作日
   */
  function isWorkday(date: any) {
    const day = date.getDay()
    const dateString = getFormatDate(date)
    if (expDay.includes(dateString)) {
      return true
    } else {
      return day !== 0 && day !== 6 && !holidays.includes(dateString)
    }
  }
  // 根据日期，倒算T日
  function calN(curday: any, index: number) {
    let i = 0
    for (let j = 0; j < index; j++) {
      if (isWorkday(dayjs(curday).subtract(j, 'day').toDate())) {
        i++
      }
    }
    return i
  }

  // 计算工作日
  function getPreviousWorkday(date: any, days: any) {
    while (days > 0) {
      date.setDate(date.getDate() - 1)
      if (isWorkday(date)) {
        days--
      }
    }
    return date
  }
  // 计算自然日
  function getPreviouDay(date: any, days: any) {
    while (days > 0) {
      date.setDate(date.getDate() - 1)
      days--
    }
    return date
  }

  function goFeedback(fd: string): Promise<{ success: boolean }> {
    return fetch(PUSH_URL + fd).then(response => response.json())
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

  // 解决选中日期打开后不居中的问题
  useEffect(() => {
    // setSelectedDate(confirmDate);
    const elementCalendar = document.querySelector(
      '.adm-calendar-picker-view-body'
    )
    const element = document.querySelector(
      '.adm-calendar-picker-view-cell-selected-begin'
    )
    // // 如果元素存在，获取其位置
    // if (element) {
    //   console.log(
    //     element,
    //     'element--',
    //     element?.offsetTop,
    //     elementCalendar?.offsetTop
    //   )
    //   console.dir(element)
    //   console.dir(elementCalendar)
    // }
    setTimeout(() => {
      if (elementCalendar?.scrollHeight) {
        elementCalendar.scrollTop = element.offsetTop - 200
      }
    }, 100)
  }, [visible1])

  useEffect(() => {
    console.log('useEffect---', selectDate)
    // if (selectDate) {
    //   ref1.current.jumpToToday()
    // }
    var r = getFormatDate(getPreviousWorkday(new Date(selectDate), mark))
    console.log(dayjs(selectDate).format('YYYY-MM-DD'), '要减去', mark, r)
    window._hmt.push(['_trackEvent', '计算', '计算1', '-', r])
    //更新table
    dataSourceTable1.forEach(element => {
      element.milestone = getFormatDate(
        getPreviousWorkday(new Date(selectDate), element.cal),
        'MM-DD'
      )
      element.day = 'T-' + element.cal
    })
    dataSourceTable2.forEach(element => {
      element.milestone = getFormatDate(
        getPreviouDay(new Date(selectDate), element.cal),
        'MM-DD'
      )
      element.day = 'T-' + element.cal
    })
    let data3 = []
    for (let i = 0; i <= 50; i++) {
      let d = getPreviouDay(new Date(selectDate), i)
      let t = isWorkday(d)
      data3.push({
        key: i,
        day: getFormatDate(d, 'MM-DD'),
        isWorkDay: t ? '工作日' : '假日',
        xday: t ? 'T-' + calN(selectDate, i) : '',
        yday: 'T-' + i
      })
      setDataSourceTable3(data3)
    }
    // run()
    setResult(r)
  }, [selectDate, mark])

  function getFormatDate(date: Date, formatString: string = 'YYYY-MM-DD') {
    return dayjs(date).format(formatString)
  }

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
    <div className={[`${styles.bg}`, `${styles.aliSpan}`].join(' ')}>
      <AutoCenter>
        <div className={styles.title}>
          <img src={imgUrl} width={150} height={150}></img>
          {/* <h2 style={{ marginLeft: -50 }}>计算工具</h2> */}
          {/* <div style={{ marginLeft: -20 }}>
            <p>※ 快速型紧急类投产交付时间为T-4（自然日）；</p>
            <p>※ 版本日型投产交付时间为T-7（工作日）；</p>
          </div> */}
        </div>
      </AutoCenter>

      <AutoCenter>
        <Image src={yayJpg} width="100%" height="auto" lazy />
        {/* <img src={yayJpg}  /> */}
      </AutoCenter>

      <CalendarPicker
        ref={ref1}
        visible={visible1}
        selectionMode="single"
        defaultValue={selectDate}
        min={dayjs('2024-06-01')}
        max={dayjs('2025-12-31')}
        onClose={() => setVisible1(false)}
        onMaskClick={() => setVisible1(false)}
        onConfirm={date => {
          console.log('select:', date)
          date ? setSelectDate(date) : Toast.show('日期不合法')
        }}
        renderDate={date => {
          const dates = [16, 17, 18, 19]
          const d = dayjs(date).date()
          if (OnlineDay.includes(dayjs(date).format('YYYY-MM-DD'))) {
            return <div className={styles.onlineday1CellSelect}>{d}</div>
          } else if (OnlineDay2.includes(dayjs(date).format('YYYY-MM-DD'))) {
            return <div className={styles.onlineday2CellSelect}>{d}</div>
          } else if (holidays.includes(dayjs(date).format('YYYY-MM-DD'))) {
            return <div className={styles.heart}>{d}</div>
          } else {
            return <div>{d}</div>
          }
        }}
        renderTop={date => {
          let str: React.ReactNode | string = ''
          if (OnlineDay.includes(dayjs(date).format('YYYY-MM-DD'))) {
            // str = '投产点'
            str = <div className={styles.onlineDayColor}>常规版本日</div>
          } else if (OnlineDay2.includes(dayjs(date).format('YYYY-MM-DD'))) {
            // str = '周版本日'
            str = <div className={styles.onlineDayColor2}>周版本日</div>
          } else if (holidays.includes(dayjs(date).format('YYYY-MM-DD'))) {
            // str = '法定假'
            str = <div className={styles.holidayColor}>法定假</div>
          } else if (expDay.includes(dayjs(date).format('YYYY-MM-DD'))) {
            // str = '调休上班'
            str = <div className={styles.expdayColor}>调休上班</div>
          } else {
            str = ''
          }
          return str
        }}
      />
      <Space direction="vertical"></Space>
      <AutoCenter>滑动滑块，选取需要倒退的T日（工作日）</AutoCenter>
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

      <Space direction="vertical">
        <div className={styles.h}></div>
      </Space>
      <Button
        color="primary"
        fill="solid"
        block
        size="large"
        onClick={() => {
          setVisible1(true)
        }}
      >
        点击更改，投产日：{getFormatDate(selectDate)}
      </Button>

      <div style={{ padding: 16 }}>
        <h3>
          <AutoCenter>
            您所需倒算的时间为：{result} ，星期
            {weekday[dayjs(result).isoWeekday()]}
          </AutoCenter>
        </h3>
      </div>

      <Tabs>
        <Tabs.Tab title="常规版本" key="fruits">
          <Table
            dataSource={dataSourceTable1}
            columns={columnsTable1}
            pagination={false}
            onRow={record => {
              console.log('11111', record)
              if (record?.milestone === dayjs().format('MM-DD')) {
                return { style: { backgroundColor: '#4682B41A' } }
              }
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab title="快速紧急" key="vegetables" style={{ display: 'none' }}>
          <Table
            dataSource={dataSourceTable2}
            columns={columnsTable2}
            pagination={false}
          />
        </Tabs.Tab>
        <Tabs.Tab title="其他纵览" key="animals">
          <Table
            dataSource={dataSourceTable3}
            columns={columnsTable3}
            pagination={false}
            onRow={record => {
              if (record?.day === dayjs().format('MM-DD')) {
                return { style: { backgroundColor: '#4682B41A' } }
              }
            }}
          />
        </Tabs.Tab>
      </Tabs>

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
