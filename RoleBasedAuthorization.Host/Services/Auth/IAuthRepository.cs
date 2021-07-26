using RoleBasedAuthorization.Core.Users;
using RoleBasedAuthorization.Host.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoleBasedAuthorization.Host.Services.Auth
{
    public interface IAuthRepository
    {
        Task<UserDto> Register(User user, string password);
        Task<UserDto> Authenticate(string username, string password);
        Task<bool> IsUserExists(string username);
    }
}
