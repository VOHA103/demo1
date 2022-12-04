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
using System.Text.RegularExpressions;
using System.IO;

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
        public IActionResult get_list_cong_viec_khoa([FromQuery] int id_khoa)
        {
            var result = _context.sys_cong_viec.Where(q => q.id_khoa == id_khoa).Select(q => new
            {
                id = q.id.ToString(),
                name = q.ten_cong_viec,
            }).ToList();
            return Ok(result);
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
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
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
              .Where(q => q.db.id_khoa == id_khoa)
              .Where(q => q.db.id_loai_cong_viec == filter.id_loai_cong_viec || filter.id_loai_cong_viec == -1)
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
            result.status_del = 2;
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
                    model.ngay_bat_dau = sys_cong_viec.db.ngay_bat_dau.Value.AddDays(1);
                    model.ngay_ket_thuc = sys_cong_viec.db.ngay_ket_thuc.Value.AddDays(1);
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
                var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
                var error = sys_cong_viec_part.check_error_insert_update(sys_cong_viec);
                if (error.Count() == 0)
                {
                    sys_cong_viec.db.id = get_id_primary_key_cong_viec();
                    sys_cong_viec.db.gio_bat_dau = sys_cong_viec.gio + ":" + sys_cong_viec.phut;
                    sys_cong_viec.db.status_del = 1;
                    sys_cong_viec.db.id_khoa = id_khoa;
                    sys_cong_viec.db.create_by = user_id;
                    sys_cong_viec.db.create_date = DateTime.Now;
                    var time_work = 0;
                    if (sys_cong_viec.db.loai == 2)
                    {
                        time_work = sys_cong_viec.db.so_gio / sys_cong_viec.list_giang_vien.Count() ?? 0;
                    }
                    else
                    {
                        time_work = sys_cong_viec.db.so_gio ?? 0;
                    }

                    get_list_giang_vien(sys_cong_viec, time_work);

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
        private void get_list_giang_vien(sys_cong_viec_model model, int time_work)
        {
            var cong_viec_giang_vien = new sys_cong_viec_giang_vien_model();
            if (model.id_bo_mon == -1)
            {
                var list_giang_vien = _context.sys_giang_vien.Where(q => q.id_khoa == model.id_khoa).Select(q => q.id).ToList();
                foreach (var item in list_giang_vien)
                {
                    insert_cong_viec_giang_vien(model, item, time_work);
                }
            }
            else
            {
                foreach (var item in model.list_giang_vien)
                {
                    insert_cong_viec_giang_vien(model, item, time_work);
                }
            }

        }
        private void insert_cong_viec_giang_vien(sys_cong_viec_model model, string id_giang_vien, int time_work)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var cong_viec_giang_vien = new sys_cong_viec_giang_vien_model();
            cong_viec_giang_vien.db.id = get_id_primary_key_cong_viec_gv();
            cong_viec_giang_vien.db.id_cong_viec = model.db.id;
            cong_viec_giang_vien.db.id_khoa = model.id_khoa;
            cong_viec_giang_vien.db.ngay_bat_dau = model.db.ngay_bat_dau;
            cong_viec_giang_vien.db.ngay_ket_thuc = model.db.ngay_ket_thuc;
            cong_viec_giang_vien.db.update_date = DateTime.Now;
            cong_viec_giang_vien.db.create_date = DateTime.Now;
            cong_viec_giang_vien.db.create_by = user_id;
            cong_viec_giang_vien.db.update_by = user_id;
            cong_viec_giang_vien.db.status_del = 1;
            cong_viec_giang_vien.db.so_gio = time_work;
            var giang_vien = _context.sys_giang_vien.Where(q => q.id == id_giang_vien).Select(q => q.email).SingleOrDefault();
            _context.sys_cong_viec_giang_vien.Add(cong_viec_giang_vien.db);
            _context.SaveChangesAsync();
            Mail.send_work(giang_vien, model);
        }
        private string get_id_primary_key_cong_viec()
        {
            var id = "";
            var check_id = 0;
            do
            {
                id = RandomExtension.getStringID();
                check_id = _context.sys_cong_viec.Where(q => q.id == id).Count();
            } while (check_id != 0);
            return id;
        }
        private string get_id_primary_key_cong_viec_gv()
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
