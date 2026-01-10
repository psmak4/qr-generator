import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'inline-css',
      apply: 'build',
      enforce: 'post',
      generateBundle(_, bundle) {
        const cssFileName = Object.keys(bundle).find(key => key.endsWith('.css'));
        const htmlFileName = 'index.html';
        
        if (cssFileName && bundle[htmlFileName]) {
          const cssAsset = bundle[cssFileName];
          const htmlAsset = bundle[htmlFileName];
          
          if (cssAsset.type === 'asset' && htmlAsset.type === 'asset') {
            const cssCode = cssAsset.source;
            let htmlCode = htmlAsset.source as string;
            
            // Inject style tag before closing head
            htmlCode = htmlCode.replace(
              '</head>', 
              `<style>${cssCode}</style></head>`
            );
            
            // Remove the link tag
            // Escape the filename for regex usage just in case
            const escapedFileName = cssFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Match link tag with href pointing to the file (allowing for leading / or ./)
            const linkRegex = new RegExp(`<link[^>]*?href="[./]*${escapedFileName}"[^>]*?>`);
            htmlCode = htmlCode.replace(linkRegex, '');
            
            htmlAsset.source = htmlCode;
            delete bundle[cssFileName];
          }
        }
      }
    },
    compression({ algorithms: ['brotliCompress'] })
  ],
  build: {
    modulePreload: {
      resolveDependencies(_filename, deps) {
        // Prevent preloading of the PDF vendor chunk to save bandwidth on initial load
        return deps.filter(dep => !dep.includes('vendor-pdf') && !dep.includes('jspdf'));
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-qr': ['qrcode'],
        },
      },
    },
  },
})
