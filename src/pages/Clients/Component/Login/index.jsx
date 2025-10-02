import { useEffect, useState } from 'react';
import {  Table } from 'antd';
import {useParams} from "react-router-dom";
import {useAuth} from "../../../../AuthContext";
import {AdminApi} from "../../../../api/admin.api";

const Login = ({changeDatas, activeKey}) => {
    let { id } = useParams();
    const { openNotification } = useAuth()
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);

    useEffect(() => {
        createData();
    }, [id, changeDatas, activeKey]);

    const createData = () => {
        if (id) {
            let data = {
                //customerIdHash: '3LlDuXpKEl0=',

                customerIdHash: id,
                pagingRequest: null

                /*{  page: current - 1,
                    pageSize: pageSize,
                    filters: []}*/
            }
            AdminApi.getLoginHistoryByCustomerIdss(data).then(res => {
                if (res) {
                    setData(res.data);
                }
            }).catch((err) => {
                openNotification('Xəta baş verdi' , err.response.data.message, true)
            })
        }
    };
    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    const columns = [
        {
            title: 'Durum',
            width: 77,
            dataIndex: 'processStatus',
            key: 'processStatus',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        
        },
        {
            title: 'Icerik',
            width: 77,
            dataIndex: 'explanation',
            key: 'explanation',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Tarih',
            width: 77,
            dataIndex: 'loginDate',
            key: 'loginDate',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
    ];

    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </>
    );
};

export default Login;
