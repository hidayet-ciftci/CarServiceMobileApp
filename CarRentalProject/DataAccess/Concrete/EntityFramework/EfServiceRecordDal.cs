using Core.DataAccess.EfRepositoryContext;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.Dtos.View;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfServiceRecordDal : EfEntityRepositoryBase<ServiceRecord, CarRentalContext>, IServiceRecordDal
    {
        public void DeleteMany(List<int> ids)
        {
            using (CarRentalContext context = new CarRentalContext())
            {
                var serviceRecordsIds = ids.Distinct().ToList();

                var serviceRecords = context.ServiceRecords
                    .Where(x => serviceRecordsIds.Contains(x.Id))
                    .ToList();

                if (serviceRecords.Any())
                {
                    context.ServiceRecords.RemoveRange(serviceRecords);
                }

                context.SaveChanges();
            }
        }

        public List<ServiceDetailViewDto> GetAllServiceDetails()
        {
            using (CarRentalContext context = new CarRentalContext())
            {
                return context.Set<ServiceDetailViewDto>().ToList();
                
            }
        }

        public List<ServiceDetailViewDto> GetOneServiceDetails(Expression<Func<ServiceDetailViewDto, bool>> filter)
        {
            using (CarRentalContext context = new CarRentalContext())
            {
                return context.Set<ServiceDetailViewDto>().Where(filter).ToList();
            }
        }
    }
}
