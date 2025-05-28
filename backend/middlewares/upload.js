// middlewares/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garante que as pastas existem
const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === 'imagem' ? 'public/imagens' : 'public/sons';
    ensureDirectoryExistence(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const id = req.params.id;
    const ext = path.extname(file.originalname);
    cb(null, `${id}${ext}`);
  }
});

const upload = multer({ storage });

module.exports = upload;
