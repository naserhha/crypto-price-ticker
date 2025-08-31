# 🔒 Privacy Policy - Crypto Price Ticker

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Extension:** Crypto Price Ticker  
**Developer:** Mohammad Nasser Haji Hashemabad (Nasser Hashemabadi)

---

## 📋 Overview

This Privacy Policy describes how the Crypto Price Ticker Chrome extension ("we," "our," or "us") handles information when you use our extension. We are committed to protecting your privacy and ensuring transparency about our data practices.

**Important:** This extension does NOT collect, store, or transmit any personal information. All data is stored locally on your device.

---

## 🚫 Information We Do NOT Collect

### Personal Information
- ❌ **No names or email addresses**
- ❌ **No browsing history**
- ❌ **No personal preferences**
- ❌ **No location data**
- ❌ **No device identifiers**
- ❌ **No analytics or tracking data**

### Financial Information
- ❌ **No cryptocurrency wallet addresses**
- ❌ **No trading history**
- ❌ **No financial transactions**
- ❌ **No investment data**
- ❌ **No portfolio information**

---

## 💾 Data Storage & Usage

### Local Storage Only
All extension data is stored **locally** on your device using Chrome's built-in storage APIs:

```javascript
// Example of local storage usage
chrome.storage.local.set({
    'userPreferences': {
        'baseCurrency': 'usd',
        'badgeCoin': 'ethereum',
        'refreshInterval': 30
    }
});
```

### What Gets Stored Locally
- **User Preferences**: Currency selection, coin selection, refresh settings
- **Cached Prices**: Temporary price data (20-second cache)
- **Extension Settings**: Basic configuration options
- **No Personal Data**: Absolutely no personal information

### Data Persistence
- **Browser Storage**: Uses Chrome's `chrome.storage.local` API
- **Automatic Cleanup**: Data is automatically managed by Chrome
- **User Control**: You can clear this data anytime through Chrome settings
- **No Server Storage**: Nothing is sent to external servers

---

## 🌐 Third-Party Services

