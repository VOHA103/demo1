using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Model;
using WebAPI.Support;
using Microsoft.Extensions.Options;
using WebAPI.Part;
using ClosedXML.Excel;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using DocumentFormat.OpenXml.Spreadsheet;
using NPOI.SS.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.XSSF.UserModel;

namespace WebAPI.Controllers
{
    [ApiController]
    [EnableCors("LeThanhThai")]
    [Route("[controller]")]
    public class sys_cong_viec_giang_vienController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ApplicationSettings _appSettings;
        public sys_cong_viec_giang_vienController(ApplicationDbContext _context, IOptions<ApplicationSettings> appSettings)
        {
            this._context = _context;
            _appSettings = appSettings.Value;
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> DataHanlderGiangVien([FromBody] filter_data_bo_mon_CV filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var GV = _context.sys_giang_vien.Where(q => q.id == user_id).SingleOrDefault();
            DateTime now = DateTime.Now;
            var result = _context.sys_loai_cong_viec.Where(q => q.id_khoa == GV.id_khoa)
              .Select(d => new cong_viec_giang_vien_model()
              {
                  ten_loai_cong_viec = d.ten_loai_cong_viec,
                  list_cong_viec = _context.sys_cong_viec.Where(q => q.id_loai_cong_viec == d.id && GV.id_khoa == q.id_khoa).Select(q => new cong_viec_model()
                  {
                      ten_cong_viec = q.ten_cong_viec,
                      loai = q.loai,
                      so_gio_cv = q.so_gio,
                      so_gio = _context.sys_cong_viec_giang_vien.Where(d => d.id_cong_viec == q.id && d.ngay_bat_dau.Value.Year == now.Year && d.id_giang_vien == GV.id && d.id_khoa == GV.id_khoa).Sum(q => q.so_gio) ?? 0,
                  }).ToList()
              })
              .ToList();
            var count = result.Count();
            var model = _context.sys_cong_viec_giang_vien
              .Select(d => new sys_cong_viec_giang_vien_model()
              {
                  db = d,
              }).Where(d => d.db.ngay_bat_dau.Value.Year == now.Year && d.db.id_giang_vien == GV.id && d.db.id_khoa == GV.id_khoa && d.db.id_bo_mon == GV.id_bo_mon).ToList();
            var time_now = DateTime.Now;
            model.ForEach(q =>
            {
                //trang_thai => 1 đã xong 2 chưa thực hiện 3 đang thực hiện
                if (q.db.ngay_bat_dau < time_now && q.db.ngay_ket_thuc < time_now)
                    q.trang_thai = 1;
                if (q.db.ngay_bat_dau <= time_now && time_now <= q.db.ngay_ket_thuc)
                    q.trang_thai = 3;
                if (time_now < q.db.ngay_bat_dau)
                    q.trang_thai = 2;
            });
            var time_done = model.Where(q => q.trang_thai == 1).Sum(q => q.db.so_gio);
            var time_pending = model.Where(q => q.trang_thai == 3).Sum(q => q.db.so_gio);
            var time_wait = model.Where(q => q.trang_thai == 2).Sum(q => q.db.so_gio);
            var data = new
            {
                result = result,
                time_done = time_done,
                time_pending = time_pending,
                time_wait = time_wait,
            };
            return Ok(data);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> DataHanlderBo_mon([FromBody] filter_data_bo_mon_CV filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var GV = _context.sys_giang_vien.Where(q => q.id == user_id).SingleOrDefault();
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
                  id_loai_cong_viec = _context.sys_cong_viec.Where(q => q.id == d.id_cong_viec).Select(q => q.id_loai_cong_viec).SingleOrDefault(),
              })
              .Where(q => q.db.id_bo_mon == GV.id_bo_mon)
              .Where(q => q.db.id_khoa == GV.id_khoa)
              .Where(q => q.db.ngay_bat_dau >= filter.tu)
              .Where(q => q.db.ngay_ket_thuc <= filter.den)
              .Where(q => q.db.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "")
              .Where(q => q.id_loai_cong_viec == filter.id_loai_cong_viec || filter.id_loai_cong_viec == -1)
              .Where(q => q.ten_cong_viec.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || filter.search == "")
              .ToList();
            var time_now = DateTime.Now;
            var count = result.Count();
            result.ForEach(q =>
            {
                //trang_thai => 1 đã xong 2 chưa thực hiện 3 đang thực hiện
                if (q.db.ngay_bat_dau < time_now && q.db.ngay_ket_thuc < time_now)
                    q.trang_thai = 1;
                if (q.db.ngay_bat_dau <= time_now && time_now <= q.db.ngay_ket_thuc)
                    q.trang_thai = 3;
                if (time_now < q.db.ngay_bat_dau)
                    q.trang_thai = 2;
            });
            result = result.Where(q => q.trang_thai == filter.status_del || filter.status_del == -1)
              .ToList();
            count = result.Count();
            var model = new
            {
                data = result.OrderByDescending(q => q.db.ngay_bat_dau).ToList(),
                total = count,
            };
            return Ok(model);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> DataHanlderUser([FromBody] filter_data_cong_viec_giang_vien_user filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var GV = _context.sys_giang_vien.Where(q => q.id == user_id).SingleOrDefault();
            var result = _context.sys_cong_viec_giang_vien.Where(q => q.id_giang_vien == GV.id && q.id_khoa == GV.id_khoa)
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
              .Where(q => q.db.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "")
              .Where(q => q.ten_cong_viec.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || filter.search == "")
              .ToList();
            var time_now = DateTime.Now;
            result.ForEach(q =>
            {
                //trang_thai => 1 đã xong 2 chưa thực hiện 3 đang thực hiện
                if (q.db.ngay_bat_dau < time_now && q.db.ngay_ket_thuc < time_now)
                    q.trang_thai = 1;
                if (q.db.ngay_bat_dau <= time_now && time_now <= q.db.ngay_ket_thuc)
                    q.trang_thai = 3;
                if (time_now < q.db.ngay_bat_dau)
                    q.trang_thai = 2;
            });
            result = result.Where(q => q.trang_thai == filter.status_del || filter.status_del == -1)
              .Where(q => q.db.ngay_bat_dau >= filter.tu)
              .Where(q => q.db.ngay_ket_thuc <= filter.den)
              .ToList();
            var count = result.Count();
            var model = new
            {
                data = result.OrderByDescending(q => q.db.ngay_bat_dau).ToList(),
                total = count,
            };
            return Ok(model);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> get_thong_ke_cong_viec_nguoi_dung([FromBody] filter_thong_ke_user filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var result = _context.sys_cong_viec_giang_vien
                .Where(q => q.id_giang_vien == user_id)

                .Where(q => _context.sys_cong_viec.Where(d => d.id == q.id_cong_viec).Select(q => q.id_loai_cong_viec)
                .SingleOrDefault() == filter.id_loai_cong_viec || filter.id_loai_cong_viec == -1)

                .Where(q => q.ngay_bat_dau >= filter.tu)

                .Where(q => q.ngay_ket_thuc <= filter.den)

                .ToList();
            var count = result.Count();
            var list = result
           .GroupBy(q => q.id_cong_viec).Select(q => new
           {
               label = _context.sys_cong_viec.Where(d => d.id == q.Key).Select(q => q.ten_cong_viec).SingleOrDefault(),
               y = _context.sys_cong_viec_giang_vien.Where(d => d.id_cong_viec == q.Key && d.id_giang_vien == user_id).Sum(q => q.so_gio) ?? 0,
           }).ToList();
            return Ok(list);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> get_list_cong_viec_nguoi_dung([FromBody] filter_thong_ke_user filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var result = _context.sys_cong_viec_giang_vien
                .Where(q => q.id_giang_vien == user_id)

                .Where(q => _context.sys_cong_viec.Where(d => d.id == q.id_cong_viec).Select(q => q.id_loai_cong_viec)
                .SingleOrDefault() == filter.id_loai_cong_viec || filter.id_loai_cong_viec == -1)

                .Where(q => q.ngay_bat_dau >= filter.tu)

                .Where(q => q.ngay_ket_thuc <= filter.den).ToList();
            var count = result.Count();
            var list = result.Select(q => new
            {
                //giang_vien = _context.sys_giang_vien.Where(d => d.id == user_id).Select(q => q.ten_giang_vien).SingleOrDefault(),
                ten_cong_viec = _context.sys_cong_viec.Where(d => d.id == q.id_cong_viec).Select(q => q.ten_cong_viec).SingleOrDefault(),

                ten_loai_cong_viec = _context.sys_loai_cong_viec.Where(d => d.id == _context.sys_cong_viec.Where(d => d.id == q.id_cong_viec)
                .Select(q => q.id_loai_cong_viec).SingleOrDefault())
                .Select(q => q.ten_loai_cong_viec).SingleOrDefault(),

                so_gio = q.so_gio,

                ngay_bat_dau = q.ngay_bat_dau.Value.Date.ToString(),

                ngay_ket_thuc = q.ngay_ket_thuc.Value.Date.ToString(),
            });

            return Ok(list);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> get_thong_ke_cong_viec([FromBody] filter_thong_ke filter)
        {
            var result = _context.sys_cong_viec_giang_vien
                .Where(q => q.id_chuc_vu == filter.id_chuc_vu || filter.id_chuc_vu == -1)
                .Where(q => q.id_khoa == filter.id_khoa || filter.id_khoa == -1)
                .Where(q => q.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "")
                .Where(q => q.ngay_bat_dau >= filter.tu)
                .Where(q => q.ngay_ket_thuc <= filter.den)
               .GroupBy(q => new { q.id_giang_vien }).Select(q => new
               {
                   label = _context.sys_giang_vien.Where(d => d.id == q.Key.id_giang_vien).Select(q => q.ten_giang_vien).SingleOrDefault(),
                   y = _context.sys_cong_viec_giang_vien.Where(d => d.id_giang_vien == q.Key.id_giang_vien).Where(q => q.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "").Sum(q => q.so_gio) ?? 0,
               }).ToList();
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> get_thong_ke_cong_viec_admin([FromBody] filter_thong_ke filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
            var result = _context.sys_cong_viec_giang_vien.Select(d => new sys_cong_viec_giang_vien_model()
            {
                db = d,
            }).Where(q => q.db.id_chuc_vu == filter.id_chuc_vu || filter.id_chuc_vu == -1)
                .Where(q => q.db.id_khoa == filter.id_khoa || filter.id_khoa == -1)
                .Where(q => q.db.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "")
                .Where(q => q.db.ngay_bat_dau >= filter.tu)
                .Where(q => q.db.ngay_ket_thuc <= filter.den).ToList();

            var count = result.Count();
            result.ForEach(q =>
            {
                var cong_viec = _context.sys_cong_viec.Where(d => d.id == q.db.id_cong_viec).SingleOrDefault();
                var time_now = DateTime.Now;
                //trang_thai => 1 đã xong 2 chưa thực hiện 3 đang thực hiện
                if (cong_viec.ngay_bat_dau > time_now)
                {
                    q.trang_thai = 2;
                }
                else if (time_now > cong_viec.ngay_bat_dau && time_now < cong_viec.ngay_ket_thuc)
                {
                    q.trang_thai = 3;
                }
                else
                {
                    q.trang_thai = 1;
                }
            });

            result = result.Where(q => q.trang_thai == filter.status_del || filter.status_del == -1).ToList();
            count = result.Count();
            var list = result.GroupBy(q => q.db.id_giang_vien).Select(q => new
            {
                label = _context.sys_giang_vien.Where(d => d.id == q.Key).Select(q => q.ten_giang_vien).SingleOrDefault(),
                y = _context.sys_cong_viec_giang_vien.Where(d => d.id_giang_vien == q.Key).Where(q => q.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "").Sum(q => q.so_gio) ?? 0,
            }).ToList();
            return Ok(result);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> get_thong_ke_cong_viec_khoa([FromBody] filter_thong_ke filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
            var result = _context.sys_cong_viec_giang_vien
                .Where(q => q.id_chuc_vu == filter.id_chuc_vu || filter.id_chuc_vu == -1)
                .Where(q => q.id_khoa == id_khoa)
                .Where(q => q.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "")
                .Where(q => q.ngay_bat_dau >= filter.tu)
                .Where(q => q.ngay_ket_thuc <= filter.den)
               .GroupBy(q => new { q.id_giang_vien }).Select(q => new
               {
                   label = _context.sys_giang_vien.Where(d => d.id == q.Key.id_giang_vien).Select(q => q.ten_giang_vien).SingleOrDefault(),
                   y = _context.sys_cong_viec_giang_vien.Where(d => d.id_giang_vien == q.Key.id_giang_vien).Where(q => q.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "").Sum(q => q.so_gio) ?? 0,
               }).ToList();
            return Ok(result);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> DataHanlderAdmin([FromBody] filter_data_cong_viec_giang_vien filter)
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
              .Where(q => q.db.id_giang_vien == filter.id_giang_vien || filter.id_giang_vien == "")
              .Where(q => q.db.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "")
              .Where(q => q.ten_cong_viec.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || q.ten_giang_vien.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || filter.search == "")
              .Where(q => q.db.id_chuc_vu == filter.id_chuc_vu || filter.id_chuc_vu == -1)
              .Where(q => q.db.id_khoa == filter.id_khoa || filter.id_khoa == -1)
              .ToList();
            var time_now = DateTime.Now;
            result.ForEach(q =>
            {
                //trang_thai => 1 đã xong 2 chưa thực hiện 3 đang thực hiện
                if (q.db.ngay_bat_dau < time_now && q.db.ngay_ket_thuc < time_now)
                    q.trang_thai = 1;
                if (q.db.ngay_bat_dau <= time_now && time_now <= q.db.ngay_ket_thuc)
                    q.trang_thai = 3;
                if (time_now < q.db.ngay_bat_dau)
                    q.trang_thai = 2;
            });
            result = result.Where(q => q.trang_thai == filter.status_del || filter.status_del == -1).ToList();
            var count = result.Count();
            var model = new
            {
                data = result,
                total = count,
            };
            return Ok(model);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> get_list_cong_viec_admin([FromBody] filter_thong_ke filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var result = _context.sys_cong_viec_giang_vien
                .Where(q => q.id_chuc_vu == filter.id_chuc_vu || filter.id_chuc_vu == -1)
                .Where(q => q.id_khoa == filter.id_khoa || filter.id_khoa == -1)
                .Where(q => q.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "")
                .Where(q => q.ngay_bat_dau >= filter.tu)
                .Where(q => q.ngay_ket_thuc <= filter.den).ToList();
            var count = result.Count();
            var list = result.Select(q => new
            {
                giang_vien = _context.sys_giang_vien.Where(d => d.id == q.id_giang_vien).Select(q => q.ten_giang_vien).SingleOrDefault(),

                ten_cong_viec = _context.sys_cong_viec.Where(d => d.id == q.id_cong_viec).Select(q => q.ten_cong_viec).SingleOrDefault(),

                ten_loai_cong_viec = _context.sys_loai_cong_viec.Where(d => d.id == _context.sys_cong_viec.Where(d => d.id == q.id_cong_viec)
                .Select(q => q.id_loai_cong_viec).SingleOrDefault())
                .Select(q => q.ten_loai_cong_viec).SingleOrDefault(),

                so_gio = q.so_gio,

                ngay_bat_dau = q.ngay_bat_dau.Value.Date.ToString(),

                ngay_ket_thuc = q.ngay_ket_thuc.Value.Date.ToString(),
            });

            return Ok(list.OrderByDescending(q => q.ngay_bat_dau));
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> DataHanlder([FromBody] filter_cong_viec_giang_vien_khoa filter)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
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
                  id_loai_cong_viec = _context.sys_cong_viec.Where(q => q.id == d.id_cong_viec).Select(q => q.id_loai_cong_viec).SingleOrDefault(),
                  ten_loai_cong_viec = _context.sys_loai_cong_viec.Where(q => q.id == _context.sys_cong_viec.Where(q => q.id == d.id_cong_viec).Select(q => q.id_loai_cong_viec).SingleOrDefault()).Select(q => q.ten_loai_cong_viec).SingleOrDefault(),
              })
              .Where(q => q.db.id_giang_vien == filter.id_giang_vien || filter.id_giang_vien == "")
              .Where(q => q.db.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "")
              .Where(q => q.ten_cong_viec.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || q.ten_giang_vien.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || filter.search == "")
              .Where(q => q.db.id_bo_mon == filter.id_bo_mon || filter.id_bo_mon == -1)
              .Where(q => q.db.id_khoa == id_khoa)
              .Where(q => q.id_loai_cong_viec == filter.id_loai_cong_viec || filter.id_loai_cong_viec == -1)
              .ToList();
            var time_now = DateTime.Now;
            result.ForEach(q =>
            {
                //trang_thai => 1 đã xong 2 chưa thực hiện 3 đang thực hiện
                if (q.db.ngay_bat_dau < time_now && q.db.ngay_ket_thuc < time_now)
                    q.trang_thai = 1;
                if (q.db.ngay_bat_dau <= time_now && time_now <= q.db.ngay_ket_thuc)
                    q.trang_thai = 3;
                if (time_now < q.db.ngay_bat_dau)
                    q.trang_thai = 2;
            });
            result = result.Where(q => q.trang_thai == filter.status_del || filter.status_del == -1)
              .ToList();
            var count = result.Count();
            var model = new
            {
                data = result.OrderByDescending(q => q.db.ngay_bat_dau),
                total = count,
            };
            return Ok(model);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> delete([FromQuery] string id)
        {
            var result = _context.sys_cong_viec_giang_vien.Where(q => q.id == id).SingleOrDefault();
            result.status_del = 2;
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> reven_status([FromQuery] string id)
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
        [HttpPost("[action]")]
        public async Task<IActionResult> create_cong_viec_bo_mon([FromBody] sys_cong_viec_giang_vien_model data)
        {
            try
            {
                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var GV = _context.sys_giang_vien.Where(q => q.id == user_id).SingleOrDefault();
                var error = sys_cong_viec_giang_vien_part.check_error_insert_update_bo_mon_khoa(data);
                if (error.Count() == 0)
                {
                    var work = _context.sys_cong_viec.Where(q => q.id == data.db.id_cong_viec).Select(q => new sys_cong_viec_model
                    {
                        db = q,
                    }).SingleOrDefault();
                    var list_giang_vien = data.list_giang_vien;
                    if (data.check_all == -1)
                    {
                        list_giang_vien = _context.sys_giang_vien.Where(q => q.id_khoa == GV.id_khoa && q.id_bo_mon == GV.id_bo_mon).Select(q => q.id).ToList();
                    }
                    var time_work = 0;
                    if (work.db.loai == 2)
                    {
                        time_work = work.db.so_gio / list_giang_vien.Count() ?? 0;
                    }
                    data.db.update_date = DateTime.Now;
                    data.db.create_date = DateTime.Now;
                    data.db.ngay_bat_dau = data.db.ngay_bat_dau.Value.AddDays(1);
                    data.db.ngay_ket_thuc = data.db.ngay_bat_dau.Value.AddDays(1);
                    data.db.create_by = user_id;
                    data.db.update_by = user_id;
                    data.db.status_del = 1;
                    data.db.id_bo_mon = GV.id_bo_mon;
                    data.db.id_khoa = GV.id_khoa;
                    data.db.so_gio = time_work;
                    for (int i = 0; i < list_giang_vien.Count(); i++)
                    {
                        var id_giang_vien = list_giang_vien[i];
                        data.db.id = get_id_primary_key();
                        data.db.id_giang_vien = id_giang_vien;
                        var giang_vien = _context.sys_giang_vien.Where(q => q.id == id_giang_vien).Select(q => q.email).SingleOrDefault();
                        Mail.send_work(giang_vien, work, time_work);
                        _context.sys_cong_viec_giang_vien.Add(data.db);
                        _context.SaveChanges();
                    }
                }
                var result = new
                {
                    data = data,
                    error = error,
                };
                return Ok(result);
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpPost("create")]
        public async Task<IActionResult> create([FromBody] sys_cong_viec_giang_vien_model data)
        {
            try
            {
                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var GV = _context.sys_giang_vien.Where(q => q.id == user_id).SingleOrDefault();
                var error = sys_cong_viec_giang_vien_part.check_error_insert_update_bo_mon_khoa(data);
                if (error.Count() == 0)
                {
                    var work = _context.sys_cong_viec.Where(q => q.id == data.db.id_cong_viec).Select(q => new sys_cong_viec_model
                    {
                        db = q,
                    }).SingleOrDefault();
                    var list_giang_vien = data.list_giang_vien;
                    if (data.check_all == -1)
                    {
                        list_giang_vien = _context.sys_giang_vien.Where(q => q.id_khoa == GV.id_khoa && q.id_bo_mon == GV.id_bo_mon).Select(q => q.id).ToList();
                    }
                    var time_work = 0;
                    if (work.db.loai == 2)
                    {
                        time_work = work.db.so_gio / list_giang_vien.Count() ?? 0;
                    }
                    data.db.update_date = DateTime.Now;
                    data.db.create_date = DateTime.Now;
                    data.db.ngay_bat_dau = data.db.ngay_bat_dau.Value.AddDays(1);
                    data.db.ngay_ket_thuc = data.db.ngay_bat_dau.Value.AddDays(1);
                    data.db.create_by = user_id;
                    data.db.update_by = user_id;
                    data.db.status_del = 1;
                    data.db.id_bo_mon = data.db.id_bo_mon;
                    data.db.id_khoa = GV.id_khoa;
                    data.db.so_gio = time_work;
                    data.db.thoi_gian = data.gio+":"+data.phut;
                    for (int i = 0; i < list_giang_vien.Count(); i++)
                    {
                        var id_giang_vien = list_giang_vien[i];
                        data.db.id = get_id_primary_key();
                        data.db.id_giang_vien = id_giang_vien;
                        var giang_vien = _context.sys_giang_vien.Where(q => q.id == id_giang_vien).Select(q => q.email).SingleOrDefault();
                        Mail.send_work(giang_vien, work, time_work);
                        _context.sys_cong_viec_giang_vien.Add(data.db);
                        _context.SaveChanges();
                    }
                }
                var result = new
                {
                    data = data,
                    error = error,
                };
                return Ok(result);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> ImportFromExcel()
        {
            var error = "";
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var GV = _context.sys_giang_vien.Where(q => q.id == user_id).SingleOrDefault();
            IFormFile file = Request.Form.Files[0];

            string folderName = "import_excel";

            var currentpath = Directory.GetCurrentDirectory();

            string newPath = Path.Combine(currentpath, "file_upload", folderName);
            var tick = Guid.NewGuid();
            if (!Directory.Exists(newPath))

            {

                Directory.CreateDirectory(newPath);

            }

            var list_cell = new List<cell>();

            var list_row = new List<row>();
            if (file.Length > 0)

            {

                string sFileExtension = Path.GetExtension(file.FileName).ToLower();

                ISheet sheet;

                string fullPath = Path.Combine(newPath, tick + "." + file.FileName.Split(".").Last());

                try
                {
                    using (var stream = new FileStream(fullPath, FileMode.Create))

                    {

                        file.CopyTo(stream);

                        stream.Position = 0;

                        if (sFileExtension == ".xls")

                        {

                            HSSFWorkbook hssfwb = new HSSFWorkbook(stream); //This will read the Excel 97-2000 formats  

                            sheet = hssfwb.GetSheetAt(0); //get first sheet from workbook  

                        }

                        else

                        {

                            XSSFWorkbook hssfwb = new XSSFWorkbook(stream); //This will read 2007 Excel format  

                            sheet = hssfwb.GetSheetAt(0); //get first sheet from workbook   

                        }

                        IRow headerRow = sheet.GetRow(0); //Get Header Row

                        int cellCount = headerRow.LastCellNum;


                        for (int i = (sheet.FirstRowNum + 1); i <= sheet.LastRowNum; i++) //Read Excel File

                        {

                            IRow row = sheet.GetRow(i);

                            if (row == null) continue;

                            if (row.Cells.All(d => d.CellType == NPOI.SS.UserModel.CellType.Blank)) continue;

                            for (int j = row.FirstCellNum; j < cellCount; j++)

                            {

                                if (row.GetCell(j) != null)
                                {
                                    var cell = new cell();

                                    var value = row.GetCell(j).ToString();


                                    cell.value = value;
                                    list_cell.Add(cell);
                                }

                            }

                            var data_row = new row();


                            data_row.key = i.ToString();
                            data_row.list_cell = list_cell;
                            list_cell = new List<cell>();
                            list_row.Add(data_row);
                        }


                    }


                    for (int ct = 0; ct < list_row.Count(); ct++)
                    {
                        var fileImport = list_row[ct].list_cell.ToList();


                        var model = new sys_cong_viec_giang_vien_model();

                        var ten_cong_viec = (fileImport[0].value.ToString() ?? "").Trim();
                        var bo_mon = (fileImport[1].value.ToString() ?? "").Trim();
                        var ma_giang_vien = (fileImport[2].value.ToString() ?? "").Trim();
                        var ten_giang_vien = (fileImport[3].value.ToString() ?? "").Trim();
                        var ngay_bat_dau = (fileImport[4].value.ToString() ?? "").Trim();
                        var ngay_ket_thuc = (fileImport[5].value.ToString() ?? "").Trim();
                        var gio = (fileImport[6].value.ToString() ?? "").Trim();
                        var phut = (fileImport[7].value.ToString() ?? "").Trim();


                        if (String.IsNullOrEmpty(ten_cong_viec))
                        {
                            error += "Phải nhập công việc tại dòng" + (ct + 1) + "<br />";
                        }
                        else
                        {
                            var cong_viec = _context.sys_cong_viec.Where(q => q.ten_cong_viec.ToLower().Trim() == ten_cong_viec.ToLower().Trim() && q.id_khoa == GV.id_khoa).Select(q => q.id).SingleOrDefault();
                            if (cong_viec == null)
                            {

                                error += "Không có công việc tại dòng" + (ct + 1) + "<br />";
                            }
                            else
                                model.db.id_cong_viec = cong_viec;
                        }
                        if (String.IsNullOrEmpty(ma_giang_vien))
                        {
                            error += "Phải nhập giảng viên tại dòng" + (ct + 1) + "<br />";
                        }
                        else
                        {
                            var giang_vien = _context.sys_giang_vien.Where(q => q.ma_giang_vien.ToLower().Trim() == ma_giang_vien.ToLower().Trim()).Select(q => q.id).SingleOrDefault();
                            if (giang_vien == null)
                            {

                                error += "Không có giảng viên tại dòng" + (ct + 1) + "<br />";
                            }
                            else
                                model.db.id_giang_vien = giang_vien;
                        }
                        if (bo_mon == null || bo_mon == "")
                        {
                            error += "Phải nhập bộ môn tại dòng" + (ct + 1) + "<br />";
                        }
                        else
                        {
                            var id_bo_mon = _context.sys_bo_mon.Where(q => q.ten_bo_mon.ToLower().Trim().Equals(bo_mon.ToLower().Trim()) && q.id_khoa == GV.id_khoa).Select(q => q.id).SingleOrDefault();
                            if (id_bo_mon != 0)
                            {
                                model.db.id_bo_mon = id_bo_mon;
                            }   
                            else
                            {
                                error += "Không có bộ môn tại dòng" + (ct + 1) + "<br />";
                            }
                        }
                        if (!string.IsNullOrEmpty(error))
                        {

                        }
                        else
                        {
                            model.db.create_date = DateTime.Now;
                            model.db.update_date = DateTime.Now;
                            model.db.create_by = user_id;
                            model.db.update_by = user_id;
                            model.db.id = get_id_primary_key();
                            model.db.status_del = 1;
                            model.db.id_khoa = GV.id_khoa;
                            model.db.thoi_gian = gio+":"+phut;
                            model.db.ngay_bat_dau = DateTime.Parse(ngay_bat_dau);
                            model.db.ngay_ket_thuc = DateTime.Parse(ngay_ket_thuc);
                            _context.sys_cong_viec_giang_vien.Add(model.db);
                            _context.SaveChanges();

                        }


                    }
                    return Ok(error);
                }
                catch
                {
                    return Ok("File không đúng định dạng");
                }


            }
            else
            {
                return Ok("File không đúng định dạng");

            }

        }
        private string CheckErrorImport(sys_giang_vien_model model, int ct, string error)
        {

            if (String.IsNullOrEmpty(model.db.ten_giang_vien))
            {
                error += "Phải nhập tên giảng viên tại dòng" + (ct + 1) + "<br />";
            }
            if (model.db.gioi_tinh == null)
            {
                error += "Phải nhập giới tính tại dòng" + (ct + 1) + "<br />";
            }

            return error;
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> ExportExcel([FromBody] filter_data_cong_viec_giang_vien_user filter)
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
          .Where(q => q.db.id_cong_viec == filter.id_cong_viec || filter.id_cong_viec == "")
          .Where(q => q.ten_cong_viec.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || q.ten_giang_vien.Trim().ToLower().Contains(filter.search.Trim().ToLower()) || filter.search == "")
          .ToList();
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Works");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "";
                worksheet.Cell(currentRow, 2).Value = "Trường đại học Công Nghiệp Thực Phẩm Thành phố Hồ Chí Minh";
                currentRow++;
                worksheet.Cell(currentRow, 1).Value = "Công việc";
                worksheet.Cell(currentRow, 2).Value = "Giảng viên";
                //worksheet.Cell(currentRow, 3).Value = "Người tạo";
                //worksheet.Cell(currentRow, 4).Value = "Ngày tạo";
                foreach (var item in result)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = item.ten_cong_viec;
                    worksheet.Cell(currentRow, 2).Value = item.ten_giang_vien;
                    //worksheet.Cell(currentRow, 3).Value = item.create_name;
                    //worksheet.Cell(currentRow, 4).Value = item.create_day;

                }
                currentRow++;
                worksheet.Cell(currentRow, 1).Value = "Tổng cộng";
                worksheet.Cell(currentRow, 2).Value = "320 giờ";
                using (var stream = new MemoryStream())
                {

                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    string fileName = "works.xlsx";
                    return File(content, contentType, fileName);
                }
            }
            return Ok("Lỗi");
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
