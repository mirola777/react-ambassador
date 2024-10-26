# Usa una imagen base de Node.js
FROM node:18

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Configura el entorno y construye la aplicación Next.js
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# Expon el puerto en el que Next.js corre (por ejemplo, 3000)
EXPOSE 3000

# Comando para iniciar la aplicación Next.js
CMD ["npm", "start"]
