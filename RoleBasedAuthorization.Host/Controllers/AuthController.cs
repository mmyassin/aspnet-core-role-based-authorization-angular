using RoleBasedAuthorization.Core.Users;
using RoleBasedAuthorization.Host.Models;
using RoleBasedAuthorization.Host.Services.Auth;
using RoleBasedAuthorization.Core.Roles;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoleBasedAuthorization.Host.Controllers
{
    public class AuthController : Controller
    {
        private readonly IAuthRepository _authRepository;
        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }
        [HttpPost("api/auth/register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] RegistrationInputDto input)
        {
            input.Username = input.Username.ToLower();
            if (await _authRepository.IsUserExists(input.Username))
                ModelState.AddModelError("Username", "Username is already exists");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userToCreate = new User
            {
                Username = input.Username,
                FirstName = input.FirstName,
                LastName = input.LastName,
                Role = Role.Customer
            };
            var createUser = await _authRepository.Register(userToCreate, input.Password);

            return Ok(createUser);
        }
        [HttpPost("api/auth/authenticate")]
        public async Task<ActionResult<UserDto>> Authenticate([FromBody] LoginInputDto input)
        {
            var user = await _authRepository.Authenticate(input.Username, input.Password);
            if (user == null)
                return Unauthorized("incorrect username or password");

            return Ok(user);
        }

    }
}
