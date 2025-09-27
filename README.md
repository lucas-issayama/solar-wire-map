# ⚡ Solar Wire Map

Professional solar installation wire mapping and configuration tool built with Next.js.

## 🌟 Features

- **System Configuration**: Configure solar panels, inverters, and storage systems
- **Cost Estimation**: Real-time cost calculations for solar installations
- **Wire Mapping**: Generate detailed installation wire maps
- **MPPT Configuration**: Advanced MPPT (Maximum Power Point Tracking) setup
- **Module Compatibility**: Check compatibility between solar modules and inverters
- **Professional Interface**: Clean, intuitive UI built with Radix UI and Tailwind CSS

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.4 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Data Fetching**: SWR + Axios
- **Database**: Supabase

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/solar-wire-map.git
cd solar-wire-map
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Application Structure

### Pages

- **Home** (`/`) - Landing page with feature overview
- **Configurator** (`/configurator`) - Advanced solar system configuration tool
- **Estimator** (`/estimator`) - Cost estimation and system sizing

### Key Components

- **Solar Utilities** - Functions for solar calculations and configurations
- **UI Components** - Reusable components built on Radix UI
- **MPPT Configuration** - Advanced inverter MPPT setup tools

## 🔧 Configuration

The configurator provides comprehensive solar system design capabilities:

1. **Product Selection**: Choose from available solar modules and inverters
2. **Specifications Review**: View detailed technical specifications
3. **Module Configuration**: Set total number of modules for the system
4. **MPPT Setup**: Configure module distribution across inverter MPPTs
5. **Final Summary**: Review complete system configuration with power calculations

## 🌍 Data Sources

The application integrates with a Supabase database containing:

- Solar module specifications and technical data
- Inverter models with MPPT configurations
- Manufacturer information and product catalogs
- Real-time pricing and availability data

## 📦 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Supabase](https://supabase.com/docs)
