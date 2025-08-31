// Crypto Price Ticker Background Service Worker
// Note: Service Workers cannot use ES6 imports, so all functions are defined inline

// Default settings
const DEFAULT_SETTINGS = {
  priceCoin: 'ethereum',
  vs: 'usd',
  refreshInterval: 30
};

// RPC utility with caching support
async function withCache(key, ttl, fetcher) {
  try {
    const cached = await chrome.storage.local.get(key);
    const now = Date.now();
    
    if (cached[key] && (now - cached[key].timestamp) < ttl) {
      return cached[key].data;
    }
    
    const data = await fetcher();
    await chrome.storage.local.set({
      [key]: {
        data,
        timestamp: now
      }
    });
    
    return data;
  } catch (error) {
    console.error(`Cache error for key ${key}:`, error);
    throw error;
  }
}

// Initialize extension
chrome.runtime.onInstalled.addListener(async () => {
  // Set default settings
  await chrome.storage.local.set({ settings: DEFAULT_SETTINGS });
  
  // Create alarm for price updates
  chrome.alarms.create("prices", { periodInMinutes: 0.5 });
  
  // Initial price fetch
  await fetchPrices();
});

// Fetch prices from CoinGecko with Binance fallback
async function fetchPrices() {
  try {
    const data = await withCache("prices", 20000, async () => {
      try {
        console.log("Fetching prices from CoinGecko...");
        
        // Try CoinGecko first - Comprehensive list of cryptocurrencies and fiat currencies
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,cardano,avalanche-2,dogecoin,polkadot,polygon,chainlink,uniswap,litecoin,bitcoin-cash,stellar,cosmos,monero,algorand,vechain,filecoin,tezos,tether,tron,eos,xrp,yearn-finance&vs_currencies=usd,idr,twd,eur,krw,jpy,rub,cny,aed,ars,aud,bdt,bhd,bmd,brl,cad,chf,clp,czk,dkk,gbp,gel,hkd,huf,ils,inr,kwd,lkr,mmk,mxn,myr,ngn,nok,nzd,php,pkr,pln,sar,sek,sgd,thb,try,uah,vef,vnd,zar,xdr,btc,eth,ltc,bch,bnb,eos,xrp,xlm,link,dot,yfi,sol,bits,sats,xag,xau,tether",
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Crypto-Price-Ticker-Extension/1.0.0'
            },
            timeout: 10000
          }
        );
        
        if (!response.ok) {
          throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("CoinGecko API response:", data);
        return data;
      } catch (error) {
        console.warn("CoinGecko failed, trying Binance fallback:", error);
        
        // Fallback to Binance for major pairs
        const majorPairs = [
          "BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "ADAUSDT",
          "AVAXUSDT", "DOGEUSDT", "DOTUSDT", "MATICUSDT", "LINKUSDT",
          "UNIUSDT", "LTCUSDT", "BCHUSDT", "XLMUSDT", "ATOMUSDT",
          "XMRUSDT", "ALGOUSDT", "VETUSDT", "FILUSDT", "XTZUSDT",
          "USDTUSDT", "TRXUSDT"
        ];
        
        console.log("Fetching prices from Binance fallback...");
        
        const responses = await Promise.all(
          majorPairs.map(async (pair) => {
            try {
              const r = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${pair}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'User-Agent': 'Crypto-Price-Ticker-Extension/1.0.0'
                },
                timeout: 10000
              });
              
              if (!r.ok) {
                throw new Error(`Binance API error for ${pair}: ${r.status}`);
              }
              
              return r.json();
            } catch (err) {
              console.warn(`Failed to fetch ${pair}:`, err);
              return null;
            }
          })
        );
        
        const prices = responses.filter(r => r !== null);
        console.log("Binance fallback response:", prices);
        
        // Convert Binance data to match CoinGecko format
        const result = {};
        const coinIds = ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'cardano', 'avalanche-2', 'dogecoin', 'polkadot', 'polygon', 'chainlink', 'uniswap', 'litecoin', 'bitcoin-cash', 'stellar', 'cosmos', 'monero', 'algorand', 'vechain', 'filecoin', 'tezos', 'tether', 'tron', 'eos', 'xrp', 'yearn-finance'];
        
        coinIds.forEach((coinId, index) => {
          if (prices[index] && prices[index].price) {
            const usdPrice = parseFloat(prices[index].price);
            result[coinId] = {
              usd: usdPrice,
              idr: usdPrice * 15000,  // Approximate rates for major currencies
              twd: usdPrice * 30,
              eur: usdPrice * 0.85,
              krw: usdPrice * 1200,
              jpy: usdPrice * 110,
              rub: usdPrice * 90,
              cny: usdPrice * 6.50,
              aed: usdPrice * 3.67,
              ars: usdPrice * 800,
              aud: usdPrice * 1.35,
              bdt: usdPrice * 110,
              bhd: usdPrice * 0.38,
              bmd: usdPrice,
              brl: usdPrice * 5.0,
              cad: usdPrice * 1.25,
              chf: usdPrice * 0.90,
              clp: usdPrice * 800,
              czk: usdPrice * 22,
              dkk: usdPrice * 6.5,
              gbp: usdPrice * 0.75,
              gel: usdPrice * 2.7,
              hkd: usdPrice * 7.8,
              huf: usdPrice * 350,
              ils: usdPrice * 3.5,
              inr: usdPrice * 75,
              kwd: usdPrice * 0.31,
              lkr: usdPrice * 320,
              mmk: usdPrice * 2100,
              mxn: usdPrice * 18,
              myr: usdPrice * 4.2,
              ngn: usdPrice * 800,
              nok: usdPrice * 9.5,
              nzd: usdPrice * 1.45,
              php: usdPrice * 55,
              pkr: usdPrice * 280,
              pln: usdPrice * 3.8,
              sar: usdPrice * 3.75,
              sek: usdPrice * 10.5,
              sgd: usdPrice * 1.35,
              thb: usdPrice * 35,
              try: usdPrice * 30,
              uah: usdPrice * 37,
              vef: usdPrice * 6.0,
              vnd: usdPrice * 24000,
              zar: usdPrice * 18,
              xdr: usdPrice * 0.75,
              btc: coinId === 'bitcoin' ? 1 : usdPrice / 50000,
              eth: coinId === 'ethereum' ? 1 : usdPrice / 3000,
              ltc: coinId === 'litecoin' ? 1 : usdPrice / 100,
              bch: coinId === 'bitcoin-cash' ? 1 : usdPrice / 300,
              bnb: coinId === 'binancecoin' ? 1 : usdPrice / 300,
              eos: coinId === 'eos' ? 1 : usdPrice / 1,
              xrp: coinId === 'xrp' ? 1 : usdPrice / 0.5,
              xlm: coinId === 'stellar' ? 1 : usdPrice / 0.1,
              link: coinId === 'chainlink' ? 1 : usdPrice / 15,
              dot: coinId === 'polkadot' ? 1 : usdPrice / 7,
              yfi: coinId === 'yearn-finance' ? 1 : usdPrice / 30000,
              sol: coinId === 'solana' ? 1 : usdPrice / 100,
              bits: usdPrice / 0.0005,
              sats: usdPrice / 0.000001,
              xag: usdPrice / 25,
              xau: usdPrice / 2000,
              tether: coinId === 'tether' ? 1 : usdPrice // USDT is always 1:1 with USD
            };
          }
        });
        
        return result;
      }
    });
    
    // Store successful prices
    await chrome.storage.local.set({
      prices: {
        ...data,
        at: Date.now(),
        error: false
      }
    });
    
    await updateBadge(data);
    
    return data;
  } catch (error) {
    console.error("Error fetching prices:", error);
    
    // Clear badge on error
    await chrome.action.setBadgeText({ text: "" });
    await chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
    
    // Store error state
    await chrome.storage.local.set({
      prices: {
        error: true,
        message: error.message,
        at: Date.now()
      }
    });
    
    throw error;
  }
}

