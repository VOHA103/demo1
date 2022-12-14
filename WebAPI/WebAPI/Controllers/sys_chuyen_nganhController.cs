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
    public class sys_chuyen_nganhController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_chuyen_nganhController(ApplicationDbContext _context)
        {
            this._context = _context;
        }
        [HttpGet("[action]")]
        public IActionResult get_list_chuyen_nganh()
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
            var result = _context.sys_chuyen_nganh.Where(q=>q.status_del==1 && q.id_khoa==id_khoa).Select(q => new
            {
                id = q.id,
                name = q.ten_chuyen_nganh,
            }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_chuyen_nganh.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_chuyen_nganh.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 2;
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult reven_status([FromQuery] string id)
        {
            var result = _context.sys_chuyen_nganh.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_chuyen_nganh.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok(result);
        }
        [HttpPost("[action]")]
        public IActionResult DataHanlder([FromBody] filter_data_chuyen_nghanh filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
            var status_del = Int32.Parse(filter.status_del);
            var result = _context.sys_chuyen_nganh
              .Select(d => new sys_chuyen_nganh_model()
              {
                  db = d,
                  create_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  update_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
              })
              .Where(q => q.db.ten_chuyen_nganh.Contains(filter.search) || filter.search == "")
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
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] sys_chuyen_nganh_model sys_chuyen_nganh)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            try
            {
                var error = sys_chuyen_nganh_part.check_error_insert_update(sys_chuyen_nganh);
                var check = _context.sys_chuyen_nganh.Where(q => q.ten_chuyen_nganh == sys_chuyen_nganh.db.ten_chuyen_nganh && q.status_del == 1).SingleOrDefault();
                if (check != null && sys_chuyen_nganh.db.ten_chuyen_nganh != "")
                {
                    error.Add(set_error.set("db.ten_chuyen_nganh", "Chuyên nghành đã tồn tại"));
                }
                if (error.Count() == 0)
                {
                    var model = _context.sys_chuyen_nganh.Where(q => q.id == sys_chuyen_nganh.db.id).SingleOrDefault();
                    model.update_date = DateTime.Now;
                    model.update_by = user_id;
                    model.note = sys_chuyen_nganh.db.note;
                    model.ten_chuyen_nganh = sys_chuyen_nganh.db.ten_chuyen_nganh;
                    model.status_del = 1;
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_chuyen_nganh,
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
        public async Task<IActionResult> create([FromBody] sys_chuyen_nganh_model sys_chuyen_nganh)
        {
            try
            {

                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
                var error = sys_chuyen_nganh_part.check_error_insert_update(sys_chuyen_nganh);
                var check = _context.sys_chuyen_nganh.Where(q => q.ten_chuyen_nganh == sys_chuyen_nganh.db.ten_chuyen_nganh && q.status_del == 1 && q.id_khoa == id_khoa).SingleOrDefault();
                if (check != null && sys_chuyen_nganh.db.ten_chuyen_nganh != "")
                {
                    error.Add(set_error.set("db.ten_chuyen_nganh", "Chuyên nghành đã tồn tại"));
                }
                if (error.Count() == 0)
                {
                    sys_chuyen_nganh.db.id = 0;
                    sys_chuyen_nganh.db.update_date = DateTime.Now;
                    sys_chuyen_nganh.db.create_date = DateTime.Now;
                    sys_chuyen_nganh.db.create_by = user_id;
                    sys_chuyen_nganh.db.update_by = user_id;
                    sys_chuyen_nganh.db.id_khoa = id_khoa;
                    sys_chuyen_nganh.db.status_del = 1;
                    _context.sys_chuyen_nganh.Add(sys_chuyen_nganh.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_chuyen_nganh,
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
