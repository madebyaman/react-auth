import jwt from 'jsonwebtoken'; // B/c the user is supposed to send the jwt to verify authorization
import { ObjectID } from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserInfoRoute = {
  path: '/api/users/:userId',
  method: 'put',
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const updates = (({ favoriteFood, hairColor, bio }) => ({
      favoriteFood,
      hairColor,
      bio,
    }))(req.body); // To get only important data.

    if (!authorization)
      return res.status(401).json({ message: 'No authorization header sent' });
    const token = authorization.split(' ')[1]; // B/c data is sent in the form of `Bearer flajsa.dsafjas`
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json(err);
      const { id } = decoded;
      if (id !== userId)
        return res
          .status(403)
          .json({ message: 'Not allowed to update another user data' });
      const db = getDbConnection('react-auth-db');
      const result = await db
        .collection('users')
        .findOneAndUpdate(
          { _id: ObjectID(id) },
          { $set: { info: updates } },
          { returnOriginal: false }
        );
      const { email, isVerified, info } = result.value;
      jwt.sign(
        { id, isVerified, email, info },
        process.env.JWT_SECRET,
        { expiresIn: '2d' },
        (err, token) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({ token });
        }
      );
    });
  },
};
