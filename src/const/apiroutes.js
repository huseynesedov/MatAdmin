export const apiRoutes = {
    // Manufacturer
    manufacturer: {
        getManufacturerListByProductType: '/catalog/v1/Manufacturer/GetManufacturerListByProductType',
        getManufacturerList: '/catalog/v1/Manufacturer/GetManufacturerList',
        test: '/catalog/v1/Manufacturer/Test',
    },

    // Order
    order: {
        getByOrderId: '/order/v1/OrderDetail/GetByOrderId',
        getOrderDetailStatusList: '/catalog/v1/Order/GetOrderDetailStatusList',
        getOrderStatusList: '/catalog/v1/Order/GetOrderStatusList',
        getOrderTypeList: '/catalog/v1/Order/GetOrderTypeList',
        getShipmentStatusList: '/catalog/v1/Order/GetShipmentStatusList',
        getShipmentTypeList: '/catalog/v1/Order/GetShipmentTypeList',
        test: '/catalog/v1/Order/Test',
        add: '/order/v1/Order/Add',
        getSearchTable: '/order/v1/Order/GetSearchTable',
        baseTest: '/order/v1/Base/Test',
    },

    // Product
    product: {
        decryptBase: '/product/v1/Base/Decrypt',
        encryptBase: '/product/v1/Base/Encrypt',
        decryptProduct: '/product/v1/Product/Decrypt',
        encryptProduct: '/product/v1/Product/Encrypt',
        getById: '/product/v1/Product/GetById',
        getCrossListByProductId: '/product/v1/Product/GetCrossListByProductId',
        getManufacturerAdditionalDiscountById: '/product/v1/Product/GetManufacturerAdditionalDiscountById',
        getOemByProductId: '/product/v1/Product/GetOemByProductId',
        getProductAdditionalDiscountById: '/product/v1/Product/GetProductAdditionalDiscountById',
        getProductGroupsById: '/product/v1/Product/GetProductGroupsById',
        getProductPricesById: '/product/v1/Product/GetProductPricesById',
        getProductQuantitiesById: '/product/v1/Product/GetProductQuantitiesById',
        getSearchTable: '/product/v1/Product/GetSearchTable',
        getShelfAdressesById: '/product/v1/Product/GetShelfAdressesById',
        getVehicleBrandById: '/product/v1/Product/GetVehicleBrandById',
        getVehicleListByProductId: '/product/v1/Product/GetVehicleListByProductId',
        getBestSeller: '/product/v1/Product/GetBestSeller',
        getVehicleModelById: '/product/v1/Product/GetVehicleModelById',
        getProductStockMovements: '/product/v1/Product/GetProductStockMovements',
    },

    // VehicleBrand
    vehicleBrand: {
        getListAsync: '/catalog/v1/VehicleBrand/GetList',
        test: '/catalog/v1/VehicleBrand/Test',
    },

    // Basket
    basket: {
        decryptBase: '/basket/v1/Base/Decrypt',
        encryptBase: '/basket/v1/Base/Encrypt',
        baseTest: '/basket/v1/Base/Test',
        addToBasket: '/basket/v1/BasketDetail/AddToBasket',
        decryptBasketDetail: '/basket/v1/BasketDetail/Decrypt',
        deleteAllBasketDetails: '/basket/v1/BasketDetail/DeleteAll',
        deleteBasketDetailById: '/basket/v1/BasketDetail/DeleteById',
        deleteBasketDetailByIds: '/basket/v1/BasketDetail/DeleteByIds',
        encryptBasketDetail: '/basket/v1/BasketDetail/Encrypt',
        getListByCurrentCustomer: '/basket/v1/BasketDetail/GetListByCurrent',
        getListByProductType: '/basket/v1/BasketDetail/GetListByProductType',
        getTotalPrice: '/basket/v1/BasketDetail/GetTotalPrice',
        basketDetailTest: '/basket/v1/BasketDetail/Test',
        updateQuantity: '/basket/v1/BasketDetail/UpdateQuantity',
        updateStatus: '/basket/v1/BasketDetail/UpdateStatus',
        updateStatusByProductTypeId: '/basket/v1/BasketDetail/UpdateStatusByProductTypeId',
    },


    // account
    account: {
        adminLogin: '/account/v1/Account/AdminLogin',
        decrypt: '/account/v1/Account/Decrypt',
        encrypt: '/account/v1/Account/Encrypt',
        login: '/account/v1/Account/Login',
        refreshToken: '/account/v1/Account/RefreshToken',
        test: '/account/v1/Account/Test',
    },


    // Admnin-Customer
    customer: {
        add: '/admin/v1/Customer/Add',
        getCustomerAdditionalInfo: '/admin/v1/Customer/GetCustomerAdditionalInfo',
        addcustomermanufacturers: '/admin/v1/Customer/AddCustomerManufacturers',
        addcustomerproducts: '/admin/v1/Customer/AddCustomerProducts',
        addmanufactureradditionaldiscount: '/admin/v1/Customer/AddManufacturerAdditionalDiscount',
        addproductadditionaldiscount: '/admin/v1/Customer/AddProductAdditionalDiscount',
        deletecustomermanufacturerByIds: '/admin/v1/Customer/DeleteCustomerManufacturerByIds',
        deletecustomerproductByIds: '/admin/v1/Customer/DeleteCustomerProductByIds',
        deletemanufactureradditionaldiscount: '/admin/v1/Customer/DeleteManufacturerAdditionalDiscount',
        deleteproductadditionaldiscount: '/admin/v1/Customer/DeleteProductAdditionalDiscount',
        getById: '/admin/v1/Customer/GetById',
        getcustomerlistbysearch: '/admin/v1/Customer/GetCustomerListBySearch',
        getcustomermanufacturersbycustomerId: '/admin/v1/Customer/GetCustomerManufacturersByCustomerId',
        getcustomerproductsbycustomerId: '/admin/v1/Customer/GetCustomerProductsByCustomerId',
        getmanufactureradditionaldiscountsbycustomerId: '/admin/v1/Customer/GetManufacturerAdditionalDiscountsByCustomerId',
        getAdminManufacturerLists: '/admin/v1/Customer/GetAdminManufacturerList',
        getCustomerManufacturerListByCustomerId: '/admin/v1/Customer/GetCustomerManufacturerListByCustomerId',
        getproductadditionaldiscountsbycustomerId: '/admin/v1/Customer/GetProductAdditionalDiscountsByCustomerId',
        getCustomerProductListByCustomerId: '/admin/v1/Customer/GetCustomerProductListByCustomerId',
        updateCustomer: '/admin/v1/Customer/UpdateCustomer',
        updateCustomerManufacturer: '/admin/v1/Customer/UpdateCustomerManufacturer',
        updatecustomermanufacturerByIds: '/admin/v1/Customer/UpdateCustomerManufacturerByIds',
        updatecustomermanuDelete: '/admin/v1/Customer/Delete',
        updateCustomerNote: '/admin/v1/Customer/UpdateCustomerNote',
        updateCustomerProductByIds: '/admin/v1/Customer/UpdateCustomerProductByIds',
        updateCustomerProduct: '/admin/v1/Customer/UpdateCustomerProduct',
        updateManufacturerAdditionalDiscount: '/admin/v1/Customer/UpdateManufacturerAdditionalDiscount',
        updateProductAdditionalDiscount: '/admin/v1/Customer/UpdateProductAdditionalDiscount',
        updateUserListByCustomerId: '/admin/v1/Customer/GetUserListByCustomerId',
        updateProductAdditionalDiscountsByCustomerId: '/admin/v1/Customer/GetProductAdditionalDiscountsByCustomerId',
        updateGetAdminProductOilTypeList: '/admin/v1/Customer/GetAdminProductOilTypeList',
        getLoginHistoryByCustomerId: '/admin/v1/LicenseHistory/GetLicenseHistoryByCustomerId',
        getLoginHistoryByCustomerIds: '/admin/v1/LogTransaction/GetLoginHistoryByCustomerId',
        getLicenseHistoryByCustomerId: '/admin/v1/LicenseHistory/GetLicenseHistoryByCustomerId',
        getLicenseHistoryGetTables: '/admin/v1/LicenseHistory/GetTable',
        getLoginHistories: '/admin/v1/LogTransaction/GetLoginHistories',
        getProductTransactionDetails: '/admin/v1/LogTransaction/GetProductTransactionDetails',
        getProductTransactions: '/admin/v1/LogTransaction/GetProductTransactions',
    },






    // Admnin-Order
    order: {
        getOrderList: '/admin/v1/Order/GetOrderList',
        undoOrderForOrderDetail: '/admin/v1/Order/UndoOrderForOrderDetail',
        updateOrderForOrderDetail: '/admin/v1/Order/UpdateOrderForOrderDetail',
        updateOrderIntoPoolForOrderDetail: '/admin/v1/Order/UpdateOrderIntoPoolForOrderDetail',

    },


    // Admnin-OrderDetail
    orderDetail: {
        getOrderDetail: '/admin/v1/OrderDetail/GetOrderDetail',
    },

    return: {
        getReturnList: '/admin/v1/ReturnProduct/GetReturnProductCard',
        undoOrderForOrderDetail: '/admin/v1/Order/UndoOrderForOrderDetail',
        updateOrderForOrderDetail: '/admin/v1/Order/UpdateOrderForOrderDetail',
        updateOrderIntoPoolForOrderDetail: '/admin/v1/Order/UpdateOrderIntoPoolForOrderDetail',
        getReturnProductDetail: '/admin/v1/ReturnProduct/GetReturnProductCardDetailByCardId',

    },

    // Admnin-Product
    product: {
        add: '/admin/v1/Product/Add',
        addOem: '/admin/v1/Product/AddOem',
        addProductVehicleBrand: '/admin/v1/Product/AddProductVehicleBrand',
        deleteOem: '/admin/v1/Product/DeleteOem',
        deleteProduct: '/admin/v1/Product/Delete',
        deleteProductVehicleBrand: '/admin/v1/Product/DeleteProductVehicleBrand',
        getCurrencyTable: '/admin/v1/Product/GetCurrencyTable',
        getManufacturersWithProductCount: '/admin/v1/Product/GetManufacturersWithProductCount',
        getOemListByGroupId: '/admin/v1/Product/GetOemListByGroupId',
        getProductGroupsById: '/admin/v1/Product/GetProductGroupsById',
        getProductPropertyValueTable: '/admin/v1/Product/GetProductPropertyValueTable',
        getSearchTable: '/admin/v1/Product/GetSearchTable',
        getShelfTable: '/admin/v1/Product/GetShelfTable',
        getVehicleBrandListByProductGroupId: '/admin/v1/Product/GetVehicleBrandListByProductGroupId',
        updateOem: '/admin/v1/Product/UpdateOem',
        updateProduct: '/admin/v1/Product/UpdateProduct',
        updateProductVehicleBrand: '/admin/v1/Product/UpdateProductVehicleBrand',

    },

    adminProduct: {
        getById: '/admin/v1/Product/GetById',
        equivalentProducts: '/admin/v1/Product/GetEquivalentProducts',
        getOemsByType: '/admin/v1/Product/GetOemsByType',
        getVehicleBrandListByProductId: '/admin/v1/Product/GetVehicleBrandListByProductId',
    },


    photos: {
        addProductFile: '/admin/v1/Product/AddProductFile',
        getProductFileByProductId: '/admin/v1/Product/GetProductFileByProductId',
        deleteByProductFileId: '/admin/v1/Product/DeleteByProductFileId',
    },


    // Admin-role
    role: {
        add: '/admin/v1/User/AddCustomerUser',
        delete: '/admin/v1/User/AddSalesmanUser',
        getById: '/admin/v1/User/Delete',
        getTable: '/admin/v1/User/GetById',
        update: '/admin/v1/User/GetForUpdateById',
        getUserTable: '/admin/v1/User/GetTable',
        getUserPersonalInformationById: '/admin/v1/User/GetUserPersonalInformationById',
        updateUser: '/admin/v1/User/Update',
        updateUserPassword: '/admin/v1/User/UpdatePassword',
        test: '/admin/v1/User/Test',
    },


    // Admin-Salesman
    role: {
        getById: '/admin/v1/User/AddCustomerUser',
        getSalesmanTableAsync: '/admin/v1/Salesman/GetTableAsync',
        getListByNameOrCode: '/admin/v1/User/AddSalesmanUser',
        GetSalesmanCustomerById: '/admin/v1/User/Delete',
        getSalesmanListForOrderDetail: '/admin/v1/User/GetById',
        updateUserPasswordById: '/admin/v1/User/GetForUpdateById',

    },


    // Admin-user
    user: {
        addCustomerUser: '/admin/v1/User/AddCustomerUser',
        addCustomerAddUser: '/admin/v1/Customer/AddUser',
        addCustomerUpdateUser: '/admin/v1/Customer/UpdateUser',
        addSalesmanUser: '/admin/v1/User/AddSalesmanUser',
        deleteUser: '/admin/v1/User/Delete',
        getUserById: '/admin/v1/User/GetById',
        getForUpdateById: '/admin/v1/User/GetForUpdateById',
        getUserTable: '/admin/v1/User/GetTable',
        getUserPersonalInformationById: '/admin/v1/User/GetUserPersonalInformationById',
        updateUser: '/admin/v1/User/Update',
        updateUserPassword: '/admin/v1/User/UpdatePassword',
        test: '/admin/v1/User/Test',
    },









    // Catalog
    catalog: {
        oemTypeList: '/catalog/v1/Product/GetOemTypeList',
        discountList: '/catalog/v1/Discount/GetDiscountList',
        baseTest: '/catalog/v1/Base/Test',
        getVehicleModels: '/catalog/v1/VehicleModel/GetList',
        getProductGroupList: '/catalog/v1/Product/GetProductGroupList',
        getProductGroupListByProductType: '/catalog/v1/Product/GetProductGroupListByProductType',
        getProductTypeList: '/catalog/v1/Product/GetProductTypeList',
        getShelfList: '/catalog/v1/Product/GetShelfList',
        getCurrencyList: '/catalog/v1/Currency/GetCurrencyList',
        productTest: '/catalog/v1/Product/Test',
        getBasketDetailStatusList: '/catalog/v1/BasketDetailStatus/GetBasketDetailStatusList',
        getPaymentTypeList: '/catalog/v1/PaymentType/GetPaymentTypeList',
        getPaymentTermList: '/catalog/v1/PaymentTerm/GetPaymentTermList',
        getProductGroupListByProductId: '/catalog/v1/Product/GetProductGroupListByProductId',
    },
    storage: {
        storageGetList: '/catalog/v1/Storage/GetList',
    },

    // Salesman

    salesman: {
        salesmanGetTableAsync: '/admin/v1/Salesman/GetTableAsync',
        getSalesmanAdditionalInfo: '/admin/v1/Salesman/GetSalesmanAdditionalInfo',
        getSalesmanCustomerById: '/admin/v1/Salesman/GetSalesmanCustomerById',
        getSalesmanModulePageRoles: '/admin/v1/Salesman/GetSalesmanModulePageRoles',
        updateSalesmanModulePages: '/admin/v1/Salesman/UpdateSalesmanModulePages',
        updateSalesmanAdditionalInfo: '/admin/v1/Salesman/updateSalesmanAdditionalInfo',
    },




    // Duyuru

    announcement: {
        getTable: '/admin/v1/Announcement/GetTable',
    },
    announcementType: {
        getTable: '/admin/v1/AnnouncementType/GetTable',
    },
    announcementType: {
        getById: '/admin/v1/Announcement/GetById',
        getAllAnnocumentTable: '/admin/v1/AnnouncementModulePage/GetAnnouncements',
    },
    announcementModulePage: {
        addAnnocument: '/admin/v1/AnnouncementModulePage/Add',
        deleteAnnocument: '/admin/v1/AnnouncementModulePage/Delete',
        getByIdAnnocument: '/admin/v1/AnnouncementModulePage/GetById',
        uptadeAnnocument: '/admin/v1/AnnouncementModulePage/Update',
        changePriority: '/admin/v1/AnnouncementModulePage/changePriority',
    },

    module: {
        getModuleHierarchy: '/catalog/v1/Module/GetModuleHierarchy',
    },
};
