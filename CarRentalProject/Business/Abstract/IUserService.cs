using Business.Constants;
using Core.Entities.Concrete;
using Core.Utilities.Results;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IUserService
    {
        IResult Add(User user);
        IResult Delete(int id);
        IResult Update(User user);
        IDataResult<List<UserRoleDto>> GetAll();
        IDataResult<User> GetOneById(int userId);
        IDataResult<List<User>> GetAllWithTransaction();
        IResult DeleteManyById(List<int> ids);
        
    }
}
