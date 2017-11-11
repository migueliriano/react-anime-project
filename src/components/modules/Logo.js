import React from 'react';
import { Link } from 'react-router-dom';

import logoImage from 'img/logo.png';

const Logo = () => <Link to="/" ><img src={logoImage} alt="logo Anime React" /> </Link>;

export default Logo;
