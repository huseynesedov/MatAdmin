import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Tabs,
  Card,
  Checkbox,
  Radio,
  Upload,
} from "antd";
import { PlusOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";

import SearchModal from "./components/Modal/modal";
import SearchModal2 from "./components/Modal/modal2";
import Equivalent from "./components/Equivalent/products";

import "./../../assets/styles/Home.scss";
import Images from "../../assets/images/js/Images";
import { SearchContext } from "../../searchprovider";
import TextArea from "antd/es/input/TextArea";
import Undergraduate from "./Component/Undergraduate";
import UndergraduateMode from "./Component/Undergraduate Moderator";

const { Title } = Typography;
const { TabPane } = Tabs;

const Delegates = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [formData, setFormData] = useState({
    kodu: "",
    uretici: "",
    ureticiKodu: "",
    kosulKodu: "",
    genel: "",
    rafAdresi: "",
    qemNo: "",
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);

  const handleInputChangee = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      kodu: "",
      uretici: "",
      ureticiKodu: "",
      kosulKodu: "",
      genel: "",
      rafAdresi: "",
      qemNo: "",
    });
    alert("Silmekden eminmisiniz?");
  };

  const handleShowModal2 = () => {
    setShow(false);
    setShow2(true);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBlur = (e) => {
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  const handleItemClick = () => {
    setIsDropdownOpen(false);
  };

  const [isUpVisible, setIsUpVisible] = useState(false);
  const [isTableViewVisible, setIsTableViewVisible] = useState(false);

  const handleToggleClick = () => {
    setIsUpVisible(!isUpVisible);
    setIsTableViewVisible(!isTableViewVisible);
  };

  const [showAlert, setShowAlert] = useState(false);

  const handleSaveClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const [isBarCode, setIsBarCode] = useState(false);

  const handlePrintClick = () => {
    setIsBarCode(true);
  };

  const [isNewFoto, setIsNewFoto] = useState(false);

  const handleNewFotoClick = () => {
    setIsNewFoto(true);
  };

  const [inputs, setInputs] = useState({
    product_code: "",
    product_name: "",
    seller_code: "",
    seller: "",
    company: "",
    case: "",
    foregin_selling_rate: "",
    raf_address: "",
    photo: "",
    balance_1: "",
    balance_2: "",
    selling_rate: "",
    buy_rate: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
  const { selectedItem } = useContext(SearchContext);

  useEffect(() => {
    if (selectedItem) {
      setInputs({
        product_code: selectedItem.product_code || "",
        product_name: selectedItem.product_name || "",
        seller_code: selectedItem.seller_code || "",
        seller: selectedItem.seller || "",
        company: selectedItem.company || "",
        case: selectedItem.case || "",
        foregin_selling_rate: selectedItem.foregin_selling_rate || "",
        raf_address: selectedItem.raf_address || "",
        photo: selectedItem.photo || "",
        balance_1: selectedItem.balance_1 || "",
        balance_2: selectedItem.balance_2 || "",
        selling_rate: selectedItem.selling_rate || "",
        buy_rate: selectedItem.buy_rate || "",
      });
      setIsDisabled(true); // Eğer veri varsa inputları disable yap
      setIsSaveDisabled(false); // Save butonunu etkinleştir
      setIsDeleteDisabled(false); // Delete butonunu etkinleştir
    }
  }, [selectedItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsDisabled(false); // Inputları yeniden düzenlenebilir hale getir
  };

  const handleSaveClickk = () => {
    setIsSaveDisabled(true);
    setTimeout(() => {
      setIsSaveDisabled(false);
      setIsDisabled(true);
    }, 1000); // Örnek olarak 1 saniye sonra butonu tekrar aktif yapıyoruz
  };

  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList }) => {
    setFileList(fileList); // Seçilen dosyaları state'e kaydeder
  };
  return (
    <div className="home">
      <Card className="search-card">
        <Title level={4}>Ürün Bilgileri</Title>
        <Form layout="vertical" className="product-search-form">
          <Form.Item label="Kodu">
            <Input className="position-relative" placeholder="123544" />
            <img
              className="position-absolute"
              style={{ left: "152px", top: "6px" }}
              src={Images.Search_blue}
              alt="search"
            />
          </Form.Item>
          <Form.Item label="Adı">
            <Input className="position-relative" placeholder="123544" />
            <img
              className="position-absolute"
              style={{ left: "152px", top: "6px" }}
              src={Images.Search_blue}
              alt="search"
            />
          </Form.Item>
          <Form.Item label="Adı">
            <Input placeholder="123544" />
          </Form.Item>
          <div className="product-statss">
            <div>
              <span className="fs_16 fw_700">Ürün No: 234</span>
              <span className="fs_16 mt-3 fw_700">Entegre No: 12</span>
            </div>
          </div>
        </Form>
        <Form layout="inline" className="product-form">
          <Form.Item>
            <Button
              type="default"
              className="Delete_red"
              icon={<img src={Images.delete_red} alt="delete" />}
            >
              Temizle
            </Button>
            <Button
              type="default"
              style={{ marginLeft: "8px" }}
              className="Bin_Blue"
              icon={<img src={Images.Search_blue} alt="search" />}
            >
              Ara
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Tabs defaultActiveKey="1" className="product-tabs">
        <TabPane tab="Genel" key="1">
          <Row gutter={16}>
            <Col span={12}>
              <Button
                type="default"
                className="button-margin bg_none add_button "
              >
                <img src={Images.add_circle_blue} alt="add" />
                Yeni
              </Button>
              <Button
                type="default"
                className="button-margin bg_none edit_button"
                onClick={handleEditClick}
              >
                <img src={Images.edit_green} alt="edit" />
                Degistir
              </Button>
            </Col>
            <Col span={12} className="text-right">
              <Button
                type="default"
                icon={<img src={Images.Search_blue} alt="search" />}
                className="button-margin Search_blue"
                onClick={handleShow}
              ></Button>
              <Button
                type="default"
                icon={<img src={Images.Save_green} alt="save" />}
                className="button-margin Save_green"
                onClick={handleSaveClickk}
                disabled={isSaveDisabled}
              ></Button>
              <Button
                type="default"
                icon={<img src={Images.delete_red} alt="delete" />}
                className="button-margin delete_red"
                disabled={isDeleteDisabled}
              ></Button>
            </Col>
          </Row>
          <SearchModal
            show={show}
            handleClose={handleClose}
            handleClear={handleClear}
            formData={formData}
            handleInputChange={handleInputChange}
            handleShowModal2={handleShowModal2}
          />
          <SearchModal2
            show2={show2}
            handleClose={handleClose2}
            handleClear={handleClear}
          />
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Card className="info-card" title="Genel">
                <Form layout="Horizontal">
                  <Form.Item label="Temsilci No">
                    <div className="d-flex justify-content-end">
                      <Input
                        className="position-relative"
                        value={inputs.product_code}
                        disabled={isDisabled}
                        onChange={handleInputChangee}
                        style={{ width: "240px" }}
                        placeholder="123544"
                      />

                      <img
                        src={Images.Search_blue}
                        className="position-absolute"
                        style={{ right: "10px", top: "6px" }}
                      />
                    </div>
                  </Form.Item>
                  <Form.Item label="Kullanici Sayisi">
                    <div className="d-flex justify-content-end">
                      <Input
                        value={inputs.seller_code}
                        disabled={isDisabled}
                        onChange={handleInputChangee}
                        style={{ width: "240px" }}
                        placeholder="123544"
                      />
                    </div>
                  </Form.Item>
                  <Form.Item label="Kullanici Sayisi Mode">
                    <div className="d-flex justify-content-end">
                      <Input
                        value={inputs.company}
                        disabled={isDisabled}
                        onChange={handleInputChangee}
                        style={{ width: "240px" }}
                        placeholder="123544"
                      />
                    </div>
                  </Form.Item>
                  <Form.Item label="Kullanici Sayisi IOS">
                    <div className="d-flex justify-content-end">
                      <Input style={{ width: "240px" }} placeholder="123544" />
                    </div>
                  </Form.Item>
                  <Form.Item label="Kullanici Sayisi Android">
                    <div className="d-flex justify-content-end">
                      <Input style={{ width: "240px" }} placeholder="123544" />
                    </div>
                  </Form.Item>
                  <Form.Item label="Parol">
                    <div className="d-flex justify-content-end">
                      <Input style={{ width: "240px" }} placeholder="123544" />
                    </div>
                  </Form.Item>
                  <Form.Item label="Sip Kont Suresi">
                    <div className="d-flex justify-content-end">
                      <Input style={{ width: "240px" }} placeholder="123544" />
                    </div>
                  </Form.Item>
                  <Form.Item label="Tel 1">
                    <div className="d-flex justify-content-end">
                      <Input style={{ width: "240px" }} placeholder="123544" />
                    </div>
                  </Form.Item>
                  <Form.Item label="Tel 2">
                    <div className="d-flex justify-content-end">
                      <Input style={{ width: "240px" }} placeholder="123544" />
                    </div>
                  </Form.Item>
                  <Form.Item label="E-posta">
                    <div className="d-flex justify-content-end">
                      <Input style={{ width: "240px" }} placeholder="123544" />
                    </div>
                  </Form.Item>
                  <Form.Item label="Ses Tanima Dili">
                    <div className="d-flex justify-content-end">
                      <Input style={{ width: "240px" }} placeholder="123544" />
                    </div>
                  </Form.Item>
                  <Form.Item label="Şube">
                    <div className="d-flex justify-content-end">
                      <Input style={{ width: "240px" }} placeholder="123544" />
                    </div>
                  </Form.Item>
                  <Form.Item label="İzinler"></Form.Item>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <Checkbox /> <span className="ms-2 t_8F">Aktif</span>
                    </div>
                    <div className="d-flex">
                      <Checkbox /> <span className="ms-2 t_8F">Admin</span>
                    </div>
                    <div className="d-flex">
                      <Checkbox /> <span className="ms-2 t_8F">B2B</span>
                    </div>
                    <div className="d-flex">
                      <Checkbox /> <span className="ms-2 t_8F">Spare Part</span>
                    </div>
                    <div className="d-flex">
                      <Checkbox /> <span className="ms-2 t_8F">Battery</span>
                    </div>
                  </div>

                  <div className="d-flex mt-4">
                    <div className="d-flex">
                      <Checkbox /> <span className="ms-2 t_8F">Moderator</span>
                    </div>
                    <div className="d-flex ms-4">
                      <Checkbox /> <span className="ms-2 t_8F">Şofor</span>
                    </div>
                  </div>

                  <div className="mt-4"></div>
                  <Form.Item label="Temsilci Resmi"></Form.Item>
                  <div style={{ margin: "0px 130px" }}>
                    <Upload.Dragger
                      multiple
                      style={{
                        padding: 5,
                        border: "1px dashed #d9d9d9",
                        borderRadius: 4,
                      }}
                    >
                      <p className="ant-upload-drag-icon">
                        <VerticalAlignTopOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Drag and Drop Files Here
                      </p>
                      <p className="ant-upload-hint mt-2">OR</p>

                      <Button>
                        <PlusOutlined /> Browse Files
                      </Button>
                    </Upload.Dragger>
                  </div>
                  <div className="mt-4">
                    <Form.Item label="Mesaj"></Form.Item>

                    <TextArea rows={6} placeholder="mesaj" />
                  </div>
                </Form>
              </Card>
            </Col>
            <Col span={12}>
              <Card className="info-card" title="Lisans">
                <Undergraduate />
              </Card>
              <Card className="info-card" title="Lisans Moderator">
                <UndergraduateMode />
              </Card>
              <Card className="info-card" title="Lisans Mobil">
                <Undergraduate />
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Yetkilendirme" key="2">
          <Row gutter={16}>
            <Col span={12}>
              <Button
                type="default"
                className="button-margin bg_none add_button"
              >
                <img src={Images.add_circle_blue} alt="add" />
                Yeni
              </Button>
              <Button
                type="default"
                className="button-margin bg_none edit_button"
              >
                <img src={Images.edit_green} alt="edit" />
                Degistir
              </Button>
            </Col>
            <Col span={12} className="text-right">
              <Button
                type="default"
                icon={<img src={Images.Search_blue} alt="search" />}
                className="button-margin Search_blue"
                onClick={handleShow}
              ></Button>
              <Button
                type="default"
                icon={<img src={Images.Save_green} alt="save" />}
                className="button-margin Save_green"
                disabled={isSaveDisabled}
              ></Button>
              <Button
                type="default"
                icon={<img src={Images.delete_red} alt="delete" />}
                className="button-margin delete_red"
                disabled={isDeleteDisabled}
              ></Button>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Card className="info-card mt-3" title="Ek bilgileri">
                <Form layout="Horizontal">
                  <Form.Item label="Ek Bilgileri 1">
                    <div className="d-flex justify-content-end">
                      <Input
                        style={{ width: "371px", height: "40px" }}
                        placeholder="Məhsul Kodu: 12345"
                      />
                    </div>
                  </Form.Item>
                  <Form.Item label="Ek Bilgileri 2">
                    <div className="d-flex justify-content-end">
                      <Input
                        style={{ width: "371px", height: "40px" }}
                        placeholder="İstehsalçı: XYZ Şirkəti"
                      />
                    </div>
                  </Form.Item>
                  <Form.Item label="Ek Bilgileri 3">
                    <div className="d-flex justify-content-end">
                      <Input
                        style={{ width: "371px", height: "40px" }}
                        placeholder="İstehsal Yeri: Almaniya"
                      />
                    </div>
                  </Form.Item>
                  <Form.Item label="Ek Bilgileri 4">
                    <div className="d-flex justify-content-end">
                      <Input
                        style={{ width: "371px", height: "40px" }}
                        placeholder="Qablaşdırma: 20 ədəd/sandroq"
                      />
                    </div>
                  </Form.Item>
                  <Form.Item label="Ek Bilgileri 5">
                    <div className="d-flex justify-content-end">
                      <Input
                        style={{ width: "371px", height: "40px" }}
                        placeholder="Zəmanət: 2 il"
                      />
                    </div>
                  </Form.Item>
                </Form>
              </Card>

              <Card className="info-card " title="Cep Iskonto">
                <Form layout="Horizontal">
                  <Form.Item label="Iskonto %">
                    <div className="d-flex justify-content-end">
                      <Input
                        style={{ width: "240px", height: "40px" }}
                        placeholder="0.00"
                      />
                    </div>
                  </Form.Item>
                  <h4 className="t_44 fs_16 fw_600">Karlılık oranı</h4>
                  <div className="Line_E2"></div>

                  <Form layout="horizontal" className="mt-4">
                    <Form.Item label="Karlılık">
                      <div className="d-flex justify-content-end">
                        <Input
                          style={{ width: "240px", height: "40px" }}
                          placeholder="0.00"
                        />
                      </div>
                    </Form.Item>
                  </Form>

                  <h4 className="t_44 fs_16 fw_600">Bakıye pozısıyonları</h4>
                  <div className="Line_E2"></div>
                  <div
                    style={{ width: "600px" }}
                    className="mt-4 d-flex flex-wrap justify-content-between"
                  >
                    <Radio>
                      <span className="t_8F fs_16">
                        Bakıye durumlarıne Gore
                      </span>
                    </Radio>
                    <Radio>
                      <span className="t_8F fs_16">Sureklı Mevcut Goster</span>
                    </Radio>
                    <Radio>
                      <span className="t_8F fs_16">Yolda</span>
                    </Radio>
                    <div className="mt-3">
                      <Radio>
                        <span className="t_8F fs_16">Sıparış uzerıne</span>
                      </Radio>
                    </div>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Bagli Musteriler" key="3">
          <Row gutter={16}>
            <Col span={12}>
              <Button
                type="default"
                className="button-margin bg_none add_button"
              >
                <img src={Images.add_circle_blue} alt="add" />
                Yeni
              </Button>
              <Button
                type="default"
                className="button-margin bg_none edit_button"
              >
                <img src={Images.edit_green} alt="edit" />
                Degistir
              </Button>
            </Col>
            <Col span={12} className="text-right">
              <Button
                type="default"
                icon={<img src={Images.Search_blue} alt="search" />}
                className="button-margin Search_blue"
                onClick={handleShow}
              ></Button>
              <Button
                type="default"
                icon={<img src={Images.Save_green} alt="save" />}
                className="button-margin Save_green"
                disabled={isSaveDisabled}
              ></Button>
              <Button
                type="default"
                icon={<img src={Images.delete_red} alt="delete" />}
                className="button-margin delete_red"
                disabled={isDeleteDisabled}
              ></Button>
            </Col>
          </Row>

          <Row gutter={16} className="mt-4">
            <Col span={24}>
              <Equivalent />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Delegates;
