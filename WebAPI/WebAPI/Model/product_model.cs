using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class product_model
    {
        public product_model()
        {
            db = new Products();
        }
        public Products db { get; set; }
        public string ten_loai_san_pham { get; set; }
        //public class product_ref_model{
        //    public string ten_loai_san_pham { get; set; }
        //    public string a { get; set; }
        //    public string b { get; set; }
        //}

    }
}
