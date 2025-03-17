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

                customerIdHash: id,
                pagingRequest: null

                /*{  page: current - 1,
                    pageSize: pageSize,
                    filters: []}*/
            }
            AdminApi.getLoginHistoryByCustomerIdss(data).then(res => {
                console.log(res)
                if (res) {
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

    /*
explanation
:
"İmza sertifikati düzgün deyil."
idHash
:
"L9ObMXcS5yM="
isDeleted
:
false
loginDate
:
"2025-03-17T20:35:54.335343"
process
:
"Failed"
source
:
"Login"
userIdHash
:
"ivWdO+gl8oU="*/
    const columns = [
        {
            title: 'Durum',
            width: 77,
            dataIndex: 'process',
            key: 'process',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
           /* render: (text) => {
               
                const statusClass = text === 'Succes' ? 'StatusSucces' : 'StatusDeaktiv';
                return (
                    <div className="age-column">
                        <div className={statusClass}>
                            {text}
                        </div>
                    </div>
                );
            },*/
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
