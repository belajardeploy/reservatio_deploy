# Stage 1: Base image
FROM node:18-alpine AS base

# Stage 2: Install dependencies
FROM base AS deps
# Periksa https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine untuk memahami mengapa libc6-compat mungkin diperlukan.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies berdasarkan manajer paket yang lebih disukai
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Stage 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js mengumpulkan data telemetri anonim.
# Uncomment baris berikut jika Anda ingin menonaktifkan telemetri selama build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Diasumsikan menggunakan npm. Jika menggunakan manajer lain, sesuaikan baris ini.
RUN npm run build


# Stage 4: Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment baris berikut jika Anda ingin menonaktifkan telemetri saat runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Membuat direktori .next dan memberikan izin untuk cache runtime (misalnya untuk ISR)
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Secara otomatis memanfaatkan output traces untuk mengurangi ukuran image
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# --- PERUBAHAN KRITIS ---
# Jalankan di port non-istimewa (>1024) karena berjalan sebagai pengguna non-root.
EXPOSE 3001
ENV PORT=3001
# -------------------------

# Atur hostname untuk mendengarkan semua interface
ENV HOSTNAME="0.0.0.0"

# server.js dibuat oleh next build dari output standalone
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]