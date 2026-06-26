using Core.DataAccess.EfRepositoryContext;
using Core.Entities.Concrete;
using DataAccess.Abstract;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfUserDal : EfEntityRepositoryBase<User, CarRentalContext>, IUserDal
    {

        public List<OperationClaim> GetClaims(User user)
        {
            using (CarRentalContext context = new CarRentalContext())
            {
                var result = from uoc in context.UserOperationClaims
                             join oc in context.OperationClaims
                             on uoc.OperationClaimId equals oc.Id
                             where uoc.UserId == user.Id
                             select new OperationClaim
                             {
                                 Id = oc.Id,
                                 Name = oc.Name
                             };
                return result.ToList();
            }
        }
        public void AddClaim(int userId, int roleId)
        {
            using (CarRentalContext context = new CarRentalContext())
            {
                var newClaim = new UserOperationClaim
                {
                    UserId = userId,
                    OperationClaimId = roleId,
                };

                context.UserOperationClaims.Add(newClaim);
                context.SaveChanges();
            }
        }
        public void DeleteMany(List<int> ids)
        {
            using (CarRentalContext context = new CarRentalContext())
            {
                var userIds = ids.Distinct().ToList();

                var userClaims = context.UserOperationClaims
                    .Where(x => userIds.Contains(x.UserId))
                    .ToList();

                var serviceRecords = context.ServiceRecords
                    .Where(sr => userIds.Contains(sr.UserId))
                    .ToList();

                var users = context.Users
                    .Where(x => userIds.Contains(x.Id))
                    .ToList();

                if (userClaims.Any())
                {
                    context.UserOperationClaims.RemoveRange(userClaims);
                    context.SaveChanges();
                }

                if (serviceRecords.Any())
                {
                    context.ServiceRecords.RemoveRange(serviceRecords);
                    context.SaveChanges();
                }

                if (users.Any())
                {
                    context.Users.RemoveRange(users);
                    context.SaveChanges();
                }
            }
        }

        public List<UserRoleDto> getUsersWithRole()
        {
             using (CarRentalContext context = new CarRentalContext())
            {
                var result = from u in context.Users
                              join uc in context.UserOperationClaims
                              on u.Id equals uc.UserId
                              join oc in context.OperationClaims
                              on uc.OperationClaimId equals oc.Id
                              select new UserRoleDto
                              {
                                  Id = u.Id,
                                  FirstName = u.FirstName,
                                  LastName = u.LastName,
                                  Email = u.Email,
                                  PasswordHash = u.PasswordHash,
                                  PhoneNumber = u.PhoneNumber,
                                  Status = u.Status,
                                  CreatedTime = u.CreatedTime,
                                  RefreshToken = u.RefreshToken,
                                  RefreshTokenExpiry = u.RefreshTokenExpiry,
                                  RoleName = oc.Name
                              };
                return result.ToList();
            }
        }
    }
}
