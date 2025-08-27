// src/app/layout.js
import Template from './template';

export const metadata = {
  title: 'Aglio & Pasta',
  description: 'Italian Restaurant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
        <link rel="shortcut icon" href="/Logo.svg" type="image/x-icon" />
      </head>
      <body className="bg-white text-gray-900">
        <Template>{children}</Template>
      </body>
    </html>
  );
}