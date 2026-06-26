using Business.Abstract;
using Entities.Dtos.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto registerDto)
        {
            var result = _authService.Register(registerDto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [HttpPost("login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var result = _authService.Login(loginDto);
            if (!result.Success)
            {
                return Unauthorized(result);
            }
            return Ok(result);
        }
        [HttpPost("refresh")]
        public IActionResult Refresh(RefreshTokenDto dto)
        {
            var result = _authService.RefreshToken(dto);
            if (!result.Success) return Unauthorized(result);
            return Ok(result);
        }
    }
}
