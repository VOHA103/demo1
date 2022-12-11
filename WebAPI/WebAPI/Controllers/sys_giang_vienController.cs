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
using WebAPI.Part;
using WebAPI.Support;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System.IO;
using OfficeOpenXml;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.UserModel;
using System.Text.RegularExpressions;

namespace WebAPI.Controllers
{
    [ApiController]
    [EnableCors("LeThanhThai")]
    [Route("[controller]")]
    public class sys_giang_vienController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public sys_giang_vienController(ApplicationDbContext _context)
        {
            this._context = _context;
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> ImportFromExcel()
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var GV = _context.sys_giang_vien.Where(q => q.id == user_id).SingleOrDefault();
            var error = "";
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

                            if (row.Cells.All(d => d.CellType == CellType.Blank)) continue;

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


                        var model = new sys_giang_vien_model();

                        var ten_giang_vien = (fileImport[0].value.ToString() ?? "").Trim();
                        var ma_giang_vien = (fileImport[1].value.ToString() ?? "").Trim();
                        var chuc_vu = (fileImport[2].value.ToString() ?? "").Trim();
                        var bo_mon = (fileImport[3].value.ToString() ?? "").Trim();
                        var chuyen_nghanh = (fileImport[4].value.ToString() ?? "").Trim();
                        var so_dien_thoai = (fileImport[5].value.ToString() ?? "").Trim();
                        var email = (fileImport[6].value.ToString() ?? "").Trim();
                        var dia_chi = (fileImport[7].value.ToString() ?? "").Trim();
                        var ngay_sinh = (fileImport[8].value.ToString() ?? "").Trim();
                        var sex = (fileImport[9].value.ToString() ?? "").Trim();


                        if (chuc_vu == null || chuc_vu == "")
                        {
                            error += "Phải nhập chức vụ tại dòng" + (ct + 1) + "<br />";
                        }
                        else
                        {
                            var id_chuc_vu = _context.sys_chuc_vu.Where(q => q.ten_chuc_vu.ToLower().Trim().Equals(chuc_vu.ToLower().Trim())).Select(q => q.id).SingleOrDefault();
                            if (id_chuc_vu != 0)
                            {
                                model.db.id_chuc_vu = id_chuc_vu;
                            }
                            else
                            {
                                error += "Không có khoa tại dòng" + (ct + 1) + "<br />";
                            }
                        }
                        if (bo_mon == null || bo_mon == "")
                        {
                            error += "Phải nhập khoa vụ tại dòng" + (ct + 1) + "<br />";
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
                                error += "Không có khoa tại dòng" + (ct + 1) + "<br />";
                            }
                        }
                        if (chuyen_nghanh == null || chuyen_nghanh == "")
                        {
                            error += "Phải nhập chuyên nghành tại dòng" + (ct + 1) + "<br />";
                        }
                        else
                        {
                            var id_chuyen_nghanh = _context.sys_chuyen_nganh.Where(q => q.ten_chuyen_nganh.ToLower().Trim()==chuyen_nghanh.ToLower().Trim() && q.id_khoa==GV.id_khoa).Select(q => q.id).SingleOrDefault();
                            if (id_chuyen_nghanh != 0)
                            {
                                model.db.id_chuyen_nghanh = id_chuyen_nghanh;
                            }
                            else
                            {
                                error += "Không có chuyên nghành tại dòng" + (ct + 1) + "<br />";
                            }
                        }
                        if (ma_giang_vien == null || ma_giang_vien == "")
                        {
                            error += "Phải nhập mã giảng viên tại dòng" + (ct + 1) + "<br />";
                        }
                        else
                        {
                            var id_ma_giang_vien = _context.sys_giang_vien.Where(q => q.ma_giang_vien.ToLower().Trim().Equals(ma_giang_vien.ToLower().Trim())).Count();
                            if (id_ma_giang_vien == 0)
                            {
                                model.db.ma_giang_vien = ma_giang_vien;
                        model.db.username = ma_giang_vien;
                            }
                            else
                            {
                                error += "Mã giảng viên đã tồn tại tại dòng" + (ct + 1) + "<br />";
                            }
                        }

