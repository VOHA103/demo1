using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Model
{
    public class sys_common_model
    {
    }
    public class cell
    {

        public string value { get; set; }
    }
    public class row
    {
        public row()
        {
            list_cell = new List<cell>();
        }


        public string key { get; set; }
        public List<cell> list_cell { get; set; }
    }
}
