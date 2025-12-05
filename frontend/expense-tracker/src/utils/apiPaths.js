export const BASE_URL = 'http://localhost:8000';

// API paths for the Expense Tracker application
// These paths are used to interact with the backend services for authentication, dashboard, income, and expense management.
export const API_PATHS = {
    AUTH: {
        LOGIN: '/api/v1/auth/login',
        REGISTER: '/api/v1/auth/register',
        GET_USER_INFO: '/api/v1/auth//getUser',
    },

    DASHBOARD: {
        GET_DATA: '/api/v1/dashboard',
    },

    INCOME: {
        GET_ALL_INCOME: '/api/v1/income/getAll',
        ADD_INCOME: '/api/v1/income/add',
        DELETE_INCOME: (incomeId) => `/api/v1/income/delete/${incomeId}`,
        DOWNLOAD_INCOME_EXCEL: '/api/v1/income/download-excel',
    },

    EXPENSE: {
        GET_ALL_EXPENSE: '/api/v1/expense/getAll',
        ADD_EXPENSE: '/api/v1/expense/add',
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/delete/${expenseId}`,
        DOWNLOAD_EXPENSE_EXCEL: '/api/v1/expense/download-excel',
    },

    IMAGE: {
        UPLOAD: '/api/v1/auth/upload-image',
    }

}