                        model.db.id_khoa = GV.id_khoa;
                        model.db.ten_giang_vien = ten_giang_vien;
                        model.db.email = email;
                        model.db.sdt = so_dien_thoai;
                        model.db.dia_chi = dia_chi;
                        model.db.ngay_sinh = DateTime.Parse(ngay_sinh);
                        if (sex.ToLower().Trim() == "Nam".ToLower())
                        {
                            model.db.gioi_tinh = 1;
                        }
                        else
                        {
                            model.db.gioi_tinh = 2;
                        }
                        error = CheckErrorImport(model, ct + 1, error);
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
                            model.db.pass_word = chang_password(model);
                            model.db.status_del = 1;
                            model.db.id_bo_mon = null;
                            model.db.username = model.db.ma_giang_vien;

                            _context.sys_giang_vien.Add(model.db);
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
            if (String.IsNullOrEmpty(model.db.email))
            {
                error += "Phải nhập email  tại dòng" + (ct + 1) + "<br />";
            }
            else
            {

                var rgEmail = new Regex(@"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*"
                                   + "@"
                                   + @"((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))\z");
                var checkEmail = rgEmail.IsMatch(model.db.email);
                if (checkEmail == false)
                {
                    error += "Email không hợp lệ" + (ct + 1) + "<br />";
                }
            }
            if (String.IsNullOrEmpty(model.db.sdt))
            {
                error += "Phải nhập email  tại dòng" + (ct + 1) + "<br />";
            }
            else
            {
                if (!string.IsNullOrEmpty(model.db.sdt))
                {

                    if (model.db.sdt.Length > 10)
                    {
                        error += "Số điện thoại tối đa 10 số" + (ct + 1) + "<br />";

                    }
                    else
                    {
                        var rgSoDienThoai = new Regex(@"(^[\+]?[0-9]{10,13}$) 
            |(^[0-9]{3}-[0-9]{4}-[0-9]{4}$)
            |(^\+[0-9]{2}\s+[0-9]{2}[0-9]{8}$)
            |(^[(]?[\+]?[\s]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{2,4}[-\s\.]?[0-9]{2,4}[-\s\.]?[0-9]{2,4}[-\s\.]?[0-9]{0,4}[-\s\.]?$)");

                        var checkSDT = rgSoDienThoai.IsMatch(model.db.sdt);
                        if (checkSDT == false)
                        {
                            error += "Số điện thoại không hợp lệ" + (ct + 1) + "<br />";
                        }

                    }


                }

            }
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
        //[AllowAnonymous]
        //public ActionResult downloadtemp()
        //{
        //    var currentpath = Directory.GetCurrentDirectory();
        //    string newPath = Path.Combine(currentpath, "wwwroot", "assets", "template");
        //    if (!Directory.Exists(newPath))
        //        Directory.CreateDirectory(newPath);

        //    string Files = newPath + "\\Book1.xlsx";
        //    byte[] fileBytes = System.IO.File.ReadAllBytes(Files);
        //    System.IO.File.WriteAllBytes(Files, fileBytes);
        //    MemoryStream ms = new MemoryStream(fileBytes);
        //    return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, "Book1.xlsx");
        //}
        //[HttpPost("[action]")]
        //public async Task<IActionResult> ImportFromExcel(IFormFile file)
        //{
        //    var list = new List<excel_import>();
        //    using (var stream = new MemoryStream())
        //    {
        //        await file.CopyToAsync(stream);
        //        using (var package = new ExcelPackage(stream))
        //        {
        //            ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
        //            var row_count = worksheet.Dimension.Rows;
        //            for (int i = 0; i < row_count; i++)
        //            {

        //                list.Add(new excel_import
        //                {
        //                    ten=worksheet.Cells[i,1].Value.ToString().Trim(),
        //                    nam_sinh=worksheet.Cells[i,2].Value.ToString().Trim(),
        //                });
        //            }
        //        }
        //    }
        //    return Ok(list);
        //}
        [HttpGet("[action]")]
        public IActionResult reset_pass(string pass, string pass_new, string pass_new_reset)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;

            var user = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => new sys_giang_vien_model
            {
                db = q,
            }).SingleOrDefault();
            var error = sys_giang_vien_part.get_list_error_pass(pass, pass_new, pass_new_reset, user);
            if (error.Count() == 0)
            {
                user.db.pass_word = Libary.EncodeMD5(pass_new);

                _context.SaveChangesAsync();
            }
            return Ok(error);
        }
        [HttpGet("[action]")]
        public IActionResult get_user_login()
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var result = _context.sys_giang_vien.Where(q => q.id == user_id)
                .Select(d => new sys_giang_vien_model()
                {
                    db = d,
                    create_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                    update_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                    ten_chuc_vu = _context.sys_chuc_vu.Where(q => q.id == d.id_chuc_vu).Select(q => q.ten_chuc_vu).SingleOrDefault(),
                    ten_khoa = _context.sys_khoa.Where(q => q.id == d.id_khoa).Select(q => q.ten_khoa).SingleOrDefault(),
                    ten_bo_mon = _context.sys_bo_mon.Where(q => q.id == d.id_bo_mon).Select(q => q.ten_bo_mon).SingleOrDefault(),
                }).SingleOrDefault();

