import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const MainContent = (props) => {
    return (
          <>
              {props.children}
          </>
    );
};

export default MainContent;
