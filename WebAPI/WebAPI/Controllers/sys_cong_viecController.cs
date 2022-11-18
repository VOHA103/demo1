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
    public class sys_cong_viecController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_cong_viecController(ApplicationDbContext _context)
        {
            this._context = _context;
        }
        [HttpGet("[action]")]
        public IActionResult get_list_person_cong_viec()
        {
            var result = _context.sys_cong_viec.Select(q => new
            {
                id = q.id,
                ten_cong_viec = q.ten_cong_viec,
                ngay_bat_dau = q.ngay_bat_dau,
                gio_bat_dau = q.gio_bat_dau,
                so_gio = q.so_gio,
                note = q.note,
                status_del = q.status_del,
            }).ToList();
            return Ok(result);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> DataHanlder([FromBody] filter_data_cong_viec filter)
        {
            var result = _context.sys_cong_viec
              .Select(d => new sys_cong_viec_model()
              {
                  db = d,
                  create_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  update_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  ten_loai_cong_viec = _context.sys_loai_cong_viec.Where(q => q.id == d.id_loai_cong_viec).Select(q => q.ten_loai_cong_viec).SingleOrDefault(),
              })
              .Where(q => q.db.ten_cong_viec.Contains(filter.search) || filter.search == "")
              .Where(q => q.db.status_del == filter.status_del)
              .Where(q => q.db.id_loai_cong_viec == filter.id_loai_cong_viec|| filter.id_loai_cong_viec==-1)
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
        public async Task<IActionResult> get_list_cong_viec()
        {
            var result = _context.sys_cong_viec
              .OrderByDescending(q => q.update_date).Select(d => new
              {
                  id = d.id,
                  name = d.ten_cong_viec,
              }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> delete([FromQuery] string id)
        {
            var result = _context.sys_cong_viec.Where(q => q.id == id).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_cong_viec.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> reven_status([FromQuery] string id)
        {
            var result = _context.sys_cong_viec.Where(q => q.id == id).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_cong_viec.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok(result);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] sys_cong_viec_model sys_cong_viec)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            try
            {
                var error = sys_cong_viec_part.check_error_insert_update(sys_cong_viec);
                if (error.Count() == 0)
                {
                    var model = _context.sys_cong_viec.Where(q => q.id == sys_cong_viec.db.id).SingleOrDefault();
                    model.update_date = DateTime.Now;
                    model.update_by = user_id;
                    model.note = sys_cong_viec.db.note;
                    model.id_loai_cong_viec = sys_cong_viec.db.id_loai_cong_viec;
                    model.ten_cong_viec = sys_cong_viec.db.ten_cong_viec;
                    model.status_del = 1;
                    model.loai = sys_cong_viec.db.loai;
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_cong_viec,
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
        public async Task<IActionResult> create([FromBody] sys_cong_viec_model sys_cong_viec)
        {
            try
            {
                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var error = sys_cong_viec_part.check_error_insert_update(sys_cong_viec);
                if (error.Count() == 0)
                {
                    sys_cong_viec.db.id = get_id_primary_key();
                    sys_cong_viec.db.ngay_bat_dau = sys_cong_viec.db.ngay_bat_dau.Value.AddDays(1);
                    sys_cong_viec.db.update_date = DateTime.Now;
                    sys_cong_viec.db.create_date = DateTime.Now;
                    sys_cong_viec.db.gio_bat_dau = sys_cong_viec.gio + ":" + sys_cong_viec.phut;
                    sys_cong_viec.db.create_by = user_id;
                    sys_cong_viec.db.update_by = user_id;
                    sys_cong_viec.db.status_del = 1;
                    _context.sys_cong_viec.Add(sys_cong_viec.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_cong_viec,
                    error = error,
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }
        private string get_id_primary_key()
        {
            var id = "";
            var check_id = 0;
            do
            {
                id = RandomExtension.getStringID();
                check_id = _context.Users.Where(q => q.id == id).Count();
            } while (check_id != 0);
            return id;
        }
    }
}
