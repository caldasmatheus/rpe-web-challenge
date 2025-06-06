import { defineConfig } from 'cypress'

export default defineConfig({
   hideXHRInCommandLog: true,
   e2e: {
      viewportWidth: 1920,
      viewportHeight: 1080,
      baseUrl: 'https://www.americanas.com.br/',

      setupNodeEvents(on, config) {
         return config
      },
   },
})