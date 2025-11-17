import { BaseApi } from "../const/api";
import { apiRoutes } from "../const/apiroutes";

export const communicationApi = {
    GetAllNotificationList(params) {
        return BaseApi.get(apiRoutes.notification.getAllNotificationList, { ...params });
    },


    MarkNotificationAsRead(idHash) {
        return BaseApi.post(`${apiRoutes.notification.markNotificationAsRead}?id=${idHash}`);
    },
};
