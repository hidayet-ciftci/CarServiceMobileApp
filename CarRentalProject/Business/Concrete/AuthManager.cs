using Business.Abstract;
using Business.Constants;
using Core.Entities.Concrete;
using Core.Utilities.Results;
using Core.Utilities.Security;
using DataAccess.Abstract;
using Entities.Dtos.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class AuthManager : IAuthService
    {
        private readonly IUserDal _userDal;
        private readonly JwtHelper _jwtHelper;

        public AuthManager(IUserDal userDal,JwtHelper jwtHelper)
        {
            _jwtHelper = jwtHelper;
            _userDal = userDal;
        }
        public IResult Register(RegisterDto registerDto)
        {
            var existing = _userDal.GetOne(u => u.Email == registerDto.Email);
            if (existing != null)
            {
                return new ErrorResult("bu email zaten var");
            }
            var passwordHash = HashHelper.HashPassword(registerDto.Password);

            var user = new User
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                PasswordHash = passwordHash,
                PhoneNumber = registerDto.PhoneNumber,
                Status = true,
                CreatedTime = DateTime.UtcNow
            };
            _userDal.Add(user);
            _userDal.AddClaim(user.Id,registerDto.RoleId);

            return new SuccessResult("Succesfully Registered with workerRole");
        }
        public IDataResult<TokenDto> Login(LoginDto loginDto)
        {
            var user = _userDal.GetOne(u => u.Email == loginDto.Email);
            if (user == null)
            {
                return new ErrorDataResult<TokenDto>(null,"Email ya da sifre hatali");
            }
            bool isValid = HashHelper.VerifyPassword(loginDto.Password, user.PasswordHash);
            if (!isValid)
            {
                return new ErrorDataResult<TokenDto>(null,"Email ya da sifre hatali");
            }
            var claims = _userDal.GetClaims(user);
            var accessToken = _jwtHelper.CreateToken(user,claims);
            var newRefreshToken = _jwtHelper.CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            _userDal.Update(user);
            return new SuccessDataResult<TokenDto>(new TokenDto { AccessToken = accessToken, RefreshToken = newRefreshToken }, "Token yenilendi");
        }

        public IDataResult<TokenDto> RefreshToken(RefreshTokenDto dto)
        {
            var user = _userDal.GetOne(u => u.RefreshToken == dto.RefreshToken);
            if (user==null)
            {
                return new ErrorDataResult<TokenDto>(null,"unvalid refresh token");
            }
            if (user.RefreshTokenExpiry < DateTime.UtcNow)
            {
                return new ErrorDataResult<TokenDto>(null,"Refresh token suresi dolmus, lutfen giris yapin");
            }
            var claims = _userDal.GetClaims(user);
            var newAccessToken = _jwtHelper.CreateToken(user, claims);
            var newRefreshToken = _jwtHelper.CreateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            _userDal.Update(user);

            return new SuccessDataResult<TokenDto>(new TokenDto { AccessToken=newAccessToken,RefreshToken=newRefreshToken},"Token yenilendi");
        }
    }
}
