# Artist OS - Frontend

Modern, interactive Next.js frontend for Artist OS using TypeScript, Tailwind CSS, and Recharts for data visualization.

## Project Structure

```
frontend/
├── app/                  # Next.js app directory
│   ├── dashboard/        # Dashboard pages
│   ├── songs/           # Song analytics
│   ├── content/         # Content analytics
│   ├── ads/             # Ad analytics
│   ├── revenue/         # Revenue tracking
│   ├── assistant/       # AI Assistant
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # Reusable React components
├── lib/                 # Utilities and helpers
├── public/              # Static assets
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── next.config.js       # Next.js config
├── tailwind.config.js   # Tailwind config
└── README.md           # This file
```

## Setup

### Prerequisites
- Node.js 18.17+
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Create environment file**:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Start development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted

### Code Quality

The project uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Tailwind CSS** for styling
- **Recharts** for data visualization

### Design System

The UI follows a clean, modern design inspired by leading platforms. Key design tokens:

**Colors:**
- Primary (Artist): Purple gradient (#8b2be2)
- Secondary (Data): Blue (#0ea5e9)
- Accent (Growth): Green (#22c55e)

**Components:**
- Cards with subtle shadows
- Rounded corners (12px default)
- Smooth transitions
- Dark mode support

## Features

### Current Modules

- **Dashboard**: Executive summary of key metrics
- **Songs**: Song-level analytics (placeholder)
- **Content**: Instagram/social media analytics (placeholder)
- **Ads**: Meta Ads analytics (placeholder)
- **Revenue**: Revenue tracking (placeholder)
- **AI Assistant**: AI-powered insights (placeholder)

### Planned Features

- Real-time data syncing
- Interactive charts and filters
- Comparative analysis
- AI chat interface
- Export functionality
- Mobile responsiveness

## API Integration

The frontend communicates with the FastAPI backend at `http://localhost:8000`. 

To customize the API URL, update `NEXT_PUBLIC_API_URL` in `.env.local`.

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

When deploying, set:
- `NEXT_PUBLIC_API_URL` to your production backend URL
- Any other public configuration variables

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The application is optimized for:
- Code splitting
- Image optimization
- Static generation where possible
- Client-side caching

## License

See LICENSE file in the root directory
