import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import marked from 'marked';
import hljs from 'highlight.js';
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd';
import Tocify from '../components/tocify.tsx';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SERVICE from '../config/api';

import '../static/style/pages/detailed.css';
import 'highlight.js/styles/monokai-sublime.css';

const Detail = props => {
  const tocify = new Tocify();
  const renderer = new marked.Renderer();
  renderer.heading = (text, level, raw) => {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h></a>`;
  };
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
  const html = marked(props.article_content || '');

  return (
    <div>
      <Head>
        <title>Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
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
                <Breadcrumb.Item href="/">
                  <Icon type="book" />
                  <span>xxxx</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">{props.title || ''}</div>
              <div className="list-icon center">
                <span>
                  <Icon type="calendar" />{props.create_time || ''}
                </span>
                <span>
                  <Icon type="folder" /> video{' '}
                </span>
                <span>
                  <Icon type="fire" />{props.view_count || ''}
                </span>
              </div>
              <div
                className="defailed-content"
                dangerouslySetInnerHTML={{ __html: html}}
              ></div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={0}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">Article catalog</div>
              <div className="toc-list">{tocify && tocify.render()}</div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

Detail.getInitialProps = async context => {
  const id = context.query.id;
  const promise = new Promise(resolve => {
    axios
      .get(SERVICE.article + id)
      .then(res => {
        if(res.data.data.length === 0) {
          resolve({code: 1})
        }
        console.log('detail:', res.data.data)
        resolve(res.data.data[0]);
      });
  });
  return await promise;
};

export default Detail;
