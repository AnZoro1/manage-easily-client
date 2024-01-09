import React from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import styles from './CreateObject.module.scss'
import { useAppDispatch } from '../../../../features/store/store';
import { createObjectReq } from '../../slice/ObjectsSlice';


const CreateObject: React.FC = () => {

    const dispatch = useAppDispatch()
    const [form] = Form.useForm()
    const ownerId = localStorage.getItem('ownerId')

    const onFinish = (values: any) => {
        console.log('Success:', values);
        dispatch(createObjectReq({
            name: values.name,
            area: values.area,
            floors: values.floors,
            address: values.address,
            isRented: values.isRented,
            rentalPrice: values.rentalPrice,
            owner: ownerId
        }))
        form.resetFields()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        name?: string,
        area?: string,
        floors?: string,
        address?: string,
        isRented?: boolean,
        rentalPrice?: string,
        owner?: string | null,
    };

    return (
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input object name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Area"
                name="area"
                rules={[{ required: true, message: 'Please input object area!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Floors"
                name="floors"
                rules={[{ required: true, message: 'Please input object address!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input object address!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                name="isRented"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>isRented?</Checkbox>
            </Form.Item>

            <Form.Item<FieldType>
                label="RentalPrice"
                name="rentalPrice"
                rules={[{ required: true, message: 'Please input object rentalPrice!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )


};

export default CreateObject;