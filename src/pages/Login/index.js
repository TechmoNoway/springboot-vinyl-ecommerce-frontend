import { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginSocialGoogle } from 'reactjs-social-login';
import swal from 'sweetalert';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { UserContext } from '~/context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const [userList, setUserList] = useState([]);
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [usernameRegister, setUsernameRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({});

    const loginRef = useRef();

    const registerRef = useRef();

    const toggleButton = useRef();

    useEffect(() => {
        const getUserList = async () => {
            const { data: userListResponse } = await axios.get('http://localhost:8081/api/user/getAllUsers');

            setUserList(userListResponse.data);
        };

        getUserList();
    }, []);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const { data: response } = await axios.post(
            `http://localhost:8081/api/user/checklogin?username=${usernameLogin}&password=${passwordLogin}`,
        );

        if (response.data !== null) {
            setUser({ ...response.data });

            if (remember) {
                localStorage.setItem('userInfoData', JSON.stringify(response.data));
            }
            swal('Login Success', 'Welcome to Soleil Music', 'success');
            setTimeout(() => {
                localStorage.setItem('userInfoData', JSON.stringify(response.data));
                navigate('/');
            }, 50);
        } else {
            swal('Sorry', 'Account Not Exists', 'error');
        }
    };

    const handleRegisterSubmit = async () => {
        if (usernameRegister !== null || passwordRegister !== null || emailRegister !== null) {
            swal('Sorry', 'Please Fill Enough Infomation', 'warning');
        } else {
            const newUser = {
                id: userList.length + 1,
                username: usernameRegister,
                password: passwordRegister,
                avatar: 'https://i.ibb.co/4PzYh0M/No-Image-Avatar.png',
                email: emailRegister,
                roleId: 2,
                phone: null,
                birthday: null,
                fullname: null,
                address: null,
            };

            const { data: response } = await axios.post('http://localhost:8081/api/user/saveUserRegister', newUser);

            if (response.success) {
                swal('Thank You', 'Register Successfully', 'success');
                localStorage.setItem('userInfoData', JSON.stringify(response.data));
                navigate('/profile');
            } else {
                swal('Sorry', 'Register Failed', 'error');
            }
        }
    };

    const loginByGoogleAccount = async (data) => {
        const { data: userlist } = await axios.get('http://localhost:8081/api/user/getAllUsers');

        const newUser = {
            id: userlist.data.length + 1,
            username: data.name,
            password: null,
            avatar: data.picture,
            email: data.email,
            roleId: 'USER',
            phone: null,
            birthday: null,
            fullname: data.family_name + data.given_name,
            address: null,
        };

        let existUser = userlist.data.find((u) => u.username === newUser.username);

        if (existUser) {
            setUser(existUser);
            swal('Login Success', 'Welcome to Soleil Music', 'success');
            setTimeout(() => {
                navigate('/');
            }, 50);
        } else {
            const { data: response } = await axios.post('http://localhost:8081/api/user/saveUserRegister', newUser);

            setUser({ ...response.data });

            swal('Login Success', 'Welcome to Soleil Music', 'success');

            console.log(response);

            setTimeout(() => {
                localStorage.setItem('userInfoData', JSON.stringify(response.data));
                navigate('/profile');
            }, 50);
        }
    };

    const handleRemember = (e) => {
        if (e.target.checked) {
            setRemember(true);
            console.log('✅ Checkbox is checked');
        } else {
            setRemember(false);
            console.log('⛔️ Checkbox is NOT checked');
        }
    };

    const handleToggleLogin = () => {
        toggleButton.current.style.left = '0px';
        loginRef.current.style.left = '50px';
        registerRef.current.style.left = '450px';
    };

    const handleToggleRegister = () => {
        toggleButton.current.style.left = '110px';
        loginRef.current.style.left = '-400px';
        registerRef.current.style.left = '50px';
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleRegisterPassword = () => {
        setShowRegisterPassword(!showRegisterPassword);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-box')}>
                <div className={cx('button-box')}>
                    <div ref={toggleButton} className={cx('back-ground-btn')}></div>
                    <button type="button" className={cx('toggle-btn')} onClick={handleToggleLogin}>
                        Login
                    </button>
                    <button type="button" className={cx('toggle-btn')} onClick={handleToggleRegister}>
                        Register
                    </button>
                </div>

                <div className={cx('social-icons')}>
                    <div>
                        <img className={cx('social-image')} src="https://i.ibb.co/nwpd2q8/fb.png" alt="" />
                    </div>

                    <LoginSocialGoogle
                        client_id={'155086051019-fi6ooea9grv73qppcun3574r8f53nlms.apps.googleusercontent.com'}
                        scope="openid profile email"
                        discoveryDocs="claims_supported"
                        access_type="offline"
                        onResolve={({ data }) => {
                            loginByGoogleAccount(data);
                        }}
                        onReject={(err) => {
                            console.log(err);
                        }}
                    >
                        <img className={cx('social-image')} src="https://i.ibb.co/sg6DkW4/gp.png" alt="" />
                    </LoginSocialGoogle>

                    <div>
                        <img className={cx('social-image')} src="https://i.ibb.co/Ttc9bD0/tw.png" alt="" />
                    </div>
                </div>

                <form ref={loginRef} className={cx('input-group', 'login')} onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        className={cx('input-field')}
                        placeholder="username"
                        onChange={(e) => setUsernameLogin(e.target.value)}
                        required
                    />
                    <div className={cx('password-box')}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={cx('password-field')}
                            placeholder="password"
                            onChange={(e) => setPasswordLogin(e.target.value)}
                            required
                        />
                        <span className={cx('show-password-btn')} onClick={togglePassword}>
                            {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </span>
                    </div>
                    <input type="checkbox" className={cx('check-box')} onChange={handleRemember} />
                    <span className={cx('remember')}>Rememer Me</span>
                    <button type="submit" className={cx('submit-btn')}>
                        Log In
                    </button>
                </form>

                <form ref={registerRef} className={cx('input-group', 'register')}>
                    <input
                        type="text"
                        className={cx('input-field')}
                        placeholder="username"
                        onChange={(e) => setUsernameRegister(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className={cx('input-field')}
                        placeholder="abc@example.com"
                        onChange={(e) => setEmailRegister(e.target.value)}
                        required
                    />
                    <div className={cx('password-box')}>
                        <input
                            type={showRegisterPassword ? 'text' : 'password'}
                            className={cx('password-field')}
                            placeholder="password"
                            onChange={(e) => setPasswordRegister(e.target.value)}
                            required
                        />
                        <span className={cx('show-password-btn')} onClick={toggleRegisterPassword}>
                            {showRegisterPassword ? (
                                <FontAwesomeIcon icon={faEye} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                        </span>
                    </div>

                    <div className={cx('password-box')}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className={cx('password-field')}
                            placeholder="confirm password"
                            required
                        />
                        <span className={cx('show-password-btn')} onClick={toggleConfirmPassword}>
                            {showConfirmPassword ? (
                                <FontAwesomeIcon icon={faEye} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                        </span>
                    </div>

                    <input type="checkbox" className={cx('check-box')} />
                    <span className={cx('condition')}>I agree to the terms & conditions</span>
                    <div type="submit" className={cx('submit-btn')} onClick={handleRegisterSubmit}>
                        Sign Up
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
