using Core.Utilities.Results;
using Entities.Dtos.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IAuthService
    {
        IDataResult<TokenDto> Login(LoginDto loginDto);
        IResult Register(RegisterDto registerDto);
        IDataResult<TokenDto> RefreshToken(RefreshTokenDto dto);
    }
}
