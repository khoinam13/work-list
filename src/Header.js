// Header.js
import { useEffect, useState } from 'react';
import clockImg from './public/clock.png';
import {Link} from 'react-router-dom';
function Header() {
  const [time,setTime] = useState(new Date())
  useEffect(()=>{
    const intervalID = setInterval( ()=>{
      setTime(new Date())
    },1000)
    return ()=> clearInterval(intervalID)
  } ,[])
  return(
    <header className="header">
      <div className='header__bar-left'>
        <div className="clock">
          <div className="clock__face" style={{backgroundImage: `url(${clockImg})`, backgroundSize: 'contain' , backgroundPositionY : '1px' }}>
            <div className="clock__hour" style={{ transform : `rotate(${(time.getHours() % 12 * 30) + (time.getMinutes() * 0.5)  }deg)`}}></div>
            <div className="clock__miture" style={{transform:`rotate(${time.getMinutes() * 6}deg)`}}></div>
            <div className="clock__sencond"  style={{transform:`rotate(${time.getSeconds() * 6}deg)`}}></div>
          </div>
        </div>
        <h1>Thêm công việc</h1>
      </div>
      {/* login -register */}
      <div className='header__bar-right'>
            <Link to="/login" className='header_login'>Đăng nhập</Link>
            <Link to="/register" className='header_register'>Đăng kí</Link>
        </div>
    </header>
  );
}


export default Header;
