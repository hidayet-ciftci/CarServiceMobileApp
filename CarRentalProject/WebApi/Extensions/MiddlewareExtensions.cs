using WebAPI.Middlewares;

namespace WebAPI.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseCustomMiddlewares(
            this IApplicationBuilder app)
        {
            app.UseMiddleware<LoglamaMiddleware>();
            return app;
        }
    }
}
