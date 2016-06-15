module.exports = {

  db: process.env.MONGODB || process.env.MONGOHQ_URL,

  TOKEN_SECRET: process.env.TOKEN_SECRET,

  CLOUDINARY_URL: process.env.CLOUDINARY_URL
};
