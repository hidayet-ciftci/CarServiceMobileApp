using Core.Entities.Concrete;
using Core.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IVehicleService
    {
        IResult Add(Vehicle vehicle);
        IResult Delete(int id);
        IResult Update(Vehicle vehicle);
        IDataResult<List<Vehicle>> GetAll();
        IDataResult<Vehicle> GetOneById(int vehicleId);

        IResult AddWithTransaction(Vehicle vehicle);
        IResult DeleteManyById(List<int> ids);
    }
}
