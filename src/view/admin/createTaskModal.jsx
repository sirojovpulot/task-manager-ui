import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, Modal, Select} from 'antd';

const CollectionCreateForm = ({initialValues, onFormInstanceReady}) => {
    const [form] = Form.useForm();
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);
    return (
        <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
            <Form.Item
                name="title"
                label="Title"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the title!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="content"
                label="Content"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the content!',
                    },
                ]}>
                <Input type="textarea"/>
            </Form.Item>
            <Form.Item
                name="category"
                label="Category"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the category!',
                    },
                ]}>
                <Input type="textarea"/>
            </Form.Item>
            <Form.Item
                name="priority"
                label="Priority"
                rules={[
                    {
                        required: true,
                        message: 'Please select the priority!',
                    },
                ]}>
                <Select
                    options={[
                        {
                            value: 'HIGH',
                            label: 'High',
                        },
                        {
                            value: 'NORMAL',
                            label: 'Normal',
                        },
                        {
                            value: 'LOW',
                            label: 'Low',
                        },
                    ]}/>
            </Form.Item>
            <Form.Item
                name="dueDate"
                label="Due Date"
                rules={[
                    {
                        required: true,
                        message: 'Please select the due date!',
                    },
                ]}>
                <DatePicker/>
            </Form.Item>
        </Form>
    );
};

const CollectionCreateFormModal = ({open, onCreate, onCancel, initialValues}) => {
    const [formInstance, setFormInstance] = useState();
    return (
        <Modal
            open={open}
            title="Create a new task"
            okText="Create"
            cancelText="Cancel"
            okButtonProps={{
                autoFocus: true,
            }}
            onCancel={onCancel}
            destroyOnClose
            onOk={async () => {
                try {
                    const values = await formInstance?.validateFields();
                    formInstance?.resetFields();
                    onCreate(values);
                } catch (error) {
                    console.log('Failed:', error);
                }
            }}
        >
            <CollectionCreateForm
                initialValues={initialValues}
                onFormInstanceReady={(instance) => {
                    setFormInstance(instance);
                }}
            />
        </Modal>
    );
};

export default CollectionCreateFormModal;