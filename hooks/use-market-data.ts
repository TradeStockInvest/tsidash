"use client"

import { useState, useEffect, useRef } from "react"
import marketDataService, { type MarketAsset } from "@/services/market-data-service"

export function useMarketData(type: "stocks" | "crypto" | "indices" | "trending") {
  const [data, setData] = useState<MarketAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const isMounted = useRef(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsLoading(true)
    isMounted.current = true

    let unsubscribe: (() => void) | null = null

    if (type === "trending") {
      // For trending, we'll just get the current trending data
      setData(marketDataService.getTrendingData())
      setIsLoading(false)

      // Set up an interval to refresh trending data
      intervalRef.current = setInterval(() => {
        if (isMounted.current) {
          setData(marketDataService.getTrendingData())
        }
      }, 2000)

      return () => {
        isMounted.current = false
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    } else {
      // For other types, subscribe to updates
      try {
        unsubscribe = marketDataService.subscribe(type, (newData) => {
          if (isMounted.current) {
            setData(newData)
            setIsLoading(false)
          }
        })
      } catch (error) {
        console.error("Error subscribing to market data:", error)
        setIsLoading(false)
      }
    }

    // Cleanup subscription
    return () => {
      isMounted.current = false
      if (unsubscribe) unsubscribe()
    }
  }, [type])

  return { data, isLoading }
}

