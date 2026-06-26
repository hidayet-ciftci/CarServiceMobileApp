using Core.DataAccess;
using Entities.Concrete;
using Entities.Dtos.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IServiceRecordDal : IEntityRepository<ServiceRecord>
    {
        List<ServiceDetailViewDto> GetAllServiceDetails();
        List<ServiceDetailViewDto> GetOneServiceDetails(Expression<Func<ServiceDetailViewDto, bool>> filter);
        void DeleteMany(List<int> ids);
    }
}
