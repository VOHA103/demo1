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
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers
{
    [ApiController]
    [EnableCors("LeThanhThai")]
    [Route("[controller]")]
    public class sys_loai_cong_viecController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ApplicationSettings _appSettings;
        private readonly IUsersServices usersServices;
        private readonly string sys_loai_cong_viec;
        public sys_loai_cong_viecController(ApplicationDbContext _context,IOptions<ApplicationSettings> appSettings, IUsersServices usersServices) {
            this._context = _context;
            _appSettings = appSettings.Value;
            this.usersServices = usersServices;
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.Users.Find(id);
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
            string user_id= User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var model =await _context.Users.FindAsync(users.db.id);
            model.name = users.db.name;
            model.pass = users.db.pass;
            _context.SaveChanges();
            return Ok(users);
        }
        [HttpPost("create")]
        public async Task<IActionResult> create([FromBody] user_model users)
        {
            users.db.id = RandomExtension.getStringID();
            _context.Users.Add(users.db);
           await _context.SaveChangesAsync();
            return Ok(users);
        }
    }
}
