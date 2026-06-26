using Core.DependencyResolvers;
using Core.Extensions;
using Core.Utilities.IoC;
using WebAPI.Extensions;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:7265;https://localhost:7265");

// Services
//builder.Host.AddSerilogLogging();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
builder.Services.AddSwagger();
builder.Services.AddJwtAuth(builder.Configuration);
//builder.Services.AddHangfireWithPostgre(builder.Configuration);
builder.Services.AddDependencyResolvers(new ICoreModule[] { new CoreModule() });

var app = builder.Build();

// Pipeline

//app.UseCustomMiddlewares();
app.UseSwaggerWithUI();
//app.UseHttpsRedirection();
//app.UseSerilogRequestLogging();
//app.UseHangfireJobs();

app.UseCors("AllowAll");

app.UseAuthentication(); // bu kullanici kim ?
app.UseAuthorization();  // bu kullanicinin bunu yapmaya yetkisi var mi ?
app.MapControllers();

app.Run();