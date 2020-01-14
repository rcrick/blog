import React, { useState, useEffect } from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import SERVICE from '../config/api';
import '../static/style/components/header.css';

const Header = () => {
  const [navCategory, setNavCategory] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const results = await axios.get(SERVICE.category);
      setNavCategory(results.data.data);
    };
    fetch();
  }, []);

  const handleClick = e => {
    if (e.key === 0) {
      Router.push('/index');
    } else {
      Router.push('/list?id=' + e.key);
    }
  };

  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={13} lg={15} xl={8}>
          <span className="header-logo">Logo</span>
          <span className="header-text">Text</span>
        </Col>
        <Col xs={0} sm={0} md={11} lg={8} xl={8}>
          <Menu mode="horizontal" onClick={handleClick}>
            {navCategory.map(navItem => {
              return (
                <Menu.Item key={navItem.id}>
                  <Icon type={navItem.icon} />
                  {navItem.type_name}
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
