using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
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
    public class AccountController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AccountController(ApplicationDbContext _context) {
            this._context = _context;    
        }
        /// <summary>
        /// Lấy danh sách khách hàng
        /// </summary>
        /// <returns> Lấy danh sách khách hàng</returns>
        [HttpGet("[action]")]
        public Accounts GetById([FromQuery] JObject json)
        {
            var id = json.GetValue("id").ToString();
            return _context.accounts.Where(a=>a.Id==int.Parse(id)).FirstOrDefault();
        }
        /// <summary>
        /// Lấy khách hàng với ID
        /// </summary>
        /// <returns>Lấy khách hàng với ID</returns>
        [HttpGet]
         public IEnumerable<Accounts> GetAll()
        {
            return _context.accounts.ToList();
        }
        /// <summary>
        /// Thêm khách hàng 
        /// </summary>
        /// <returns>Thêm khách hàng </returns>
        [HttpPost]
        public Accounts Post([FromQuery] Accounts accounts)
        {
            _context.accounts.Add(accounts);
            _context.SaveChanges();
            return accounts;
        }
    }
}
