using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_role_user_administer_model
    {
        public sys_role_user_administer_model()
        {
            db = new sys_role_user_administer_db();
        }
        public sys_role_user_administer_db db { get; set; }
        public bool? check_role { get; set; }
    }
    public class role
    {
        public string link { get; set; }
        public string label { get; set; }
    }
}
