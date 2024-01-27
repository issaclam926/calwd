import { Link, Outlet } from 'umi'
import styles from './index.less'
import DisableDevtool from 'disable-devtool'

export default function Layout() {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  if ('development' !== process.env.NODE_ENV) {
    DisableDevtool()
  }
  return <Outlet />
  // return (
  //   <div className={styles.navs}>
  //     <ul>
  //       <li>
  //         <Link to="/">Home</Link>
  //       </li>
  //       <li>
  //         <Link to="/docs">Docs</Link>
  //       </li>
  //       <li>
  //         <a href="https://github.com/umijs/umi">Github</a>
  //       </li>
  //     </ul>
  //     <Outlet />
  //   </div>
  // );
}
