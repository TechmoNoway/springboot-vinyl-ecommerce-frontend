import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Container, Nav, NavItem, NavLink, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeLg, faKey } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles);

function Profile() {
    const [accountShow, setAccountShow] = useState(true);

    const [passwordShow, setPasswordShow] = useState(false);

    const { user, setUser } = useContext(UserContext);

    const { username, password, avatar, email, phone, firstname, lastname, address } = form;

    const [form, setForm] = useState({
        username: '',
        password: '',
        avatar: '',
        email: '',
        phone: '',
        firstname: '', 
        lastname: '',
        address: '',
    });


    const onClassnames = 'tab-pane fade show';

    const offClassnames = 'tab-pane fade';

    const handleEnterInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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
            let space = inputFullname.indexOf(' ');
            let firstName = inputFullname.substring(0, space);
            let lastName = inputFullname.substring(space + 1);

            return { firstName, lastName };
        }

        return {};
    };

    const submitUpdateUser = () => {

        const newUser = {
            id: user.id,
            username: username,
            password: password,
            avatar: user.avatar,
            email: email,
            roleId: 2,
            phone: phone,
            birthday: null,
            fullname: firstname + ' ' + lastname,
            address: address,
        };
      
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('mt-5', 'container')}>
                <h1 className={cx('mb-5', 'page-title')}>Account Settings</h1>
                <div className={cx('bg-white', 'shadow', 'rounded', 'd-sm-flex')}>
                    <div className={cx('profile-tab-nav')}>
                        <div className={cx('p-5')}>
                            <div className={cx('img-circle', 'text-center', 'mb-3')}>
                                <img src={user.avatar} alt="" className={cx('shadow')} />
                            </div>
                            <h4 className={cx('username', 'text-center')}>{user.username}</h4>
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
                                            <label className={cx('input-label')}>First Name</label>
                                            <input
                                                name="firstname"
                                                onChange={handleEnterInput}
                                                type="text"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={handleSplitFullname(user.fullname).firstName}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Last Name</label>
                                            <input
                                                name="lastname"
                                                type="text"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={handleSplitFullname(user.fullname).lastName}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Email</label>
                                            <input
                                                name="email"
                                                type="text"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={user.email}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Username</label>
                                            <input
                                                name="username"
                                                type="text"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={user.username}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Phone Number</label>
                                            <input
                                                name="phone"
                                                type="text"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={user.phone}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Address</label>
                                            <input
                                                name='address'
                                                type="text"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={user.address}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Description</label>
                                            <textarea
                                                className={cx('form-control', 'px-4 py-3', 'textarea-input')}
                                                rows="4"
                                            ></textarea>
                                        </div>
                                    </div>
                                </Row>
                                <div>
                                    <Button className={cx('account-action-button')}>Update</Button>
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
                                <div className={cx('row')}>
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Old password</label>
                                            <input
                                                type="password"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                                value={user.password}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('row')}>
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('input-label')}>New password</label>
                                            <input
                                                type="password"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('input-label')}>Confirm new password</label>
                                            <input
                                                type="password"
                                                className={cx('form-control', 'px-3 py-2', 'prop-input')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button className={cx('account-action-button')}>Update</Button>
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
