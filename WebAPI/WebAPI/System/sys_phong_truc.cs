using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.System
{
    public class sys_phong_truc
    {
        public int id { get; set; }
        public string ten_phong_truc { get; set; }
        public string so_phong { get; set; }
        public string create_by { get; set; }
        public DateTime? create_date { get; set; }
        public string update_by { get; set; }

        public DateTime? update_date { get; set; }
        public int? status_del { get; set; }
        public string note { get; set; }
    }
}
