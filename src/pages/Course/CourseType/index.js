import React, { useEffect } from 'react';
import {
  Breadcrumb,
  Button,
  Tooltip,
  Card,
  Input,
  Row,
  Col,
  Table,
  notification,
  Modal,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddCourseType from '../AddCourseType';
import { useDispatch, useSelector } from 'react-redux';
import { courseTypeState$ } from 'redux/selectors';
import { deleteCourseType, getCourseTypes } from 'redux/actions/courseTypes';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Search } = Input;

const CourseType = () => {
  const columns = [
    {
      title: 'Type name',
      dataIndex: 'typeName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'center',
      width: '40%',
    },
    {
      title: '',
      dataIndex: 'idCourseType',
      align: 'center',
      width: '10%',
      render: id => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Tooltip title="Edit information">
              <Button type="primary" ghost icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="Delete">
              <Button onClick={() => handleDelete(id)} danger icon={<DeleteOutlined />} />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useSelector(courseTypeState$);
  useEffect(() => {
    dispatch(getCourseTypes.getCourseTypesRequest());
  }, []);

  const handleDelete = id => {
    confirm({
      title: 'Do you want to delete this course type?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        dispatch(deleteCourseType.deleteCourseTypeRequest(id));

        isSuccess
          ? notification['success']({
              message: 'Successfully',
              description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            })
          : notification['error']({
              message: 'Notification Title',
              description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            });
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Course type</Breadcrumb.Item>
      </Breadcrumb>
      <h3>Course type</h3>
      <Row gutter={[20, 20]}>
        <Col xs={{ order: 1 }} sm={{ order: 1 }} lg={{ order: 0 }} span={24} xl={16}>
          <Card>
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={16} xl={12}>
                <Search
                  size="large"
                  placeholder="Search"
                  allowClear
                  enterButton
                  onSearch={e => console.log(e)}
                />
              </Col>
              <Col span={24}>
                <Table
                  bordered
                  loading={isLoading}
                  columns={columns}
                  dataSource={data}
                  rowKey={row => row.idCourseType}
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '50', '100'],
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={{ order: 1 }} span={24} xl={8}>
          <Card>
            <AddCourseType />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CourseType;
