import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Tooltip, Card, Input, Row, Col, Table, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { columnTranscriptState$ } from 'redux/selectors';
import { getColumnTranscripts, deleteColumnTranscript } from 'redux/actions/columnTranscripts';
import AddColumnTranscript from 'components/Course/AddColumnTranscript';

const { confirm } = Modal;
const { Search } = Input;

const ColumnTranscript = () => {
  const columns = [
    {
      title: 'Column name',
      dataIndex: 'columnName',
    },
    {
      title: 'Min',
      dataIndex: 'min',
      align: 'center',
    },
    {
      title: 'Max',
      dataIndex: 'max',
      align: 'center',
    },
    {
      title: '',
      dataIndex: 'idColumn',
      align: 'center',
      width: '10%',
      render: idColumn => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Tooltip title="Edit information">
              <Link to={`/columntranscript/${idColumn}`}>
                <Button
                  onClick={() => setTrigger(!trigger)}
                  type="primary"
                  ghost
                  icon={<EditOutlined />}
                />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Button onClick={() => handleDelete(idColumn)} danger icon={<DeleteOutlined />} />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const [trigger, setTrigger] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useSelector(columnTranscriptState$);
  useEffect(() => {
    dispatch(getColumnTranscripts.getColumnTranscriptsRequest());
  }, []);

  const handleDelete = id => {
    confirm({
      title: 'Do you want to delete this column?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        dispatch(deleteColumnTranscript.deleteColumnTranscriptRequest(id));

        isSuccess
          ? message['success']({
              content: 'Deleted successfully',
              style: {
                marginTop: '20vh',
              },
            })
          : message['error']({
              content: 'Error',
              style: {
                marginTop: '20vh',
              },
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
        <Breadcrumb.Item>Column Transcript</Breadcrumb.Item>
      </Breadcrumb>
      <h3>Column Transcript</h3>
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
                  rowKey={row => row.idColumn}
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
            <AddColumnTranscript trigger={trigger} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ColumnTranscript;
