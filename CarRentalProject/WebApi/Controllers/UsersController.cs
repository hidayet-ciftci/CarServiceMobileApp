using Business.Abstract;
using Core.Entities.Concrete;
using Entities.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet]
        public IActionResult getAll()
        {
            try
            {

                var result = _userService.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        [HttpGet("user-detail/{id}")]
        public IActionResult getOnebyId(int id)
        {
            try
            {

                var result = _userService.GetOneById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Add(User user)
        {
            try
            {
                var result = _userService.Add(user);
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

                var result = _userService.Delete(id);
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
                var result = _userService.DeleteManyById(ids);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Update(User user)
        {
            try
            {

                var result = _userService.Update(user);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        //[HttpGet("getWithTransaction")]
        //public IActionResult GetWithTransaction()
        //{
        //    try
        //    {
        //        var result = _userService.GetAllWithTransaction();
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw new Exception(ex.Message);
        //    }
        //}
        [Authorize]
        [HttpGet("Me")]
        public IActionResult getMe()
        {
            try
            {
                var result = "ok";
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
