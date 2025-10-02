import React, { useEffect, useState } from "react";
import { Checkbox, Button, Collapse, Spin, message, Typography } from "antd";
import axios from "axios";
import {AdminApi} from "../../../../api/admin.api";
import {useParams} from "react-router-dom";

const { Panel } = Collapse;
const { Title } = Typography;

const RolePermissionManager = ({ salesmanIdHash, permission }) => {
    const [loading, setLoading] = useState(true);
    const [moduleData, setModuleData] = useState([]);
    const [permissionMap, setPermissionMap] = useState({});
    let {id} = useParams();

    useEffect(() => {
        fetchPermissions();
    }, [id]);

    const fetchPermissions = async () => {
        try {
            setLoading(true);

            let data
            if (id) {
                AdminApi.getSalesmanModulePageRole({salesmanIdHash: id}).then(res => {
                    // console.log(res, 'customerGetById')
                    if (res) {
                        data = res;
                    }
                })
            }

            const map = {};
            data?.forEach((module) => {

                module?.subModules?.forEach((subModule) => {
                    subModule?.salesmanModulePages?.forEach((page) => {
                        page?.permissions?.forEach((perm) => {
                            const key = `${perm.modulePageRightId}_${perm.id}`;
                            map[key] = {
                                modulePageRightId: perm.modulePageRightId,
                                salesmanRoleTypeId: perm.id,
                                hasPermission: perm.hasPermission,
                            };
                        });
                    });
                });
            });

            setModuleData(data);
            setPermissionMap(map);
        } catch (err) {
            // console.log(err)
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (modulePageRightId, salesmanRoleTypeId, checked) => {
        const key = `${modulePageRightId}_${salesmanRoleTypeId}`;
        setPermissionMap((prev) => ({
            ...prev,
            [key]: {
                modulePageRightId,
                salesmanRoleTypeId,
                hasPermission: checked,
            },
        }));
    };

    const handleSubmit = async () => {
        // console.log(permission, '...permission.permission')
        try {
            AdminApi.updateSalesmanModulePage({...permission}).then(res => {
                if (res) {
                    // console.log(res, 'customerGetById')
                }
            })
            message.success("İcazələr uğurla yadda saxlanıldı.");
        } catch (error) {
            message.error("Yadda saxlanarkən xəta baş verdi.");
        }
    };

    const renderPermissions = (permissions) =>
        permissions?.map((perm) => {
            const key = `${perm.modulePageRightId}_${perm.id}`;
            return (
                <Checkbox
                    key={key}
                    checked={permissionMap[key]?.hasPermission || false}
                    onChange={(e) =>
                        handleCheckboxChange(perm.modulePageRightId, perm.id, e.target.checked)
                    }
                >
                    {perm.name}
                </Checkbox>
            );
        });

    if (loading) return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;

    return (
        <div>
            <Title level={4}>Satış təmsilçisi üçün icazə təyini</Title>

            <Collapse accordion>
                {moduleData?.map((mod) => (
                    <Panel header={mod.name} key={mod.id}>
                        {mod?.subModules?.map((sub) => (
                            <div key={sub.id} style={{ marginBottom: 20, paddingLeft: 12 }}>
                                <Title level={5} style={{ marginBottom: 12 }}>{sub.name}</Title>

                                {sub?.salesmanModulePages?.map((page) => (
                                    <div key={page.id} style={{ marginBottom: 12 }}>
                                        <strong>{page.name}</strong>
                                        <div style={{ marginLeft: 16, marginTop: 6, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                            {renderPermissions(page.permissions)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Panel>
                ))}
            </Collapse>

            <div style={{ textAlign: "right", marginTop: 24 }}>
                <Button type="primary" onClick={handleSubmit}>
                    Yadda saxla
                </Button>
            </div>
        </div>
    );
};

export default RolePermissionManager;
