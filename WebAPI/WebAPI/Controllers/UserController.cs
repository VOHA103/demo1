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
using WebAPI.Part;
using WebAPI.Support;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [ApiController]
    [EnableCors("LeThanhThai")]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ApplicationSettings _appSettings;
        private readonly IUsersServices usersServices;
        public UserController(ApplicationDbContext _context, IOptions<ApplicationSettings> appSettings, IUsersServices usersServices)
        {
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
            var model = _context.Users
              .Select(d => new user_model()
              {
                  db = d,
              }).ToList();
            return Ok(model);
        }
        [HttpPost("DataHandel")]
        public IActionResult DataHandel([FromBody] filter_datahandler filter)
        {
            var search = filter.search;
            var model = _context.Users
              .Select(d => new user_model()
              {
                  db = d,
              }).ToList();
            return Ok(model);
        }
        [HttpPost("login")]
        public async Task<IActionResult> login(User users)
        {
            var model = _context.Users.SingleOrDefault(q => q.name == users.name);

            if (model != null)
            {
                string token = GenerateToken(model);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }

        private string GenerateToken(User model)
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
            return token;
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IActionResult> get_profile_user()
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var user = await usersServices.GetUserAsync(user_id);
            return Ok(user);
        }
        [HttpGet("[action]")]
        [Authorize]
        public async Task<IActionResult> get_id_user()
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            return Ok(user_id);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] user_model users)
        {
            try
            {
                var error = user_part.check_error_insert_update(users);
                if (error == null)
                {
                    var model = await _context.Users.FindAsync(users.db.id);
                    model.name = users.db.name;
                    model.pass = users.db.pass;
                    _context.SaveChanges();
                }
                var result = new
                {
                    data = users,
                    error = error,
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }
        [HttpPost("create")]
        public async Task<IActionResult> create([FromBody] user_model users)
        {
            try
            {
                var error = user_part.check_error_insert_update(users);
                if (error.Count() == 0)
                {
                    users.db.id = get_id_primary_key();
                    _context.Users.Add(users.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = users,
                    error = error,
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }
        private string get_id_primary_key() {
            var id = "";
            var check_id = 0;
            do
            {
                id = RandomExtension.getStringID();
                check_id = _context.Users.Where(q => q.id == id).Count();
            } while (check_id!=0);
            return id;
        }
    }
}
