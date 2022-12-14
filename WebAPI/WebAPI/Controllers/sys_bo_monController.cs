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
    public class sys_bo_monController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_bo_monController(ApplicationDbContext _context)
        {
            this._context = _context;
        }
        [HttpPost("[action]")]
        public IActionResult DataHanlder([FromBody] filter_data_bo_mon filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
            var status_del = Int32.Parse(filter.status_del);
            var result = _context.sys_bo_mon
              .Select(d => new sys_bo_mon_model()
              {
                  db = d,
                  create_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  update_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
              })
              .Where(q => q.db.ten_bo_mon.Contains(filter.search) || filter.search == "")
              .Where(q => q.db.status_del == status_del)
              .Where(q => q.db.id_khoa == id_khoa)
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
        public IActionResult get_list_bo_mon()
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
            var result = _context.sys_bo_mon.Where(q=>q.status_del==1 && q.id_khoa==id_khoa).Select(q => new {
                id = q.id,
                name = q.ten_bo_mon,
            }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult get_list_bo_mon_khoa([FromQuery] int id_khoa)
        {
            var result = _context.sys_bo_mon.Where(q=>q.id_khoa==id_khoa).Select(q => new {
                id = q.id,
                name = q.ten_bo_mon,
            }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_bo_mon.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_khoa.Remove(result);

            //cập nhập trạng thái ngưng sử dụng
            result.status_del = 2;
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult reven_status([FromQuery] string id)
        {
            var result = _context.sys_bo_mon.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_khoa.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok(result);
        }

        [HttpGet("[action]")]
        public IActionResult get_id_id([FromQuery] string id, string id_2)
        {
            var result = _context.sys_bo_mon.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_khoa.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok(result);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] sys_bo_mon_model sys_bo_mon)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;


            try
            {
                var error = sys_bo_mon_part.check_error_insert_update(sys_bo_mon);
                var check_bo_mon = _context.sys_bo_mon.Where(q => q.ten_bo_mon == sys_bo_mon.db.ten_bo_mon && q.status_del == 1).SingleOrDefault();
                if (check_bo_mon != null && sys_bo_mon.db.ten_bo_mon != "")
                {
                    error.Add(set_error.set("db.ten_bo_mon", "Tên bộ môn đã tồn tại"));
                }
                if (error.Count() == 0)
                {
                    var model = _context.sys_bo_mon.Where(q => q.id == sys_bo_mon.db.id).SingleOrDefault();
                    model.update_date = DateTime.Now;
                    model.update_by = user_id;
                    model.note = sys_bo_mon.db.note;
                    model.ten_bo_mon = sys_bo_mon.db.ten_bo_mon;
                    model.status_del = 1;
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_bo_mon,
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
        public async Task<IActionResult> create([FromBody] sys_bo_mon_model sys_bo_mon)
        {
            try
            {
                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
                var error = sys_bo_mon_part.check_error_insert_update(sys_bo_mon);
                var check_bo_mon = _context.sys_bo_mon.Where(q => q.ten_bo_mon == sys_bo_mon.db.ten_bo_mon && q.status_del == 1 && q.id_khoa == id_khoa).SingleOrDefault();
                if (check_bo_mon != null && sys_bo_mon.db.ten_bo_mon!="")
                {
                    error.Add(set_error.set("db.ten_bo_mon", "Tên bộ môn đã tồn tại"));
                }
                if (error.Count() == 0)
                {
                    sys_bo_mon.db.id = 0;
                    sys_bo_mon.db.update_date = DateTime.Now;
                    sys_bo_mon.db.create_date = DateTime.Now;
                    sys_bo_mon.db.update_by = user_id;
                    sys_bo_mon.db.id_khoa = id_khoa;
                    sys_bo_mon.db.status_del = 1;
                    _context.sys_bo_mon.Add(sys_bo_mon.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_bo_mon,
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
