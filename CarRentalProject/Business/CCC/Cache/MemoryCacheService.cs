using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.CCC.Cache
{
    public class MemoryCacheService : ICacheService
    {
        private readonly IMemoryCache _memoryCache;
        private readonly TimeSpan _defaultExpiration = TimeSpan.FromMinutes(30);
        public MemoryCacheService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }
        public T Get<T>(string key)
        {
            _memoryCache.TryGetValue(key, out T value);
            return value;
        }
        public void Set<T>(string key, T value, TimeSpan? expiration = null)
        {
            var options = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = expiration ?? _defaultExpiration
            };
            _memoryCache.Set(key, value, options);
        }
        public bool Exists(string key)
        {
             return _memoryCache.TryGetValue(key, out _);
        }
        public void Remove(string key) => _memoryCache.Remove(key);
    }
}
