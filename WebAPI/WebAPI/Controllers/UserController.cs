﻿using Microsoft.AspNetCore.Cors;
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
    public class UserController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ApplicationSettings _appSettings;
        private readonly IUsersServices usersServices;
        public UserController(ApplicationDbContext _context, IOptions<ApplicationSettings> appSettings, IUsersServices usersServices) {
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
        [HttpPost("login")]
        public async Task<IActionResult> login( User users)
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

            //hàm này sau khi login thì t get api user á
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var user =await usersServices.GetUserAsync(user_id);
            return Ok(user);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] user_model users)
        {
            var model =await _context.Users.FindAsync(users.db.id);
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
           await _context.SaveChangesAsync();
            return Ok(users);
        }
    }
}
