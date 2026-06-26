using Business.Abstract;
using Business.Constants;
using Core.CrossCuttingConcerns.Logger;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class VehicleManager : IVehicleService
    {
        IVehicleDal _vehicleDal;
        ILogger _logger;
        public VehicleManager(IVehicleDal vehicleDal,ILogger logger)
        {
            _vehicleDal = vehicleDal;
            _logger = logger;
        }
        public IResult Add(Vehicle vehicle)
        {
            _vehicleDal.Add(vehicle);
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
            _vehicleDal.Delete(id);
            _logger.Log();
            return new SuccessResult(Messages.ApiDeleted);
        }

        public IDataResult<List<Vehicle>> GetAll()
        {
            _logger.Log();
            return new SuccessDataResult<List<Vehicle>>(_vehicleDal.GetAll(),Messages.ApiListed);
        }

        public IDataResult<Vehicle> GetOneById(int vehicleId)
        {
            var entity = _vehicleDal.GetOne(v => v.Id == vehicleId);
            if (entity is null)
            {
                return new ErrorDataResult<Vehicle>(entity, Messages.NotFound);
            }
            return new SuccessDataResult<Vehicle>(entity, Messages.ApiListed);
        }

        public IResult Update(Vehicle vehicle)
        {
            _vehicleDal.Update(vehicle);
            return new SuccessResult(Messages.ApiUpdated);
        }
        private IResult checkCustomerNotExist(int id)
        {
            var entityCheck = _vehicleDal.GetOne(v => v.Id == id);
            if (entityCheck is null)
            {
                return new ErrorResult("Boyle bir customer yok");
            }
            else return new SuccessResult();
        }
        public IResult AddWithTransaction(Vehicle vehicle)
        {
            _vehicleDal.AddWithTransaction(vehicle);
            return new SuccessResult("transaction ile eklendi");
        }

        public IResult DeleteManyById(List<int> ids)
        {
            _vehicleDal.DeleteMany(ids);
            return new SuccessResult(Messages.ApiDeleted);
        }
    }
}
