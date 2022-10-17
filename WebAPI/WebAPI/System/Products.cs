using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.System
{
    public class Products
    {
        public int Id { get; set; }
        public string Productname { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public int ProductTypeId { get; set; }
        public string SKU { get; set; }
        public int Stock { get; set; }
        public string Color { get; set; }
        public int Size { get; set; }
        //public double PriceOld { get; set; }
        //public int PriceSale { get; set; }
        public bool Status { get; set; }
        //public bool IsHot { get; set; }
        //public bool IsNew { get; set; }
        //public bool IsSale { get; set; }
    }
}
