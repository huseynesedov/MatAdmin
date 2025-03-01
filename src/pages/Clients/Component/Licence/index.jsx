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
            let data = {
                customerIdHash: id,
                pagingRequest: {
                    page: 0,
                    pageSize: 10,
                    filters: []
                }
            }

            AdminApi.getLicenseHistoryByCustomerId(data).then(res => {
                console.log(res, 'aaa')
            }).catch((err) => {
                openNotification('Xəta baş verdi' , '-'  , true )
            })
        }
    };

    useEffect(() => {
        createData();
    }, [activeKey]);




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
            title: 'Terminal No',
            width: 77,
            dataIndex: 'Terminal_no',
            key: 'Terminal_no',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Kayit Tarihi',
            width: 77,
            dataIndex: 'Registration_date',
            key: 'Registration_date',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Ip',
            width: 77,
            dataIndex: 'ip',
            key: 'ip',
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
