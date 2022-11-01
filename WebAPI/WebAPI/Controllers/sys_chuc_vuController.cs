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
    public class sys_chuc_vuController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_chuc_vuController(ApplicationDbContext _context)
        {
            this._context = _context;
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_chuc_vu.Find(id);
            _context.sys_chuc_vu.Remove(result);
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var result = _context.sys_chuc_vu
              .Select(d => new sys_chuc_vu_model()
              {
                  db = d,
                  create_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
                  update_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
              }).ToList();
            return Ok(result);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] user_model sys_chuc_vu)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var model = await _context.sys_chuc_vu.FindAsync(sys_chuc_vu.db.id);
            _context.SaveChanges();
            return Ok(sys_chuc_vu);
        }
        [HttpPost("create")]
        public async Task<IActionResult> create([FromBody] sys_chuc_vu_model sys_chuc_vu)
        {
            sys_chuc_vu.db.id = 0;
            _context.sys_chuc_vu.Add(sys_chuc_vu.db);
            await _context.SaveChangesAsync();
            return Ok(sys_chuc_vu);
        }
    }
}
