using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class user_model
    {
        public user_model()
        {
            db = new User();
        }
        public User db { get; set; }
    }
}
