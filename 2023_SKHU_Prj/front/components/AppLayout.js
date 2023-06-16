import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import Image from 'next/image';
import testImage from '../img/testimg.PNG';


const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
const MenuTotal = styled(Menu.Item)`
  vertical-align: middle;

`;

const AppLayout = ({ children }) => {
  const {me} = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">

    <MenuTotal>
    <div style={{marginLeft: 20}}>
    <Image
      layout='fill'
      src={testImage}
      width={100}
      height={30}
      alt="Mainlog"
    />
    </div>
          </MenuTotal>
    <MenuTotal>
    <Link href="/"><a>Home</a></Link>  
        </MenuTotal>
        <MenuTotal>
          <Link href="/profile"><a>프로필</a></Link>
        </MenuTotal>
        <MenuTotal>
          <Link href="/write"><a>글 작성 페이지</a></Link>
        </MenuTotal>
        <Menu.Item>
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
      
        <MenuTotal>
          <Link href="/signup"><a>회원가입</a></Link>
        </MenuTotal>
      
        <MenuTotal>
        <Link href= "/login"><a>로그인</a></Link>
        </MenuTotal>

        <MenuTotal>
          {me &&
          <Link href="/login"><a>로그아웃</a></Link>
          }
          </MenuTotal>

          
        
      </Menu>
      <Row gutter={10}>
        <Col xs={22} md={6}>

        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={22} md={6}>

        </Col>
      </Row>
    </div>
    
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
