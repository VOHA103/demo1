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
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    [EnableCors("LeThanhThai")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProductController(ApplicationDbContext _context) {
            this._context = _context;    
        }
        [HttpGet("Id")]
        public Products Get([FromQuery] int id)
        {
            return _context.products.Where(a => a.Id == id).FirstOrDefault();
        }
        [HttpGet("[action]")]
        public Products FindAllById([FromQuery] int id)
        {
            return _context.products.Where(a => a.Id == id).FirstOrDefault();
        }
        [HttpGet("[action]")]
        public IActionResult FindAll()
        {
            var result = _context.products
                .Select(d => new product_model() {
                    db = d,
                    ten_loai_san_pham = _context.productTypes.Where(x => x.Id == d.ProductTypeId).Select(d => d.Name).FirstOrDefault()
                }).ToList();
            return Ok(result);
        }
        [HttpPost]
        public Products Post([FromQuery] Products products)
        {
            _context.products.Add(products);
            _context.SaveChanges();
            return products;
        }
    }
}
