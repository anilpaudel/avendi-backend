const config = require('../config/env');
const FoodMenu = require('../models/food_menu');
const NotFoundError = require('../lib/errors/notFoundError');
const { uploadToS3 } = require('../utils/uploadToS3');
const { addTimestampToFilename } = require('../utils/string');

exports.createFoodMenu = async function (payload, image) {
  try {
    const data = {
      ...payload,
    };

    const menu = await FoodMenu().save(data);
    if (!image) {
      return menu;
    }

    return await uploadMenuImage(menu._id, file);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const uploadMenuImage = async function uploadMenuImage(menuId, file) {
  try {
    const findMenu = await FoodMenu().fetchById(menuId);
    if (!findMenu) {
      throw new NotFoundError();
    }

    const imageBucketName = config.aws.imageBucketName;
    const folderName = config.aws.imageFolder;
    const filename = addTimestampToFilename(file.originalname);

    const uploadImageUrl = await uploadToS3(
      imageBucketName,
      file.buffer,
      folderName ? `${folderName}/${filename}` : `${filename}`
    );

    const menu = await FoodMenu().updateById(menuId, { image: uploadImageUrl });

    return formatMenu(menu);
  } catch (err) {
    if (err.statusCode === 403) {
      throw new CustomError('Image upload access denied.', 403);
    }
    throw err;
  }
};

exports.uploadMenuImage = uploadMenuImage;

const formatMenu = (menu) => {
  const updatedMenu = { ...menu };

  updatedMenu.categories =
    menu.categoryId && menu.categoryId.map((category) => category.name);

  delete updatedMenu.categoryId;

  return updatedMenu;
};

exports.fetchAll = async () => {
  const menuData = await FoodMenu().fetchAll();

  return menuData.map(formatMenu);
};

exports.fetchById = async (foodMenuId) => {
  const menu = await FoodMenu().fetchById(foodMenuId);

  if (!menu) {
    throw new NotFoundError();
  }

  return formatMenu(menu);
};

exports.updateFoodMenu = async (foodMenuId, updateData) => {
  const menu = await FoodMenu().updateById(foodMenuId, updateData);
  if (!menu) {
    throw new NotFoundError();
  }

  return formatMenu(menu);
};

exports.deleteFoodMenu = async (foodMenuId) => {
  const menu = await FoodMenu().deleteById(foodMenuId);
  if (!menu) {
    throw new NotFoundError();
  }
};
