using Business.Abstract;
using Business.Constants;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Entities.Dtos.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class ServiceRecordManager : IServiceRecordService
    {
        IServiceRecordDal _serviceRecordDal;

        public ServiceRecordManager(IServiceRecordDal serviceRecordDal)
        {
            _serviceRecordDal = serviceRecordDal;
        }
        public IResult Add(ServiceRecord serviceRecord)
        {
            _serviceRecordDal.Add(serviceRecord);
            return new SuccessResult(Messages.ApiAdded);
        }

        public IResult Delete(int id)
        {
            //business Codes
            IResult result = BusinessRules.Run(checkCustomerNotExist(id));
            if (result != null)
            {
                return result;
            }
            _serviceRecordDal.Delete(id);
            return new SuccessResult(Messages.ApiDeleted);
        }

        public IResult DeleteManyById(List<int> ids)
        {
            _serviceRecordDal.DeleteMany(ids);
            return new SuccessResult(Messages.ApiDeleted);
        }

        public IDataResult<List<ServiceRecord>> GetAll()
        {
            return new SuccessDataResult<List<ServiceRecord>>(_serviceRecordDal.GetAll(),Messages.ApiListed);
        }

        public IDataResult<List<ServiceDetailViewDto>> GetAllServiceDetails()
        {
            return new SuccessDataResult<List<ServiceDetailViewDto>>(_serviceRecordDal.GetAllServiceDetails(),Messages.ApiListed);
        }

        public IDataResult<ServiceRecord> GetOneById(int id)
        {
            return new SuccessDataResult<ServiceRecord>(_serviceRecordDal.GetOne(s => s.Id == id),Messages.ApiListed);
        }

        public IDataResult<List<ServiceDetailViewDto>> GetOneServiceDetails(string email)
        {
            var viewDto = _serviceRecordDal.GetOneServiceDetails(s => s.Email == email);
            if (viewDto is null) return new ErrorDataResult<List<ServiceDetailViewDto>>(null, Messages.NotFound);
            return new SuccessDataResult<List<ServiceDetailViewDto>>(viewDto, Messages.ApiListed);
        }

        public IResult Update(ServiceRecord serviceRecord)
        {
            _serviceRecordDal.Update(serviceRecord);
            return new SuccessResult(Messages.ApiUpdated);
        }

        // buisness

        private IResult checkCustomerNotExist(int id)
        {
            var entityCheck = _serviceRecordDal.GetOne(s => s.Id == id);
            if (entityCheck is null)
            {
                return new ErrorResult("Boyle bir Service Record yok");
            }
            else return new SuccessResult();
        }
    }
}
