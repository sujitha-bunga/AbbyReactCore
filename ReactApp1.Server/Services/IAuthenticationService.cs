using AbbyyTestTask.Dto;
using AbbyyTestTask.Entities;

namespace AbbyyTestTask.Services
{
    public interface IAuthenticationService
    {
        //Task<string> Register(RegisterRequest request);
        //Task<string> Login(LoginRequest request);

         Task<User> Login(LoginRequest loginUser);
         Task<User> Register(User registerUser);
    }
}
