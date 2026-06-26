using Business.Abstract;
using Business.CCC.Cache;
using Business.Constants;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Entities.Dtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CustomerManager : ICustomerService
    {
        ICustomerDal _customerDal;
        ICacheService _cacheService;
        private const string CacheKey = "products_all";

        private readonly IValidator<Customer> _validator;

        public CustomerManager(ICustomerDal customerDal, IValidator<Customer> validator,ICacheService cacheService)
        {
            _customerDal = customerDal;
            _validator = validator;
            _cacheService = cacheService;
        }
        public IResult Add(Customer customer)
        {
            //business Codes
            IResult result = BusinessRules.Run(checkCustomerExist(customer.Id), checkPhoneNumExist(customer.PhoneNumber),checkEmailExist(customer.Email), checkCustomerNum());
           if (result != null)
            {
                return result;
            }
            var ValidateResult = _validator.Validate(customer);
            if (!ValidateResult.IsValid)
            {
                var messages = string.Join(", ", ValidateResult.Errors.Select(x => x.ErrorMessage));
                return new ErrorResult(messages);
            }
            _customerDal.Add(customer);
            _cacheService.Remove(CacheKey);
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
            _customerDal.Delete(id);
            return new SuccessResult(Messages.ApiDeleted);
        }

        public IDataResult<List<Customer>> GetAll()
        {
            var cached = _cacheService.Get<List<Customer>>(CacheKey);
            if (cached != null) return new SuccessDataResult<List<Customer>>(cached,Messages.ApiListed + " from Cache");
            var data = _customerDal.GetAll();
            _cacheService.Set(CacheKey, data, TimeSpan.FromMinutes(15));
            return new SuccessDataResult<List<Customer>>(data,Messages.ApiListed + " from DB");
        }

        public IDataResult<Customer> GetOneById(int customerId)
        {
            var entity = _customerDal.GetOne(c => c.Id == customerId);
            if (entity is null)
            {
                return new ErrorDataResult<Customer>(entity, Messages.NotFound);
            }
            return new SuccessDataResult<Customer>(entity,Messages.ApiListed);
        }

        public IResult Update(Customer customer)
        {
            _customerDal.Update(customer);
            _cacheService.Remove(CacheKey);
            return new SuccessResult(Messages.ApiUpdated);
        }

        public IDataResult<List<CustomerDetailDto>> GetCustomerDetail()
        {
            return new SuccessDataResult<List<CustomerDetailDto>>(_customerDal.GetCustomerDetail(),Messages.ApiListed);
        }
        private IResult checkCustomerNum()
        {
            var customerNum = _customerDal.GetAll().Count;
            if (customerNum > 15)
            {
                return new ErrorResult("15 limite ulasildi");
            }
            else return new SuccessResult();
        }
        private IResult checkCustomerExist(int id)
        {
            var entityCheck = _customerDal.GetOne(c=>c.Id ==id);
            if (entityCheck is null)
            {
                return new SuccessResult();
            }
            else return new ErrorResult("Boyle bir customer Id zaten var");
        }
        private IResult checkEmailExist(string email)
        {
            var emailCheck = _customerDal.GetOne(c => c.Email == email);
            if (emailCheck is null)
            {
                return new SuccessResult();
            }
            else return new ErrorResult("Boyle bir customer Email zaten var");
        }
        private IResult checkPhoneNumExist(string phoneNum)
        {
            var phoneCheck = _customerDal.GetOne(c => c.PhoneNumber == phoneNum);
            if (phoneCheck is null)
            {
                return new SuccessResult();
            }
            else return new ErrorResult("Boyle bir customer telefon numarası zaten var");
        }
        private IResult checkCustomerNotExist(int id)
        {
            var entityCheck = _customerDal.GetOne(c => c.Id == id);
            if (entityCheck is null)
            {
                return new ErrorResult("Boyle bir customer yok");
            }
            else return new SuccessResult();
        }

        public IResult DeleteManyById(List<int> ids)
        {
            _customerDal.DeleteMany(ids);
            _cacheService.Remove(CacheKey);
            return new SuccessResult(Messages.ApiDeleted);
        }
    }
}
