# --- Builder Stage ---
    FROM node:22.15.0 AS builder
    WORKDIR /app  
     
    # ARGs และ ENVs สำหรับใช้ตอน build 
    ARG NEXT_PUBLIC_SOCKET_URL
    ARG NEXT_PUBLIC_FRONTEND_URL
    
    ENV NEXT_PUBLIC_SOCKET_URL=$NEXT_PUBLIC_SOCKET_URL
    ENV NEXT_PUBLIC_FRONTEND_URL=$NEXT_PUBLIC_FRONTEND_URL
    
    # Echo เพื่อตรวจสอบค่าตอน build (ควรจะเห็นค่าแล้ว)
    
    COPY package*.json ./
    RUN npm install
    COPY . . 
    # Next.js จะใช้ ENV ที่ตั้งไว้ด้านบนในการ build
    RUN npm run build
    
    # --- Production Stage (Runner) ---
    FROM node:22.15.0 AS runner
    WORKDIR /app
    
    # ----> [สำคัญ] ประกาศ ARG และ ENV ซ้ำอีกครั้งสำหรับตอนรัน <----
    ARG NEXT_PUBLIC_SOCKET_URL
    ARG NEXT_PUBLIC_FRONTEND_URL

    ENV NEXT_PUBLIC_FRONTEND_URL=$NEXT_PUBLIC_FRONTEND_URL
    ENV NEXT_PUBLIC_SOCKET_URL=$NEXT_PUBLIC_SOCKET_URL

    # Copy เฉพาะไฟล์ที่จำเป็นจาก builder stage
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/package.json ./
    COPY --from=builder /app/package-lock.json ./
    
    RUN npm install --omit=dev
    
    # คำสั่งสำหรับรันแอปพลิเคชัน
    CMD ["npm", "run", "start"]