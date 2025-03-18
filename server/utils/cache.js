import NodeCache from "node-cache"

// Create a new cache instance with default TTL of 10 minutes (600 seconds)
const cache = new NodeCache({
  stdTTL: 600,
  checkperiod: 120, // Check for expired keys every 2 minutes
  useClones: false, // Store references to objects instead of cloning them
})

/**
 * Middleware for caching API responses
 * @param {number} ttl - Time to live in seconds (optional, defaults to stdTTL)
 */
export const cacheMiddleware = (ttl) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next()
    }

    // Include X-Forwarded-For header in cache key to handle Nginx proxy
    const forwardedFor = req.headers["x-forwarded-for"] || req.connection.remoteAddress

    // Create a unique cache key based on the request URL and other identifiers
    const key = `${req.originalUrl}-${forwardedFor}`

    // Log cache activity for debugging (remove in production)
    console.log(`Cache lookup for key: ${key} (Instance: ${process.env.INSTANCE_ID || "0"})`)

    // Check if the response is cached
    const cachedResponse = cache.get(key)

    if (cachedResponse) {
      console.log(`Cache hit for ${key} (Instance: ${process.env.INSTANCE_ID || "0"})`)
      return res.json(cachedResponse)
    }

    // If not cached, intercept the response to store it in cache
    const originalSend = res.json
    res.json = function (body) {
      // Store the response in cache before sending
      if (res.statusCode === 200) {
        cache.set(key, body, ttl)
        console.log(`Cached response for ${key} (Instance: ${process.env.INSTANCE_ID || "0"})`)
      }

      // Call the original json method
      return originalSend.call(this, body)
    }

    next()
  }
}

/**
 * Clear cache for a specific key or pattern
 * @param {string} pattern - Key or pattern to match
 */
export const clearCache = (pattern) => {
  if (pattern) {
    // Get all keys that match the pattern
    const keys = cache.keys().filter((key) => key.includes(pattern))
    keys.forEach((key) => cache.del(key))
    console.log(
      `Cleared ${keys.length} cache entries matching pattern: ${pattern} (Instance: ${process.env.INSTANCE_ID || "0"})`,
    )
  } else {
    // Clear all cache
    cache.flushAll()
    console.log(`Cleared entire cache (Instance: ${process.env.INSTANCE_ID || "0"})`)
  }
}

export default cache