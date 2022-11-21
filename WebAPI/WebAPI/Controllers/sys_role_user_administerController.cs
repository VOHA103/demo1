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
    public class role_user_administerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public role_user_administerController(ApplicationDbContext _context)
        {
            this._context = _context;
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> get_list_role()
        {
            List<role> list_role = new List<role>();
            list_role.Add(add_role("sys_thong_ke_index", "Thống kê"));
            list_role.Add(add_role("sys_thong_ke_user_index", "Thống kê người dùng"));
            list_role.Add(add_role("sys_cau_hinh_giao_dien_index", "Cấu hình giao diện"));
            list_role.Add(add_role("sys_bo_mon_index", "Bộ môn"));
            list_role.Add(add_role("sys_khoa_index", "Khoa"));
            list_role.Add(add_role("sys_chuyen_nganh_index", "Chuyên nghành"));
            list_role.Add(add_role("sys_ky_truc_khoa_index", "Kỳ trực khoa"));
            return Ok(list_role);
        }
        private role add_role(string link, string label)
        {
            role a = new role();
            a.link = link;
            a.label = label;
            return a;
        }
    }
}
