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
    public class sys_thong_baoController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_thong_baoController(ApplicationDbContext _context) {
            this._context = _context;
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_thong_bao.Find(id);
            _context.sys_thong_bao.Remove(result);
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var result = _context.sys_thong_bao
              .Select(d => new sys_thong_bao_model()
              {
                  db = d,
                  create_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  update_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
              }).ToList();
            return Ok(result);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] user_model users)
        {
            var model =await _context.sys_thong_bao.FindAsync(users.db.id);
            _context.SaveChanges();
            return Ok(users);
        }
        [HttpPost("create")]
        public async Task<IActionResult> create([FromBody] sys_thong_bao_model sys_thong_bao)
        {
            sys_thong_bao.db.id = 0;
            _context.sys_thong_bao.Add(sys_thong_bao.db);
           await _context.SaveChangesAsync();
            return Ok(sys_thong_bao);
        }
    }
}
