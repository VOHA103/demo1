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
using System.IO;
using System.Net.Http.Headers;

namespace WebAPI.Controllers
{
    [ApiController]
    [EnableCors("LeThanhThai")]
    [Route("[controller]")]
    public class sys_cau_hinh_adminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_cau_hinh_adminController(ApplicationDbContext _context)
        {
            this._context = _context;
        }
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("UploadedFiles", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [HttpPost("[action]")]
        public IActionResult DataHanlder([FromBody] filter_data_bo_mon filter)
        {
            var status_del = Int32.Parse(filter.status_del);
            var result = _context.sys_cau_hinh_admin
              .Select(d => new sys_cau_hinh_admin_model()
              {
                  db = d,
                  create_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
                  update_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
              })
              .Where(q => q.db.status_del == status_del)
              .Where(q => q.db.title == filter.search || filter.search=="")
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
        public IActionResult get_cau_hinh_admin()
        {
            var result = _context.sys_cau_hinh_admin.Where(q=>q.type_==1).SingleOrDefault();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_cau_hinh_admin.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
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
            var result = _context.sys_cau_hinh_admin.Where(q => q.id == Int32.Parse(id)).SingleOrDefault();
            // xoá khỏi database
            //_context.sys_khoa.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var result = _context.sys_cau_hinh_admin
              .Select(d => new sys_cau_hinh_admin_model()
              {
                  db = d,
                  create_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
                  update_name = _context.Users.Where(q => q.id == d.create_by).Select(q => q.name).SingleOrDefault(),
              }).ToList();
            return Ok(result);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> edit([FromBody] sys_cau_hinh_admin_model sys_cau_hinh_admin)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;


            try
            {
                var error = sys_cau_hinh_admin_part.check_error_insert_update(sys_cau_hinh_admin);
                if (error.Count() == 0)
                {
                    var model = _context.sys_cau_hinh_admin.Where(q => q.id == sys_cau_hinh_admin.db.id).SingleOrDefault();
                    model.update_date = DateTime.Now;
                    model.update_by = user_id;
                    model.note = sys_cau_hinh_admin.db.note;
                    model.title = sys_cau_hinh_admin.db.title;
                    model.image = sys_cau_hinh_admin.db.image;
                    model.name_footer = sys_cau_hinh_admin.db.name_footer;
                    model.title_footer = sys_cau_hinh_admin.db.title_footer;
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_cau_hinh_admin,
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
        public async Task<IActionResult> create([FromBody] sys_cau_hinh_admin_model sys_cau_hinh_admin)
        {
            try
            {
                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var error = sys_cau_hinh_admin_part.check_error_insert_update(sys_cau_hinh_admin);
                if (error.Count() == 0)
                {
                    sys_cau_hinh_admin.db.id = 0;
                    sys_cau_hinh_admin.db.update_date = DateTime.Now;
                    sys_cau_hinh_admin.db.create_date = DateTime.Now;
                    sys_cau_hinh_admin.db.update_by = user_id;
                    sys_cau_hinh_admin.db.status_del = 1;
                    _context.sys_cau_hinh_admin.Add(sys_cau_hinh_admin.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_cau_hinh_admin,
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
