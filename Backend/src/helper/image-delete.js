const fs = require("fs");

const deleteImage = (imagePath) => {
  fs.access(imagePath)
    .then(() => {
      fs.unlink(imagePath);
    })
    .catch((err) => {
      console.log("user-image-does-not-exist");
    });
};



module.exports={
    deleteImage,
}