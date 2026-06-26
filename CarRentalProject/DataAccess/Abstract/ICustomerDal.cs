using Core.DataAccess;
using Core.Utilities.Results;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface ICustomerDal : IEntityRepository<Customer>
    {
        List<CustomerDetailDto> GetCustomerDetail();
        void DeleteMany(List<int> ids);
    }
}
