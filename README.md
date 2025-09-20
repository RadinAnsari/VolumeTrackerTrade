# 🏦 Volume Tracker

This Node.js script connects to **Binance** using [CCXT](https://github.com/ccxt/ccxt) and retrieves the **top 50 cryptocurrencies by buy and sell order volumes**.  
It helps traders quickly see which assets have the largest buying (bid) and selling (ask) pressure in real-time.

---

## **Features**

- Fetches **order book** for the top 100 USDT trading pairs.  
- Calculates **buy volume** (total bids) and **sell volume** (total asks) per symbol.  
- Displays **Top 50 symbols** by bid volume (buyers) and ask volume (sellers).  
- Handles Binance rate limits automatically.

---

## **Installation**

1. Clone the repository:

```bash
git clone VolumeTrackerTrade
cd VolumeTrackerTrade
