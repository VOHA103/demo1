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

namespace WebAPI.Controllers
{
    [ApiController]
    [EnableCors("LeThanhThai")]
    [Route("[controller]")]
    public class UserController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ApplicationSettings _appSettings;
        public UserController(ApplicationDbContext _context, IOptions<ApplicationSettings> appSettings) {
            this._context = _context;
            _appSettings = appSettings.Value;
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
        [HttpPost("login")]
        public async Task<IActionResult> login( User users)
        {
            var model = _context.Users.Where(q => q.name == users.name).SingleOrDefault();

            if (model != null)
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",model.id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }
        [HttpGet("[action]")]
        [Authorize]
        public async Task<Object> get_profile_user()
        {
            string user_id = User.Claims.First(q => q.Type == "UserID").Value;
            var result = _context.Users.Where(q => q.id == user_id).SingleOrDefault();
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
