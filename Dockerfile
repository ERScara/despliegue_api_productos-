FROM node:18.16

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de la API a la imagen
COPY package*.json ./
COPY . .

# Instalamos las dependencias de la API
RUN npm install

# Puerto en el que la API escuchará dentro del contenedor
EXPOSE 3000

# Comando para iniciar la API
CMD ["npm", "start"]
