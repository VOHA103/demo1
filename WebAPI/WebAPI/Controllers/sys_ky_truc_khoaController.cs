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
    public class sys_ky_truc_khoaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_ky_truc_khoaController(ApplicationDbContext _context)
        {
            this._context = _context;
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_ky_truc_khoas.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_ky_truc_khoa.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 2;
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult get_list_ky_truc_khoa()
        {
            var result = _context.sys_ky_truc_khoas.Select(q => new
            {
                id = q.id,
                name = q.ten_ky,
                starttime = q.thoi_gian_bat_dau,
                endtime = q.thoi_gian_ket_thuc,
            }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var result = _context.sys_ky_truc_khoas
              .Select(d => new sys_ky_truc_khoa_model()
              {
                  db = d,
                  create_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
                  update_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
              }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult reven_status([FromQuery] string id)
        {
            var result = _context.sys_ky_truc_khoas.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_ky_truc_khoa.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok(result);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] sys_ky_truc_khoa_model sys_ky_truc_khoa)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            try
            {
                var error = sys_ky_truc_khoa_part.check_error_insert_update(sys_ky_truc_khoa);
                if (error.Count() == 0)
                {
                    var model = _context.sys_ky_truc_khoas.Where(q => q.id == sys_ky_truc_khoa.db.id).SingleOrDefault();
                    model.update_date = DateTime.Now;
                    model.update_by = user_id;
                    model.ten_ky = sys_ky_truc_khoa.db.ten_ky;
                    model.thoi_gian_bat_dau = sys_ky_truc_khoa.db.thoi_gian_bat_dau;
                    model.thoi_gian_ket_thuc = sys_ky_truc_khoa.db.thoi_gian_ket_thuc;
                    model.status_del = 1;
                    model.note = sys_ky_truc_khoa.db.note;

                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_ky_truc_khoa,
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
        public async Task<IActionResult> create([FromBody] sys_ky_truc_khoa_model sys_ky_truc_khoa)
        {
            try
            {

                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var error = sys_ky_truc_khoa_part.check_error_insert_update(sys_ky_truc_khoa);
                if (error.Count() == 0)
                {
                    sys_ky_truc_khoa.db.id = 0;
                    sys_ky_truc_khoa.db.update_date = DateTime.Now;
                    sys_ky_truc_khoa.db.create_date = DateTime.Now;
                    sys_ky_truc_khoa.db.create_by = user_id;
                    sys_ky_truc_khoa.db.update_by = user_id;
                    sys_ky_truc_khoa.db.status_del = 1;
                    _context.sys_ky_truc_khoas.Add(sys_ky_truc_khoa.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_ky_truc_khoa,
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
