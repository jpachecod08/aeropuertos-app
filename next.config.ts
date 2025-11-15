/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // ← ESTA LÍNEA ES CLAVE
  trailingSlash: true,
  images: {
    unoptimized: true  // ← Necesario para exportación estática
  }
}

export default nextConfig