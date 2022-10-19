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
using WebAPI.Support;

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
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.Users.Where(a => a.id == id).SingleOrDefault();
            _context.Users.Remove(result);
            _context.SaveChanges();
            return Ok();
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
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] user_model users)
        {
            var model = _context.Users.Where(q => q.id == users.db.id).SingleOrDefault();
            model.name = users.db.name;
            model.pass = users.db.pass;
            _context.SaveChanges();
            return Ok(users);
        }
        [HttpPost("create")]
        public User create([FromBody] User users)
        {
            _context.Users.Add(users);
            _context.SaveChanges();
            return users;
        }
        [HttpPost("users")]
        public async Task<IActionResult> Post([FromBody] user_model users)
        {
            users.db.id = RandomExtension.getStringID();
            _context.Users.Add(users.db);
            _context.SaveChanges();
            return Ok(users);
        }
    }
}
