import { BaseApi } from "../const/api";
import { apiRoutes } from "../const/apiroutes";

export const CatalogApi = {
    // Manufacturer
    GetManufacturerListByProductType(params) {
        return BaseApi.get(apiRoutes.manufacturer.getManufacturerListByProductType, { ...params });
    },
    GetManufacturerList(params) {
        return BaseApi.get(apiRoutes.manufacturer.getManufacturerList, { ...params });
    },
    ManufacturerTest(params) {
        return BaseApi.get(apiRoutes.manufacturer.test, { ...params });
    },

    // Order
    GetOrderDetailStatusList(params) {
        return BaseApi.get(apiRoutes.order.getOrderDetailStatusList, { ...params });
    },
    GetOrderStatusList(params) {
        return BaseApi.get("/catalog/v1/Order/GetOrderStatusList", { ...params });
    },
    GetOrderTypeList(params) {
        return BaseApi.get('/catalog/v1/Order/GetOrderTypeList', { ...params });
    },
    GetShipmentStatusList(params) {
        return BaseApi.get(apiRoutes.order.getShipmentStatusList, { ...params });
    },
    GetShipmentTypeList(params) {
        return BaseApi.get(apiRoutes.order.getShipmentTypeList, { ...params });
        
    },
    getVehicleModel(data) {
        return BaseApi.post(apiRoutes.catalog.getVehicleModels, data);
    },

    // vehicle model

    GetVehicleBrand(params) {
        return BaseApi.get(apiRoutes.vehicleBrand.getListAsync, { ...params })
    },



    // Product
    GetProductGroupList(params) {
        return BaseApi.get(apiRoutes.catalog.getProductGroupList, { ...params });
    },
    GetProductGroupListByProductType(params) {
        return BaseApi.get(apiRoutes.catalog.getProductGroupListByProductType, { ...params });
    },
    GetOemTypeList(params) {
        return BaseApi.get(apiRoutes.catalog.oemTypeList, { ...params });
    },
    GetProductTypeList(params) {
        return BaseApi.get(apiRoutes.catalog.getProductTypeList, { ...params });
    },
    getShelfList(params) {
        return BaseApi.get(apiRoutes.catalog.getShelfList, { ...params });
    },
    getCurrencyLists(params) {
        return BaseApi.get(apiRoutes.catalog.getCurrencyList, { ...params });
    },
    getProductGroupList(params) {
        return BaseApi.get(apiRoutes.catalog.getProductGroupListByProductId, { ...params });
    },
    ProductTest(params) {
        return BaseApi.get(apiRoutes.catalog.productTest, { ...params });
    },
    // VehicleBrand
    GetVehicleBrandListAsync(params) {
        return BaseApi.get(apiRoutes.vehicleBrand.getListAsync, { ...params });
    },
    VehicleBrandTest(params) {
        return BaseApi.get(apiRoutes.vehicleBrand.test, { ...params });
    },
    storageGetList(params) {
        return BaseApi.get(apiRoutes.storage.storageGetList, { ...params });
    },
    GetBasketDetailStatusList(params) {
        return BaseApi.get(apiRoutes.catalog.getBasketDetailStatusList, { ...params });
    },
    GetPaymentTypeList(params) {
        return BaseApi.get(apiRoutes.catalog.getPaymentTypeList, { ...params });
    },

};
