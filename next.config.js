/** @type {import('next').NextConfig} */
 


const nextConfig = {

     
    headers: async () => {
      return [
        {
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: `${process.env.PRODUCTION_URL}` }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
    },
  
  env : {
    SERVER: process.env.SERVER,
    BASE_URL: process.env.NODE_ENV === 'development'?  process.env.DEVELOPEMENT_URL: process.env.PRODUCTION_URL,
    NEXTAUTH_URL: process.env.NODE_ENV === 'development'?  process.env.DEVELOPEMENT_URL: process.env.PRODUCTION_URL,
    NEXTAUTH_SECRECT:process.env.NEXTAUTH_SECRECT,

    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECTRET_KEY: process.env.STRIPE_SECTRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

    MONGODB_URI: process.env.MONGODB_URI,
    DATABASE_CLOUD: process.env.DATABASE_CLOUD,

    SENDGRID_API: process.env.SENDGRID_API,
    SMTP_SERVER: process.env.SMTP_SERVER,
    EMAIL_FROM: process.env.EMAIL_FROM,

    SECRET: process.env.SECRET,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    JWT_SECRET: process.env.JWT_SECRET,
    
    OPEN_WEATHER_API: process.env.OPEN_WEATHER_API,
  },      
  
  images: {
    domains: [
      'res.cloudinary.com', 
      'https://unsplash.com', 
      'http://openweathermap.org',
      'www.tui4u.de'
    ],
  },
    
  };
  
  module.exports = nextConfig;
