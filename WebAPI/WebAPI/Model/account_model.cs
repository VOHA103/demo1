using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class account_model
    {
        public account_model()
        {
            db = new Accounts();
        }
        public Accounts db { get; set; }
    }
}
