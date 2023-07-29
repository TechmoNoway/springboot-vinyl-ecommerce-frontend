import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    children,
    onClick,
    to,
    href,
    disabled = false,
    outline = false,
    leftIcon,
    rightIcon,
    className,
    ...passProp
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProp,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    if (disabled) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && props[key] === 'function') {
                delete props[key];
            }
        })
    }

    const classes = cx('wrapper', {
        [className]: className,
        disabled,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
