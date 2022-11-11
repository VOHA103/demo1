using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Model;
using WebAPI.Services.Interfaces;
using WebAPI.System;

namespace WebAPI.Services
{
    public class UsersServices : IUsersServices
    {
        private readonly ApplicationDbContext _db;
        public UsersServices(ApplicationDbContext db)
        {
            this._db = db;
        }

        public Task<string> GetProfileUser(string Id)
        {
            throw new NotImplementedException();
        }

        public async Task<sys_giang_vien> GetUserAsync(string Id)
        {
            var user =await _db.sys_giang_vien.FindAsync(Id);
            return user;
        }
    }
}
