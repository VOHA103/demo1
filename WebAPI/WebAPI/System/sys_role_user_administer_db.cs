using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.System
{
    [Table("sys_role_user_administer")]
    public class sys_role_user_administer_db
    {
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string id_role { get; set; }
        public string id_user { get; set; }
    }
}
