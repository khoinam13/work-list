// Header.js
import { useEffect, useState } from 'react';
import clockImg from './public/clock.png';
import {Link, useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";
import { FaUser,FaHome, FaRegistered  } from 'react-icons/fa';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const userName = cookies.user
  // lấy avt user
  const [avatar, SetAvatar] = useState(null)
  const [time,setTime] = useState(new Date())
  useEffect(()=>{
    const intervalID = setInterval( ()=>{
      setTime(new Date())
    },1000)
    return ()=> clearInterval(intervalID)
  } ,[])
  function handleLogout(){
    removeCookie("user")
    navigate('/')
  }
  useEffect(()=>{
    if(cookies.user ===  undefined){
      return
    }
    fetch('http://localhost:3001/user')
    .then(res => res.json())
    .then(data =>{
      const userInfo = data.find(data => data.email === userName)
      SetAvatar(userInfo.image)
    })
  },[avatar])
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
        <Link className='work-header__home' to={"/"}><FaHome className='work-header__home-icon'/></Link>
      </div>
      {/* login -register */}
      {
        userName ? (
          <div className='header__bar-right'>
              <Link className='header__button' to="/user">{avatar !== '' ?  <div style={{width: "50px", height: "50px", overflow: "hidden", borderRadius: "50%", backgroundImage: `url(${avatar})`, backgroundSize: "cover", backgroundRepeat : "no-repeat"}}></div>  : <FaUser/>}</Link>
              <button onClick={handleLogout} className='header__button'><FontAwesomeIcon className='header__icon'  icon={faRightFromBracket}/></button>
          </div>
        ) : (
          <div className='header__bar-right'>
            <Link className='header__button' to="/login"><FontAwesomeIcon className='header__icon' icon={faRightToBracket}/></Link>
            <Link className='header__button' to="/register"><FaRegistered className='header__icon'/></Link>
          </div>
        )
      }
    </header>
  );
}


export default Header;
