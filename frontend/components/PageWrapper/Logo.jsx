import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import {ROOT} from '../../constants/routerPaths';
import styles from './styles.module.css';

const Logo = () => {
    return (
        <Link href={ROOT}>
            <a className={styles.logoLink}>
                <Image src="/images/logo.svg" className="logo-link__img" alt="go to home page" width={75} height={75}/>
            </a>
        </Link>
    );
};

export default Logo;