### CoinGecko API
- **Purpose**: Fetch cryptocurrency price data
- **Data**: Public cryptocurrency prices and market data
- **Privacy**: Review [CoinGecko's Privacy Policy](https://www.coingecko.com/en/privacy)
- **Security**: HTTPS-only connections

### Binance API
- **Purpose**: Fallback price data when CoinGecko is unavailable
- **Data**: Public cryptocurrency trading data
- **Privacy**: Review [Binance's Privacy Policy](https://www.binance.com/en/privacy)
- **Security**: HTTPS-only connections

### No Other Third Parties
- **No Analytics Services**: No Google Analytics, Mixpanel, etc.
- **No Advertising**: No ad networks or tracking pixels
- **No Social Media**: No social media integrations
- **No External Scripts**: All code runs locally

---

## 🔐 Security Measures

### Data Protection
- **Local Storage**: All data stays on your device
- **HTTPS Only**: Secure connections to APIs
- **No Cookies**: No tracking cookies or persistent identifiers
- **No Logging**: No server-side logging or monitoring

### API Security
- **Public APIs Only**: Uses only public, documented APIs
- **Rate Limiting**: Built-in protection against excessive API calls
- **Error Handling**: Graceful fallbacks without data exposure
- **Secure Protocols**: TLS 1.2+ encryption for all connections

---

## 📱 Extension Permissions

### Required Permissions
```json
{
  "permissions": [
    "alarms",        // Schedule price updates every 30 seconds
    "storage"        // Store user preferences locally
  ],
  "host_permissions": [
    "https://api.coingecko.com/*",  // Fetch cryptocurrency prices
    "https://api.binance.com/*"     // Fallback price data
  ]
}
```

### Why These Permissions?
- **`alarms`**: Schedule automatic price updates
- **`storage`**: Save user preferences locally
- **`host_permissions`**: Access public cryptocurrency APIs

### No Unnecessary Permissions
- ❌ **No access to browsing history**
- ❌ **No access to personal files**
- ❌ **No access to other websites**
- ❌ **No access to system resources**

---

## 🚀 How the Extension Works

### Data Flow
```
User Device ←→ Extension ←→ Public APIs (CoinGecko/Binance)
     ↑              ↑                    ↑
Local Storage   No Personal Data    Public Price Data
```

### Step-by-Step Process
1. **User Opens Extension**: Extension loads from local storage
2. **Fetch Prices**: Requests public data from CoinGecko API
3. **Store Locally**: Caches prices in browser storage
4. **Display Data**: Shows prices in extension popup
5. **Update Badge**: Updates extension badge with selected coin price
6. **Repeat**: Process repeats every 30 seconds

### No Data Transmission
- **Outbound**: Only requests to public APIs
- **Inbound**: Only public cryptocurrency data
- **No Personal Data**: Nothing personal is ever sent or received

---

## 🎯 User Rights & Control

### Your Rights
- **Full Control**: Complete control over extension data
- **Data Access**: View all stored data through Chrome DevTools
- **Data Deletion**: Clear all data anytime through Chrome settings
- **Extension Removal**: Uninstall extension to remove all data
- **No Tracking**: Zero tracking or monitoring

### How to Control Your Data
1. **View Stored Data**:
   - Open Chrome DevTools (F12)
   - Go to Application → Storage → Local Storage
   - Look for extension data

2. **Clear Extension Data**:
   - Go to Chrome Settings → Extensions
   - Find Crypto Price Ticker
   - Click "Remove" to delete all data

3. **Disable Permissions**:
   - Go to Chrome Settings → Privacy and Security
   - Manage site permissions
   - Control API access

---

## 📞 Contact Information

### Privacy Concerns
If you have any questions about this Privacy Policy or our data practices:

- **Email**: privacy@mohammadnasser.com
- **Website**: https://mohammadnasser.com
- **GitHub**: https://github.com/naserhha/crypto-price-ticker

### Response Time
- **Initial Response**: Within 24 hours
- **Full Resolution**: Within 5 business days
- **Urgent Issues**: Immediate attention for security concerns

---

## 📅 Policy Updates

### Update Process
- **Notification**: Users will be notified of policy changes
- **Version Control**: Clear version numbering for all updates
- **Change Log**: Documented changes in extension updates
- **User Consent**: Continued use implies acceptance of updates

### Recent Changes
- **v1.0.0** (January 2025): Initial privacy policy
- **Future Updates**: Will be documented here

---

## ⚖️ Legal Compliance

### Applicable Laws
This Privacy Policy complies with:
- **GDPR**: European data protection regulations
- **CCPA**: California consumer privacy laws
- **Chrome Web Store**: Google's extension requirements
- **Industry Standards**: Best practices for browser extensions

### Data Protection Principles
- **Minimization**: Collect only necessary data (none in our case)
- **Transparency**: Clear information about data practices
- **User Control**: Full user control over data
- **Security**: Appropriate security measures
- **Accountability**: Clear responsibility and contact information

---

## 🔍 Privacy Verification

### How to Verify Our Claims
1. **Check Network Tab**: No outbound requests except to APIs
2. **Review Source Code**: All code is open source on GitHub
3. **Monitor Storage**: Only local storage is used
4. **Test Permissions**: No unnecessary permissions requested

### Independent Verification
- **Source Code**: Available at https://github.com/naserhha/crypto-price-ticker
- **Community Review**: Open for community inspection
- **Security Audits**: Welcome independent security reviews
- **Transparency**: Full disclosure of all practices

---

## 📊 Privacy Summary

| Aspect | Status | Details |
|--------|--------|---------|
| **Data Collection** | ❌ None | No personal data collected |
| **Data Storage** | ✅ Local | Only on user's device |
| **Data Transmission** | ❌ None | No data sent to servers |
| **Third-Party Tracking** | ❌ None | No analytics or tracking |
| **User Control** | ✅ Full | Complete user control |
| **Transparency** | ✅ High | Clear privacy information |
| **Security** | ✅ Strong | HTTPS, local storage only |

---

## 🎯 Commitment to Privacy

We are committed to:
- **Zero Data Collection**: Never collect personal information
- **Local Storage Only**: All data stays on your device
- **Transparency**: Clear and honest privacy practices
- **User Control**: You have complete control over your data
- **Security**: Strong security measures to protect your privacy

---

## 📝 Conclusion

The Crypto Price Ticker extension is designed with privacy as a fundamental principle. We believe that cryptocurrency tools should respect user privacy and provide transparency about data practices.

**Your privacy is our priority. We collect nothing, store nothing remotely, and give you complete control over your data.**

---

**For questions about this Privacy Policy, contact us at: privacy@mohammadnasser.com**

---

*This Privacy Policy is effective as of January 2025 and will remain in effect until updated.*
