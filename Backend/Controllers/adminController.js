import AdminDB from "../Models/adminModels.js";
import { productUpload } from '../MiddleWare/Multer.js';

export const adminPost = async (req, res) => {
  console.log('Incoming request:', req.body);
  console.log('Files:', req.files);

  productUpload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err.message);
      return res.status(500).json({ message: 'Error uploading file' });
    }

    try {
      const { id, name, category, new_price, old_price } = req.body;
      console.log('Request Body after upload:', req.body);
      console.log('Uploaded File:', req.file);

      const adminPostData = new AdminDB({
        id,
        name,
        category,
        new_price,
        old_price,
        image: req.file ? req.file.filename : null,
      });

      await adminPostData.save();
      res.status(201).json({ message: 'Product posted successfully', adminPostData });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: '!!xxx Error in AdminPost method xxx!!' });
    }
  });
};
