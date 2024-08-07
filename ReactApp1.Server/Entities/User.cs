using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace AbbyyTestTask.Entities
{
    [Index(nameof(UserName), IsUnique = true)]
    public class User
    {
        [Key]
        public string UserName { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public Role? Roles { get; set; }
        public bool IsActive { get; set; }
        public string? Token { get; set; }
        public string? Password { get; set; }

       
    }
}
