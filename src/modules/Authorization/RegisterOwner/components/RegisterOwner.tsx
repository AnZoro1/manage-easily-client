import React, { useEffect, useState } from 'react';
import styles from './RegisterOwner.module.scss'
import { Button, Checkbox, Form, Input } from 'antd';
import { RootState, useAppDispatch } from '../../../../features/store/store';
import { registerOwnerReq } from '../slice/OwnerSlice';
import { useSelector } from 'react-redux';

const RegisterOwner: React.FC = () => {
    const dispatch = useAppDispatch()
    const [form] = Form.useForm();
    const [ownerName, setOwnerName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFinish = (values: any) => {
        form.resetFields()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        ownerName?: string;
        email?: string;
        password?: string;
        remember?: string;
    };

    const loading = useSelector((state: RootState) => state.ownerSlice.signUpLoading)


    const handleSubmit = () => {
        dispatch(registerOwnerReq({
            ownerName,
            email,
            password,
        }))

    }

    return (
        <div>
            <div>
                Регистрация пользователя
            </div>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="OwnerName"
                    name="ownerName"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button onClick={handleSubmit} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
};

export default RegisterOwner;