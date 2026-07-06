# ChronoSphere - AI-Powered URL Scheduler

A modern, AI-inspired web application for scheduling automated URL calls with custom agents, random header selection, and MongoDB storage.

## Features

- **🕐 Intelligent Scheduling**: Configure URL calls at regular intervals (minute, 5-minutes, hourly, daily, weekly, custom cron)
- **🌐 Multiple Agent Support**: Choose from different agents (Postman, Firefox, Chrome, Safari, Edge, cURL) for varied user-agent simulation
- **🔀 Random Header Selection**: Define custom headers and have them randomly selected on each request
- **📊 Dashboard**: Real-time monitoring with success rates, execution logs, and status tracking
- **🔒 MongoDB Integration**: Persistent storage of schedules and execution logs using MongoDB Atlas
- **🎨 Modern UI**: Clean, futuristic interface with gradient effects, glass morphism, and smooth animations

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MongoDB Atlas** with Mongoose ODM
- **React Hook Form** for form handling
- **Headless UI** for accessible components
- **Hero Icons** for icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd url-scheduler
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/url-scheduler
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Schedules
- `GET /api/schedules` - List all schedules with pagination
- `POST /api/schedules` - Create new schedule
- `GET /api/schedules/[id]` - Get specific schedule
- `PUT /api/schedules/[id]` - Update schedule
- `DELETE /api/schedules/[id]` - Delete schedule

### Execution
- `POST /api/execute` - Manually execute a schedule
- `GET /api/schedules/[id]/logs` - Get execution logs for a schedule

## Project Structure

```
url-scheduler/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard
│   ├── Header.tsx         # Navigation header
│   ├── ScheduleList.tsx   # Schedule table
│   └── AddScheduleModal.tsx # Schedule creation modal
├── lib/                   # Utility functions
│   └── mongodb.ts         # MongoDB connection
├── models/                # MongoDB models
│   ├── UrlSchedule.ts     # Schedule schema
│   └── ExecutionLog.ts    # Execution log schema
└── public/               # Static assets
```

## Key Features Explained

### Random Header Selection
- Add multiple custom headers with key-value pairs
- Enable/disable headers to control randomization pool
- On each request, enabled headers are randomly selected
- Perfect for A/B testing different API configurations

### Multiple Agent Support
- Each schedule can use a different agent
- Agents simulate different User-Agent strings
- Useful for testing API compatibility across different clients

### Execution Logging
- Every execution is logged with:
  - Timestamp
  - Status (success/failed/error)
  - Response time
  - Status code
  - Headers used
  - Error messages (if any)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| MONGODB_URI | MongoDB connection string | Yes |
| NEXT_PUBLIC_APP_URL | Application URL for CORS | Optional |

## Deployment

### Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Self-Hosted
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## License

MIT

## Support

For issues and feature requests, please create an issue in the repository.