// Update badge with price information
async function updateBadge(prices) {
  try {
    const settings = await chrome.storage.local.get('settings');
    const { priceCoin, vs } = settings.settings || DEFAULT_SETTINGS;
    
    let price = 0;
    let symbol = '';
    
    // Map coin IDs to symbols
    const coinSymbols = {
      'bitcoin': '₿',
      'ethereum': 'Ξ',
      'tether': 'USDT',
      'binancecoin': 'BNB',
      'solana': '◎',
      'cardano': '₳',
      'avalanche-2': 'AVAX',
      'dogecoin': 'Ð',
      'polkadot': 'DOT',
      'polygon': 'MATIC',
      'chainlink': 'LINK',
      'uniswap': 'UNI',
      'litecoin': 'Ł',
      'bitcoin-cash': 'BCH',
      'stellar': 'XLM',
      'cosmos': 'ATOM',
      'monero': 'XMR',
      'algorand': 'ALGO',
      'vechain': 'VET',
      'filecoin': 'FIL',
      'tezos': 'XTZ',
      'tron': 'TRX',
      'eos': 'EOS',
      'xrp': 'XRP',
      'yearn-finance': 'YFI'
    };
    
    if (prices[priceCoin]) {
      price = prices[priceCoin][vs] || 0;
      symbol = coinSymbols[priceCoin] || priceCoin.toUpperCase();
    }
    
    if (price > 0) {
      const formattedPrice = formatPrice(price);
      await chrome.action.setBadgeText({ text: formattedPrice });
      await chrome.action.setBadgeBackgroundColor({ color: "#2563eb" });
    } else {
      await chrome.action.setBadgeText({ text: "" });
    }
  } catch (error) {
    console.error("Error updating badge:", error);
    await chrome.action.setBadgeText({ text: "" });
  }
}

// Format price for display
function formatPrice(price) {
  if (price >= 1000000) {
    return Math.round(price / 1000000) + 'M';
  } else if (price >= 1000) {
    return Math.round(price / 1000) + 'K';
  } else if (price >= 1) {
    return Math.round(price).toString();
  } else {
    return price.toFixed(2);
  }
}

// Handle alarms
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "prices") {
    await fetchPrices();
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchPrices") {
    fetchPrices().then(sendResponse).catch(error => {
      sendResponse({ error: error.message });
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === "getPrices") {
    chrome.storage.local.get('prices').then(sendResponse);
    return true;
  }
  
  if (request.action === "getSettings") {
    chrome.storage.local.get('settings').then(sendResponse);
    return true;
  }
  
  if (request.action === "updateSettings") {
    chrome.storage.local.set({ settings: request.settings }).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});
