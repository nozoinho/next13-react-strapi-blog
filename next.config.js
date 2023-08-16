/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // next necesita recibir informacion del dominio externo para autorizarlo
    //domains: ["127.0.0.1"], // en caso las imagenes se trabajaran de forma local
  },
};

module.exports = nextConfig;
