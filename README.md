# 🚀 Crypto Price Ticker - Chrome Extension

A modern, feature-rich Chrome extension that displays real-time cryptocurrency prices with a beautiful, responsive UI.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Price Updates**: Fetches prices every 30 seconds from CoinGecko API
- **Fallback Support**: Automatic fallback to Binance API if CoinGecko fails
- **22 Cryptocurrencies**: Support for top market cap coins including Bitcoin, Ethereum, BNB, Solana, Cardano, and more
- **10 Fiat Currencies**: USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, KRW
- **USDT Support**: View prices in Tether (USDT) for easy crypto-to-crypto comparisons

### 🎨 Modern UI/UX
- **Minimalist Design**: Clean, modern interface with smooth animations
- **Responsive Layout**: Adapts to different screen sizes
- **Dark Mode Support**: Automatically adapts to system preferences
- **Font Awesome Icons**: Rich iconography throughout the interface
- **Smooth Animations**: Staggered loading animations for price items

### 🔧 Advanced Features
- **Configurable Badge**: Choose which cryptocurrency to display in the extension badge
- **Auto-refresh**: Automatic price updates every 30 seconds
- **New Window Mode**: Open the ticker in a dedicated window for better visibility
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **Caching System**: Smart caching to reduce API calls and improve performance

### 🌐 API Integration
- **Primary**: CoinGecko Public API
- **Fallback**: Binance Public API
- **Rate Limiting**: Built-in protection against API rate limits
- **Offline Support**: Graceful handling of network issues

## 🚀 New Tab Feature

One of the standout features is the ability to open the crypto ticker in a dedicated tab:

- **Larger Display**: Full tab space for better visibility
- **Responsive Layout**: Prices display in a responsive layout
- **Independent Operation**: Works independently from the popup
- **Easy Access**: Quick access button in the popup controls
- **Professional Look**: Perfect for traders and crypto enthusiasts

## 📱 Supported Cryptocurrencies

1. **Bitcoin (BTC)** - ₿
2. **Ethereum (ETH)** - Ξ
3. **BNB (BNB)** - BNB
4. **Solana (SOL)** - ◎
5. **Cardano (ADA)** - ₳
6. **Avalanche (AVAX)** - AVAX
7. **Dogecoin (DOGE)** - Ð
8. **Polkadot (DOT)** - DOT
9. **Polygon (MATIC)** - MATIC
10. **Chainlink (LINK)** - LINK
11. **Uniswap (UNI)** - UNI
12. **Litecoin (LTC)** - Ł
13. **Bitcoin Cash (BCH)** - BCH
14. **Stellar (XLM)** - XLM
15. **Cosmos (ATOM)** - ATOM
16. **Monero (XMR)** - XMR
17. **Algorand (ALGO)** - ALGO
18. **VeChain (VET)** - VET
19. **Filecoin (FIL)** - FIL
20. **Tezos (XTZ)** - XTZ
21. **Tether (USDT)** - ₮
22. **TRON (TRX)** - TRX

## 💱 Supported Fiat Currencies

- **USD** ($) - US Dollar
- **EUR** (€) - Euro
- **GBP** (£) - British Pound
- **JPY** (¥) - Japanese Yen
- **CAD** (C$) - Canadian Dollar
- **AUD** (A$) - Australian Dollar
- **CHF** (CHF) - Swiss Franc
- **CNY** (¥) - Chinese Yuan
- **INR** (₹) - Indian Rupee
- **KRW** (₩) - South Korean Won
- **USDT** (₮) - Tether (Stablecoin)

## 🛠️ Technical Details

### Architecture
- **Manifest V3**: Latest Chrome extension manifest version
- **Service Worker**: Background script for API calls and scheduling
- **ES6+ Features**: Modern JavaScript with async/await
- **Chrome APIs**: Uses `alarms`, `storage`, and `action` APIs

### Performance
- **Smart Caching**: 20-second cache for API responses
- **Efficient Updates**: Only updates when necessary
- **Memory Management**: Optimized for long-running operation
- **Error Recovery**: Automatic retry mechanisms

## 📦 Installation

### For Users
1. Download the extension files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder
5. The extension will appear in your toolbar

### For Developers
1. Clone the repository
2. Install dependencies (if any)
3. Make your modifications
4. Load as unpacked extension in Chrome

## 🔧 Development

### Project Structure
```
crypto-price-ticker/
├── manifest.json          # Extension configuration
├── background.js          # Service worker
├── popup.html            # Main popup interface
├── popup.js              # Popup logic
├── window.html           # Dedicated window interface
├── styles.css            # Main stylesheet
├── lib/                  # Utility libraries
├── icons/                # Extension icons
├── debug.html            # Debug/testing page
├── test-api.html         # API testing page
└── README.md             # This file
```

### Key Functions
- `fetchPrices()`: Main API fetching logic
- `updateBadge()`: Updates extension badge
- `withCache()`: Caching utility
- `openInNewWindow()`: Opens dedicated window

## 🧪 Testing

### Debug Tools
- **debug.html**: Comprehensive extension testing
- **test-api.html**: API connectivity testing
- **Console Logging**: Detailed error and status logging

### API Testing
- Test CoinGecko connectivity
- Test Binance fallback
- Verify rate limiting handling
- Check error recovery

## 🚀 Publishing to Chrome Web Store

### Requirements
- Valid developer account
- Privacy policy
- Screenshots and descriptions
- Compliance with Chrome Web Store policies

### Steps
1. Package the extension
2. Create store listing
3. Submit for review
4. Wait for approval

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohammad Nasser Haji hashemabad (Nasser Hashemabadi)**

Blockchain Tools & Smart Contracts Developer  
Technologist and researcher with a focus on blockchain, data science, and digital innovation.

### 🔗 Links
- **Website**: [mohammadnasser.com](https://mohammadnasser.com)
- **X (Twitter)**: [@naserhha](https://x.com/naserhha)
- **LinkedIn**: [naserhha](https://linkedin.com/in/naserhha)
- **GitHub**: [naserhha](https://github.com/naserhha)

## 📈 Changelog

### Version 1.0.0
- ✅ Initial release with basic functionality
- ✅ Support for 22 cryptocurrencies
- ✅ Support for 10 fiat currencies + USDT
- ✅ Modern, responsive UI design
- ✅ New window feature
- ✅ Comprehensive error handling
- ✅ Smart caching system
- ✅ Dark mode support
- ✅ Font Awesome integration

---

**Made with ❤️ for the crypto community**
