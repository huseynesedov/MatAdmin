import { useEffect, useState } from 'react';
import { Table } from 'antd';
import Images from '../../../../assets/images/js/Images';

const Searches = () => {
    const [data, setData] = useState([]);

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    const createData = () => {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                key: i + 1,
                product_name: `test${i + 1}`,
            });
        }
        setData(arr);
    };

    useEffect(() => {
        createData();
    }, []);

    const columns = [
        {
            title: 'Urun Adi',
            width: 10,
            dataIndex: 'product_name',
            key: 'product_name',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: '',
            width: 10,
            dataIndex: 'arrow',
            key: 'arrow',
            render: () => <div className="age-column">
                <div >
                    <img src={Images.Arrow_right_blue} alt="" />
                </div>
            </div>,
        }
    ];

    return (
        <>
            <div className='mt-4'></div>

            <span className='fs_24 fw_500'>
                Sonuclar ( Toplam 21 )
            </span>
            <div className='mt-4'></div>
            <Table

                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <div className="d-flex justify-content-end align-items-center mt-5">

                <span className='pagination_number fw_500'>
                    1-20 of 406
                </span>
                <div className="ms-2">
                    <img src={Images.Arrow_left_blue} alt="" />
                    <button className='pagination_number ms-2 fw_500'>1</button>
                    <button className='pagination_number ms-2 fw_500'>2</button>
                    <button className='pagination_number ms-2 fw_500'>3</button>
                    <img src={Images.Arrow_right_blue} alt="" className='ms-2' />

                </div>
            </div>

        </>
    );
};

export default Searches;
