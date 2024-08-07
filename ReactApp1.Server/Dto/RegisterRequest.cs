using AbbyyTestTask.Entities;
using System.ComponentModel.DataAnnotations;

namespace AbbyyTestTask.Dto
{
    public class RegisterRequest
    {
        [Required]
        public string? userName { get; set; }
        [Required]
        public string password { get; set; }
        public Role Roles { get; set; }
        public string firstName { get; set; } = String.Empty;
        public string? lastName { get; set; }
    }
}
