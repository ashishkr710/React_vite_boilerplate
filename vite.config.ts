import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
 plugins: [react()],
 resolve: {
  alias: {
   "@components": path.resolve(__dirname, "src/components/"),
   "@images": path.resolve(__dirname, "src/Assets/Images"),
   "@constants": path.resolve(__dirname, "src/constants/"),
   "@hooks": path.resolve(__dirname, "src/hooks/"),
   "@services": path.resolve(__dirname, "src/services/"),
   "@store": path.resolve(__dirname, "src/store/"),
   "@styles": path.resolve(__dirname, "src/styles/"),
   "@utils": path.resolve(__dirname, "src/utils/"),
   "@pages": path.resolve(__dirname, "src/pages/"),
   "@axios": path.resolve(__dirname, "src/lib/axios.ts"),
   "@typing": path.resolve(__dirname, "src/utils/types/global.d.ts"),
  },
 },
});
