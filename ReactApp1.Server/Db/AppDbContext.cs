using AbbyyTestTask.Entities;
using Microsoft.EntityFrameworkCore;

namespace AbbyyTestTask.Db
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<User>? Users { get; set; } = null;

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<User>()
        //        .Property(u => u.Roles)
        //        .HasConversion(
        //            u => string.Join(',', u),
        //            u => u.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()));
        //}
    }
}
