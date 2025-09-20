const ccxt = require("ccxt");
const endWith = "/USDT";
const numberCheck = 10;

async function getTopByBuySellVolume() {
  const exchange = new ccxt.binance({ enableRateLimit: true });

  await exchange.loadMarkets();

  const symbols = Object.keys(exchange.markets).filter(s => s.endsWith(endWith)).slice(0, 100); // محدودیت برای تست
  const buyVolumes = [];
  const sellVolumes = [];

  for (const symbol of symbols) {
    try {
      const orderbook = await exchange.fetchOrderBook(symbol, numberCheck); 

      const bidVolume = orderbook.bids.reduce((sum, [price, amount]) => sum + amount, 0);
      const askVolume = orderbook.asks.reduce((sum, [price, amount]) => sum + amount, 0);

      buyVolumes.push({ symbol, volume: bidVolume });
      sellVolumes.push({ symbol, volume: askVolume });

      await new Promise(r => setTimeout(r, exchange.rateLimit));
    } catch (err) {
      console.error(`Error fetching ${symbol}: ${err.message}`);
    }
  }

  // مرتب‌سازی
  const topBuys = buyVolumes.sort((a, b) => b.volume - a.volume).slice(0, numberCheck);
  const topSells = sellVolumes.sort((a, b) => b.volume - a.volume).slice(0, numberCheck);

  console.log("Top 50 by Buy (Bid) Volume:");
  console.table(topBuys);

  console.log("Top 50 by Sell (Ask) Volume:");
  console.table(topSells);
}

getTopByBuySellVolume();
