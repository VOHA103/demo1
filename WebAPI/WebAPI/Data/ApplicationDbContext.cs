using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Data
{
    public partial class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<sys_bo_mon> sys_bo_mon { get; set; }
        public DbSet<sys_khoa> sys_khoa { get; set; }
        public DbSet<sys_loai_cong_viec> sys_loai_cong_viec { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
          : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
   
