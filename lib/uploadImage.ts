import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (
  file: File
): Promise<{ url?: string; error?: string }> => {
  try {
    // Convert file to base64
    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64File}`;
    // Upload to cloudinary
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        dataURI,
        {
          resource_type: 'auto',
          folder: 'quickr',
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error('No result returned from upload'));
        }
      );
    });

    return { url: result.secure_url };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { error: 'Failed to upload image' };
  }
};

export default uploadImage;
