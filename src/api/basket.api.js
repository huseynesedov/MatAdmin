import { BaseApi } from "../const/api";
import { apiRoutes } from "../const/apiroutes";

export const BasketApi = {
    DecryptBase(params) {
        return BaseApi.get(apiRoutes.basket.decryptBase, { ...params });
    },
    EncryptBase(params) {
        return BaseApi.get(apiRoutes.basket.encryptBase, { ...params });
    },
    BaseTest(params) {
        return BaseApi.get(apiRoutes.basket.baseTest, { ...params });
    },
    AddToBasket(data) {
        return BaseApi.post(apiRoutes.basket.addToBasket, data , data);
    },
    DecryptBasketDetail(params) {
        return BaseApi.get(apiRoutes.basket.decryptBasketDetail, { ...params });
    },
    DeleteAll(params) {
        return BaseApi.delete(apiRoutes.basket.deleteAllBasketDetails, { ...params });
    },
    DeleteById(params) {
        return BaseApi.delete(apiRoutes.basket.deleteBasketDetailById, { ...params });
    },
    DeleteByIds(params) {
        console.log(params)
        return BaseApi.deleteNew(apiRoutes.basket.deleteBasketDetailByIds, params);
    },
    EncryptBasketDetail(params) {
        return BaseApi.get(apiRoutes.basket.encryptBasketDetail, { ...params });
    },
    GetListByCurrent(params) {
        return BaseApi.get(apiRoutes.basket.getListByCurrentCustomer, { ...params });
    },
    GetListByProductType(params) {
        return BaseApi.get(apiRoutes.basket.getListByProductType, { ...params });
    },
    GetTotalPrice(params) {
        return BaseApi.get(apiRoutes.basket.getTotalPrice, { ...params });
    },
    BasketDetailTest(params) {
        return BaseApi.get(apiRoutes.basket.basketDetailTest, { ...params });
    },
    UpdateQuantity(data) {
        return BaseApi.post(apiRoutes.basket.updateQuantity, data, data);
    },
    UpdateStatus(params) {
        return BaseApi.put(`${apiRoutes.basket.updateStatus}?statusId=${params.statusId}&id=${params.id}`);
    },
    UpdateStatusByProductTypeId(params) {
        return BaseApi.put(`${apiRoutes.basket.updateStatusByProductTypeId}?statusId=${params.statusId}&productTypeId=${params.productTypeId}` , { ...params });
    }
};
