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
using Microsoft.AspNetCore.Hosting;

namespace WebAPI.Controllers
{
    [ApiController]
    [EnableCors("LeThanhThai")]
    [Route("[controller]")]
    public class sys_cau_hinhController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;
   }
}
