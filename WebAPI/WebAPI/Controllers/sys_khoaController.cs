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
using WebAPI.Part;

namespace WebAPI.Controllers
{
    [ApiController]
    [EnableCors("LeThanhThai")]
    [Route("[controller]")]
    public class sys_khoaController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_khoaController(ApplicationDbContext _context) {
            this._context = _context;
        }
        [HttpGet("[action]")]
        public IActionResult get_list_khoa()
        {
            var result = _context.sys_khoa.Select(q => new {
                id = q.id,
                name = q.ten_khoa,
            }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_khoa.Where(q=>q.id==Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_khoa.Remove(result);

            //cập nhập trạng thái ngưng sử dụng
            result.status_del = 2;
            _context.SaveChanges();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult reven_status([FromQuery] string id)
        {
            var result = _context.sys_khoa.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_khoa.Remove(result);

            //cập nhập trạng thái ngưng sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var result = _context.sys_khoa
              .Select(d => new sys_khoa_model()
              {
                  db = d,
                  create_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
                  update_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
              }).ToList();
            return Ok(result);
        }
        [HttpPost("[action]")]
        public IActionResult DataHanlder([FromBody] filter_data_khoa filter)
        {
            var status_del = Int32.Parse(filter.status_del);
            var result = _context.sys_khoa
              .Select(d => new sys_khoa_model()
              {
                  db = d,
                  create_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
                  update_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
              })
              .Where(q=>q.db.ten_khoa.Contains(filter.search) || filter.search=="")
              .Where(q=>q.db.status_del== status_del)
              .ToList();
            result = result.OrderBy(q => q.db.update_date).ToList();
            return Ok(result);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] sys_khoa_model sys_khoa)
        {
            try
            {
                var error = sys_khoa_part.check_error_insert_update(sys_khoa);
                if (error.Count() == 0)
                {
                    var model = _context.sys_khoa.Where(q => q.id == sys_khoa.db.id).SingleOrDefault();
                    model.update_date = DateTime.Now;
                    model.update_by = sys_khoa.db.update_by;
                    model.note = sys_khoa.db.note;
                    model.ten_khoa = sys_khoa.db.ten_khoa;
                    model.status_del = 1;
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_khoa,
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
        public async Task<IActionResult> create([FromBody] sys_khoa_model sys_khoa)
        {
            try
            {
                var error = sys_khoa_part.check_error_insert_update(sys_khoa);
                if (error.Count() == 0)
                {
                    sys_khoa.db.id =0;
                    sys_khoa.db.update_date = DateTime.Now;
                    sys_khoa.db.create_date = DateTime.Now;
                    sys_khoa.db.update_by = sys_khoa.db.create_by;
                    sys_khoa.db.status_del = 1;
                    _context.sys_khoa.Add(sys_khoa.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_khoa,
                    error = error,
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }
    }
}
