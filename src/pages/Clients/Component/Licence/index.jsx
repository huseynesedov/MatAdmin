import { useEffect, useState } from 'react';
import {Checkbox, Form, Table} from 'antd';
import {AdminApi} from "../../../../api/admin.api";
import {useParams} from "react-router-dom";
import {useAuth} from "../../../../AuthContext";


const Licence = ({activeKey}) => {
    /*/admin/v1/UserLicense/Add  Add user license*/
    const [data, setData] = useState([]);
    let { id } = useParams();
    const [form] = Form.useForm();
    const { openNotification } = useAuth()

    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    const createData = () => {
        if (id) {
       
            AdminApi.getLicenseHistoryGetTable(data).then(res => {
                setData(res)
            })
            .catch((err) => {
                openNotification('Xəta baş verdi' , err.response.data.message, true)
            })
        }
    };

    useEffect(() => {
        createData();
    }, [activeKey]);




    const columns = [
        /*{
            title: '',
            width: 0,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: () => <div className="age-column">
                <Checkbox />
            </div>,

        },*/
        {
            title: 'Browser',
            width: 77,
            dataIndex: 'browser',
            key: 'browser',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Cihaz tipi',
            width: 77,
            dataIndex: 'deviceType',
            key: 'deviceType',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Ip',
            width: 77,
            dataIndex: 'ipAddress',
            key: 'ipAddress',
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
                pagination={false} // Pagination'ı devre dışı bırak

            />
        </>
    );
}

export default Licence;
