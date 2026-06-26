using Core.DataAccess;
using Core.Utilities.Results;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IVehicleDal : IEntityRepository<Vehicle>
    {
        IResult AddWithTransaction(Vehicle vehicle);
        void DeleteMany(List<int> ids);
    }
}
