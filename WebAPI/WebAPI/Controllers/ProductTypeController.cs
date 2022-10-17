using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Controllers
{
    [ApiController]
    [EnableCors("LeThanhThai")]
    [Route("[controller]")]
    public class ProductTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProductTypeController(ApplicationDbContext _context) {
            this._context = _context;    
        }
        /// <summary>
        /// Lấy danh sách khách hàng
        /// </summary>
        /// <returns> Lấy danh sách khách hàng</returns>
        [HttpGet("Id")]
        public ProductTypes Get([FromQuery] int id)
        {
            return _context.productTypes.Where(a => a.Id == id).FirstOrDefault();
        }
        /// <summary>
        /// Lấy khách hàng với ID
        /// </summary>
        /// <returns>Lấy khách hàng với ID</returns>
        [HttpGet]
         public IEnumerable<ProductTypes> Get()
        {
            return _context.productTypes.ToList();
        }
        /// <summary>
        /// Thêm khách hàng 
        /// </summary>
        /// <returns>Thêm khách hàng </returns>
        [HttpPost]
        public ProductTypes Post([FromQuery] ProductTypes productTypes)
        {
            _context.productTypes.Add(productTypes);
            _context.SaveChanges();
            return productTypes;
        }
    }
}
