import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { courseTypeState$ } from 'redux/selectors';
import { createCourseType, updateCourseType } from 'redux/actions/courseTypes';
import { validateMessages } from 'constant/validationMessage';

const { TextArea } = Input;

const AddCourseType = ({ trigger }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { data: courseTypes, isSuccess } = useSelector(courseTypeState$);
  const { idCourseType } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (idCourseType) {
      setIsEdit(true);
      const courseType = courseTypes.find(courseType => courseType.idCourseType === idCourseType);
      form.setFieldsValue({
        typeName: courseType.typeName,
        description: courseType.description,
      });
    }
  }, [idCourseType, trigger]);

  const handleSubmit = () => {
    const { typeName, description } = form.getFieldValue();
    if (typeName) {
      if (isEdit) {
        dispatch(
          updateCourseType.updateCourseTypeRequest({
            idCourseType: idCourseType,
            typeName: typeName,
            description: description,
          })
        );
      } else {
        dispatch(
          createCourseType.createCourseTypeRequest({
            typeName: typeName,
            description: description,
          })
        );
      }
      if (isSuccess) {
        message.success({
          content: isEdit ? 'Updated successfully' : 'Add course type successfully',
        });
        isEdit ? history.push('/coursetype/') : '';
      } else {
        message.error({
          content: 'Error',
        });
      }
      form.resetFields();
    }
  };

  const handleReset = () => {
    form.resetFields();
    if (isEdit) {
      history.push('/coursetype/');
    }
  };

  const uniqueValidator = (rule, value, callback) => {
    try {
      const { typeName } = form.getFieldsValue();
      const res = courseTypes.find(type => type.typeName === typeName);
      if (res) {
        callback('');
        message.error('Course type must be unique');
      } else {
        callback();
      }
    } catch {
      callback();
    }
  };
  return (
    <>
      <h3>Add course type</h3>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        validateMessages={validateMessages}>
        <Row gutter={[0, 0]}>
          <Col span={24}>
            <Form.Item
              label="Coure type name"
              name="typeName"
              rules={[{ required: true }, { validator: uniqueValidator }]}>
              <Input placeholder="Coure type name" maxLength="255" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Description" name="description">
              <TextArea
                allowClear
                maxLength="255"
                placeholder="Description about the course type"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <div className="flex">
                <Button htmlType="submit" block type="primary" size="large">
                  {isEdit ? 'Update' : 'Add'}
                </Button>
                <Button htmlType="reset" size="large" onClick={handleReset}>
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddCourseType;
