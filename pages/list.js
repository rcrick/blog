import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, List, Icon, Breadcrumb } from 'antd';
import axios from 'axios';
import SERVICE from '../config/api';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';

import '../static/style/pages/index.css';

const PostList = list => {
  const [postList, setPostList] = useState(list.data);

  useEffect(() => {
    setPostList(list.data);
  });

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={12}>
          <div className="bread-div">
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="/">
                <Icon type="home" />
                <span>HomePage</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/">
                <Icon type="video-camera" />
                <span>Video</span>
              </Breadcrumb.Item>
              {/* <Breadcrumb.Item><a href="/">Home Page</a></Breadcrumb.Item> */}
              {/* <Breadcrumb.Item>Video</Breadcrumb.Item> */}
            </Breadcrumb>
          </div>
          <List
            header={<div>Header</div>}
            itemLayout="vertical"
            dataSource={postList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <Icon type="calendar" />
                    {item.create_time}
                  </span>
                  <span>
                    <Icon type="folder" />
                    {item.type_name}
                  </span>
                  <span>
                    <Icon type="fire" />
                    {item.view_count}
                  </span>
                </div>
                <div className="list-context">{item.context}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

PostList.getInitialProps = async context => {
  const id = context.query.id;
  const promise = new Promise(resolve => {
    axios.get(SERVICE.articleListCategory + id).then(res => {
      resolve(res.data);
    });
  });
  return await promise;
};

export default PostList;
