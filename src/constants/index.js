export const API_METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",    
}


export const USER_ROLE = {
    RENTER: 2,
    LESSOR: 4,
}

export const USER_ROLE_TEXT = {
    [USER_ROLE.RENTER]: "Người thuê",
    [USER_ROLE.LESSOR]: "Người cho thuê",
}

export const HANDLE_ERROR_CODE = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
}

export const HANDLE_ERROR_MESSAGE = {
    [HANDLE_ERROR_CODE.UNAUTHORIZED]: "Không có quyền truy cập",
    [HANDLE_ERROR_CODE.FORBIDDEN]: "Không có quyền truy cập",
    [HANDLE_ERROR_CODE.NOT_FOUND]: "Không tìm thấy trang",
    [HANDLE_ERROR_CODE.INTERNAL_SERVER]: "Lỗi server",
}