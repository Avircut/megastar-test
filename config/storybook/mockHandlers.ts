import { rest } from 'msw';
import { mockData } from 'shared/config/jest/mockData';

export const msw = {
  handlers: {
    outlay: rest.get(`${__API__}/list`, (req, res, ctx) => {
      return res(
        ctx.json(mockData),
      );
    }),
  },
};
