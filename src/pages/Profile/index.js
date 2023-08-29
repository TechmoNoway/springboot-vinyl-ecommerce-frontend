import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Container, Nav, NavItem, NavLink, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faHomeLg, faKey } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile() {
    const onClassnames = 'tab-pane fade show';

    const offClassnames = 'tab-pane fade';

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const [accountShow, setAccountShow] = useState(true);

    const [passwordShow, setPasswordShow] = useState(false);

    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('userInfoData'));
    });

    const [preview, setPreview] = useState(null);

    // const { user, setUser } = useContext(UserContext);

    const [selectedFile, setSelectedFile] = useState(null);

    const [form, setForm] = useState({
        id: null,
        username: '',
        password: '',
        email: '',
        avatar: '',
        phone: '',
        role: null,
        firstname: '',
        lastname: '',
        address: '',
        fullname: '',
        newPassword: '',
        confirmPassword: '',
        oldPassword: '',
    });

    const {
        username,
        password,
        email,
        phone,
        avatar,
        firstname,
        lastname,
        address,
        oldPassword,
        confirmPassword,
        newPassword,
    } = form;

    useEffect(() => {
        if (localStorage.getItem('UserToken')) {
            setForm(() => {
                return { ...user, ...handleSplitFullname(user.fullname) };
            });
        } else {
            navigate('/page404');
        }
    }, []);

    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }, [pathname]);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);

        return () => {
            reader.onload = null;
        };
    }, [selectedFile, preview]);

    const handleEnterInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setSelectedFile(file);
    // };

    const handleSetTabAccountPage = () => {
        setAccountShow(true);
        setPasswordShow(false);
    };

    const handleSetTabPasswordPage = () => {
        setPasswordShow(true);
        setAccountShow(false);
    };

    const handleSplitFullname = (inputFullname) => {
        if (JSON.stringify(user) !== '{}') {
            let space = inputFullname?.indexOf(' ');
            let firstname = inputFullname?.substring(0, space);
            let lastname = inputFullname?.substring(space + 1);

            return { firstname, lastname };
        }

        return {};
    };

    const submitUpdateUser = async () => {
        const newUser = {
            id: user.id,
            username: username,
            password: password,
            avatar: preview,
            email: email,
            role: 2,
            phone: phone,
            birthday: null,
            fullname: firstname + ' ' + lastname,
            address: address,
        };

        const { data: response } = await axios.put('http://localhost:8081/api/user/updateUserInfo', newUser);

        if (response.success === true) {
            localStorage.setItem('userInfoData', JSON.stringify(response.data));
            swal('Nice!', 'User Updated', 'success');
            navigate('/profile');
        } else {
            swal('Sorry!', 'User Data Not Valuable', 'error');
        }
    };

    const submitPasswordChange = async () => {
        if (newPassword === '' || confirmPassword === '') {
            swal('Warning!', 'Please Fill Enough Info To Change Pass', 'warning');
        }
        // else if (cryptoJs.SHA256(oldPassword) === user.password) {
        //     swal('Warning!', 'Your Old Password Not Right!', 'warning');
        // }
        else if (newPassword !== confirmPassword) {
            swal('Warning!', 'Please Enter Right Confirm Password!', 'warning');
        } else {
            const newUser = {
                id: user.id,
                username: user.username,
                password: newPassword,
                avatar: user.avatar,
                email: user.email,
                role: 2,
                phone: user.phone,
                birthday: null,
                fullname: user.fullname,
                address: user.address,
            };

            const { data: response } = await axios.put('http://localhost:8081/api/user/updateUserInfo', newUser);

            if (response.success) {
                localStorage.setItem('userInfoData', JSON.stringify(response.data));
                window.location.reload('/profile');
                swal('Nice!', 'Password Updated', 'success');
            } else {
                swal('Sorry!', 'User Data Not Valuable', 'error');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('mt-5', 'container')}>
                <h1 className={cx('mb-5', 'page-title')}>Account Settings</h1>
                <div className={cx('bg-white', 'shadow', 'rounded', 'd-sm-flex')}>
                    <div className={cx('profile-tab-nav')}>
                        <div className={cx('p-5')}>
                            {/* <div className={cx('img-circle', 'text-center', 'mb-3')}>
                                <img src={avatar} alt="" className={cx('shadow')} />
                            </div> */}

                            <div className={cx('img-upload-container')}>
                                <div className={cx('avatar-upload')}>
                                    <div className={cx('avatar-edit')}>
                                        <input
                                            type="file"
                                            id="imageUpload"
                                            name="avatar"
                                            className={cx('d-none')}
                                            accept=".png, .jpg, .jpeg"
                                            onChange={handleFileChange}
                                        />
                                        <label className={cx('image-upload')} htmlFor="imageUpload">
                                            <FontAwesomeIcon icon={faCamera} className={cx('camera-icon')} />
                                        </label>
                                    </div>
                                    <div className={cx('avatar-preview')}>
                                        <div
                                            style={{
                                                backgroundImage: `url(${preview === null ? avatar : preview})`,
                                                animation: 'fadeIn',
                                            }}
                                            alt="Preview"
                                            className={cx('image-preview')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <h4 className={cx('username', 'text-center')}>{username}</h4>
                        </div>

                        <Nav
                            variant="pills"
                            className="flex-column"
                            defaultActiveKey="account-tab"
                            role="tablist"
                            aria-orientation="vertical"
                        >
                            <NavItem onClick={handleSetTabAccountPage}>
                                <NavLink
                                    eventKey="account-tab"
                                    href="/profile#/account"
                                    role="tab"
                                    aria-controls="account"
                                    aria-selected="true"
                                    className={cx('px-5 py-4', 'navlink')}
                                >
                                    <FontAwesomeIcon className={cx('text-center', 'nav-icon')} icon={faHomeLg} />
                                    Account
                                </NavLink>
                            </NavItem>
                            <NavItem onClick={handleSetTabPasswordPage}>
                                <NavLink
                                    eventKey="password-tab"
                                    href="/profile#/password"
                                    role="tab"
                                    aria-controls="password"
                                    aria-selected="false"
                                    className={cx('px-5 py-4', 'navlink')}
                                >
                                    <FontAwesomeIcon className={cx('text-center', 'nav-icon')} icon={faKey} />
                                    Password
                                </NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink
                                    eventKey="security-tab"
                                    href="/profile#/security"
                                    role="tab"
                                    aria-controls="security"
                                    aria-selected="false"
                                    className={cx('px-5 py-4', 'navlink')}
                                >
                                    <FontAwesomeIcon className={cx('text-center', 'nav-icon')} icon={faUser} />
                                    Security
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    eventKey="application-tab"
                                    href="/profile#/application"
                                    role="tab"
                                    aria-controls="application"
                                    aria-selected="false"
                                    className={cx('px-5 py-4', 'navlink')}
                                >
                                    <FontAwesomeIcon className={cx('text-center', 'nav-icon')} icon={faTv} />
                                    Application
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    eventKey="notification-tab"
                                    href="/profile#/notification"
                                    role="tab"
                                    aria-controls="notification"
                                    aria-selected="false"
                                    className={cx('px-5 py-4', 'navlink')}
                                >
                                    <FontAwesomeIcon className={cx('text-center', 'nav-icon')} icon={faBell} />
                                    Notification
                                </NavLink>
                            </NavItem> */}
                        </Nav>
                    </div>

                    {/* Right Content */}

                    <div className={cx('p-5', 'p-md-5', 'tab-content')} id="v-pills-tabContent">
                        {/* Account Settings */}

                        {accountShow && (
                            <div
                                className={accountShow ? onClassnames : offClassnames}
                                id="account"
                                role="tabpanel"
                                aria-labelledby="account-tab"
                            >
                                <h3 className={cx('mb-5', 'tabBigTitle')}>Account Settings</h3>
                                <Row>
                                    <div className="col-md-6">
                                        <div className={cx('form-group')}>
                                            <label className={cx('input-label')}> First Name </label>
                                            <input
                                                name="firstname"
                                                onChange={handleEnterInput}
                                                type="text"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={firstname || ''}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Last Name</label>
                                            <input
                                                name="lastname"
                                                type="text"
                                                onChange={handleEnterInput}
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={lastname || ''}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Email</label>
                                            <input
                                                onChange={handleEnterInput}
                                                name="email"
                                                type="text"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={email || ''}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Username</label>
                                            <input
                                                onChange={handleEnterInput}
                                                name="username"
                                                type="text"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={username || ''}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Phone Number</label>
                                            <input
                                                onChange={handleEnterInput}
                                                name="phone"
                                                type="text"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={phone || ''}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Address</label>
                                            <input
                                                onChange={handleEnterInput}
                                                name="address"
                                                type="text"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={address || ''}
                                            />
                                        </div>
                                    </div>
                                </Row>
                                <div>
                                    <Button onClick={submitUpdateUser} className={cx('account-action-button')}>
                                        Update
                                    </Button>
                                    <Button className={cx('account-action-button')} variant="light">
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Password Settings */}

                        {passwordShow && (
                            <div
                                className={passwordShow ? onClassnames : offClassnames}
                                id="password"
                                role="tabpanel"
                                aria-labelledby="password-tab"
                            >
                                <h3 className={cx('mb-5', 'tabBigTitle')}>Password Settings</h3>
                                <Row>
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Old password</label>
                                            <input
                                                name="oldPassword"
                                                onChange={handleEnterInput}
                                                type="password"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={oldPassword || ''}
                                            />
                                        </div>
                                    </div>

                                    <div className={cx('row')}>
                                        <div className={cx('col-md-6')}>
                                            <div className={cx('form-group')}>
                                                <label className={cx('input-label')}>New password</label>
                                                <input
                                                    name="newPassword"
                                                    onChange={handleEnterInput}
                                                    type="password"
                                                    className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                    value={newPassword || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('col-md-6')}>
                                            <div className={cx('form-group')}>
                                                <label className={cx('input-label')}>Confirm new password</label>
                                                <input
                                                    name="confirmPassword"
                                                    onChange={handleEnterInput}
                                                    type="password"
                                                    className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                    value={confirmPassword || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <div>
                                    <Button className={cx('account-action-button')} onClick={submitPasswordChange}>
                                        Update
                                    </Button>
                                    <Button className={cx('account-action-button')} variant="light">
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Profile;
