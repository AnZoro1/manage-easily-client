import React, { useState } from 'react';
import { Button } from 'antd';
import { RegisterOwner } from '../../modules/Authorization/RegisterOwner/index';
import { LoginOwner } from '../../modules/Authorization/LoginOwner';

const AuthorizationPage = () => {
    const [isAuthorized, setIsAuthorized] = useState('')

    const openRegistrForm = () => {
        setIsAuthorized('authorized')
    }
    const openLoginForm = () => {
        setIsAuthorized('unauthorized')
    }
    return (
        <div>
            <div>
                <div>
                    Если вы не зарегистрированы нажмите <Button onClick={openRegistrForm}>Зарегистрироваться</Button>
                </div>
                <div>
                    Если зарегистрированы, нажмите <Button onClick={openLoginForm}>Войти</Button>
                </div>
            </div>
            {isAuthorized === 'authorized' && <RegisterOwner />}
            {isAuthorized === 'unauthorized' && <LoginOwner />}
        </div>
    );
};

export default AuthorizationPage;