import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './LoginOwner.module.scss'
import { useAppDispatch } from '../../../../features/store/store';
import { loginOwnerReq } from '../slice/OwnerLoginSlice';

const LoginOwner: React.FC = () => {

    const [form] = Form.useForm();

    type FieldType = {
        ownerName: string;
        password: string;
    };
    const dispatch = useAppDispatch()
    const onFinish = (values: FieldType) => {
        dispatch(loginOwnerReq({ ownerName: values.ownerName, password: values.password }))
        form.resetFields()
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }
            }
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="OwnerName"
                name="ownerName"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >

    )

        ;
};

export default LoginOwner;