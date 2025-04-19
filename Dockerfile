# Gunakan Node.js versi LTS sebagai base image
FROM node:18

# Tentukan direktori kerja dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin semua file aplikasi ke container
COPY . .

# Expose port aplikasi (3000 sesuai dengan konfigurasi Anda)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["node", "app.js"]
