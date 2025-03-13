// config/cloudinary.config.js
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Load environment variables from .env file
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // e.g., 'my-cloud'
  api_key: process.env.CLOUDINARY_API_KEY,       // e.g., '123456789'
  api_secret: process.env.CLOUDINARY_API_SECRET, // e.g., 'abcdefg'
});

export default cloudinary;
