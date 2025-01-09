import { BaseApi } from "../const/api";
import { apiRoutes } from "../const/apiroutes";

export const AdminApi = {
    // !!!!!!!!! Customer !!!!!!!!!
    Add(data) {
        return BaseApi.post(apiRoutes.customer.add, data);
    },
    AddCustomerManufacturers(params) {
        return BaseApi.delete(apiRoutes.customer.addcustomermanufacturers, { ...params });
    },
    AddCustomerProducts(params) {
        return BaseApi.delete(apiRoutes.customer.addcustomerproducts, { ...params });
    },
    AddManufacturerAdditionalDiscount(data) {
        return BaseApi.post(apiRoutes.customer.addmanufactureradditionaldiscount, data);
    },
    AddProductAdditionalDiscount(data) {
        return BaseApi.post(apiRoutes.customer.addproductadditionaldiscount, data);
    },
    DeleteCustomerManufacturerByIds(params) {
        return BaseApi.delete(apiRoutes.customer.deletecustomermanufacturerByIds, { ...params });
    },
    DeleteCustomerProductByIds(params) {
        return BaseApi.delete(apiRoutes.customer.deletecustomerproductByIds, { ...params });
    },
    DeleteManufacturerAdditionalDiscount(params) {
        return BaseApi.deleteNew(apiRoutes.customer.deletemanufactureradditionaldiscount, params);
    },
    DeleteProductAdditionalDiscount(userId) {
        return BaseApi.delete(apiRoutes.customer.deleteproductadditionaldiscount, { data: { id: userId } });
    },
    GetById(userId) {
        return BaseApi.get(apiRoutes.adminProduct.getById, userId);
    },
    GetById(userId) {
        return BaseApi.get(apiRoutes.adminProduct.getById, userId);
    },
    customerGetById(userId) {
        return BaseApi.get(apiRoutes.customer.getById, userId);
    },
    GetCustomerListBySearch(data) {
        return BaseApi.post(apiRoutes.customer.getcustomerlistbysearch, data);
    },
    GetCustomerManufacturersByCustomerId(data) {
        return BaseApi.post(apiRoutes.customer.getcustomermanufacturersbycustomerId, data);
    },
    GetCustomerProductsByCustomerId(data) {
        return BaseApi.post(apiRoutes.customer.getcustomerproductsbycustomerId, data);
    },
    GetManufacturerAdditionalDiscountsByCustomerId(data) {
        return BaseApi.post(apiRoutes.customer.getmanufactureradditionaldiscountsbycustomerId, data);
    },
    getAdminManufacturerList(data) {
        return BaseApi.post(apiRoutes.customer.getAdminManufacturerLists, data);
    },
    getCustomerManufacturerListByCustomerId(data) {
        return BaseApi.post(apiRoutes.customer.getCustomerManufacturerListByCustomerId, data);
    },
    GetProductAdditionalDiscountsByCustomerId(data) {
        return BaseApi.post(apiRoutes.customer.getproductadditionaldiscountsbycustomerId, data);
    },
    getCustomerProductListByCustomerId(data) {
        return BaseApi.post(apiRoutes.customer.getCustomerProductListByCustomerId, data);
    },
    GetUpdateProductAdditionalDiscountsByCustomerId(data) {
        return BaseApi.post(apiRoutes.customer.updateProductAdditionalDiscountsByCustomerId, data);
    },
    GetUpdateGetAdminProductOilTypeList(data) {
        return BaseApi.post(apiRoutes.customer.updateGetAdminProductOilTypeList, data);
    },
    UpdateCustomer(data) {
        return BaseApi.put(apiRoutes.customer.updateCustomer, data);
    },
    UpdateCustomerManufacturer(data) {
        return BaseApi.put(apiRoutes.customer.updateCustomerManufacturer, data);
    },
    updateCustomerProduct(data) {
        return BaseApi.put(apiRoutes.customer.updateCustomerProduct, data);
    },
    UpdateCustomerManufacturerByIds(params) {
        return BaseApi.delete(apiRoutes.customer.updatecustomermanufacturerByIds, { ...params });
    },
    UpdateCustomerManufacturerByIds(params) {
        return BaseApi.delete(apiRoutes.customer.updatecustomermanufacturerByIds, { ...params });
    },
    UpdateCustomerDeleteId(params) {
        return BaseApi.deleteNew(apiRoutes.customer.updatecustomermanuDelete, params);
    },
    UpdateCustomerNote(data) {
        return BaseApi.put(apiRoutes.customer.updateCustomerNote, data);
    },
    UpdateCustomerProductByIds(params) {
        return BaseApi.delete(apiRoutes.customer.updateCustomerProductByIds, { ...params });
    },
    UpdateManufacturerAdditionalDiscount(data) {
        return BaseApi.put(apiRoutes.customer.updateManufacturerAdditionalDiscount, data);
    },
    UpdateProductAdditionalDiscount(data) {
        return BaseApi.put(apiRoutes.customer.updateProductAdditionalDiscount, data);
    },


    /*Search*/


    GetPaymentTermList() {
        return BaseApi.get(apiRoutes.catalog.getPaymentTermList, '');
    },

    GetDiscountList() {
        return BaseApi.get(apiRoutes.catalog.discountList, '');
    },

    // !!!!!!!!! Order !!!!!!!!!
    GetOrderList(data) {
        return BaseApi.post(apiRoutes.order.getOrderList, data);
    },
    UndoOrderForOrderDetail(params) {
        return BaseApi.put(`${apiRoutes.order.undoOrderForOrderDetail}?id=${params.id}`);
    },
    UpdateOrderForOrderDetail(data) {
        return BaseApi.put(apiRoutes.order.updateOrderForOrderDetail, data);
    },
    UpdateOrderIntoPoolForOrderDetail(params) {
        return BaseApi.put(`${apiRoutes.order.updateOrderIntoPoolForOrderDetail}?id=${params.id}`);
    },


    // !!!!!!!!! OrderDetail !!!!!!!!!
    GetOrderDetail(params) {
        return BaseApi.post(apiRoutes.orderDetail.getOrderDetail, { ...params});
    },


    // !!!!!!!!! Product !!!!!!!!!
/*    Add(data) {
        return BaseApi.post(apiRoutes.product.add, data);
    },*/
    AddProduct(data) {
        return BaseApi.post(apiRoutes.product.add, data);
    },
    AddEquivalentProducts(data) {
        return BaseApi.post(apiRoutes.adminProduct.equivalentProducts, data);
    },
    AddOem(data) {
        return BaseApi.post(apiRoutes.product.addOem, data);
    },
    AddProductVehicleBrand(data) {
        return BaseApi.post(apiRoutes.product.addProductVehicleBrand, data);
    },
    DeleteOem(userId) {
        return BaseApi.delete(apiRoutes.product.deleteOem, { ...{ id: userId } });
    },
    deleteProduct(userId) {
        return BaseApi.delete(apiRoutes.product.deleteProduct, { ...{ id: userId } });
    },
    DeleteProductVehicleBrand(userId) {
        return BaseApi.delete(apiRoutes.product.deleteProductVehicleBrand, userId );
    },
    GetCurrencyTable(params) {
        return BaseApi.get(apiRoutes.product.getCurrencyTable, { params });
    },
    GetProductFileByProductId(userId) {
        return BaseApi.get(apiRoutes.photos.getProductFileByProductId, {...userId});
    },
    deleteProductPhoto(userId) {
        return BaseApi.delete(`${apiRoutes.photos.deleteByProductFileId}?productFileId=${userId}`);
    },
    GetVehicleBrandProductId(params) {
        return BaseApi.get(apiRoutes.adminProduct.getVehicleBrandListByProductId, { ...params });
    },
    GetManufacturersWithProductCount(data) {
        return BaseApi.post(apiRoutes.product.getManufacturersWithProductCount, data);
    },
    GetOemListByGroupId(params) {
        return BaseApi.get(`${apiRoutes.product.getOemListByGroupId}?type=${params.type}&productGroupId=${params.productGroupId}`);
    },
    GetProductGroupsById(userId) {
        return BaseApi.get(apiRoutes.product.getProductGroupsById, { id: userId  });
    },
    GetProductPropertyValueTable(params) {
        return BaseApi.get(apiRoutes.product.getProductPropertyValueTable, { ...params });
    },
    GetSearchTable(params) {
        return BaseApi.post(apiRoutes.product.getSearchTable, {...params});
    },
    GetSearchEquivalentProducts(data) {
        return BaseApi.post(apiRoutes.adminProduct.equivalentProducts, data);
    },
    GetOemsByTypes(params) {
        return BaseApi.get(apiRoutes.adminProduct.getOemsByType, { ...params });
    },
    GetShelfTable(params) {
        return BaseApi.get(apiRoutes.product.getShelfTable, { params });
    },
    GetVehicleBrandListByProductGroupId(userId) {
        return BaseApi.get(apiRoutes.product.getVehicleBrandListByProductGroupId, { params: { id: userId } });
    },
    UpdateOem(data) {
        return BaseApi.put(apiRoutes.product.updateOem, data);
    },
    UpdateProduct(data) {
        return BaseApi.put(apiRoutes.product.updateProduct, data);
    },
    UpdateProductVehicleBrand(data) {
        return BaseApi.put(apiRoutes.product.updateProductVehicleBrand, data);
    },

/*
    // !!!!!!!!! Role !!!!!!!!!
    AddRole(data) {
        return BaseApi.post(apiRoutes.role.add, data);
    },
    Delete(userId) {
        return BaseApi.delete(apiRoutes.role.delete, { data: { id: userId } });
    },
    GetByIdRole(userId) {
        return BaseApi.get(apiRoutes.role.getById, { params: { id: userId } });
    },
    GetTable(params) {
        return BaseApi.get(apiRoutes.role.getTable, { params });
    },
    Update(data) {
        return BaseApi.put(apiRoutes.role.update, data);
    },


    // !!!!!!!!! Salesman !!!!!!!!!
    GetById(userId) {
        return BaseApi.get(apiRoutes.salesman.getById, { params: { id: userId } });
    },
    GetListByNameOrCode(params) {
        return BaseApi.post(`${apiRoutes.salesman.getListByNameOrCode}?name=${params.name}&code=${params.code}`);
    },
    GetSalesmanCustomerById(userId) {
        return BaseApi.post(apiRoutes.salesman.GetSalesmanCustomerById, { params: { id: userId } });
    },
    GetSalesmanListForOrderDetail(data) {
        return BaseApi.post(apiRoutes.salesman.getSalesmanListForOrderDetail, data);
    },
    UpdateUserPasswordById(data) {
        return BaseApi.put(apiRoutes.salesman.updateUserPasswordById, data);
    },



    // !!!!!!!!! User !!!!!!!!!
    AddCustomerUser(data) {
        return BaseApi.post(apiRoutes.user.addCustomerUser, data);
    },
    AddSalesmanUser(data) {
        return BaseApi.post(apiRoutes.user.addSalesmanUser, data);
    },
    DeleteUser(userId) {
        return BaseApi.delete(apiRoutes.user.deleteUser, { data: { id: userId } });
    },
    GetUserById(userId) {
        return BaseApi.get(apiRoutes.user.getUserById, { params: { id: userId } });
    },
    GetForUpdateById(userId) {
        return BaseApi.get(apiRoutes.user.getForUpdateById, { params: { id: userId } });
    },
    GetUserTable(params) {
        return BaseApi.get(apiRoutes.user.getUserTable, { params });
    },
    GetUserPersonalInformationById(userId) {
        return BaseApi.get(apiRoutes.user.getUserPersonalInformationById, { id: userId });
    },
    UpdateUser(data) {
        return BaseApi.put(apiRoutes.user.updateUser, data);
    },
    UpdateUserPassword(data) {
        return BaseApi.put(apiRoutes.user.updateUserPassword, data);
    }
 */
};
