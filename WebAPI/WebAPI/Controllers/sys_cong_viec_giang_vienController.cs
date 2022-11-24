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
    public class sys_cong_viec_giang_vienController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_cong_viec_giang_vienController(ApplicationDbContext _context)
        {
            this._context = _context;
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> DataHanlderUser([FromBody] filter_data_cong_viec_giang_vien_user filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var result = _context.sys_cong_viec_giang_vien
              .Select(d => new sys_cong_viec_giang_vien_model()
              {
                  db = d,
                  create_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  update_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  ten_giang_vien = _context.sys_giang_vien.Where(q => q.id == d.id_giang_vien).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  ten_chuc_vu = _context.sys_chuc_vu.Where(q => q.id == _context.sys_giang_vien.Where(q => q.id == d.id_giang_vien).Select(q => q.id_chuc_vu).SingleOrDefault()).Select(q => q.ten_chuc_vu).SingleOrDefault(),
                  ten_khoa = _context.sys_khoa.Where(q => q.id == _context.sys_giang_vien.Where(q => q.id == d.id_giang_vien).Select(q => q.id_khoa).SingleOrDefault()).Select(q => q.ten_khoa).SingleOrDefault(),
                  ten_cong_viec = _context.sys_cong_viec.Where(q => q.id == d.id_cong_viec).Select(q => q.ten_cong_viec).SingleOrDefault(),
                  ten_loai_cong_viec = _context.sys_loai_cong_viec.Where(q => q.id == _context.sys_cong_viec.Where(q => q.id == d.id_cong_viec).Select(q => q.id_loai_cong_viec).SingleOrDefault()).Select(q => q.ten_loai_cong_viec).SingleOrDefault(),
              })
              .Where(q => q.db.status_del == filter.status_del)
              .Where(q => q.db.id_giang_vien == user_id)
              .Where(q => q.db.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "")
              .Where(q => q.ten_cong_viec.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || q.ten_giang_vien.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || filter.search == "")
              .ToList();
            result.ForEach(q =>
            {
                var time_work = _context.sys_cong_viec.Where(d => d.id == q.db.id_cong_viec).Select(q => q.ngay_bat_dau).SingleOrDefault();
                var time_now = DateTime.Now;
                //trang_thai => 1 đã xong 2 chưa thực hiện 3 đang thực hiện
                if (time_work > time_now)
                {
                    q.trang_thai = 2;
                }
                else if (time_now == time_work)
                {
                    q.trang_thai = 3;
                }
                else
                {
                    q.trang_thai = 1;
                }
            });
            var count = result.Count();
            var model = new
            {
                data = result,
                total = count,
            };
            return Ok(model);
        }
        [HttpPost("[action]")]
        public IActionResult get_thong_ke_cong_viec_nguoi_dung([FromBody] filter_thong_ke_user filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var result = _context.sys_cong_viec_giang_vien
                .Where(q => q.id_giang_vien == user_id)
               .GroupBy(q => new { q.id_cong_viec }).Select(q => new
               {
                   label = _context.sys_cong_viec.Where(d => d.id == q.Key.id_cong_viec).Select(q => q.ten_cong_viec).SingleOrDefault(),
                   y = _context.sys_cong_viec_giang_vien.Where(d => d.id_cong_viec == q.Key.id_cong_viec).Where(q => q.id_giang_vien == user_id).Sum(q => q.so_gio) ?? 0,
               }).ToList();
            return Ok(result);
        }
        [HttpPost("[action]")]
        public IActionResult get_thong_ke_cong_viec([FromBody] filter_thong_ke filter)
        {
            var result = _context.sys_cong_viec_giang_vien.Where(q => q.id_chuc_vu == filter.id_chuc_vu && q.id_khoa == filter.id_khoa)
                .Where(q=> q.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec=="")
               .GroupBy(q => new { q.id_giang_vien }).Select(q => new
               {
                   label = _context.sys_giang_vien.Where(d => d.id == q.Key.id_giang_vien).Select(q => q.ten_giang_vien).SingleOrDefault(),
                   y = _context.sys_cong_viec_giang_vien.Where(d => d.id_giang_vien == q.Key.id_giang_vien).Where(q => q.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "").Sum(q => q.so_gio) ?? 0,
               }).ToList();
            return Ok(result);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> DataHanlder([FromBody] filter_data_cong_viec_giang_vien filter)
        {
            var result = _context.sys_cong_viec_giang_vien
              .Select(d => new sys_cong_viec_giang_vien_model()
              {
                  db = d,
                  create_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  update_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  ten_giang_vien = _context.sys_giang_vien.Where(q => q.id == d.id_giang_vien).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  ten_chuc_vu = _context.sys_chuc_vu.Where(q => q.id == _context.sys_giang_vien.Where(q => q.id == d.id_giang_vien).Select(q => q.id_chuc_vu).SingleOrDefault()).Select(q => q.ten_chuc_vu).SingleOrDefault(),
                  ten_khoa = _context.sys_khoa.Where(q => q.id == _context.sys_giang_vien.Where(q => q.id == d.id_giang_vien).Select(q => q.id_khoa).SingleOrDefault()).Select(q => q.ten_khoa).SingleOrDefault(),
                  ten_cong_viec = _context.sys_cong_viec.Where(q => q.id == d.id_cong_viec).Select(q => q.ten_cong_viec).SingleOrDefault(),
                  ten_loai_cong_viec = _context.sys_loai_cong_viec.Where(q => q.id == _context.sys_cong_viec.Where(q => q.id == d.id_cong_viec).Select(q => q.id_loai_cong_viec).SingleOrDefault()).Select(q => q.ten_loai_cong_viec).SingleOrDefault(),
              })
              .Where(q => q.db.status_del == filter.status_del)
              .Where(q => q.db.id_giang_vien == filter.id_giang_vien || filter.id_giang_vien == "")
              .Where(q => q.db.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "")
              .Where(q => q.ten_cong_viec.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || q.ten_giang_vien.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || filter.search == "")
              .Where(q => q.db.id_chuc_vu == filter.id_chuc_vu || filter.id_chuc_vu == 0)
              .Where(q => q.db.id_khoa == filter.id_khoa || filter.id_khoa == 0)
              .ToList();
            result.ForEach(q =>
            {
                var time_work = _context.sys_cong_viec.Where(d => d.id == q.db.id_cong_viec).Select(q => q.ngay_bat_dau).SingleOrDefault();
                var time_now = DateTime.Now;
                //trang_thai => 1 đã xong 2 chưa thực hiện 3 đang thực hiện
                if (time_work > time_now)
                {
                    q.trang_thai = 2;
                }
                else if (time_now == time_work)
                {
                    q.trang_thai = 3;
                }
                else
                {
                    q.trang_thai = 1;
                }
            });
            var count = result.Count();
            var model = new
            {
                data = result,
                total = count,
            };
            return Ok(model);
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_cong_viec_giang_vien.Where(q => q.id == id).SingleOrDefault();
            result.status_del = 2;
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult reven_status([FromQuery] string id)
        {
            var result = _context.sys_cong_viec_giang_vien.Where(q => q.id == id).SingleOrDefault();
            result.status_del = 1;
            _context.SaveChanges();
            return Ok();
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] user_model sys_cong_viec_giang_vien)
        {
            try
            {
                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var model = await _context.sys_cong_viec_giang_vien.FindAsync(sys_cong_viec_giang_vien.db.id);

                _context.SaveChanges();
                return Ok(sys_cong_viec_giang_vien);
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpPost("create")]
        public async Task<IActionResult> create([FromBody] sys_cong_viec_giang_vien_model sys_cong_viec_giang_vien)
        {
            try
            {
                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var error = sys_cong_viec_giang_vien_part.check_error_insert_update(sys_cong_viec_giang_vien);
                if (error.Count() == 0)
                {
                    var work = _context.sys_cong_viec.Where(q => q.id == sys_cong_viec_giang_vien.db.id_cong_viec).SingleOrDefault();
                    var time_work = 0;
                    if (work.loai == 2)
                    {
                        time_work = work.so_gio / sys_cong_viec_giang_vien.list_giang_vien.Count() ?? 0;
                    }
                    sys_cong_viec_giang_vien.db.update_date = DateTime.Now;
                    sys_cong_viec_giang_vien.db.create_date = DateTime.Now;
                    sys_cong_viec_giang_vien.db.create_by = user_id;
                    sys_cong_viec_giang_vien.db.update_by = user_id;
                    sys_cong_viec_giang_vien.db.status_del = 1;
                    sys_cong_viec_giang_vien.db.so_gio = time_work;
                    var list_giang_vien = sys_cong_viec_giang_vien.list_giang_vien;
                    for (int i = 0; i < list_giang_vien.Count(); i++)
                    {
                        var id_giang_vien = list_giang_vien[i];
                        sys_cong_viec_giang_vien.db.id = get_id_primary_key();
                        sys_cong_viec_giang_vien.db.id_giang_vien = id_giang_vien;
                        var giang_vien = _context.sys_giang_vien.Where(q => q.id == id_giang_vien).Select(q => q.email).SingleOrDefault();
                        Mail.send_work(giang_vien, work.ten_cong_viec, work.ngay_bat_dau, work.gio_bat_dau, work.so_gio, work.note);
                        _context.sys_cong_viec_giang_vien.Add(sys_cong_viec_giang_vien.db);
                        _context.SaveChanges();
                    }
                }
                var result = new
                {
                    data = sys_cong_viec_giang_vien,
                    error = error,
                };
                return Ok(result);
            }
            catch (Exception)
            {

                throw;
            }
        }
        private string get_id_primary_key()
        {
            var id = "";
            var check_id = 0;
            do
            {
                id = RandomExtension.getStringID();
                check_id = _context.sys_cong_viec_giang_vien.Where(q => q.id == id).Count();
            } while (check_id != 0);
            return id;
        }
    }
}
