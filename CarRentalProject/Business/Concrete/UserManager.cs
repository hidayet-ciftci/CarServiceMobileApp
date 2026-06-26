using Business.Abstract;
using Business.Constants;
using Core.CrossCuttingConcerns.Transaction;
using Core.Entities.Concrete;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class UserManager : IUserService
    {
        IUserDal _userDal;
        IUnitOfWork _unitOfWork;
        public UserManager(IUserDal userDal, IUnitOfWork unitOfWork)
        {
            _userDal = userDal;
            _unitOfWork = unitOfWork;
        }
        public IResult Add(User user)
        {
            _userDal.Add(user);
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
            _userDal.Delete(id);
            return new SuccessResult(Messages.ApiDeleted);
        }

        public IResult DeleteManyById(List<int> ids)
        {
            _userDal.DeleteMany(ids);
            return new SuccessResult(Messages.ApiDeleted);
        }

        public IDataResult<List<UserRoleDto>> GetAll()
        {
            return new SuccessDataResult<List<UserRoleDto>>(_userDal.getUsersWithRole(),Messages.ApiListed);
        }
        public IDataResult<List<User>> GetAllWithTransaction()
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var list = _userDal.GetAll();
                _unitOfWork.SaveChanges();

                _unitOfWork.Commit();
                return new SuccessDataResult<List<User>>(list, "Transaction ile cekildi");
            }
            catch (Exception)
            {

                _unitOfWork.Rollback();
                return new ErrorDataResult<List<User>>(null, "Transaction ile korundu, geri alındi");
            }
        }

        public IDataResult<User> GetOneById(int userId)
        {
            return new SuccessDataResult<User>(_userDal.GetOne(u => u.Id == userId),Messages.ApiListed);
        }

        public IResult Update(User user)
        {
            _userDal.Update(user);
            return new SuccessResult(Messages.ApiUpdated);
        }

        private IResult checkCustomerNotExist(int id)
        {
            var entityCheck = _userDal.GetOne(u => u.Id== id);
            if (entityCheck is null)
            {
                return new ErrorResult("Boyle bir Service Record yok");
            }
            else return new SuccessResult();
        }
    }
}
