import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Publicado em https://<usuario>.github.io/dev-fisco-guide/ — o base precisa
// bater com o nome do repositório. Se o repo for renomeado, atualize aqui.
export default defineConfig({
  base: '/dev-fisco-guide/',
  plugins: [react(), tailwindcss()],
})
