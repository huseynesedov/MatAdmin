import { Button, Form, InputGroup } from "react-bootstrap";
import "./login.scss";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Images from "../../assets/images/js/Images";
import { useAuth } from "../../AuthContext";

const Login = () => {
    const { Logo, Ellipse, CarAccessories } = Images;
    const { AdminLogin, loginLoading, logged } = useAuth();

    const [userCode, setUserCode] = useState();
    const [passwordHash, setPasswordHash] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (logged) {
            navigate("/", { replace: true });
        }
    }, [logged, navigate]);

    return (
        <div className="container-fluid vh-100">
            <div className="row h-100 flex-column justify-content-center flex-lg-row">
                {/* SOL KISIM */}
                <div className="col-lg-6 d-flex justify-content-center align-items-center">
                    <div className="w-100 px-4 px-sm-5 px-md-5 px-lg-5">
                        <img src={Logo} alt="Logo" className="mb-4" style={{ maxWidth: "150px" }} />
                        <p className="f-24 text-44 mt-2">Hey! Xoş Gəldin</p>
                        <p className="f-20 t-8F mb-4">Xahiş edirəm, məlumatlarınızı daxil edin.</p>

                        <div className="w-100" style={{ maxWidth: "500px" }}>
                            <Form.Group className="mb-3" controlId="formBasicCustomer">
                                <Form.Label>
                                    Kullanıcı Kodu:
                                    <br />
                                    100000001
                                </Form.Label>
                                <Form.Control
                                    onChange={(e) => setUserCode(e.target.value)}
                                    type="text"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Şifrə:
                                    <br />
                                    admin123!!!
                                </Form.Label>
                                <div className="d-flex">
                                    <Form.Control
                                        onChange={(e) => setPasswordHash(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="****"
                                    />
                                    <InputGroup.Text
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {showPassword ? <EyeSlash /> : <Eye />}
                                    </InputGroup.Text>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3 mt-2">
                                <Form.Check
                                    type="checkbox"
                                    label="Kendi Tarayıcımdan Devam Etmek İstiyorum"
                                />
                            </Form.Group>

                            <Button
                                onClick={() => AdminLogin(userCode, passwordHash)}
                                variant="primary2 w-100 mt-3 rounded-pill"
                                type="submit"
                                disabled={loginLoading}
                            >
                                {loginLoading ? "Yüklənir..." : "Giriş"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* SAĞ KISIM (SADECE LG ve ÜZERİ İÇİN) */}
                <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center shadow-lg bg-sh-primary position-relative">
                    <img src={Ellipse} className="position-absolute top-0 end-0" alt="" />
                    <div className="bg-white rounded p-4" style={{ width: "500px", height: "334px" }}>
                        <div className="d-flex flex-column justify-content-center h-100">
                            <p className="f_34 fb-600 t_18">
                                "Avtomobil Təchizatı Satışı"
                            </p>
                            <p className="f_24 t_71 mt-4">
                                Avtomobiliniz üçün ən yaxşı təchizatı tapın!
                            </p>
                        </div>
                        <img
                            className="position-absolute Car_absolute"
                            src={CarAccessories}
                            alt=""
                            style={{ bottom: 0, right: 20, width: "150px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
