import React, { useState } from "react";
import { Accordion, Card, Form } from "react-bootstrap";

const PermissionSettings = ({ modules, onChange }: any) => {
    const [data, setData] = useState(modules);

    const [changedPermissions, setChangedPermissions] = useState([]);

    /*const handlePermissionChange = (moduleIndex: number, subIndex: number, pageIndex: number, permissionIndex: number) => {
        const newData = [...data];
        const perm = newData[moduleIndex]
            .subModules[subIndex]
            .salesmanModulePages[pageIndex]
            .permissions[permissionIndex];

        perm.hasPermission = !perm.hasPermission;
        setData(newData);
        onChange && onChange(newData); // dəyişiklikləri yuxarıya ötürmək üçün

        /!* let data = {
            salesmanIdHash: id,
            salesmanRoleModulePageRightModels: [
                {
                    modulePageRightId: newData[moduleIndex]
                        .subModules[subIndex]
                        .salesmanModulePages[pageIndex].id,
                    salesmanRoleTypeId:  newData[moduleIndex]
                        .subModules[subIndex]
                        .salesmanModulePages[pageIndex]
                        .permissions[permissionIndex].id,
                    hasPermission: perm.hasPermission
                }
            ]
        }
        if (id) {
            AdminApi.updateSalesmanModulePage({data}).then(res => {
                if (res) {
                    console.log(res)
                }
            })
        }*!/
    };*/
    const handlePermissionChange = (
        moduleIndex: number,
        subIndex: number,
        pageIndex: number,
        permissionIndex: number,
        salesmanRoleTypeId: number = 0
    ) => {
        const newData = [...data];

        const perm = newData[moduleIndex]
            .subModules[subIndex]
            .salesmanModulePages[pageIndex]
            .permissions[permissionIndex];


        perm.hasPermission = !perm.hasPermission;
        setData(newData);


        const uniqueKey = `${newData[moduleIndex].subModules[subIndex].salesmanModulePages[pageIndex].id}-${perm.id}`;

       /* const updatedPermission = {
            uniqueKey,
            modulePageRightId: perm.id,
            salesmanRoleTypeId,
            hasPermission: perm.hasPermission
        };*/

        const updatedPermission = {
            uniqueKey, // sadəcə lokalda istifadə üçün
            modulePageRightId: perm.modulePageRightId,
            salesmanRoleTypeId: perm.id,
            hasPermission: perm.hasPermission
        };

        setChangedPermissions(prev => {
            const filtered = prev.filter(p => p.uniqueKey !== updatedPermission.uniqueKey);
            const updatedList = [...filtered, updatedPermission];


            const result = updatedList.map(({ modulePageRightId, salesmanRoleTypeId, hasPermission }) => ({
                modulePageRightId,
                salesmanRoleTypeId,
                hasPermission
            }));

            onChange && onChange({
                salesmanRoleModulePageRightModels: result
            });

            return updatedList;
        });
    };


    return (
        <Accordion>
            {data.map((module: any, moduleIndex: number) => (
                <Accordion.Item eventKey={String(module.id)} key={module.id}>
                    <Accordion.Header>{module.name}</Accordion.Header>
                    <Accordion.Body>
                        {module.subModules.map((sub: any, subIndex: number) => (
                            <Card key={sub.id} className="mb-3">
                                <Card.Header>{sub.name}</Card.Header>
                                <Card.Body>
                                    {sub.salesmanModulePages.map((page: any, pageIndex: number) => (
                                        <Card key={page.id} className="mb-2">
                                            <Card.Header>{page.name}</Card.Header>
                                            <Card.Body>
                                                {page.permissions.map((perm: any, permissionIndex: number) => (
                                                    <Form.Check
                                                        key={perm.id}
                                                        type="checkbox"
                                                        id={`perm-${perm.id}-${page.id}`}
                                                        label={`${perm.name} (${perm.code})`}
                                                        checked={perm.hasPermission}
                                                        onChange={() =>
                                                            handlePermissionChange(moduleIndex, subIndex, pageIndex, permissionIndex)
                                                        }
                                                    />
                                                ))}
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Card.Body>
                            </Card>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
};

export default PermissionSettings;
