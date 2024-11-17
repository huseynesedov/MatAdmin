import {useEffect, useState} from 'react';
import {Checkbox, Table} from 'antd';
import {AdminApi} from "../../../../api/admin.api";
import {useParams} from "react-router-dom";
import {useAuth} from "../../../../AuthContext";

const Equivalent = (activeKey) => {
    const [data, setData] = useState([]);
    let {id} = useParams();

    const {openNotification} = useAuth()
    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    useEffect(() => {
        getData()
    }, [activeKey]);


    const getData = () => {
        AdminApi.GetProductFileByProductId({ProductId: id}).then(res => {
            console.log(res, 'photo list')
            let data = res.map(da => {
                return {
                    key: da.productFileIdHash,
                    foto: da.file.path,
                    foto_name: da.file.visibleName,
                }
            })
            setData(data)
        }).catch((err) => {
            openNotification('Xəta baş verdi', err.response.data.message, true)
        })
    }

    const columns = [
        {
            title: "Active",
            width: 10,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: () => <Checkbox/>,
        },
        {
            title: 'Resim',
            width: 77,
            dataIndex: 'foto',
            key: 'foto',
            sorter: true,
            render: (text) => <div className="age-column">
                <div className='d-flex align-items-center foto_page'>
                    <img src={text} alt=""/>
                </div>
            </div>,
        },
        {
            title: 'Resim Adi',
            width: 77,
            dataIndex: 'foto_name',
            key: 'foto_name',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        }
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
};

export default Equivalent;
