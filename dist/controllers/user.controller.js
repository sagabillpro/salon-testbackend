// // src/controllers/userController.ts
// import { Request, Response } from 'express';
// export const find = async (req: Request, res: Response) => {
//   try {
//     // Fetch all users from the database (example logic)
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching users', error });
//   }
// };
// export const findById = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user', error });
//   }
// };
// export const create = async (req: Request, res: Response) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating user', error });
//   }
// };
// export const updateById = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     await user.update(req.body);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating user', error });
//   }
// };
// export const deleteById = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     await user.destroy();
//     res.status(204).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting user', error });
//   }
// };
//# sourceMappingURL=user.controller.js.map