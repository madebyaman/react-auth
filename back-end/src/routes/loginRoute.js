import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const loginRoute = {
  path: '/api/login',
  method: 'post',
  handler: async (req, res) => {},
};
