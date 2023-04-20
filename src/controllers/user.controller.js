import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Buat user baru
export async function register(req, res) {
  try {
    const { name, email, position, jersey } = req.body;

    const result = await prisma.user.create({
      data: {
        name,
        email,
        position,
        jersey,
      },
    });
    console.log('New user added');
    res.status(201).json({
      status: 'success',
      message: 'User has been created',
      data: result,
      timestamp: new Date().toISOString(),
    });
  }  catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
};

// User ID
export async function getUserByID(req, res) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
    });
    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'User not found',
        timestamp: new Date().toISOString(),
      });
    } else {
      console.log('Success to get user');
      res.status(200).json({
        status: 'success',
        data: user,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
};

// ALL USER
export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
};

// UPDATE ID
export async function updateUserByID(req, res) {
  const { id } = req.params;
  const { name, email, position, jersey } = req.body;

  try {
    const findUser = await prisma.user.findUnique({
      where: { id: String(id) },
    });

     if (!findUser) {
      res.status(404).json({
        status: 'fail',
        message: 'User not found',
        timestamp: new Date().toISOString(),
      });
    } else {
      const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: {
          name,
          email,
          position,
          jersey,
        },
      });
      res.status(200).json({
        status: 'success',
        message: 'User has been updated',
        data: updatedUser,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
};

// DELETE ID
export async function deleteUserByID(req, res) {
  const { id } = req.params;

  try {
    const findUser = await prisma.user.findUnique({
      where: { id: String(id) },
    });

    if (!findUser) {
      res.json({
        message: 'False id',
      });
    } else {
      const user = await prisma.user.delete({
        where: { id: String(id) },
      });
      res.json({
        'deleted user': user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
};
