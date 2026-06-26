using Core.DataAccess.EfRepositoryContext;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfVehicelDal : EfEntityRepositoryBase<Vehicle, CarRentalContext>, IVehicleDal
    {
        private readonly CarRentalContext _context;

        public EfVehicelDal(CarRentalContext context)
        {
            _context = context;
        }

        public IResult AddWithTransaction(Vehicle vehicle)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                _context.Vehicles.Add(vehicle);
                _context.SaveChanges();
                transaction.Commit();
                return new SuccessResult("transaction basarili");
            }
            catch (Exception)
            {
                transaction.Rollback();
                return new ErrorResult("transaction basarisiz");
            }
        }

        public void DeleteMany(List<int> ids)
        {
            using (CarRentalContext context = new CarRentalContext())
            {
                var vehicleIds = ids.Distinct().ToList();

                var vehicles = context.Vehicles
                    .Where(v => vehicleIds.Contains(v.Id))
                    .ToList();

                var serviceRecords = context.ServiceRecords
                    .Where(sr => vehicleIds.Contains(sr.VehicleId))
                    .ToList();

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

                
            }
        }
    }
}
