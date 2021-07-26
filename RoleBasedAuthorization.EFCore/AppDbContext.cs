using RoleBasedAuthorization.Core.Users;
using RoleBasedAuthorization.Core.Categories;
using RoleBasedAuthorization.Core.Products;
using Microsoft.EntityFrameworkCore;
using System;

namespace RoleBasedAuthorization.EFCore
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
