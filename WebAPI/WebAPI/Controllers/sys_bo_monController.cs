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
    public class sys_bo_monController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly ApplicationSettings _appSettings;
        public sys_bo_monController(ApplicationDbContext _context, IOptions<ApplicationSettings> appSettings)
        {
            this._context = _context;
            _appSettings = appSettings.Value;
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_bo_mon.Find(id);
            _context.sys_bo_mon.Remove(result);
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var result = _context.sys_bo_mon
              .Select(d => new sys_bo_mon_model()
              {
                  db = d,
                  create_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
                  update_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
              }).ToList();
            return Ok(result);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] user_model sys_bo_mon)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var model = await _context.sys_bo_mon.FindAsync(sys_bo_mon.db.id);
            _context.SaveChanges();
            return Ok(sys_bo_mon);
        }
        [HttpPost("create")]
        public async Task<IActionResult> create([FromBody] sys_bo_mon_model sys_bo_mon)
        {
            sys_bo_mon.db.id = 0;
            _context.sys_bo_mon.Add(sys_bo_mon.db);
            await _context.SaveChangesAsync();
            return Ok(sys_bo_mon);
        }
    }
}
