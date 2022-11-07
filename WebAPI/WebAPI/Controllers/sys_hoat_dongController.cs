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
    public class sys_hoat_dongController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_hoat_dongController(ApplicationDbContext _context)
        {
            this._context = _context;
        }
        [HttpPost("[action]")]
        public IActionResult DataHanlder([FromBody] filter_data_cong_viec filter)
        {
            var status_del = Int32.Parse(filter.status_del);
            var result = _context.sys_cong_viec
              .Select(d => new sys_cong_viec_model()
              {
                  db = d,
                  create_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
                  update_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
              })
              .Where(q => q.db.ten_cong_viec.Contains(filter.search) || filter.search == "")
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
        public IActionResult get_list_hoat_dong()
        {
            var result = _context.sys_hoat_dong.Select(q => new
            {
                id = q.id,
                name = q.ten_hoat_dong,
            }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var result = _context.sys_hoat_dong
              .Select(d => new sys_hoat_dong_model()
              {
                  db = d,
                  create_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
                  update_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
              }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_hoat_dong.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_hoat_dong.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 2;
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult reven_status([FromQuery] string id)
        {
            var result = _context.sys_hoat_dong.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_hoat_dong.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok(result);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] sys_hoat_dong_model sys_hoat_dong)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;


            try
            {
                var error = sys_hoat_dong_part.check_error_insert_update(sys_hoat_dong);
                if (error.Count() == 0)
                {
                    var model = _context.sys_hoat_dong.Where(q => q.id == sys_hoat_dong.db.id).SingleOrDefault();
                    model.update_date = DateTime.Now;
                    model.update_by = sys_hoat_dong.db.update_by;
                    model.ten_hoat_dong = sys_hoat_dong.db.ten_hoat_dong;
                    model.status_del = 1;
                    model.note = sys_hoat_dong.db.note;
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_hoat_dong,
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
        public async Task<IActionResult> create([FromBody] sys_hoat_dong_model sys_hoat_dong)
        {
            try
            {

                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var error = sys_hoat_dong_part.check_error_insert_update(sys_hoat_dong);
                if (error.Count() == 0)
                {
                    sys_hoat_dong.db.id = 0;
                    sys_hoat_dong.db.update_date = DateTime.Now;
                    sys_hoat_dong.db.create_date = DateTime.Now;
                    sys_hoat_dong.db.create_by = user_id;
                    sys_hoat_dong.db.update_by = user_id;
                    sys_hoat_dong.db.status_del = 1;
                    _context.sys_hoat_dong.Add(sys_hoat_dong.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_hoat_dong,
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
