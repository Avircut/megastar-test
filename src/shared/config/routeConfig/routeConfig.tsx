import { DepartmentsPage } from 'pages/DepartmentsPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
  DEPARTMENTS = 'departments',
  // DEPARTMENT_DETAIL = 'department_detail',
  // DEPARTMENT_CREATE = 'department_create',
  // EMPLOYEES = 'employees',
  // EMPLOYEE_DETAIL = 'employee_detail',
  // EMPLOYEE_CREATE = 'employee_create',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.DEPARTMENTS]: '/departments',
  // [AppRoutes.DEPARTMENT_DETAIL]: '/departments/', // +id
  // [AppRoutes.DEPARTMENT_CREATE]: '/departments/create',
  // [AppRoutes.EMPLOYEES]: '/employees',
  // [AppRoutes.EMPLOYEE_DETAIL]: '/deployees/', // +id
  // [AppRoutes.EMPLOYEE_CREATE]: '/eployees/create',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.DEPARTMENTS]: {
    path: RoutePath.departments,
    element: <DepartmentsPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
