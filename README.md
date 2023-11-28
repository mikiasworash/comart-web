# COMART Web

> Frontend application for comart, an ecommerce platform

## How to use Comart

### 1. Clone the repository

```
git clone https://github.com/mikiasworash/comart-web.git
```

### 2. Install Dependencies

```
cd comart-web
npm install
```

### 3. Create "next.config.js" file at root, copy and paste the following and set your environment variables

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },

  images: {
    domains: ["res.cloudinary.com", "placehold.co"],
  },

  env: {
    cloudinaryURL: "https://api.cloudinary.com/v1_1/["enter your cloudinary environment key"]/image/upload",
  },
};

module.exports = nextConfig;

```

### 4. Run the development server

```
npm run dev
```

### 5. Open [http://localhost:3000](http://localhost:3000) with your bowser
