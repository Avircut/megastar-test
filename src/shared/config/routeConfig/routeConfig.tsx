import { DepartmentsPage } from 'pages/DepartmentsPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RouteProps } from 'react-router-dom';

export type AppRouteProps = RouteProps & {
  title: string;
}
export enum AppRoutes {
  DEPARTMENTS = 'departments',
  DEPARTMENT_DETAIL = 'department_detail',
  // DEPARTMENT_CREATE = 'department_create',
  // EMPLOYEES = 'employees',
  // EMPLOYEE_DETAIL = 'employee_detail',
  // EMPLOYEE_CREATE = 'employee_create',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.DEPARTMENTS]: '/departments',
  [AppRoutes.DEPARTMENT_DETAIL]: '/departments/', // +id
  // [AppRoutes.DEPARTMENT_CREATE]: '/departments/create',
  // [AppRoutes.EMPLOYEES]: '/employees',
  // [AppRoutes.EMPLOYEE_DETAIL]: '/deployees/', // +id
  // [AppRoutes.EMPLOYEE_CREATE]: '/eployees/create',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: OptionalRecord<AppRoutes, AppRouteProps> = {
  [AppRoutes.DEPARTMENTS]: {
    path: RoutePath.departments,
    element: <DepartmentsPage />,
    title: 'Отделы',
    children: {
      path: `${RoutePath.department_detail}:id`,
      element: <DepartmentsPage />,
      title: 'Детальная страница',
    },
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
    title: 'Страница не найдена',
  },
};
