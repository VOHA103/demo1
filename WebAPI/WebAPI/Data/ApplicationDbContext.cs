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
        public DbSet<sys_loai_cong_viec> sys_loai_cong_viec { get; set; }
        public DbSet<sys_bo_mon> sys_bo_mon { get; set; }
        public DbSet<sys_khoa> sys_khoa { get; set; }
        public DbSet<sys_chuc_vu> sys_chuc_vu { get; set; }
        public DbSet<sys_hoat_dong> sys_hoat_dong { get; set; }
        public DbSet<sys_ky_truc_khoa> sys_ky_truc_khoa { get; set; }
        public DbSet<sys_phong_truc> sys_phong_truc { get; set; }
        public DbSet<sys_thong_bao> sys_thong_bao { get; set; }
        public DbSet<sys_cong_viec> sys_cong_viec { get; set; }
        public DbSet<sys_giang_vien> sys_giang_vien { get; set; }
        public DbSet<sys_cap_nhat_tt_giang_vien> sys_cap_nhat_tt_giang_vien { get; set; }
        public DbSet<sys_hoat_dong_giang_vien> sys_hoat_dong_giang_vien { get; set; }
        public DbSet<sys_bo_mon_giang_vien> sys_bo_mon_giang_vien { get; set; }
        public DbSet<sys_cong_viec_giang_vien> sys_cong_viec_giang_vien { get; set; }
        public DbSet<sys_giang_vien_truc_khoa> sys_giang_vien_truc_khoa { get; set; }

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
   
