using Business.Abstract;
using Business.CCC.Cache;
using Business.CCC.Jobs;
using Business.Concrete;
using Business.ValidationRules.FluentValidation;
using Core.CrossCuttingConcerns.Logger;
using Core.CrossCuttingConcerns.Transaction;
using Core.DataAccess.Transaction;
using Core.Utilities.IoC;
using Core.Utilities.Security;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DependencyResolvers
{
    public class CoreModule : ICoreModule
    {
        public void Load(IServiceCollection serviceCollection)
        {
            serviceCollection.AddMemoryCache();
            serviceCollection.AddSingleton<ICacheService, MemoryCacheService>();

            serviceCollection.AddScoped<ICustomerService, CustomerManager>();
            serviceCollection.AddScoped<IValidator<Customer>, CustomerValidator>();
            serviceCollection.AddScoped<ICustomerDal, EfCustomerDal>();
            // transiat her istekte yeni olusturulur
            // scoped da istekde olusturulur aynı instance paylastilir.
            // singletaion da sadece 1 istek uyg ayaga kalktiginda.

            serviceCollection.AddScoped<IVehicleService, VehicleManager>();
            serviceCollection.AddScoped<IVehicleDal, EfVehicelDal>();

            serviceCollection.AddScoped<IUserService, UserManager>();
            serviceCollection.AddScoped<IUserDal, EfUserDal>();

            serviceCollection.AddScoped<IServiceRecordService, ServiceRecordManager>();
            serviceCollection.AddScoped<IServiceRecordDal, EfServiceRecordDal>();

            serviceCollection.AddScoped<IAuthService, AuthManager>();
            serviceCollection.AddScoped<JwtHelper>();

            serviceCollection.AddScoped<ICronJobService, CronJobManager>();

            serviceCollection.AddSingleton<ILogger, ConsoleLogger>();

            serviceCollection.AddScoped<CarRentalContext>();
            serviceCollection.AddScoped<IUnitOfWork, UnitOfWork>();

            

        }
    }
}
