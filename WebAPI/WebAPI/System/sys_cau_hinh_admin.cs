using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.System
{
    public class sys_cau_hinh_admin
    {
        public int id { get; set; }
        public string title { get; set; }
        public string name_footer { get; set; }
        public string title_footer { get; set; }
        public int type_ { get; set; }
        public string image { get; set; }
        //public string create_by { get; set; }
        //public DateTime? create_date { get; set; }
        //public string update_by { get; set; }
        //public DateTime? update_date { get; set; }
        //public int? status_del { get; set; }
        public string note { get; set; }
    }
}
