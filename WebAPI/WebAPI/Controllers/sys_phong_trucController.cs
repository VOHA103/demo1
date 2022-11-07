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
    public class sys_phong_trucController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_phong_trucController(ApplicationDbContext _context) {
            this._context = _context;
        }
        [HttpPost("[action]")]
        public IActionResult DataHanlder([FromBody] filter_data_phong_truc filter)
        {
            var status_del = Int32.Parse(filter.status_del);
            var result = _context.sys_phong_truc
              .Select(d => new sys_phong_truc_model()
              {
                  db = d,
                  create_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
                  update_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
              })
              .Where(q => q.db.ten_phong_truc.Contains(filter.search) || filter.search == "")
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
        public IActionResult get_list_phong_truc()
        {
            var result = _context.sys_phong_truc.Select(q => new {
                id = q.id,
                name = q.ten_phong_truc,
            }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_phong_truc.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_phong_truc.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 2;
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult reven_status([FromQuery] string id)
        {
            var result = _context.sys_phong_truc.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_phong_truc.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var result = _context.sys_phong_truc
              .Select(d => new sys_phong_truc_model()
              {
                  db = d,
                  create_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
                  update_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
              }).ToList();
            return Ok(result);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] sys_phong_truc_model sys_phong_truc)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            try
            {
                var error = sys_phong_truc_part.check_error_insert_update(sys_phong_truc);
                if (error.Count() == 0)
                {
                    var model = _context.sys_phong_truc.Where(q => q.id == sys_phong_truc.db.id).SingleOrDefault();
                    model.update_date = DateTime.Now;
                    model.update_by = user_id;
                    model.ten_phong_truc = sys_phong_truc.db.ten_phong_truc;
                    model.so_phong = sys_phong_truc.db.so_phong;
                    model.note = sys_phong_truc.db.note;
                    model.status_del = 1;
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_phong_truc,
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
        public async Task<IActionResult> create([FromBody] sys_phong_truc_model sys_phong_truc)
        {
            try
            {

                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var error = sys_phong_truc_part.check_error_insert_update(sys_phong_truc);
                if (error.Count() == 0)
                {
                    sys_phong_truc.db.id = 0;
                    sys_phong_truc.db.update_date = DateTime.Now;
                    sys_phong_truc.db.create_date = DateTime.Now;
                    sys_phong_truc.db.create_by = user_id;
                    sys_phong_truc.db.update_by = user_id;
                    sys_phong_truc.db.status_del = 1;
                    _context.sys_phong_truc.Add(sys_phong_truc.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_phong_truc,
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
