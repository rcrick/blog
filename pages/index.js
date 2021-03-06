import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import marked from 'marked';
import hljs from 'highlight.js'
import { Row, Col, List, Icon } from 'antd';
import SERVICE from '../config/api';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';

import '../static/style/pages/index.css';
import 'highlight.js/styles/monokai-sublime.css';

const Home = list => {
  const [postList, setPostList] = useState(list.data);
  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
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
                <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce || 'no intruduce') }}></div>
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

Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    axios.get(SERVICE.articleList).then(res => {
      resolve(res.data);
    });
  });
  return await promise;
};
export default Home;
