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


    GetProductTransactions(data) {
        return BaseApi.post(apiRoutes.customer.getProductTransactions, data);
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


    customerGetById(id) {
        // URL-in sonuna ?id=... əlavə olunur
        return BaseApi.get(`${apiRoutes.customer.getById}?id=${id}`);
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
    getUpdateUserListByCustomerId(data) {
        return BaseApi.post(apiRoutes.customer.updateUserListByCustomerId, data);
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

    GetCustomerAdditionalInfo(data) {
        return BaseApi.post(apiRoutes.customer.getCustomerAdditionalInfo, data);
    },

    GetLoginHistoryByCustomerId(data) {
        return BaseApi.post(apiRoutes.customer.getLoginHistoryByCustomerId, data);
    },
    // ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    getLoginHistoryByCustomerIdss(data) {
        return BaseApi.post(apiRoutes.customer.getLoginHistories, data);
    },

    getProductTransactionDetails(data) {
        return BaseApi.post(apiRoutes.customer.getProductTransactionDetails, data);
    },


    getProductTransactionDetails(data) {
        return BaseApi.post(apiRoutes.customer.getProductTransactionDetails, data);
    },

    getLicenseHistoryByCustomerId(data) {
        return BaseApi.post(apiRoutes.customer.getLicenseHistoryByCustomerId, data);
    },

    postSalesmanGetTableAsync(data) {
        return BaseApi.post(apiRoutes.salesman.salesmanGetTableAsync, data);
    },

    GetSalesmanGetTableAsync() {
        return BaseApi.post(apiRoutes.salesman.salesmanGetTableAsync, '');
    },

    PostSalesmanGetTableAsync(data) {
        return BaseApi.post(apiRoutes.salesman.salesmanGetTableAsync, data);
    },

    getLicenseHistoryGetTable() {
        return BaseApi.get(apiRoutes.customer.getLicenseHistoryGetTables, '');
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
        return BaseApi.post(apiRoutes.orderDetail.getOrderDetail, { ...params });
    },


    // !!!!!!!!! ReturnProductDetail !!!!!!!!!
    GetReturnProductDetail(params) {
        return BaseApi.post(apiRoutes.return.getReturnProductDetail, { ...params });
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
    deleteProduct(id) {
        // id'yi query param olarak ekle
        const url = `${apiRoutes.product.deleteProduct}?id=${id}`;
        return BaseApi.delete(url);
    },
    DeleteProductVehicleBrand(userId) {
        return BaseApi.delete(apiRoutes.product.deleteProductVehicleBrand, userId);
    },
    GetCurrencyTable(params) {
        return BaseApi.get(apiRoutes.product.getCurrencyTable, { params });
    },
    GetProductFileByProductId(userId) {
        return BaseApi.get(apiRoutes.photos.getProductFileByProductId, { ...userId });
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
        return BaseApi.get(apiRoutes.product.getProductGroupsById, { id: userId });
    },
    GetProductPropertyValueTable(params) {
        return BaseApi.get(apiRoutes.product.getProductPropertyValueTable, { ...params });
    },
    GetSearchTable(params) {
        return BaseApi.post(apiRoutes.product.getSearchTable, { ...params });
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

    // !!!!!!!!! Return !!!!!!!!!
    GetReturnList(data) {
        return BaseApi.post(apiRoutes.return.getReturnList, data);
    },
    // !!!!!!!!! User !!!!!!!!!

    AddCustomerAddUsers(data) {
        return BaseApi.post(apiRoutes.user.addCustomerAddUser, data);
    },


    AddCustomerUpdateUsers(data) {
        return BaseApi.put(apiRoutes.user.addCustomerUpdateUser, data);
    },

    GetSalesmanTableAsync(params) {
        return BaseApi.get(apiRoutes.salesman.salesmanGetTableAsync, { ...params });
    },

    GetSalesmanAdditionalInfos(data) {
        return BaseApi.post(apiRoutes.salesman.getSalesmanAdditionalInfo, data);
    },

    UpdateSalesmanAdditionalInfo(data) {
        return BaseApi.post(apiRoutes.salesman.updateSalesmanAdditionalInfo, data);
    },

    getSalesmanModulePageRole(data) {
        return BaseApi.post(apiRoutes.salesman.getSalesmanModulePageRoles, data);
    },

    updateSalesmanModulePage(data) {
        return BaseApi.post(apiRoutes.salesman.updateSalesmanModulePages, data);
    },

    GetSalesmanCustomerById(data) {
        let setData = {
            page: data.page,
            pageSize: data.pageSize,
        }
        return BaseApi.post(apiRoutes.salesman.getSalesmanCustomerById + `?id=${data.id}`, setData);
    },
    // !!!!!!!!! Announcement !!!!!!!!!

    getAnnouncement(data) {
        return BaseApi.get(apiRoutes.announcement.getTable, data);
    },

    getAllAnnouncements(params) {
        return BaseApi.post(apiRoutes.announcementType.getAllAnnocumentTable, { ...params });
    },


    getModuls(data) {
        return BaseApi.get(apiRoutes.module.getModuleHierarchy, data);
    },

    addAnnocumentModule(params) {
        return BaseApi.post(apiRoutes.announcementModulePage.addAnnocument, { ...params });
    },

    deleteAnnocument(params) {
        return BaseApi.delete(apiRoutes.announcementModulePage.deleteAnnocument, { params });
    },

    getByIdAnnocument(data) {
        return BaseApi.post(apiRoutes.announcementModulePage.getByIdAnnocument, data);
    },

    uptadeAnnocument(params) {
        return BaseApi.put(apiRoutes.announcementModulePage.uptadeAnnocument, { ...params });
    },

    changePriority(params) {
        return BaseApi.put(apiRoutes.announcementModulePage.changePriority, { ...params });
    }



};
