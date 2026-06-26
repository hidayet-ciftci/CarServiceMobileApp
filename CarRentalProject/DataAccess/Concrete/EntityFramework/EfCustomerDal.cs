using Core.DataAccess.EfRepositoryContext;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCustomerDal : EfEntityRepositoryBase<Customer, CarRentalContext>, ICustomerDal
    {
        public void DeleteMany(List<int> ids)
        {
            using (CarRentalContext context = new CarRentalContext())
            {
                var customerIds = ids.Distinct().ToList();

                var customers = context.Customers
                    .Where(x => customerIds.Contains(x.Id))
                    .ToList();

                var vehicles = context.Vehicles
                    .Where(v => customerIds.Contains(v.CustomerId))
                    .ToList();

                var vehicleIds = vehicles.Select(v => v.Id).ToList();

                var serviceRecords = context.ServiceRecords
                    .Where(sr=>vehicleIds.Contains(sr.VehicleId)).ToList();

                

                if (serviceRecords.Any())
                {
                    context.ServiceRecords.RemoveRange(serviceRecords);
                    context.SaveChanges();
                }
                
                if (vehicles.Any())
                {
                    context.Vehicles.RemoveRange(vehicles);
                    context.SaveChanges();
                }

                if (customers.Any())
                {
                    context.Customers.RemoveRange(customers);
                    context.SaveChanges();
                }

                
            }
        }

        public List<CustomerDetailDto> GetCustomerDetail()
        {
            using (CarRentalContext context = new CarRentalContext())
            {
                var result = from c in context.Customers
                             join v in context.Vehicles
                             on c.Id equals v.CustomerId
                             select new CustomerDetailDto
                             {
                                 CustomerId = c.Id,FirstName = c.FirstName, LastName = c.LastName,
                                 VehicleId = v.Id,Brand = v.Brand , Color = v.Color, Plate = v.Plate, VIN_Number= v.VIN_Number
                             };
                return result.ToList();
            }
        }
    }
}
