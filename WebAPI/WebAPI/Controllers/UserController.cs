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
    public class UserController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext _context) {
            this._context = _context;    
        }
        [HttpGet("id")]
        public User GetById([FromQuery] JObject json)
        {
            var id = json.GetValue("id").ToString();
            return _context.Users.Where(a=>a.id==id).FirstOrDefault();
        }
        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var result = _context.Users
              .Select(d => new user_model()
              {
                  db = d,
              }).ToList();
            return Ok(result);
        }
        [HttpPost("create")]
        public User create([FromBody] User users)
        {
            _context.Users.Add(users);
            _context.SaveChanges();
            return users;
        }
        [HttpPost("users")]
        public async Task<IActionResult> Post([FromBody] User users)
        {
            _context.Users.Add(users);
            _context.SaveChanges();
            return Ok(users);
        }
    }
}
