using Serilog;

namespace WebAPI.Extensions
{
    public static class SerilogExtensions
    {
        public static IHostBuilder AddSerilogLogging(this IHostBuilder hostBuilder)
        {
            hostBuilder.UseSerilog((ctx, config) =>
            {
                config.ReadFrom.Configuration(ctx.Configuration)
                    .Enrich.FromLogContext();
            });
            return hostBuilder;
        }
        
    }
}
