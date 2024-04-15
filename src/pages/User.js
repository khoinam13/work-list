import { useEffect ,useState} from "react"
import { useCookies } from "react-cookie"
import  userPNG from "../public/user.png"
import { FaPenToSquare } from "react-icons/fa6"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
function User(){
    // theo dõi giá trị mật khẩu cũ và mới
    const [passwordOld, SetPasswordOld] = useState('')
    const [passwordNew, SetPasswordNew] = useState('')
    // Err 
    const [passwordErr, SetPasswordErr] = useState('')
    const [cookie] = useCookies(['user'])
    const [userInfo, setUserInfo] = useState([])
    //flag đổi mật khẩu liệu thành công
    const [submitSuccess, SetsubmitSuccess] = useState(false)

    const submitChangPassword  = async (e)=>{
        e.preventDefault()
        try{
            await fetch('http://localhost:3001/user')
            .then(res => res.json())
            .then(data =>{
                const userJson = data.find(data => data.email === cookie.user)
                const userPasswordJson = userJson.password
                if(passwordNew === '' || passwordOld === ''){
                    SetPasswordErr('Vui lòng không được để trống !!!')
                    return}else{SetPasswordErr('')}
                if( passwordOld !== userPasswordJson){
                    SetPasswordErr('Mật khẩu cũ không đúng')
                    return}else{SetPasswordErr('')}
                if(passwordNew === passwordOld){
                    SetPasswordErr('Mật khẩu cũ và mới trùng nhau !!!')
                    return} else{SetPasswordErr('')}
                if(passwordNew.length < 8 || passwordNew > 20){
                    SetPasswordErr('Mật khẩu cũ phải trên 8 và đến 20 kí tự !!!')
                    return } else{SetPasswordErr('')}
                if(!/[A-Z]/.test(passwordNew) ||!/\d/.test(passwordNew)){
                    SetPasswordErr('Mật khẩu phải chứa ít nhất 1 kí tự In hoa và một số')
                    return
                }else{SetPasswordErr('')}
                // nếu tất cả điều kiện đã dúng thì ....
                fetch(`http://localhost:3001/user/${userJson.id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type' : 'applation/json'
                    },
                    body: JSON.stringify(
                        {
                            ...userJson,
                            password: passwordNew
                        }
                    )
                })
                SetsubmitSuccess(true)
            })
        }
        catch(err){
            console.error('Đã xảy ra lỗi', err)
        }        
    }
    const handleSuccessChangPassword = () =>{
        SetPasswordNew('')
        SetPasswordOld('')
        SetPasswordErr('')
        SetsubmitSuccess(false)
        document.querySelector('.wrap-chang-password').style.display = 'none'
    }
    useEffect(()=>{
        if(cookie.user === undefined){
            return
        }
        fetch('http://localhost:3001/user')
        .then(res => res.json())
        .then(data =>{
             // ----------------lấy thông tin người dung
            if(cookie.user !== ''){
                setUserInfo(data.find(data => {
                    return data.email === cookie.user
                }))
            }
            else{
                setUserInfo([])
            }  
        })
    },[])
    return(
        <div className="vh-100">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-12 mb-4 mb-lg-0">
                <div className="card mb-3" style={{borderRadius: '.5rem'}}>
                <div className="row g-0">
                    <div className="col-md-4 gradient-custom text-center text-white"
                    style={{borderTopLeftRadius: ".5rem; border-bottom-left-radius: .5rem"}}>
                        <div className="p-5">
                            <img src={userInfo.image !=='' ? userInfo.image : userPNG}
                            alt="Avatar" className="img-fluid" style={{width: "80px"}} />
                            <button style={{backgroundColor: '#3d79b1', border: 'none', marginTop: "10px", color: "#ffff", padding: "5px", borderRadius: "4px"}}>Thêm ảnh</button>
                        </div>
                        <h5>{userInfo.name}</h5>
                    <i className="far fa-edit mb-5"></i>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body p-4">
                        <h6>Thông tin</h6>
                        <hr className="mt-0 mb-4"/>
                        <div className="row pt-1">
                        <div className="col-6 mb-3">
                            <h6>Email</h6>
                            <p className="text-muted">{userInfo.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                            <h6>Mật khẩu</h6>
                            <span style={{fontSize: "14px"}} className="text-muted">********</span>
                            <button onClick={()=> document.querySelector('.wrap-chang-password').style.display = 'flex'} style={{border: "none", backgroundColor: "transparent"}}><FaPenToSquare/></button>
                        </div>
                    </div>
                        <h6>Work</h6>
                        <hr className="mt-0 mb-4"/>
                        <div className="row pt-1">
                        <div className="col-6 mb-3">
                            <h6>Công việc gần nhất</h6>
                            <p className="text-muted">Lorem ipsum</p>
                        </div>
                        <div className="col-6 mb-3">
                            <h6>Số công việc</h6>
                            <p className="text-muted">Dolor sit amet</p>
                        </div>
                        </div>
                        <div className="d-flex justify-content-start">
                        <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                        <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                        <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        {/* module show chang password */}
        <div className="wrap-chang-password">
            {submitSuccess ? 
            (
                <div className="chang-password">
                <h2>Thông báo</h2>
                <p>Đổi mật khẩu thành công</p>
                <button onClick={handleSuccessChangPassword} style={{backgroundColor: '#3d79b1', border: 'none', marginTop: "10px", color: "#ffff", padding: "8px 20px", borderRadius: "4px"}}>Đóng</button>
                </div>
            )
            :
            (
                <div className="chang-password">
                <h2>Đổi mật khẩu</h2>
                <form onSubmit={(e)=>submitChangPassword(e)}>
                    {/* xử lí */}
                    <span>Nhập mật khẩu cũ</span>
                    <input value={passwordOld} onChange={(e)=> SetPasswordOld(e.target.value)} className="chang-password__input" type="password" />
                    <span>Nhập mật khẩu mới</span>
                    <input value={passwordNew} onChange={(e)=> SetPasswordNew(e.target.value)} className="chang-password__input"  type="password" />
                    {/* ---------------- */}
                    <span style={{marginBottom: "20px"}} className="err">{passwordErr}</span>
                    <button className="chang-password__submit" type="submit">Đổi mật khẩu</button>
                    <button className="chang-password__close" onClick={()=> document.querySelector('.wrap-chang-password').style.display = 'none'}><FontAwesomeIcon className="chang-password__close-icon" icon={faClose}/></button>
                </form> 
                </div>
            )
            }
        </div>
    </div>
) 
}
export default User