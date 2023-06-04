const fs = require("fs").promises;
const path = require("path");

const userAvatarDelete = async (userId, folderPath) => {
  try {
    const files = await fs.readdir(folderPath);

    files.map(async (file) => {
      const fullFilePath = path.join(folderPath, file);

      if (file.includes(userId)) {
        await fs.unlink(fullFilePath);
      }
    });
  } catch (error) {
    console.error(error);
    return;
  }
};

module.exports = userAvatarDelete;
