namespace WebAPI.Extensions
{
    public static class SwaggerExtensions
    {
        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            return services;
        }

        // ✅ İsim değişti: UseSwaggerUI → UseSwaggerWithUI
        public static WebApplication UseSwaggerWithUI(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();        // ✅ Microsoft'un metodu
                app.UseSwaggerUI();      // ✅ Microsoft'un metodu
            }
            return app;
        }
    }   
}


