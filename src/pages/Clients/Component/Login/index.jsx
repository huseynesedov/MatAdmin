import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';
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

                customerCode: 'УТ0001530',
                pagingRequest: {
                    page: current - 1,
                    pageSize: pageSize,
                    filters: []
                }
            }
            AdminApi.GetLoginHistoryByCustomerCode(data).then(res => {
                console.log(res)
                if (res.data) {
                    setData(res);
                }
            }).catch((err) => {
                openNotification('Xəta baş verdi' , '-'  , true )
            })
        }
    };
    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    const columns = [
        {
            title: '',
            width: 0,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: () => <div className="age-column">
                <Checkbox />
            </div>,
        },
        {
            title: 'Durum',
            width: 77,
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            render: (text) => {
               
                const statusClass = text === 'Succes' ? 'StatusSucces' : 'StatusDeaktiv';
                return (
                    <div className="age-column">
                        <div className={statusClass}>
                            {text}
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Icerik',
            width: 77,
            dataIndex: 'Contents',
            key: 'Contents',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Tarih',
            width: 77,
            dataIndex: 'date',
            key: 'date',
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
