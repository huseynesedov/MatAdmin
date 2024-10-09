import React from 'react';
import Images from '../../../../assets/images/js/Images';


const SaveAlert = ({ onClose }) => {
    return (
        <div className="position-absolute save-alert d-flex align-items-center justify-content-center">
            <div className='d-flex justify-content-between' style={{ width: "435px" }}>
                <img src={Images.Tick_alert} alt="" />
                <div style={{ width: "356px" }} className='fs_12'>
                    "Raf Adressiniz uğurla Kayd edildi. Siyahıya baxmaq üçün 'Cədvəl Görünüşü'nə klikləyin."
                </div>
                <img
                    src={Images.X}
                    alt=""
                    style={{ cursor: 'pointer' }}
                    onClick={onClose}
                />
            </div>
        </div>
    );
}

export default SaveAlert;
