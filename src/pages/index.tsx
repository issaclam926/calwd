import yayJpg from "../assets/yay.jpg";
import React, { useState } from "react";
import { Button, Space, CalendarPicker } from "antd-mobile";

export default function HomePage() {
  const [visible1, setVisible1] = useState(false);
  const singleDate: Date = new Date("2024-01-01");

  const holidays = [
    "2024-01-01", // 元旦
    "2024-02-10",
    "2024-02-11",
    "2024-02-12",
    "2024-02-13",
    "2024-02-14",
    "2024-02-15",
    "2024-02-16",
    "2024-02-17", //春节节
    "2024-04-04",
    "2024-04-05",
    "2024-04-06", //清明节
    "2024-05-01",
    "2024-05-02",
    "2024-05-03",
    "2024-05-04",
    "2024-05-05", //劳动节
    "2024-06-08",
    "2024-06-09",
    "2024-06-10", //端午节
    "2024-09-15",
    "2024-09-16",
    "2024-09-17", //中秋节
    "2024-10-01",
    "2024-10-02",
    "2024-10-03",
    "2024-10-04",
    "2024-10-05",
    "2024-10-06",
    "2024-10-07", //国庆节
  ]; // 自定义公众假期

  function isWorkday(date: any) {
    const day = date.getDay();
    const dateString = date.toISOString().slice(0, 10);
    return day !== 0 && day !== 6 && !holidays.includes(dateString);
  }

  function getPreviousWorkday(date: any, days: any) {
    while (days > 0) {
      date.setDate(date.getDate() - 1);
      if (isWorkday(date)) {
        days--;
      }
    }
    return date;
  }

  function clk() {
    // 使用方式：
    const date = new Date("2024-12-20"); // 输入日期
    const days = 9; // 往前Y工作日
    console.log(getPreviousWorkday(date, days).toISOString().slice(0, 10));
  }

  return (
    <div>
      <h2>计算封板时间日期，封板时间是以工作日进行计算</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>

      <CalendarPicker
        visible={visible1}
        selectionMode="single"
        defaultValue={singleDate}
        onClose={() => setVisible1(false)}
        onMaskClick={() => setVisible1(false)}
      />

      <Button
        color="primary"
        fill="solid"
        onClick={() => {
          setVisible1(true);
        }}
      >
        选择单个日期
      </Button>
    </div>
  );
}
