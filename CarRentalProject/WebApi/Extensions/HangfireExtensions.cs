using Business.CCC.Jobs;
using Hangfire;
using Hangfire.PostgreSql;

namespace WebAPI.Extensions
{
    public static class HangfireExtensions
    {
         // match exact key in appsettings.json
        public static IServiceCollection AddHangfireWithPostgre(
            this IServiceCollection services,IConfiguration configuration)
        {
            services.AddHangfire(cfg => cfg
            .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
            .UseSimpleAssemblyNameTypeSerializer()
            .UseRecommendedSerializerSettings()
            .UsePostgreSqlStorage(
                configuration.GetConnectionString("PostgreSQL"),
                new PostgreSqlStorageOptions
                {
                    QueuePollInterval = TimeSpan.FromSeconds(15),
                    JobExpirationCheckInterval = TimeSpan.FromHours(1),
                    CountersAggregateInterval = TimeSpan.FromMinutes(15),
                    PrepareSchemaIfNecessary = true
                }));
            services.AddHangfireServer();
            return services;
        }

        public static IApplicationBuilder UseHangfireJobs(
        this IApplicationBuilder app)
        {
            app.UseHangfireDashboard("/hangfire");

            var recurringJobs = app.ApplicationServices
                .GetRequiredService<IRecurringJobManager>();

            recurringJobs.AddOrUpdate<ICronJobService>(
                "daily-log-job",
                job => job.RunDailyLog(),
                Cron.Daily);

            recurringJobs.AddOrUpdate<ICronJobService>(
                "hourly-log-job",
                job => job.RunHourlyLog(),
                Cron.Hourly);

            return app;
        }
    }
}
