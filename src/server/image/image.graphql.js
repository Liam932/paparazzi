const { composeWithMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');
const Image = require('./image.model');

const ImageTC = composeWithMongoose(Image);

schemaComposer.rootQuery().addFields({
  imageById: ImageTC.getResolver('findById'),
  imageByIds: ImageTC.getResolver('findByIds'),
  imageOne: ImageTC.getResolver('findOne'),
  imageMany: ImageTC.getResolver('findMany'),
  imageCount: ImageTC.getResolver('count'),
  imageConnection: ImageTC.getResolver('connection'),
  imagePagination: ImageTC.getResolver('pagination'),
});

schemaComposer.rootMutation().addFields({
  imageCreate: ImageTC.getResolver('createOne'),
  imageUpdateById: ImageTC.getResolver('updateById'),
  imageUpdateOne: ImageTC.getResolver('updateOne'),
  imageUpdateMany: ImageTC.getResolver('updateMany'),
  imageRemoveById: ImageTC.getResolver('removeById'),
  imageRemoveOne: ImageTC.getResolver('removeOne'),
  imageRemoveMany: ImageTC.getResolver('removeMany'),
});
