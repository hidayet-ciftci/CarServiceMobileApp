using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        ICustomerService _customerService;
        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                var customers = _customerService.GetAll();
                return Ok(customers);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        [Authorize]
        [HttpGet("customer-detail/{id}")]
        public IActionResult getOnebyId(int id)
        {
            try
            {
                var result = _customerService.GetOneById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Add(Customer customer)
        {
            try
            {
                var result = _customerService.Add(customer);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var result = _customerService.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("delete-many")]
        public IActionResult DeleteMany([FromBody] List<int> ids)
        {
            try
            {
                var result = _customerService.DeleteManyById(ids);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Update(Customer customer)
        {
            try
            {
                var result = _customerService.Update(customer);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        [HttpGet("GetDetail")]
        public IActionResult GetCustomerWithVehicle()
        {
            try
            {
                var result = _customerService.GetCustomerDetail();
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}