            return Ok(result);
        }
        [HttpPost("[action]")]
        public IActionResult DataHanlderKhoaBo_mon([FromBody] filter_data_giang_vien filter)
        {

            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var GV = _context.sys_giang_vien.Where(q => q.id == user_id).SingleOrDefault();
            var result = _context.sys_giang_vien
              .Select(d => new sys_giang_vien_model()
              {
                  db = d,
                  create_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  update_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  ten_chuc_vu = _context.sys_chuc_vu.Where(q => q.id == d.id_chuc_vu).Select(q => q.ten_chuc_vu).SingleOrDefault(),
                  ten_khoa = _context.sys_khoa.Where(q => q.id == d.id_khoa).Select(q => q.ten_khoa).SingleOrDefault(),
                  ten_bo_mon = _context.sys_bo_mon.Where(q => q.id == d.id_bo_mon).Select(q => q.ten_bo_mon).SingleOrDefault(),
                  ten_chuyen_nghanh = _context.sys_chuyen_nganh.Where(q => q.id == d.id_chuyen_nghanh).Select(q => q.ten_chuyen_nganh).SingleOrDefault(),

              })
              .Where(q => q.db.id_khoa == GV.id_khoa)
              .Where(q => q.db.id_bo_mon == GV.id_bo_mon)
              .Where(q => q.db.ten_giang_vien.Contains(filter.search) || filter.search == "")
              .Where(q => q.db.id_chuc_vu == filter.id_chuc_vu || filter.id_chuc_vu == -1)
              .Where(q => q.db.id_chuyen_nghanh == filter.id_chuyen_nghanh || filter.id_chuyen_nghanh == -1)
              .ToList();
            result = result.OrderByDescending(q => q.db.update_date).ToList();
            var model = new
            {
                data = result,
                total = result.Count(),
            };
            return Ok(model);
        }
        [HttpPost("[action]")]
        public IActionResult DataHanlderKhoa([FromBody] filter_data_giang_vien filter)
       {

            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
            var result = _context.sys_giang_vien
              .Select(d => new sys_giang_vien_model()
              {
                  db = d,
                  create_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  update_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  ten_chuc_vu = _context.sys_chuc_vu.Where(q => q.id == d.id_chuc_vu).Select(q => q.ten_chuc_vu).SingleOrDefault(),
                  ten_khoa = _context.sys_khoa.Where(q => q.id == d.id_khoa).Select(q => q.ten_khoa).SingleOrDefault(),
                  ten_bo_mon = _context.sys_bo_mon.Where(q => q.id == d.id_bo_mon).Select(q => q.ten_bo_mon).SingleOrDefault(),
                  ten_chuyen_nghanh = _context.sys_chuyen_nganh.Where(q => q.id == d.id_chuyen_nghanh).Select(q => q.ten_chuyen_nganh).SingleOrDefault(),

              })
              .Where(q => q.db.id_khoa == id_khoa)
              .Where(q => q.db.ten_giang_vien.Contains(filter.search) || filter.search == "")
              .Where(q => q.db.id_chuc_vu == filter.id_chuc_vu || filter.id_chuc_vu == -1)
              .Where(q => q.db.id_chuyen_nghanh == filter.id_chuyen_nghanh || filter.id_chuyen_nghanh == -1)
              .ToList();
            result = result.OrderByDescending(q => q.db.update_date).ToList();
            var model = new
            {
                data = result,
                total = result.Count(),
            };
            return Ok(model);
        }
        [HttpPost("[action]")]
        public IActionResult DataHanlder([FromBody] filter_data_giang_vien filter)
        {
            var status_del = Int32.Parse(filter.status_del);
            var result = _context.sys_giang_vien
              .Select(d => new sys_giang_vien_model()
              {
                  db = d,
                  create_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  update_name = _context.sys_giang_vien.Where(q => q.id == d.create_by).Select(q => q.ten_giang_vien).SingleOrDefault(),
                  ten_chuc_vu = _context.sys_chuc_vu.Where(q => q.id == d.id_chuc_vu).Select(q => q.ten_chuc_vu).SingleOrDefault(),
                  ten_khoa = _context.sys_khoa.Where(q => q.id == d.id_khoa).Select(q => q.ten_khoa).SingleOrDefault(),
                  ten_bo_mon = _context.sys_bo_mon.Where(q => q.id == d.id_bo_mon).Select(q => q.ten_bo_mon).SingleOrDefault(),
                  ten_chuyen_nghanh = _context.sys_chuyen_nganh.Where(q => q.id == d.id_chuyen_nghanh).Select(q => q.ten_chuyen_nganh).SingleOrDefault(),

              })
              .Where(q => q.db.ten_giang_vien.Contains(filter.search) || filter.search == "")
              .Where(q => q.db.status_del == status_del)
              .Where(q => q.db.id_chuc_vu == filter.id_chuc_vu || filter.id_chuc_vu == -1)
              .Where(q => q.db.id_khoa == filter.id_khoa || filter.id_khoa == -1)
              .Where(q => q.db.id_chuyen_nghanh == filter.id_chuyen_nghanh || filter.id_chuyen_nghanh == -1)
              .ToList();
           
            result = result.OrderByDescending(q => q.db.create_date).ToList();
            var model = new
            {
                data = result,
                total = result.Count(),
            };
            return Ok(model);
        }
        [HttpGet("[action]")]
        public IActionResult get_list_giang_vien()
        {
            var result = _context.sys_giang_vien
              .Select(d => new
              {
                  id = d.id,
                  name = d.ten_giang_vien
              }).ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult get_list_giang_vien_change(int id_chuc_vu, int id_khoa)
        {
            var result = _context.sys_giang_vien.Where(q => q.id_chuc_vu == id_chuc_vu && q.id_khoa == id_khoa)
              .Select(d => new
              {
                  id = d.id,
                  name = d.ten_giang_vien
              })
              .ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult delete([FromQuery] string id)
        {
            var result = _context.sys_giang_vien.Find(id);
            result.status_del = 2;
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult reset_password([FromQuery] string id)
        {
            var result = _context.sys_giang_vien.Where(q=>q.id==id).Select(q=>new sys_giang_vien_model { 
            db=q,
            }).SingleOrDefault();

            result.db.pass_word = chang_password(result);
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet("[action]")]
        public IActionResult reven_status([FromQuery] string id)
        {
            var result = _context.sys_giang_vien.Find(id);
            // xoá khỏi database
            //_context.sys_khoa.Remove(result);

            //cập nhập trạng thái sử dụng
            result.status_del = 1;
            _context.SaveChanges();
            return Ok(result);
        }
     
        [HttpPost("[action]")]
        public async Task<IActionResult> edit([FromBody] sys_giang_vien_model record)
        {
            try
            {
                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var error = sys_giang_vien_part.get_list_error(record);
                if (error.Count() == 0)
                {
                    var model = _context.sys_giang_vien.Where(q=>q.id==record.db.id).SingleOrDefault();
                    model.update_date = DateTime.Now;
                    model.update_by = user_id;
                    model.status_del = 1;
                    model.id_chuyen_nghanh = record.db.id_chuyen_nghanh;
                    model.id_chuc_vu = record.db.id_chuc_vu;
                    model.id_khoa = record.db.id_khoa;
                    model.ten_giang_vien = record.db.ten_giang_vien;
                    model.sdt = record.db.sdt;
                    model.email = record.db.email;
                    model.ngay_sinh = record.db.ngay_sinh.Value.AddDays(1);
                    model.dia_chi = record.db.dia_chi;
                    model.gioi_tinh = record.db.gioi_tinh;
                    model.id_bo_mon = record.db.id_bo_mon;
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = record,
                    error = error,
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }
        [HttpGet("[action]")]
        public IActionResult get_list_giang_vien_change_khoa_bo_mon()
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var GV = _context.sys_giang_vien.Where(q => q.id == user_id).SingleOrDefault();
            var result = _context.sys_giang_vien.Where(q => q.id_bo_mon == GV.id_bo_mon && q.id_khoa == GV.id_khoa)
              .Select(d => new
              {
                  id = d.id,
                  name = d.ten_giang_vien
              })
              .ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult get_list_giang_vien_change_khoa(int id_chuc_vu)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
            var result = _context.sys_giang_vien.Where(q => q.id_chuc_vu == id_chuc_vu && q.id_khoa == id_khoa)
              .Select(d => new
              {
                  id = d.id,
                  name = d.ten_giang_vien
              })
              .ToList();
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult get_list_giang_vien_bo_mon(int id_bo_mon)
        {
            string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
            var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
            var result = _context.sys_giang_vien.Where(q => q.id_bo_mon == id_bo_mon || id_bo_mon==-1 && q.id_khoa == id_khoa)
              .Select(d => new
              {
                  id = d.id,
                  name = d.ten_giang_vien
              })
              .ToList();
            return Ok(result);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> create_giang_vien_khoa_bo_mon([FromBody] sys_giang_vien_model sys_giang_vien)
        {
            try
            {
                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var GV = _context.sys_giang_vien.Where(q => q.id == user_id).SingleOrDefault();
                sys_giang_vien.db.id_khoa = GV.id_khoa;
                sys_giang_vien.db.id_bo_mon = GV.id_bo_mon;
                var error = sys_giang_vien_part.get_list_error(sys_giang_vien);
                var check_ma_giang_vien = _context.sys_giang_vien.Where(q => q.username == sys_giang_vien.db.ma_giang_vien && q.status_del == 1).Select(q => q.ma_giang_vien).SingleOrDefault();
                if (check_ma_giang_vien != null && sys_giang_vien.db.ma_giang_vien != "")
                {
                    error.Add(set_error.set("db.ma_giang_vien", "Trùng mã giảng viên!"));
                }
                if (error.Count() == 0)
                {
                    sys_giang_vien.db.id = get_id_primary_key();
                    sys_giang_vien.db.update_date = DateTime.Now;
                    sys_giang_vien.db.create_date = DateTime.Now;
                    sys_giang_vien.db.ngay_sinh = sys_giang_vien.db.ngay_sinh.Value.AddDays(1);
                    sys_giang_vien.db.update_by = user_id;
                    sys_giang_vien.db.create_by = user_id;
                    sys_giang_vien.db.username = sys_giang_vien.db.ma_giang_vien;
                    sys_giang_vien.db.id_bo_mon = sys_giang_vien.db.id_bo_mon;
                    sys_giang_vien.db.status_del = 1;
                    sys_giang_vien.db.pass_word = chang_password(sys_giang_vien);
                    _context.sys_giang_vien.Add(sys_giang_vien.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_giang_vien,
                    error = error,
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }
        [HttpPost("[action]")]
        public async Task<IActionResult> create_giang_vien_khoa([FromBody] sys_giang_vien_model sys_giang_vien)
        {
            try
            {
                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var id_khoa = _context.sys_giang_vien.Where(q => q.id == user_id).Select(q => q.id_khoa).SingleOrDefault();
                sys_giang_vien.db.id_khoa = id_khoa;
                var error = sys_giang_vien_part.get_list_error(sys_giang_vien);
                var check_ma_giang_vien = _context.sys_giang_vien.Where(q => q.username == sys_giang_vien.db.ma_giang_vien && q.status_del == 1).Select(q => q.ma_giang_vien).SingleOrDefault();
                if (check_ma_giang_vien != null && sys_giang_vien.db.ma_giang_vien != "")
                {
                    error.Add(set_error.set("db.ma_giang_vien", "Trùng mã giảng viên!"));
                }
                if (error.Count() == 0)
                {
                    sys_giang_vien.db.id = get_id_primary_key();
                    sys_giang_vien.db.update_date = DateTime.Now;
                    sys_giang_vien.db.create_date = DateTime.Now;
                    sys_giang_vien.db.ngay_sinh = sys_giang_vien.db.ngay_sinh.Value.AddDays(1);
                    sys_giang_vien.db.update_by = user_id;
                    sys_giang_vien.db.create_by = user_id;
                    sys_giang_vien.db.username = sys_giang_vien.db.ma_giang_vien;
                    sys_giang_vien.db.id_bo_mon = sys_giang_vien.db.id_bo_mon;
                    sys_giang_vien.db.status_del = 1;
                    sys_giang_vien.db.pass_word = chang_password(sys_giang_vien);
                    _context.sys_giang_vien.Add(sys_giang_vien.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_giang_vien,
                    error = error,
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }
        [HttpPost("[action]")]
        public async Task<IActionResult> create([FromBody] sys_giang_vien_model sys_giang_vien)
        {
            try
            {
                string user_id = User.Claims.FirstOrDefault(q => q.Type.Equals("UserID")).Value;
                var error = sys_giang_vien_part.check_error_insert_update_admin(sys_giang_vien);
                var check_ma_giang_vien = _context.sys_giang_vien.Where(q => q.username == sys_giang_vien.db.ma_giang_vien && q.status_del == 1).Select(q => q.ma_giang_vien).SingleOrDefault();
                if (check_ma_giang_vien != null && sys_giang_vien.db.ma_giang_vien!="")
                {
                    error.Add(set_error.set("db.ma_giang_vien", "Trùng mã giảng viên!"));
                }
                if (error.Count() == 0)
                {
                    sys_giang_vien.db.id = get_id_primary_key();
                    sys_giang_vien.db.update_date = DateTime.Now;
                    sys_giang_vien.db.create_date = DateTime.Now;
                    sys_giang_vien.db.ngay_sinh = sys_giang_vien.db.ngay_sinh.Value.AddDays(1);
                    sys_giang_vien.db.update_by = user_id;
                    sys_giang_vien.db.create_by = user_id;
                    sys_giang_vien.db.username = sys_giang_vien.db.ma_giang_vien;
                    sys_giang_vien.db.id_bo_mon = sys_giang_vien.db.id_bo_mon;
                    sys_giang_vien.db.status_del = 1;
                    sys_giang_vien.db.pass_word = chang_password(sys_giang_vien);
                    _context.sys_giang_vien.Add(sys_giang_vien.db);
                    await _context.SaveChangesAsync();
                }
                var result = new
                {
                    data = sys_giang_vien,
                    error = error,
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }
        private string chang_password(sys_giang_vien_model model)
        {
            string pass = generate_password();
            Mail.send_password(model, pass);
            pass = Libary.EncodeMD5(pass);
            return pass;
        }
        private string generate_password()
        {
            var pass = "";
            pass = RandomExtension.get_string_password();
            return pass;
        }
        private string get_id_primary_key()
        {
            var id = "";
            var check_id = 0;
            do
            {
                id = RandomExtension.getStringID();
                check_id = _context.sys_giang_vien.Where(q => q.id == id).Count();
            } while (check_id != 0);
            return id;
        }
    }
}
