using Core.Utilities.Results;
using Entities.Concrete;
using Entities.Dtos.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IServiceRecordService
    {
        IResult Add(ServiceRecord serviceRecord);
        IResult Delete(int id);
        IResult Update(ServiceRecord serviceRecord);
        IDataResult<List<ServiceRecord>> GetAll();
        IDataResult<ServiceRecord> GetOneById(int ServiceRecordId);

        IDataResult<List<ServiceDetailViewDto>> GetAllServiceDetails();

        IDataResult<List<ServiceDetailViewDto>> GetOneServiceDetails(string email);
        IResult DeleteManyById(List<int> ids);
    }
}
