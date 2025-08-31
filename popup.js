// Crypto Price Ticker - Minimalist Modern Popup
class CryptoPriceTicker {
    constructor() {
        this.initializeElements();
        this.loadSettings();
        this.loadPrices();
        this.setupEventListeners();
        this.startAutoRefresh();
    }

    initializeElements() {
        this.baseCurrencySelect = document.getElementById('baseCurrency');
        this.badgeCoinSelect = document.getElementById('badgeCoin');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.priceList = document.getElementById('priceList');
        this.lastUpdated = document.getElementById('lastUpdated');
        this.status = document.getElementById('status');
    }

    setupEventListeners() {
        this.baseCurrencySelect.addEventListener('change', () => this.onCurrencyChange());
        this.badgeCoinSelect.addEventListener('change', () => this.onBadgeCoinChange());
        this.refreshBtn.addEventListener('click', () => this.refreshPrices());
        
        // New tab button event listener
        document.getElementById('openInNewWindow').addEventListener('click', () => this.openInNewTab());
        
        // Legal links event listeners
        document.querySelectorAll('.legal-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showLegalSection(section);
            });
        });
    }

    async loadSettings() {
        try {
            const response = await chrome.runtime.sendMessage({ action: 'getSettings' });
            this.settings = response.settings || {};
            
            // Set default values
            this.baseCurrencySelect.value = this.settings.vs || 'usd';
            this.badgeCoinSelect.value = this.settings.priceCoin || 'ethereum';
            
            // Load prices
            await this.loadPrices();
        } catch (error) {
            console.error('Error loading settings:', error);
            this.showError('Failed to load settings');
        }
    }

    async updateSettings() {
        try {
            const newSettings = {
                vs: this.baseCurrencySelect.value,
                priceCoin: this.badgeCoinSelect.value,
                refreshInterval: 30
            };

            await chrome.runtime.sendMessage({
                action: 'updateSettings',
                settings: newSettings
            });

            this.settings = newSettings;
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    }

    async loadPrices() {
        try {
            const response = await chrome.runtime.sendMessage({ action: 'getPrices' });
            if (response.prices) {
                this.prices = response.prices;
                this.displayPrices();
                this.updateLastUpdated();
            }
        } catch (error) {
            console.error('Error loading prices:', error);
            this.showError('Failed to load prices');
        }
    }

    async refreshPrices() {
        try {
            this.refreshBtn.disabled = true;
            this.refreshBtn.innerHTML = `
                <span class="refresh-icon">
                    <i class="fas fa-spinner fa-spin"></i>
                </span>
                Updating...
            `;
            
            const response = await chrome.runtime.sendMessage({ action: 'fetchPrices' });
            
            if (response.error) {
                throw new Error(response.error);
            }
            
            this.prices = response;
            this.displayPrices();
            this.updateLastUpdated();
            this.showStatus('Prices updated', 'success');
            
        } catch (error) {
            console.error('Error refreshing prices:', error);
            this.showError('Update failed');
        } finally {
            this.refreshBtn.disabled = false;
            this.refreshBtn.innerHTML = `
                <span class="refresh-icon">
                    <i class="fas fa-sync-alt"></i>
                </span>
                Refresh
            `;
        }
    }

    displayPrices() {
        if (!this.prices || this.prices.error) {
            this.showError(this.prices?.message || 'No data available');
            return;
        }

        const baseCurrency = this.baseCurrencySelect.value;
        const currencySymbol = this.getCurrencySymbol(baseCurrency);
        
        const coins = [
            { 
                id: 'bitcoin', 
                symbol: 'BTC', 
                name: 'Bitcoin', 
                icon: '<img src="../icons/bitcoin.png" alt="Bitcoin" style="width: 20px; height: 20px;">',
                color: '#F7931A'
            },
            { 
                id: 'ethereum', 
                symbol: 'ETH', 
                name: 'Ethereum', 
                icon: '<img src="../icons/ethereum.png" alt="Ethereum" style="width: 20px; height: 20px;">',
                color: '#627EEA'
            },
            { 
                id: 'tether', 
                symbol: 'USDT', 
                name: 'Tether', 
                icon: '<img src="../icons/tether.png" alt="Tether" style="width: 20px; height: 20px;">',
                color: '#26A17B'
            },
            { 
                id: 'binancecoin', 
                symbol: 'BNB', 
                name: 'BNB', 
                icon: '<img src="../icons/bnb-binance-coin.png" alt="BNB" style="width: 20px; height: 20px;">',
                color: '#FEF3C7'
            },
            { 
                id: 'solana', 
                symbol: 'SOL', 
                name: 'Solana', 
                icon: '<img src="../icons/solana.png" alt="Solana" style="width: 20px; height: 20px;">',
                color: '#14F195'
            },
            { 
                id: 'cardano', 
                symbol: 'ADA', 
                name: 'Cardano', 
                icon: '<img src="../icons/cardano.png" alt="Cardano" style="width: 20px; height: 20px;">',
                color: '#E0E7FF'
            },
            { 
                id: 'avalanche-2', 
                symbol: 'AVAX', 
                name: 'Avalanche', 
                icon: '<img src="../icons/avalanche.png" alt="Avalanche" style="width: 20px; height: 20px;">',
                color: '#E84142'
            },
            { 
                id: 'dogecoin', 
                symbol: 'DOGE', 
                name: 'Dogecoin', 
                icon: '<img src="../icons/dogecoin.png" alt="Dogecoin" style="width: 20px; height: 20px;">',
                color: '#C2A633'
            },
            { 
                id: 'polkadot', 
                symbol: 'DOT', 
                name: 'Polkadot', 
                icon: '<img src="../icons/polkadot-new.png" alt="Polkadot" style="width: 20px; height: 20px;">',
                color: '#E6007A'
            },
            { 
                id: 'polygon', 
                symbol: 'MATIC', 
                name: 'Polygon', 
                icon: '<img src="../icons/polygon.png" alt="Polygon" style="width: 20px; height: 20px;">',
                color: '#8247E5'
            },
            { 
                id: 'chainlink', 
                symbol: 'LINK', 
                name: 'Chainlink', 
                icon: '<img src="../icons/chainlink.png" alt="Chainlink" style="width: 20px; height: 20px;">',
                color: '#2A5ADA'
            },
            { 
                id: 'uniswap', 
                symbol: 'UNI', 
                name: 'Uniswap', 
                icon: '<img src="../icons/uniswap.png" alt="Uniswap" style="width: 20px; height: 20px;">',
                color: '#FF007A'
            },
            { 
                id: 'litecoin', 
                symbol: 'LTC', 
                name: 'Litecoin', 
                icon: '<img src="../icons/litecoin.png" alt="Litecoin" style="width: 20px; height: 20px;">',
                color: '#A6A9AA'
            },
            { 
                id: 'bitcoin-cash', 
                symbol: 'BCH', 
                name: 'Bitcoin Cash', 
                icon: '<img src="../icons/bch-bitcoin-cash.png" alt="Bitcoin Cash" style="width: 20px; height: 20px;">',
                color: '#0AC18E'
            },
            { 
                id: 'stellar', 
                symbol: 'XLM', 
                name: 'Stellar', 
                icon: '<img src="../icons/stellar.png" alt="Stellar" style="width: 20px; height: 20px;">',
                color: '#000000'
            },
            { 
                id: 'cosmos', 
                symbol: 'ATOM', 
                name: 'Cosmos', 
                icon: '<img src="../icons/cosmos.png" alt="Cosmos" style="width: 20px; height: 20px;">',
                color: '#2E3148'
            },
            { 
                id: 'monero', 
                symbol: 'XMR', 
                name: 'Monero', 
                icon: '<img src="../icons/monero.png" alt="Monero" style="width: 20px; height: 20px;">',
                color: '#FEF3C7'
            },
            { 
                id: 'algorand', 
                symbol: 'ALGO', 
                name: 'Algorand', 
                icon: '<img src="../icons/algorand.png" alt="Algorand" style="width: 20px; height: 20px;">',
                color: '#000000'
            },
            { 
                id: 'vechain', 
                symbol: 'VET', 
                name: 'VeChain', 
                icon: '<img src="../icons/vechain.png" alt="VeChain" style="width: 20px; height: 20px;">',
                color: '#CCFBF1'
            },
            { 
                id: 'filecoin', 
                symbol: 'FIL', 
                name: 'Filecoin', 
                icon: '<img src="../icons/filecoin.png" alt="Filecoin" style="width: 20px; height: 20px;">',
                color: '#009CFF'
            },
            { 
                id: 'tezos', 
                symbol: 'XTZ', 
                name: 'Tezos', 
                icon: '<img src="../icons/tezos.png" alt="Tezos" style="width: 20px; height: 20px;">',
                color: '#DBEAFE'
            },
            { 
                id: 'tron', 
                symbol: 'TRX', 
                name: 'TRON', 
                icon: '<img src="../icons/tron.png" alt="TRON" style="width: 20px; height: 20px;">',
                color: '#FEE2E2'
            },
            { 
                id: 'eos', 
                symbol: 'EOS', 
                name: 'EOS', 
                icon: '<img src="../icons/eos.png" alt="EOS" style="width: 20px; height: 20px;">',
                color: '#000000'
            },
            { 
                id: 'xrp', 
                symbol: 'XRP', 
                name: 'XRP', 
                icon: '<img src="../icons/xrp.png" alt="XRP" style="width: 20px; height: 20px;">',
                color: '#23292F'
            },
            { 
                id: 'yearn-finance', 
                symbol: 'YFI', 
                name: 'Yearn.finance', 
                icon: '<img src="../icons/yearn-finance.png" alt="Yearn.finance" style="width: 20px; height: 20px;">',
                color: '#DBEAFE'
            }
        ];

        const priceHtml = coins.map(coin => {
            const price = this.prices[coin.id]?.[this.baseCurrencySelect.value];
            if (!price) return '';

            const formattedPrice = this.formatPrice(price);
            const changeClass = this.getPriceChangeClass(coin.id);
            
            return `
                <div class="price-item ${changeClass}" data-coin="${coin.id}">
                    <div class="coin-info">
                        <div class="coin-icon" style="background: ${coin.color};">
                            ${coin.icon}
                        </div>
                        <div class="coin-details">
                            <div class="coin-name">${coin.name}</div>
                            <div class="coin-symbol">${coin.symbol}</div>
                        </div>
                    </div>
                    <div class="price-info">
                        <div class="price-value">${currencySymbol}${formattedPrice}</div>
                        <div class="price-change ${changeClass}">
                            <i class="fas fa-minus"></i> 0.00%
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.priceList.innerHTML = priceHtml;
    }

    getCurrencySymbol(currency) {
        const symbols = {
            // Major Fiat Currencies  
            'usd': '$', 'eur': '€', 'gbp': '£', 'jpy': '¥', 'cny': '¥', 'krw': '₩', 'inr': '₹', 'cad': 'C$', 'aud': 'A$', 'chf': 'CHF',
            
            // Asian Currencies
            'idr': 'Rp', 'twd': 'NT$', 'hkd': 'HK$', 'sgd': 'S$', 'thb': '฿', 'myr': 'RM', 'php': '₱', 'vnd': '₫', 'mmk': 'K', 'lkr': 'Rs', 'bdt': '৳', 'pkr': '₨',
            
            // European Currencies
            'rub': '₽', 'pln': 'zł', 'czk': 'Kč', 'dkk': 'kr', 'nok': 'kr', 'sek': 'kr', 'huf': 'Ft', 'gel': '₾',
            
            // Middle Eastern & African Currencies
            'aed': 'د.إ', 'sar': 'ر.س', 'bhd': '.د.ب', 'kwd': 'د.ك', 'ils': '₪', 'zar': 'R', 'ngn': '₦',
            
            // American Currencies
            'ars': '$', 'brl': 'R$', 'mxn': '$', 'clp': '$', 'bmd': '$', 'nzd': 'NZ$',
            
            // Special Currencies
            'try': '₺', 'uah': '₴', 'vef': 'Bs', 'xdr': 'XDR',
            
            // Cryptocurrency Units
            'btc': '₿', 'eth': 'Ξ', 'ltc': 'Ł', 'bch': 'BCH', 'bnb': 'BNB', 'eos': 'EOS', 'xrp': 'XRP', 'xlm': 'XLM', 'link': 'LINK', 'dot': 'DOT', 'yfi': 'YFI', 'sol': '◎', 'bits': 'bits', 'sats': 'sats',
            
            // Commodities
            'xag': 'Ag', 'xau': 'Au'
        };
        
        return symbols[currency.toLowerCase()] || currency.toUpperCase();
    }

    formatPrice(price) {
        if (price >= 1000000) {
            return (price / 1000000).toFixed(2) + 'M';
        } else if (price >= 1000) {
            return (price / 1000).toFixed(2) + 'K';
        } else {
            return price.toFixed(2);
        }
    }

    getPriceChangeClass(coinId) {
        return 'price-neutral';
    }

    updateLastUpdated() {
        if (this.prices && this.prices.at) {
            const date = new Date(this.prices.at);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            this.lastUpdated.innerHTML = `
                <i class="fas fa-clock"></i>
                ${timeString}
            `;
        }
    }

    async updateBadge() {
        try {
            await chrome.runtime.sendMessage({ action: 'fetchPrices' });
        } catch (error) {
            console.error('Error updating badge:', error);
        }
    }

    showStatus(message, type = 'info') {
        const icon = type === 'success' ? 'check-circle' : 
                    type === 'error' ? 'exclamation-circle' : 'info-circle';
        
        this.status.innerHTML = `
            <i class="fas fa-${icon}"></i>
            ${message}
        `;
        this.status.className = `status status-${type}`;
        
        setTimeout(() => {
            this.status.innerHTML = '';
            this.status.className = 'status';
        }, 2000);
    }

    showError(message) {
        this.priceList.innerHTML = `
            <div class="error">
                <span class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
                <div class="error-message">${message}</div>
                <button onclick="window.location.reload()" class="retry-btn">
                    <i class="fas fa-redo"></i>
                    Retry
                </button>
            </div>
        `;
    }

    startAutoRefresh() {
        setInterval(() => {
            this.loadPrices();
        }, 30000);
    }

    onCurrencyChange() {
        this.updateSettings();
        this.displayPrices();
    }

    onBadgeCoinChange() {
        this.updateSettings();
        this.updateBadge();
    }

    openInNewTab() {
        try {
            // Open popup.html in a new tab
            const newTab = window.open(
                'popup.html',
                '_blank'
            );
            
            if (newTab) {
                // Focus the new tab
                newTab.focus();
                
                // Show success message
                this.showStatus('Opened in new tab', 'success');
            } else {
                // Show error if popup blocked
                this.showError('Popup blocked. Please allow popups for this site.');
            }
        } catch (error) {
            console.error('Error opening new tab:', error);
            this.showError('Failed to open new tab');
        }
    }

    showLegalSection(section) {
        const sections = {
            privacy: {
                title: '🔒 Privacy Policy',
                content: `
                    <div class="legal-content">
                        <h3>Privacy Policy</h3>
                        <p><strong>Last updated:</strong> ${new Date().toLocaleDateString()}</p>
                        
                        <h4>Information We Collect</h4>
                        <p>This extension does not collect, store, or transmit any personal information. All data is stored locally on your device.</p>
                        
                        <h4>Data Usage</h4>
                        <ul>
                            <li>Cryptocurrency prices are fetched from public APIs (CoinGecko, Binance)</li>
                            <li>Your preferences are stored locally in browser storage</li>
                            <li>No data is sent to external servers</li>
                        </ul>
                        
                        <h4>Third-Party Services</h4>
                        <p>We use CoinGecko and Binance APIs for price data. Please review their privacy policies.</p>
                        
                        <h4>Contact</h4>
                        <p>For privacy concerns, contact: <a href="mailto:privacy@mohammadnasser.com">privacy@mohammadnasser.com</a></p>
                    </div>
                `
            },
            terms: {
                title: '📋 Terms of Service',
                content: `
                    <div class="legal-content">
                        <h3>Terms of Service</h3>
                        <p><strong>Last updated:</strong> ${new Date().toLocaleDateString()}</p>
                        
                        <h4>Acceptance of Terms</h4>
                        <p>By using this extension, you agree to these terms and conditions.</p>
                        
                        <h4>Use License</h4>
                        <p>This extension is provided for educational and informational purposes only.</p>
                        
                        <h4>Disclaimer</h4>
                        <ul>
                            <li>Cryptocurrency prices are for informational purposes only</li>
                            <li>Not financial advice - do your own research</li>
                            <li>Prices may be delayed or inaccurate</li>
                        </ul>
                        
                        <h4>Limitation of Liability</h4>
                        <p>We are not responsible for any financial losses or decisions made based on this extension.</p>
                    </div>
                `
            },
            license: {
                title: '⚖️ License',
                content: `
                    <div class="legal-content">
                        <h3>MIT License</h3>
                        <p><strong>Copyright (c) 2025 Mohammad Nasser</strong></p>
                        
                        <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
                        
                        <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
                        
                        <p><strong>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</strong></p>
                    </div>
                `
            },
            contributing: {
                title: '🤝 Contributing',
                content: `
                    <div class="legal-content">
                        <h3>Contributing Guidelines</h3>
                        <p>We welcome contributions from the community! Here's how you can help:</p>
                        
                        <h4>How to Contribute</h4>
                        <ul>
                            <li>Fork the repository on GitHub</li>
                            <li>Create a feature branch</li>
                            <li>Make your changes</li>
                            <li>Submit a pull request</li>
                        </ul>
                        
                        <h4>What We're Looking For</h4>
                        <ul>
                            <li>Bug fixes and improvements</li>
                            <li>New features and enhancements</li>
                            <li>Documentation improvements</li>
                            <li>UI/UX improvements</li>
                        </ul>
                        
                        <h4>Code Standards</h4>
                        <ul>
                            <li>Follow existing code style</li>
                            <li>Add comments for complex logic</li>
                            <li>Test your changes thoroughly</li>
                            <li>Update documentation if needed</li>
                        </ul>
                        
                        <h4>Get in Touch</h4>
                        <p>Join our community: <a href="https://github.com/naserhha/crypto-price-ticker" target="_blank">GitHub Repository</a></p>
                    </div>
                `
            },
            security: {
                title: '🔒 Security & Privacy',
                content: `
                    <div class="legal-content">
                        <h3>Security & Privacy</h3>
                        <p><strong>Last updated:</strong> ${new Date().toLocaleDateString()}</p>
                        
                        <h4>Security Measures</h4>
                        <ul>
                            <li>All data is stored locally on your device</li>
                            <li>No personal information is collected</li>
                            <li>Secure HTTPS connections to APIs</li>
                            <li>Regular security updates</li>
                        </ul>
                        
                        <h4>Data Protection</h4>
                        <ul>
                            <li>Your preferences are encrypted in browser storage</li>
                            <li>No tracking cookies or analytics</li>
                            <li>No data mining or profiling</li>
                        </ul>
                        
                        <h4>Vulnerability Reporting</h4>
                        <p>If you discover a security vulnerability, please report it to: <a href="mailto:security@mohammadnasser.com">security@mohammadnasser.com</a></p>
                        
                        <h4>Updates</h4>
                        <p>We regularly update the extension to address security concerns and improve functionality.</p>
                        
                        <h4>Third-Party Security</h4>
                        <p>We only use reputable, secure APIs for cryptocurrency data.</p>
                    </div>
                `
            }
        };

        const sectionData = sections[section];
        if (sectionData) {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'legal-modal';
            modal.innerHTML = `
                <div class="legal-modal-content">
                    <div class="legal-modal-header">
                        <h2>${sectionData.title}</h2>
                        <button class="legal-modal-close">&times;</button>
                    </div>
                    <div class="legal-modal-body">
                        ${sectionData.content}
                    </div>
                </div>
            `;

            // Add close functionality
            modal.querySelector('.legal-modal-close').addEventListener('click', () => {
                document.body.removeChild(modal);
            });

            // Close on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });

            // Add to page
            document.body.appendChild(modal);
        }
    }
}

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    new CryptoPriceTicker();
});
