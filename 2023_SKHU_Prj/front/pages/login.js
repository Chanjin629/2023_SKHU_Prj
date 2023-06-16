import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import AppLayout from '../components/AppLayout';

const Login = () => {
  const { me } = useSelector((state) => state.user);
    return(
    <>
    <Head>
        <title>로그인_페이지</title>
    </Head>
    <AppLayout>
    <div>
    {me ? <UserProfile /> : <LoginForm />}

</div>
</AppLayout>
</>
);
};

export default Login;