# La Palapa del Padrino — Setup

## Requisitos previos
- Node.js 18+
- Cuenta de GitHub
- Cuenta de Vercel (gratis)

## Desarrollo local

```bash
npm install
cp .env.local.example .env.local
# Edita .env.local con tu contraseña de admin
npm run dev
```

Abre http://localhost:3000

Panel admin: http://localhost:3000/admin

## Deploy en Vercel

### 1. Subir a GitHub
```bash
git init
git add .
git commit -m "Initial commit - Menu La Palapa del Padrino"
git remote add origin https://github.com/TU_USUARIO/menu-padrino.git
git push -u origin main
```

### 2. Conectar con Vercel
1. Ve a https://vercel.com y crea cuenta
2. "Add New Project" → importa tu repo de GitHub
3. En "Environment Variables" agrega:
   - `ADMIN_PASSWORD` = tu contraseña segura
   - `JWT_SECRET` = cadena aleatoria larga (ej: usa https://generate-secret.vercel.app/32)

### 3. Persistencia del menú (Admin Panel)

Para que los cambios del panel admin persistan en producción, necesitas Vercel KV:

1. En el dashboard de Vercel → Storage → Create Database → KV
2. Conéctalo a tu proyecto
3. Las variables de entorno se agregan automáticamente
4. Redeploy

Sin KV, los cambios del admin se pierden al reiniciar el servidor.

### 4. Dominio personalizado
En Vercel → Settings → Domains → agrega `elpadrino-menu.vercel.app`

## Logo
Guarda el logo del Padrino como `public/logo.png`

## Contraseña por defecto (solo desarrollo)
Si no configuras `ADMIN_PASSWORD`, la contraseña es: `admin123`

**¡Cambia esto en producción!**
