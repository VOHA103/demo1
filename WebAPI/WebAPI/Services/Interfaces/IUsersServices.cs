using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Services.Interfaces
{
    public interface IUsersServices
    {
        Task<User> GetUserAsync(string Id);
    }
}
