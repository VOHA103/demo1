using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Services.Interfaces
{
    interface IJwtAuthenticationManager
    {
       string Authenticate(string username, string password);
       string get_id_user_login();
    }
}
