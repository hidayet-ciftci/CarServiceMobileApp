using Core.DataAccess;
using Core.Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IUserDal : IEntityRepository<User>
    {
        List<OperationClaim> GetClaims(User user);
        void AddClaim(int userId,int roleId);
        void DeleteMany(List<int> ids);
        List<UserRoleDto> getUsersWithRole();
    }
}
