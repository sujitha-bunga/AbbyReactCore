using AbbyyTestTask.Db;
using AbbyyTestTask.Dto;
using AbbyyTestTask.Entities;
using Isopoh.Cryptography.Argon2;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AbbyyTestTask.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly AppDbContext _userContext;
        private readonly IConfiguration _configuration;

        public AuthenticationService(AppDbContext userContext, IConfiguration configuration)
        {
            _userContext = userContext;
            _configuration = configuration;
        }

        public async Task<User> Login(LoginRequest loginUser)
        {
            User? user = await _userContext.Users.FindAsync(loginUser.Username);

            if (user == null || Argon2.Verify(user.Password, loginUser.Password) == false)
            {
                return null; //returning null intentionally to show that login was unsuccessful
            }

            // Create JWT token handler and get secret key

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]);

            // Prepare list of user claims

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.GivenName, user.firstName)
            };
            //foreach (var role in user.Roles)
            //{
                claims.Add(new Claim(ClaimTypes.Role, user.Roles.ToString()));
            //}

            // Create token descriptor

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                IssuedAt = DateTime.UtcNow,
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            // Create token and set it to user

            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            user.IsActive = true;

            return user;
        }

        public async Task<User> Register(User registerUser)
        {
            registerUser.Password = Argon2.Hash(registerUser.Password);
            _userContext.Users.Add(registerUser);
            await _userContext.SaveChangesAsync();

            return registerUser;
        }
    }

}

