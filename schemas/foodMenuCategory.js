const { Schema } = require('mongoose');

const { collectionNames } = require('./index');


module.exports = {
	menuCategoryId: {
	    type: Schema.Types.ObjectId,
	    ref: collectionNames.MENU_CATEGORY,
	    required: true,
	},
	foodMenuId: {
	    type: Schema.Types.ObjectId,
	    ref: collectionNames.FOOD_MENU,
	    required: true,
	},
  
};
