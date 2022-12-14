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
    public class sys_chuc_vuController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_chuc_vuController(ApplicationDbContext _context)
        {
            this._context = _context;
        }
        [HttpPost("[action]")]
        public IActionResult DataHanlder([FromBody] filter_data_chuc_vu filter)
        {
            var status_del = Int32.Parse(filter.status_del);
            var result = _context.sys_chuc_vu
              .Select(d => new sys_chuc_vu_model()
              {
                  db = d,
                  create_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  update_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
              })
              .Where(q => q.db.ten_chuc_vu.Contains(filter.search) || filter.search == "")
              .Where(q => q.db.status_del == status_del)
              .ToList();
            result = result.OrderByDescending(q => q.db.update_date).ToList();
            var model = new
            {
                data = result,
                total = result.Count(),
            };
            return Ok(model);
        }
        [HttpGet("[action]")]
        public IActionResult get_list_chuc_vu()
        {
            var result = _context.sys_chuc_vu
                .Where(q => q.status_del == 1)
                .Select(q => new
                {
                    id = q.id,
                    name = q.ten_chuc_vu,
                }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult get_list_chuc_vu_change()
        {
            var result = _context.sys_chuc_vu
                .Where(q => q.status_del == 1)
                .Where(q => q.code != "admin")
                .Select(q => new
                {
                    id = q.id,
                    name = q.ten_chuc_vu,
                }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_chuc_vu.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_khoa.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 2;
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult reven_status([FromQuery] string id)
        {
            var result = _context.sys_chuc_vu.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_khoa.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok(result);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] sys_chuc_vu_model sys_chuc_vu)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            try
            {
                var error = sys_chuc_vu_part.check_error_insert_update(sys_chuc_vu);
                var check_chuc_vu = _context.sys_chuc_vu.Where(q => q.ten_chuc_vu == sys_chuc_vu.db.ten_chuc_vu && q.status_del == 1).SingleOrDefault();
                if (check_chuc_vu != null && sys_chuc_vu.db.ten_chuc_vu != "")
                {
                    error.Add(set_error.set("db.ten_chuc_vu", "Chức vụ đã tồn tại"));
                }
                if (error.Count() == 0)
                {
                    var model = _context.sys_chuc_vu.Where(q => q.id == sys_chuc_vu.db.id).SingleOrDefault();
                    model.update_date = DateTime.Now;
                    model.update_by = user_id;
                    model.note = sys_chuc_vu.db.note;
                    model.ten_chuc_vu = sys_chuc_vu.db.ten_chuc_vu;
                    model.status_del = 1;
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_chuc_vu,
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
        public async Task<IActionResult> create([FromBody] sys_chuc_vu_model sys_chuc_vu)
        {
            try
            {

                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var error = sys_chuc_vu_part.check_error_insert_update(sys_chuc_vu);
                var check_chuc_vu = _context.sys_chuc_vu.Where(q => q.ten_chuc_vu == sys_chuc_vu.db.ten_chuc_vu && q.status_del == 1).SingleOrDefault();
                if (check_chuc_vu != null && sys_chuc_vu.db.ten_chuc_vu != "" && check_chuc_vu.id!=sys_chuc_vu.db.id)
                {
                    error.Add(set_error.set("db.ten_chuc_vu", "Chức vụ đã tồn tại"));
                }
                if (error.Count() == 0)
                {
                    sys_chuc_vu.db.id = 0;
                    sys_chuc_vu.db.update_date = DateTime.Now;
                    sys_chuc_vu.db.create_date = DateTime.Now;
                    sys_chuc_vu.db.create_by = user_id;
                    sys_chuc_vu.db.update_by = user_id;
                    sys_chuc_vu.db.status_del = 1;
                    _context.sys_chuc_vu.Add(sys_chuc_vu.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_chuc_vu,
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
