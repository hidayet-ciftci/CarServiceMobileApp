namespace WebAPI.Middlewares
{
    public class LoglamaMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<LoglamaMiddleware> _logger;

        public LoglamaMiddleware(RequestDelegate next, ILogger<LoglamaMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            
            _logger.LogInformation($"İstek geldi: {context.Request.Path}");

            await _next(context); // Bir sonraki middleware'e geç

            
            _logger.LogInformation($"Cevap gitti: {context.Response.StatusCode}");
        }
    }
}
