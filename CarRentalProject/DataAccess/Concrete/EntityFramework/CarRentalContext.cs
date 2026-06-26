using Core.Entities.Concrete;
using Entities.Concrete;
using Entities.Dtos.View;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class CarRentalContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(
            "Host=localhost;Port=5430;Database=carRental;Username=postgres;Password=123456"
            );
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ServiceDetailViewDto>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("vw_service_detail");
            });
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<ServiceRecord> ServiceRecords { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<OperationClaim> OperationClaims { get; set; }
        public DbSet<UserOperationClaim> UserOperationClaims { get; set; }  
    }
}
